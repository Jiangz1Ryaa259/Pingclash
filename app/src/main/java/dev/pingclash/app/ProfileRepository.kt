// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.AtomicFile
import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.URI
import java.security.KeyStore
import java.util.UUID
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import javax.net.ssl.HttpsURLConnection

data class LocalNode(val id: String, val name: String, val type: String, val config: String, val requiresProfile: Boolean = false) {
    val certificateVerificationSkipped: Boolean = runCatching {
        val parameters = JSONObject(config)
        fun skipped(p: JSONObject) = p.optBoolean("skip-cert-verify") || p.optJSONObject("plugin-opts")?.optBoolean("skip-cert-verify") == true
        val graphNodes = if (type == "group") JSONObject(parameters.getString("definition")).optJSONArray("proxies") else null
        (graphNodes != null && (0 until graphNodes.length()).any { skipped(graphNodes.getJSONObject(it)) }) || skipped(parameters) || parameters.optJSONArray("dialer-chain")?.let { chain ->
            (0 until chain.length()).any { skipped(JSONObject(chain.getString(it))) }
        } == true
    }.getOrDefault(false)
}

data class LocalGroup(val name: String, val type: String, val proxies: List<String>, val selected: String, val supported: Boolean, val reason: String = "",val unavailable: Int=0) {
    val selectionEditable get() = supported || type=="select" && reason in setOf("group_dependency","group_node_unavailable","group_missing","group_cycle","group_duplicate")
}
data class LocalProfile(
    val id: String, val name: String, val source: String?, val nodes: List<LocalNode>,
    val unsupported: Int, val routingIgnored: Boolean,
    val rejections: Map<String, Int> = emptyMap(),
    val verificationEnabled: Int = 0,
    val fieldIssues: Map<String, Int> = emptyMap(),
    val groups: List<LocalGroup> = emptyList(), val groupsUnsupported: Int = 0, val definition: String = "",
    val groupsDeclared: Boolean = false, val userSelections: Map<String, String> = emptyMap(),
    val rules: List<String> = emptyList(), val rulesOmitted: Int=0,
    val userAgent: String=DEFAULT_SUBSCRIPTION_UA, val quota: SubscriptionQuota?=null, val remote: RemoteProfile?=null,
) {
    val unverifiedNodes get() = nodes.count { it.certificateVerificationSkipped }
    fun groupId(name: String) = "$id/group/$name"
    fun runtimeConfig(target: String) = JSONObject().put("type","profile-target").put("target",target).put("definition",definition).toString()
    fun groupTarget(group: LocalGroup) = LocalNode(groupId(group.name),group.name,"group",runtimeConfig(group.name))
    val hasSubscriptionGroups get() = groupsDeclared || groups.isNotEmpty() || groupsUnsupported>0 ||
        runCatching { JSONObject(definition).optJSONArray("proxy-groups")?.length()?.let {it>0}==true }.getOrDefault(false)
    val defaultTargetId: String? get() {
        if(!hasSubscriptionGroups) return nodes.firstOrNull()?.id
        val firstName=if(definition.isNotBlank()) runCatching {JSONObject(definition).optJSONArray("proxy-groups")?.optJSONObject(0)?.optString("name")}.getOrNull()
            else groups.firstOrNull()?.name
        return groups.firstOrNull {it.name==firstName && it.supported}?.let {groupId(it.name)}
    }
    fun containsTarget(target: String?) = nodes.any { it.id==target } || groups.any { groupId(it.name)==target }
    fun proxyConfig(name: String): String? {
        // Plain nodes already have validated, resolved configs. Avoid parsing a
        // whole 500-node definition for every latency request.
        nodes.firstOrNull {it.name==name}?.let {return if(it.requiresProfile)runtimeConfig(name) else it.config}
        return groups.firstOrNull {it.name==name&&it.supported}?.let {runtimeConfig(name)}
    }
}
data class AppData(
    val profiles: List<LocalProfile> = emptyList(), val selectedId: String? = null,
    val dnsAddress: String = "1.1.1.1", val probeUrl: String = "https://www.gstatic.com/generate_204",
    val loadFailed: Boolean = false,
    val certificateNoticeAcknowledged: Boolean = false,
    val activeProfileId: String? = null,
    val client: ClientSettings=ClientSettings(), val usage: LocalUsage=LocalUsage(),
) {
    val nodes get() = profiles.flatMap { it.nodes }
    val activeProfile get() = profiles.firstOrNull { it.id==activeProfileId } ?: profiles.firstOrNull { it.containsTarget(selectedId) } ?: profiles.firstOrNull()
    val selected get() = nodes.firstOrNull { it.id == selectedId } ?: profiles.firstNotNullOfOrNull { p -> p.groups.firstOrNull { it.supported && p.groupId(it.name)==selectedId }?.let(p::groupTarget) }
    val selectedRuntimeConfig get() = selected?.let { node ->
        if(node.requiresProfile) profiles.single { p -> p.nodes.any { it.id==node.id } }.runtimeConfig(node.name) else node.config
    }
}

class ProfileRepository(context: Context) {
    private companion object {val storageLock=Any()}
    private val storage = AtomicFile(File(context.filesDir, "profiles.enc"))
    private val mutableData = MutableStateFlow(AppData())
    val data = mutableData.asStateFlow()
    private val keyAlias = "pingclash.profiles.v1"
    private val associated = "PingClash profiles v1".toByteArray(Charsets.UTF_8)

    init {
        synchronized(storageLock) {
        if (storage.baseFile.exists() || File(storage.baseFile.path + ".bak").exists()) {
            mutableData.value = runCatching { decode(readEncrypted()) }.getOrElse { AppData(loadFailed = true) }
        }
        }
    }

    @Synchronized fun importProfile(name: String, text: String, source: String? = null, replaceId: String? = null, explicitSelections: Map<String, String>? = null, userAgent: String? = null, subscriptionResponse: SubscriptionResponse? = null,remote: RemoteProfile? = null,providerRefresh: Boolean=false,startingVpn: Boolean=false): LocalProfile {
        if(providerRefresh)check(!mutableData.value.loadFailed && (!VpnRuntime.state.value.active || startingVpn && VpnRuntime.state.value.phase=="connecting")) else ensureMutable()
        require(name.isNotBlank() && name.length <= 100) { tr(R.string.message_e97cd33442) }
        var parsed = JSONObject(Mobile.importProfile(text))
        val previousProfile = mutableData.value.profiles.firstOrNull { it.id == replaceId }
        var keptSelections = emptyMap<String, String>()
        if (parsed.optString("definition").isNotBlank()) {
            val available = readGroups(parsed.optJSONArray("groups"))
            // Only explicit local choices override the provider's fresh defaults.
            // Older saved defaults have no provenance and must not be treated as user input.
            keptSelections = (explicitSelections ?: previousProfile?.userSelections.orEmpty()).filter { (name, choice) ->
                available.any { it.name==name && it.supported && it.type!="load-balance" && (choice in it.proxies || choice.isEmpty() && it.type!="select") }
            }
            if (keptSelections.isNotEmpty()) {
                val definition = JSONObject(parsed.getString("definition"))
                val picks = definition.optJSONObject("pingclash-selections") ?: JSONObject()
                keptSelections.forEach { (name, choice) -> picks.put(name,choice) }; definition.put("pingclash-selections",picks)
                parsed = JSONObject(Mobile.importProfile(definition.toString()))
            }
        }
        if (parsed.optString("state") != "passed") throw ProfileImportFailure(importFailureMessage(parsed))
        val input = parsed.getJSONArray("nodes")
        val nodes = (0 until input.length()).map { index ->
            val node = input.getJSONObject(index)
            LocalNode(UUID.randomUUID().toString(), node.getString("name"), node.getString("type"), node.getString("config"),node.optBoolean("requiresProfile"))
        }
        val profile = LocalProfile(replaceId ?: UUID.randomUUID().toString(), name.trim(), source, nodes,
            parsed.optInt("unsupported"), parsed.optBoolean("routingIgnored"), rejectionCounts(parsed.optJSONObject("rejections")), parsed.optInt("verificationEnabled").coerceIn(0,500), importFieldCounts(parsed.optJSONObject("fieldIssues")), readGroups(parsed.optJSONArray("groups")), parsed.optInt("groupsUnsupported").coerceIn(0,64), parsed.optString("definition"),parsed.optBoolean("groupsDeclared"),keptSelections)
        val current = mutableData.value
        val existing = current.profiles.firstOrNull { it.id == replaceId }
        require(existing != null || current.profiles.size < 20) { tr(R.string.message_5cf607d225) }
        val updated = if (existing != null) current.profiles.map { if (it.id == replaceId) profile else it } else current.profiles + profile
        // Keep a refresh selection only when the complete node parameters still match.
        val previous = current.selected
        val selected = when {
            existing == null -> if(current.activeProfile==null) profile.defaultTargetId else current.selectedId
            existing.id==current.activeProfile?.id && (current.selectedId==null || !existing.hasSubscriptionGroups && profile.hasSubscriptionGroups) -> profile.defaultTargetId
            existing.groups.any { existing.groupId(it.name)==current.selectedId } -> profile.groups.firstOrNull { it.supported && it.name==previous?.name }?.let { profile.groupId(it.name) }
            existing.nodes.none { it.id == current.selectedId } -> current.selectedId
            else -> nodes.firstOrNull { previous != null && it.name == previous.name && it.config == previous.config }?.id
                ?: nodes.filter { previous != null && it.name == previous.name && it.type == previous.type }.singleOrNull()?.id
        }
        val withRules=profile.copy(remote=if(explicitSelections!=null)previousProfile?.remote else remote,userAgent=userAgent?:previousProfile?.userAgent?:DEFAULT_SUBSCRIPTION_UA,quota=if(subscriptionResponse!=null)subscriptionResponse.quota else previousProfile?.quota,rules=if(explicitSelections!=null)previousProfile?.rules.orEmpty() else readRules(parsed.optJSONArray("rules")),rulesOmitted=if(explicitSelections!=null)previousProfile?.rulesOmitted?:0 else parsed.optInt("rulesOmitted").coerceAtLeast(0))
        commit(current.copy(profiles = updated.map {if(it.id==profile.id)withRules else it}, selectedId = selected, activeProfileId = current.activeProfile?.id ?: profile.id))
        return withRules
    }

    fun importWithProviders(name: String,text: String,source: String?=null,replaceId: String?=null,userAgent: String=DEFAULT_SUBSCRIPTION_UA,response: SubscriptionResponse?=null): LocalProfile {
        val prepared=RemoteProfiles.load(text,userAgent,force=true)
        return importProfile(name,prepared.content,source,replaceId,userAgent=userAgent,subscriptionResponse=response,remote=prepared.remote)
    }

    fun refreshProviders(profile: LocalProfile,force: Boolean=false) {
        val remote=profile.remote?:return
        if(!force&&!RemoteProfiles.due(remote)&&(!remote.pending||VpnRuntime.state.value.active))return
        try {
            val prepared=RemoteProfiles.load(remote.original,profile.userAgent,remote,force)
            // Parse the complete graph before replacing even the encrypted cache.
            val checked=JSONObject(Mobile.importProfile(prepared.content))
            if(checked.optString("state")!="passed")throw ProviderFailure(0,"proxy","provider_payload")
            synchronized(this) {
                val current=mutableData.value
                if(current.loadFailed||current.profiles.firstOrNull {it.id==profile.id}!=profile)return
                if(VpnRuntime.state.value.active) {
                    commit(current.copy(profiles=current.profiles.map {if(it.id==profile.id)it.copy(remote=prepared.remote?.copy(pending=remote.pending || prepared.content!=RemoteProfiles.resolve(remote.original,remote.bodies))) else it}))
                } else importProfile(profile.name,prepared.content,profile.source,profile.id,userAgent=profile.userAgent,remote=prepared.remote,providerRefresh=true)
            }
        } catch(failure: Exception) {
            val problem=failure as? ProviderFailure ?: ProviderFailure(0,"proxy","provider_payload")
            synchronized(this) {
                val current=mutableData.value
                if(!current.loadFailed && current.profiles.firstOrNull {it.id==profile.id}==profile)
                    commit(current.copy(profiles=current.profiles.map {if(it.id==profile.id)it.copy(remote=remote.copy(error="${problem.index}:${problem.kind}:${problem.code}",retryAfter=java.time.Instant.now().epochSecond+60)) else it}))
            }
            if(force)throw problem
        }
    }

    @Synchronized internal fun applyPendingProviders() {
        val profile=mutableData.value.activeProfile?:return
        val remote=profile.remote?.takeIf {it.pending}?:return
        val content=RemoteProfiles.resolve(remote.original,remote.bodies)
        importProfile(profile.name,content,profile.source,profile.id,userAgent=profile.userAgent,remote=remote.copy(pending=false),providerRefresh=true,startingVpn=true)
    }

    @Synchronized fun select(id: String) {
        ensureMutable()
        val owner=mutableData.value.profiles.single {it.containsTarget(id)}
        val next=mutableData.value.copy(selectedId=id,activeProfileId=owner.id)
        require(next.selected != null)
        commit(next)
    }

    @Synchronized fun activate(profileId: String) {
        ensureMutable()
        val profile=mutableData.value.profiles.single {it.id==profileId}
        commit(mutableData.value.copy(selectedId=profile.defaultTargetId,activeProfileId=profile.id))
    }

    @Synchronized fun selectGroup(profileId: String, groupName: String, choice: String): LocalProfile {
        ensureMutable()
        val profile = mutableData.value.profiles.single { it.id == profileId }
        val group=profile.groups.single {it.name==groupName}
        require(group.selectionEditable && group.type!="load-balance" && (choice in group.proxies || choice.isEmpty() && group.type!="select"))
        val definition = JSONObject(profile.definition)
        val picks = definition.optJSONObject("pingclash-selections") ?: JSONObject()
        picks.put(groupName,choice); definition.put("pingclash-selections",picks)
        if(!group.supported) {
            val checked=JSONObject(Mobile.importProfile(definition.toString()))
            if(checked.optString("state")!="passed" || readGroups(checked.optJSONArray("groups")).none {it.name==groupName&&it.supported})
                throw ProfileImportFailure(tr(R.string.message_0a93b155bd))
        }
        return importProfile(profile.name,definition.toString(),profile.source,profile.id,explicitSelections=profile.userSelections+(groupName to choice))
    }

    @Synchronized fun reparse(profileId: String): LocalProfile {
        ensureMutable()
        val profile=mutableData.value.profiles.single {it.id==profileId}
        require(profile.definition.isNotBlank()) {tr(R.string.message_37c135f051)}
        return importProfile(profile.name,profile.definition,profile.source,profile.id,explicitSelections=profile.userSelections)
    }

    @Synchronized fun delete(id: String) {
        ensureMutable()
        val profiles = mutableData.value.profiles.filterNot { it.id == id }
        val current=mutableData.value
        val active=profiles.firstOrNull {it.id==current.activeProfile?.id} ?: profiles.firstOrNull()
        val selected=if(active?.id==current.activeProfile?.id) current.selectedId else active?.defaultTargetId
        commit(current.copy(profiles=profiles,selectedId=selected,activeProfileId=active?.id))
    }

    @Synchronized fun settings(dns: String, probeUrl: String) {
        ensureMutable()
        require(dns.isNotBlank() && dns.length <= 80) { tr(R.string.message_6fb64222da) }
        // Native validation also verifies the literal IP and port before establishing TUN.
        require(validDns(dns)) { tr(R.string.message_ebee841ef8) }
        require(probeUrl.length <= 2048 && validHttps(probeUrl)) { tr(R.string.message_39eddf54bc) }
        commit(mutableData.value.copy(dnsAddress = dns, probeUrl = probeUrl))
    }

    @Synchronized fun clientSettings(value: ClientSettings,dns: String,probe: String) {
        ensureMutable();validateClientSettings(value)
        require(dns.length<=80&&validDns(dns)) {tr(R.string.message_ebee841ef8)}
        require(probe.length<=2048&&validHttps(probe)) {tr(R.string.message_39eddf54bc)}
        val current=mutableData.value
        val reply=JSONObject(Mobile.validateRuntimeOptions(current.runtimeOptions(value)))
        if(reply.optString("state")!="passed") throw SettingsFailure(when(reply.optString("code")) {
            "rule_unsupported" -> tr(R.string.message_4c3d16016b, reply.optInt("line"))
            "rule_invalid" -> tr(R.string.message_0a99277bee, reply.optInt("line"))
            "rule_limit","rule_target_limit" -> tr(R.string.message_1cbe37cb5f)
            "rule_target_invalid" -> tr(R.string.message_d4bf946975)
            else -> tr(R.string.message_6e7c33d963)
        })
        commit(current.copy(client=value,dnsAddress=dns,probeUrl=probe,usage=if(value.keepUsage)current.usage else LocalUsage()))
        if(value.language!=current.client.language)UiStrings.apply(value.language)
    }
    @Synchronized fun appearance(language: String,theme: String) {
        val current=mutableData.value;check(!current.loadFailed)
        val value=current.client.copy(language=language,theme=theme);validateClientSettings(value)
        commit(current.copy(client=value))
        UiStrings.apply(language)
    }
    @Synchronized fun resetUsage() {ensureMutable();commit(mutableData.value.copy(usage=LocalUsage()))}
    @Synchronized internal fun recordUsage(up: Long,down: Long,seconds: Long) {
        val current=mutableData.value;if(current.loadFailed||!current.client.keepUsage)return
        fun plus(a: Long,b: Long)=a+(b.coerceAtLeast(0).coerceAtMost(Long.MAX_VALUE-a))
        commit(current.copy(usage=LocalUsage(plus(current.usage.uploaded,up),plus(current.usage.downloaded,down),plus(current.usage.seconds,seconds),plus(current.usage.sessions,1))))
    }
    @Synchronized fun subscriptionUserAgent(id: String,value: String) {
        ensureMutable()
        if(!validSubscriptionUa(value))throw SettingsFailure(tr(R.string.subscription_ua_invalid))
        commit(mutableData.value.copy(profiles=mutableData.value.profiles.map {if(it.id==id)it.copy(userAgent=value) else it}))
    }
    @Synchronized fun rename(id: String,name: String) {
        ensureMutable();require(name.isNotBlank()&&name.length<=100) {tr(R.string.message_e97cd33442)}
        commit(mutableData.value.copy(profiles=mutableData.value.profiles.map {if(it.id==id)it.copy(name=name.trim()) else it}))
    }

    @Synchronized fun acknowledgeCertificateNotice() {
        val current = mutableData.value
        check(!current.loadFailed) { tr(R.string.message_d372823dd0) }
        if (!current.certificateNoticeAcknowledged) commit(current.copy(certificateNoticeAcknowledged = true))
    }

    private fun ensureMutable() {
        check(!mutableData.value.loadFailed) { tr(R.string.message_d372823dd0) }
        check(!VpnRuntime.state.value.active) { tr(R.string.message_012c5c80c2) }
    }

    private fun commit(value: AppData) {
        synchronized(storageLock) {
        val plaintext = encode(value).toByteArray(Charsets.UTF_8)
        require(plaintext.size <= 3 * 1024 * 1024) { tr(R.string.message_ec808f283f) }
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        cipher.init(Cipher.ENCRYPT_MODE, secret(create = true))
        cipher.updateAAD(associated)
        val encrypted = byteArrayOf(1) + cipher.iv + cipher.doFinal(plaintext)
        val stream = storage.startWrite()
        try { stream.write(encrypted); storage.finishWrite(stream) }
        catch (error: Exception) { storage.failWrite(stream); throw error }
        mutableData.value = value
        }
    }

    private fun readEncrypted(): String {
        val encrypted = storage.openRead().use { stream ->
            val content = stream.readBytesLimited(3 * 1024 * 1024 + 64)
            require(content.size >= 29 && content[0] == 1.toByte()); content
        }
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        cipher.init(Cipher.DECRYPT_MODE, secret(create = false), GCMParameterSpec(128, encrypted.copyOfRange(1, 13)))
        cipher.updateAAD(associated)
        return cipher.doFinal(encrypted.copyOfRange(13, encrypted.size)).toString(Charsets.UTF_8)
    }

    private fun secret(create: Boolean): SecretKey {
        val store = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
        (store.getKey(keyAlias, null) as? SecretKey)?.let { return it }
        check(create) { "key_unavailable" }
        return KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore").apply {
            init(KeyGenParameterSpec.Builder(keyAlias, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).build())
        }.generateKey()
    }

    private fun encode(data: AppData): String = JSONObject().apply {
        put("version", 1); put("selected", data.selectedId); put("dns", data.dnsAddress); put("probe", data.probeUrl)
        put("certificateNoticeAcknowledged", data.certificateNoticeAcknowledged)
        put("activeProfile", data.activeProfile?.id)
        put("client",data.client.json());put("usage",data.usage.json())
        put("profiles", JSONArray().apply { data.profiles.forEach { profile -> put(JSONObject().apply {
            put("id", profile.id); put("name", profile.name); put("source", profile.source)
            put("unsupported", profile.unsupported); put("routingIgnored", profile.routingIgnored)
            put("rejections", JSONObject(profile.rejections))
            put("verificationEnabled", profile.verificationEnabled)
            put("fieldIssues", JSONObject(profile.fieldIssues))
            put("groups", JSONArray().apply { profile.groups.forEach { group -> put(JSONObject().apply {
                put("name",group.name);put("type",group.type);put("proxies",JSONArray(group.proxies));put("selected",group.selected);put("supported",group.supported);put("reason",group.reason);put("unavailable",group.unavailable)
            }) } }); put("groupsUnsupported",profile.groupsUnsupported);put("definition",profile.definition)
            put("groupsDeclared",profile.groupsDeclared);put("userSelections",JSONObject(profile.userSelections))
            put("rules",JSONArray(profile.rules));put("rulesOmitted",profile.rulesOmitted)
            put("userAgent",profile.userAgent);put("quota",profile.quota?.json());put("remote",profile.remote?.json())
            put("nodes", JSONArray().apply { profile.nodes.forEach { node -> put(JSONObject().apply {
                put("id", node.id); put("name", node.name); put("type", node.type); put("config", node.config);put("requiresProfile",node.requiresProfile)
            }) } })
        }) } })
    }.toString()

    private fun decode(text: String): AppData {
        val root = JSONObject(text)
        require(root.getInt("version") == 1)
        val profiles = root.getJSONArray("profiles")
        require(profiles.length() <= 20)
        return AppData(profiles = (0 until profiles.length()).map { index ->
            val profile = profiles.getJSONObject(index); val nodes = profile.getJSONArray("nodes")
            require(nodes.length() in 1..500)
            LocalProfile(profile.getString("id"), profile.getString("name"), profile.optString("source").takeIf { it.isNotBlank() && it != "null" },
                (0 until nodes.length()).map { n -> val node = nodes.getJSONObject(n)
                    LocalNode(node.getString("id"), node.getString("name"), node.getString("type"), node.getString("config"),node.optBoolean("requiresProfile"))
                }, profile.optInt("unsupported"), profile.optBoolean("routingIgnored"), rejectionCounts(profile.optJSONObject("rejections")), profile.optInt("verificationEnabled").coerceIn(0,500), importFieldCounts(profile.optJSONObject("fieldIssues")),readGroups(profile.optJSONArray("groups")),profile.optInt("groupsUnsupported").coerceIn(0,64),profile.optString("definition"),profile.optBoolean("groupsDeclared"),profile.optJSONObject("userSelections")?.let { picks ->
                    require(picks.length()<=64)
                    picks.keys().asSequence().associateWith {picks.getString(it)}
                }.orEmpty(),readRules(profile.optJSONArray("rules")),profile.optInt("rulesOmitted").coerceAtLeast(0),profile.optString("userAgent",DEFAULT_SUBSCRIPTION_UA).also {require(validSubscriptionUa(it))},SubscriptionQuota.read(profile.optJSONObject("quota")),RemoteProfile.read(profile.optJSONObject("remote")))
        }, selectedId = root.optString("selected").takeIf { it.isNotBlank() && it != "null" },
            dnsAddress = root.getString("dns"), probeUrl = root.getString("probe"), certificateNoticeAcknowledged = root.optBoolean("certificateNoticeAcknowledged"),activeProfileId=root.optString("activeProfile").takeIf {it.isNotBlank()&&it!="null"},client=ClientSettings.read(root.optJSONObject("client")).also(::validateClientSettings),usage=LocalUsage.read(root.optJSONObject("usage")))
    }
}

internal class SettingsFailure(val publicMessage: String): IllegalArgumentException("settings_invalid")
private fun readRules(value: JSONArray?): List<String> {
    if(value==null)return emptyList();require(value.length()<=2000)
    val rules=(0 until value.length()).map(value::getString);require(rules.sumOf {it.length}<=256*1024&&rules.all {it.length<=2048});return rules
}

private fun readGroups(value: JSONArray?): List<LocalGroup> = if(value==null) emptyList() else {
    require(value.length()<=64)
    (0 until value.length()).map { index -> val group=value.getJSONObject(index);val members=group.getJSONArray("proxies")
        require(members.length() in 1..500)
        LocalGroup(group.getString("name"),group.getString("type"),(0 until members.length()).map(members::getString),group.getString("selected"),group.getBoolean("supported"),group.optString("reason"),group.optInt("unavailable").coerceIn(0,500))
    }
}

internal fun validHttps(raw: String): Boolean = runCatching {
    val uri = URI(raw)
    raw.length <= 4096 && uri.scheme == "https" && !uri.host.isNullOrBlank() && uri.rawUserInfo == null && uri.rawFragment == null && (uri.port == -1 || uri.port in 1..65535)
}.getOrDefault(false)

private fun validDns(raw: String): Boolean = runCatching {
    val address = if (android.net.InetAddresses.isNumericAddress(raw)) raw else {
        val uri = URI("dns://$raw")
        require(uri.port in 1..65535 && uri.rawUserInfo == null && uri.rawQuery == null && uri.rawFragment == null && uri.rawPath.isNullOrEmpty())
        requireNotNull(uri.host).removePrefix("[").removeSuffix("]")
    }
    val ip = android.net.InetAddresses.parseNumericAddress(address)
    !ip.isAnyLocalAddress && !ip.isMulticastAddress
}.getOrDefault(false)

internal fun java.io.InputStream.readBytesLimited(maximum: Int): ByteArray {
    val output = java.io.ByteArrayOutputStream()
    val buffer = ByteArray(8192)
    while (true) { val count = read(buffer); if (count < 0) break
        require(output.size() + count <= maximum) { tr(R.string.message_f96a5b2b19) }; output.write(buffer, 0, count)
    }
    return output.toByteArray()
}

internal object SubscriptionDownloader {
    private val timer = Executors.newSingleThreadScheduledExecutor { task -> Thread(task, "subscription-deadline").apply { isDaemon = true } }
    fun fetch(source: String, userAgent: String=DEFAULT_SUBSCRIPTION_UA): String = fetchResponse(source,userAgent).content
    fun fetchResponse(source: String,userAgent: String=DEFAULT_SUBSCRIPTION_UA,headers: Map<String,String> = emptyMap(),timeoutMillis: Int=30_000): SubscriptionResponse {
        if(!validSubscriptionUa(userAgent))throw SettingsFailure(tr(R.string.subscription_ua_invalid))
        require(validHttps(source)) { tr(R.string.message_0351397e06) }
        var address = URI(source)
        val deadline = System.nanoTime() + TimeUnit.MILLISECONDS.toNanos(timeoutMillis.coerceIn(1,30_000).toLong())
        repeat(4) {
            check(System.nanoTime() < deadline) { tr(R.string.message_b6e30a8416) }
            val connection = address.toURL().openConnection() as HttpsURLConnection
            connection.instanceFollowRedirects = false
            connection.useCaches = false
            connection.connectTimeout = 10_000; connection.readTimeout = 10_000
            connection.setRequestProperty("User-Agent", userAgent)
            headers.forEach {(key,value)->connection.setRequestProperty(key,value)}
            connection.setRequestProperty("Cache-Control", "no-store")
            connection.setRequestProperty("Accept-Encoding", "identity")
            val expired = java.util.concurrent.atomic.AtomicBoolean(false)
            val expiry = timer.schedule({ expired.set(true); connection.disconnect() }, maxOf(1, deadline - System.nanoTime()), TimeUnit.NANOSECONDS)
            try {
                val status = connection.responseCode
                if (status in listOf(301, 302, 303, 307, 308)) {
                    val previous=address
                    address = address.resolve(connection.getHeaderField("Location") ?: throw IllegalStateException(tr(R.string.message_3a12c4343b)))
                    require(validHttps(address.toString())) { tr(R.string.message_0fead32545) }
                    // Never forward provider authorization to a different origin.
                    require(headers.isEmpty() || previous.host.equals(address.host,true) && previous.port==address.port) {tr(R.string.provider_redirect)}
                } else {
                    if (status != 200) throw SubscriptionHttpFailure(status.coerceIn(100, 599))
                    return SubscriptionResponse(connection.inputStream.use { it.readBytesLimited(2 * 1024 * 1024) }.toString(Charsets.UTF_8),SubscriptionQuota.parse(connection.getHeaderField("subscription-userinfo")))
                }
            } catch (failure: Exception) {
                if (expired.get() || System.nanoTime() >= deadline) throw java.net.SocketTimeoutException("subscription_deadline")
                throw failure
            } finally { expiry.cancel(false); connection.disconnect() }
        }
        throw IllegalStateException(tr(R.string.message_617b8d3ad4))
    }
}

internal class SubscriptionHttpFailure(val status: Int) : java.io.IOException("subscription_http_status")

internal class ProfileImportFailure(val publicMessage: String) : IllegalArgumentException("profile_import_failed")
internal val rejectionLabels get() = linkedMapOf("resource_limit" to tr(R.string.message_dd78acd8da), "security_policy" to tr(R.string.message_013c8202d5), "tls_policy" to tr(R.string.message_08f09e82cc), "proxy_chain" to tr(R.string.message_af37f27d56), "replay_policy" to tr(R.string.message_3913485e58), "plaintext_transport" to tr(R.string.message_de9a8af39f), "cipher_policy" to tr(R.string.message_6178fccf0c), "udp_policy" to tr(R.string.message_9bf38eee01), "unsupported_protocol" to tr(R.string.message_e72cf6020d), "invalid_parameters" to tr(R.string.message_adbc2f44ed), "unsupported_fields" to tr(R.string.message_0357e0e899), "invalid_node" to tr(R.string.message_b41b084688))
internal fun rejectionCounts(value: JSONObject?): Map<String, Int> = rejectionLabels.keys.mapNotNull { key ->
    value?.optInt(key, 0)?.takeIf { it in 1..500 }?.let { key to it }
}.toMap()
internal fun rejectionSummary(counts: Map<String, Int>): String = rejectionLabels.mapNotNull { (key, label) -> counts[key]?.let { trPlural(R.plurals.message_3d24641487, (it).toInt(), label, it) } }.joinToString("；")
internal fun importFailureMessage(parsed: JSONObject): String = when (parsed.optString("code")) {
    "subscription_html" -> tr(R.string.message_e29d5fc45c)
    "singbox_format" -> tr(R.string.message_a2b5d9b0b1)
    "provider_only" -> tr(R.string.message_f5457450b4)
    "no_supported_nodes" -> {
        val counts = rejectionCounts(parsed.optJSONObject("rejections"))
        val detail = rejectionSummary(counts) + importFieldSummary(importFieldCounts(parsed.optJSONObject("fieldIssues"))).takeIf { it.isNotBlank() }?.let { "。$it" }.orEmpty()
        tr(R.string.message_89d6350ff0) + detail.takeIf { it.isNotBlank() }?.let { "$it。" }.orEmpty() +
            tr(R.string.message_a21f280989)
    }
    else -> tr(R.string.message_dc8618a067)
}

// Only a fixed schema vocabulary can be displayed; arbitrary JSON keys may contain secrets.
private val publicImportFields = "type name server port udp password username sni client-fingerprint alpn skip-cert-verify tls idle-session-check-interval idle-session-timeout min-idle-session disable-reuse tfo mptcp fast-open ip-version smux fingerprint name-cert-verify certificate private-key ech-opts shadow-tls-opts restls-opts jls-opts client-metadata dialer-proxy interface-name routing-mark handshake-timeout udp-mtu recv-window-conn recv-window cwnd bbr-profile cipher plugin plugin-opts udp-over-tcp udp-over-tcp-version network ws-opts grpc-opts uuid alterId servername h2-opts http-opts packet-addr xudp packet-encoding global-padding authenticated-length flow encryption reality-opts ports hop-interval up down obfs obfs-password token ip disable-sni reduce-rtt congestion-controller udp-relay-mode heartbeat-interval request-timeout max-udp-relay-packet-size other parameters structure protocol".split(" ").toSet()
internal fun importFieldCounts(value: JSONObject?): Map<String, Int> {
    if (value == null) return emptyMap()
    val protocols = setOf("anytls", "socks5", "ss", "trojan", "vmess", "vless", "hysteria2", "tuic", "other")
    return value.keys().asSequence().take(1024).mapNotNull { key ->
        val parts = key.split('.')
        if (parts.size != 2 || parts[0] !in protocols || parts[1] !in publicImportFields) null
        else value.optInt(key).takeIf { it in 1..500 }?.let { key to it }
    }.toMap()
}
internal fun importFieldSummary(issues: Map<String, Int>): String = issues.toSortedMap().entries.joinToString("；") { (key, count) ->
    val parts = key.split('.')
    val field = when(parts[1]) { "parameters" -> tr(R.string.message_0facf15a7b); "structure" -> tr(R.string.message_b4c7dabb18); "protocol" -> tr(R.string.message_3c54c5dcf5); "other" -> tr(R.string.message_588e7c7ede); else -> parts[1] }
    trPlural(R.plurals.message_ab72fde8f0, (count).toInt(), if(parts[0] == "other") tr(R.string.message_d2909f1647) else parts[0].uppercase(java.util.Locale.ROOT), field, count)
}
