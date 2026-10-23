// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.app.Application
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import dev.pingclash.diagnostics.DiagnosticEngine
import dev.pingclash.diagnostics.Models
import dev.pingclash.diagnostics.RunControl
import dev.pingclash.diagnostics.ProbeFailure
import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.drop
import kotlinx.coroutines.launch
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.Job
import kotlinx.coroutines.withTimeout
import kotlinx.coroutines.flow.first
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicInteger
import org.json.JSONObject
import java.util.UUID
import java.util.concurrent.TimeUnit

data class AppUiState(val busy: Boolean = false, val message: String? = null, val importIssue: String? = null, val importedProfileId: String? = null)
data class ProxyDelay(val state: String, val elapsedMs: Long = 0)
data class ProxyTestState(val running: Boolean = false, val completed: Int = 0, val total: Int = 0, val values: Map<String,ProxyDelay> = emptyMap())
internal fun delayKey(profileId: String,name: String,group: String="") = "$profileId\u0000$group\u0000$name"

class AppViewModel(application: Application) : AndroidViewModel(application) {
    private val app = application as PingClashApplication
    val data = app.repository.data
    val vpn = VpnRuntime.state
    val nativeReady get() = app.nativeReady
    private val mutableUi = MutableStateFlow(AppUiState())
    val ui = mutableUi.asStateFlow()
    private val mutableDiagnosis = MutableStateFlow(DiagnosticUiState())
    val diagnosis = mutableDiagnosis.asStateFlow()
    private val mutableProxyTests=MutableStateFlow(ProxyTestState())
    val proxyTests=mutableProxyTests.asStateFlow()
    private var testJob: Job?=null
    private val testRuns=ConcurrentHashMap.newKeySet<String>()
    @Volatile private var control: RunControl? = null
    @Volatile private var nativeRun: String? = null

    private fun requestKey(data: AppData) = Triple(data.selectedId, data.selectedRuntimeConfig, data.probeUrl)
    init {
        viewModelScope.launch {
            data.map(::requestKey).distinctUntilChanged().drop(1).collect {
                cancelProxyTests();mutableProxyTests.value=ProxyTestState()
                if (mutableDiagnosis.value.running) cancelDiagnosis()
                else mutableDiagnosis.value = DiagnosticUiState()
            }
        }
    }

    fun dismissMessage() { mutableUi.update { it.copy(message = null) } }
    fun acknowledgeCertificateNotice() {
        viewModelScope.launch(Dispatchers.IO) {
            runCatching { app.repository.acknowledgeCertificateNotice() }
                .onFailure { message(tr(R.string.message_4af8010a74)) }
        }
    }
    fun message(text: String) { mutableUi.update { it.copy(message = text) } }
    private fun operation(block: () -> String) {
        if (!app.nativeReady) return message(tr(R.string.message_57d3653b2f))
        if (mutableUi.value.busy || mutableDiagnosis.value.running || mutableProxyTests.value.running) return
        mutableUi.update { it.copy(busy = true, message = null) }
        viewModelScope.launch(Dispatchers.IO) {
            val message = try { block() } catch (failure: Exception) { publicFailure(failure) }
            mutableUi.update { it.copy(busy = false, message = message.takeIf(String::isNotBlank)) }
        }
    }

    private fun publicFailure(failure: Exception): String = when (failure) {
        is ProfileImportFailure -> failure.publicMessage
        is SettingsFailure -> failure.publicMessage
        is SubscriptionHttpFailure -> tr(R.string.message_a1372a7755, failure.status)
        is java.net.UnknownHostException -> tr(R.string.message_a733781bdb)
        is java.net.SocketTimeoutException -> tr(R.string.message_8fe486ceb3)
        is javax.net.ssl.SSLException -> tr(R.string.message_4b7b90cbbe)
        else -> failure.message?.takeIf { it in setOf(
            tr(R.string.message_e97cd33442), tr(R.string.message_307e2d8b35), tr(R.string.message_6223b5ebb5),
            tr(R.string.message_5cf607d225), tr(R.string.message_ec808f283f), tr(R.string.message_f96a5b2b19), tr(R.string.message_d372823dd0),
            tr(R.string.message_012c5c80c2), tr(R.string.message_6fb64222da), tr(R.string.message_ebee841ef8),
            tr(R.string.message_39eddf54bc), tr(R.string.message_0351397e06),
            tr(R.string.message_c2461562e6),
            tr(R.string.message_0fead32545), tr(R.string.message_3a12c4343b), tr(R.string.message_617b8d3ad4), tr(R.string.message_b6e30a8416),
            tr(R.string.message_ac1ec3e9aa), tr(R.string.message_e5eca6fb98), tr(R.string.message_fef3d1894e), tr(R.string.message_c6d0075555),
        ) } ?: tr(R.string.message_4835196960)
    }
    fun clearImportIssue() { mutableUi.update { it.copy(importIssue = null) } }
    private fun importOperation(block: () -> LocalProfile) {
        if (!app.nativeReady) { mutableUi.update { it.copy(importIssue = tr(R.string.message_c1927f1a8f)) }; return }
        if (mutableUi.value.busy || mutableDiagnosis.value.running || mutableProxyTests.value.running) return
        mutableUi.update { it.copy(busy = true, message = null, importIssue = null) }
        viewModelScope.launch(Dispatchers.IO) {
            try { val profile = block(); mutableUi.update { it.copy(busy = false, message = imported(profile), importedProfileId = profile.id) } }
            catch (failure: Exception) { mutableUi.update { it.copy(busy = false, importIssue = publicFailure(failure)) } }
        }
    }
    fun importText(name: String, text: String) = importOperation {
        app.repository.importProfile(name.ifBlank { tr(R.string.message_e406825e0a) }, text)
    }
    fun importFile(name: String, uri: Uri) = importOperation {
        val text = app.contentResolver.openInputStream(uri)?.use { it.readBytesLimited(2 * 1024 * 1024).toString(Charsets.UTF_8) }
            ?: error("input_unavailable")
        app.repository.importProfile(name, text)
    }
    fun subscribe(name: String, source: String) = importOperation {
        app.repository.importProfile(name.ifBlank { tr(R.string.message_79aad303b1) }, SubscriptionDownloader.fetch(source), source)
    }
    fun refresh(profile: LocalProfile) = operation {
        val source = requireNotNull(profile.source)
        imported(app.repository.importProfile(profile.name, SubscriptionDownloader.fetch(source), source, profile.id))
    }
    fun reparse(profile: LocalProfile) = operation {imported(app.repository.reparse(profile.id))}
    private fun imported(profile: LocalProfile): String = trPlural(R.plurals.message_e5fce9261e, (profile.nodes.size).toInt(), profile.nodes.size) +
        (if (profile.unsupported > 0) tr(R.string.message_a82c682af4, profile.unsupported) else "")
    fun select(id: String) = operation { app.repository.select(id); "" }
    fun activate(profileId: String) = operation { app.repository.activate(profileId); "" }
    fun selectGroup(profile: LocalProfile, group: LocalGroup, choice: String) = operation {
        val wasGroup=data.value.selected?.type=="group"
        app.repository.selectGroup(profile.id,group.name,choice)
        if(!wasGroup) app.repository.select(profile.groupId(group.name))
        ""
    }
    fun selectMainGroup(profile: LocalProfile, group: LocalGroup) = select(profile.groupId(group.name))
    fun delete(id: String) = operation { app.repository.delete(id); tr(R.string.message_df12a31f25) }
    fun settings(dns: String, target: String) = operation { app.repository.settings(dns, target); tr(R.string.message_bd03c0aad7) }
    fun clientSettings(value: ClientSettings,dns: String,target: String)=operation {app.repository.clientSettings(value,dns,target);""}
    fun appearance(language: String,theme: String) {viewModelScope.launch(Dispatchers.IO) {runCatching {app.repository.appearance(language,theme)}.onFailure {message(tr(R.string.message_c7acc6686e))}}}
    fun resetUsage()=operation {app.repository.resetUsage();tr(R.string.message_90c913765d)}
    fun rename(id: String,name: String)=operation {app.repository.rename(id,name);tr(R.string.message_e61b17d0d2)}
    fun closeConnection(id: Long) {viewModelScope.launch(Dispatchers.IO) {Mobile.closeVPNConnection(id)}}
    fun restartVpn() {
        if(mutableUi.value.busy||vpn.value.phase!="established")return
        mutableUi.update {it.copy(busy=true)}
        viewModelScope.launch(Dispatchers.IO) {
            runCatching {VpnRuntime.disconnect(app);withTimeout(10000) {vpn.first {!it.active}};VpnRuntime.connect(app)}
                .onFailure {message(tr(R.string.message_fd94d45469))}
            mutableUi.update {it.copy(busy=false)}
        }
    }
    fun exportProfile(id: String,uri: Uri)=operation {
        val profile=data.value.profiles.single {it.id==id}
        val root=if(profile.definition.isNotBlank())JSONObject(profile.definition) else JSONObject().put("proxies",org.json.JSONArray(profile.nodes.map {JSONObject(it.config)}))
        root.remove("pingclash-selections");if(profile.rules.isNotEmpty())root.put("rules",org.json.JSONArray(profile.rules))
        val bytes=root.toString(2).toByteArray(Charsets.UTF_8);require(bytes.size<=3*1024*1024)
        app.contentResolver.openOutputStream(uri,"wt")?.use {it.write(bytes)} ?: error("export_unavailable")
        tr(R.string.message_d6639c530f)
    }

    fun testProxies(profile: LocalProfile,names: List<String>,groupName: String="") {
        if(!app.nativeReady || testJob?.isCompleted==false || mutableProxyTests.value.running || mutableUi.value.busy || mutableDiagnosis.value.running) return
        // Keep only names in the queue. A profile definition may be 2 MiB;
        // materializing an envelope for every member would multiply that by 500.
        val candidates=names.distinct().take(500).filter {name -> profile.nodes.any {it.name==name} || profile.groups.any {it.name==name&&it.supported} }
        if(candidates.isEmpty()) return
        val version=requestKey(data.value)
        val settings=data.value.client
        val target=settings.delayUrl.ifBlank {runCatching {
            val raw=JSONObject(profile.definition).optJSONArray("proxy-groups")
            if(raw==null) "" else (0 until raw.length()).mapNotNull {raw.optJSONObject(it)}.firstOrNull {it.optString("name")==groupName}?.optString("url").orEmpty()
        }.getOrDefault("").ifBlank {data.value.probeUrl}}
        val queue=AtomicInteger(0)
        val pending=ConcurrentHashMap<String,ProxyDelay>()
        val completed=AtomicInteger(0)
        val flushLock=Any()
        fun flush() {
            synchronized(flushLock) {
            if(requestKey(data.value)!=version||!mutableProxyTests.value.running)return@synchronized
            val entries=pending.entries.map {it.key to it.value}
            entries.forEach {(key,value)->pending.remove(key,value)}
            if(entries.isNotEmpty())mutableProxyTests.update {it.copy(completed=completed.get(),values=it.values+entries)}
            }
        }
        mutableProxyTests.update {it.copy(running=true,completed=0,total=candidates.size)}
        testJob=viewModelScope.launch(Dispatchers.IO) {
            val updates=launch {while(true){delay(100);flush()}}
            try {
                fun runProbe(name: String) {
                        val config=profile.proxyConfig(name) ?: return
                        val id=UUID.randomUUID().toString();val key=delayKey(profile.id,name,groupName)
                        if(!Mobile.prepareProbe(id,settings.probeTimeout+1000L)) {
                            completed.incrementAndGet();pending[key]=ProxyDelay("busy")
                            return
                        }
                        testRuns.add(id)
                        try {
                            if(!mutableProxyTests.value.running) {Mobile.cancel(id);return}
                            pending[key]=ProxyDelay("running")
                            val reply=JSONObject(Mobile.probeDelay(config,target,id,settings.probeTimeout.toLong(),settings.unifiedDelay))
                            if(requestKey(data.value)==version && mutableProxyTests.value.running) {
                                val state=when(reply.optString("code")) {"proxy_delay_measured" -> "passed";"cancelled" -> "idle";"timeout_stage_unknown","proxy_channel_timeout","proxy_quic_handshake_timeout" -> "timeout";else -> "failed"}
                                completed.incrementAndGet();pending[key]=ProxyDelay(state,reply.optLong("elapsedMs"))
                            }
                        } finally {testRuns.remove(id);Mobile.discardProbe(id)}
                }
                // Core auto-group health checks already fan out internally. Run
                // graph-backed tests separately to avoid multiplying two pools.
                val graphNames=candidates.filter {name ->profile.groups.any {it.name==name}||profile.nodes.any {it.name==name&&it.requiresProfile}}
                val leafNames=candidates.filterNot {it in graphNames}
                for(name in graphNames) {
                    if(!mutableProxyTests.value.running||requestKey(data.value)!=version)break
                    runProbe(name)
                }
                List(settings.probeConcurrency.coerceIn(1,16)) { async {
                    while(mutableProxyTests.value.running&&requestKey(data.value)==version) {
                        val index=queue.getAndIncrement();if(index>=leafNames.size)break
                        runProbe(leafNames[index])
                    }
                } }.awaitAll()
            } finally {
                updates.cancel()
                synchronized(flushLock) {
                flush()
                mutableProxyTests.update {it.copy(running=false,values=it.values.filterValues {v -> v.state!="running"})}
                }
            }
        }
    }
    fun cancelProxyTests() {
        mutableProxyTests.update {it.copy(running=false)}
        testRuns.forEach { Mobile.cancel(it) }
        testJob?.cancel()
    }

    fun diagnose() {
        val node = data.value.selected ?: return message(tr(R.string.message_9b5876f077))
        if (!app.nativeReady) return message(tr(R.string.message_c1927f1a8f))
        if (mutableDiagnosis.value.running || mutableUi.value.busy || mutableProxyTests.value.running) return
        val runID = UUID.randomUUID().toString()
        if (!Mobile.prepareProbe(runID, 30_000)) return message(tr(R.string.message_84279947f8))
        val run = RunControl(30_000)
        control = run; nativeRun = runID
        mutableDiagnosis.value = DiagnosticUiState(running = true, nodeId = node.id)
        val target = data.value.probeUrl
        val runtimeConfig = requireNotNull(data.value.selectedRuntimeConfig)
        val parametersVersion = requestKey(data.value)
        viewModelScope.launch(Dispatchers.IO) {
            val started = System.nanoTime()
            var report: Models.Report? = null
            try {
                val parameters = JSONObject(node.config)
                val standardTls = node.type in listOf("anytls", "trojan") || parameters.optBoolean("tls")
                val udpTransport = node.type in listOf("hysteria2", "tuic")
                val beforeNetwork = AndroidCorePlatform(app).underlying()
                val auxiliary = if(node.type=="group") AndroidNetworkBinding.open(app).use { binding ->
                    run.check()
                    Models.Report(runID,java.time.Instant.now().toString(),binding.networkType(),listOf(
                        Models.Step(Models.Stage.NETWORK,if(binding.isCurrent()) Models.State.PASSED else Models.State.STALE,if(binding.isCurrent()) Models.Code.NETWORK_READY else Models.Code.NETWORK_CHANGED,0,"",0),
                        Models.Step(Models.Stage.ROUTE,Models.State.SKIPPED,Models.Code.GROUP_ROUTE,0,"",0)),0)
                } else DiagnosticEngine().run(Models.Request(parameters.getString("server"), parameters.getInt("port"), standardTls,
                    parameters.optString("sni").ifBlank { parameters.optString("servername") }, Models.Family.AUTO, udpTransport), { AndroidNetworkBinding.open(app) }, run) { steps ->
                    mutableDiagnosis.update { it.copy(steps = steps.filter { step -> step.stage != Models.Stage.PROXY }.map { step ->
                        if (udpTransport && step.code == Models.Code.DNS_ONLY) Models.Step(step.stage, step.state, Models.Code.UDP_PROTOCOL, step.elapsedMs, step.addressFamily, step.attempt) else step
                    }) }
                }
                val steps = auxiliary.steps.filter { it.stage != Models.Stage.PROXY }.map { step ->
                    if (udpTransport && step.code == Models.Code.DNS_ONLY) Models.Step(step.stage, step.state, Models.Code.UDP_PROTOCOL, step.elapsedMs, step.addressFamily, step.attempt) else step
                }.toMutableList()
                if (node.certificateVerificationSkipped) steps.add(0, Models.Step(Models.Stage.POLICY, Models.State.SKIPPED, Models.Code.NODE_CERTIFICATE_UNVERIFIED, 0, "", 0))
                if (parameters.has("dialer-chain")) steps.add(0, Models.Step(Models.Stage.ROUTE,Models.State.SKIPPED,Models.Code.PROXY_CHAIN_ACTIVE,0,"",0))
                val blocking = steps.firstOrNull { it.state in listOf(Models.State.CANCELLED, Models.State.STALE, Models.State.BLOCKED) }
                val proxy = if (blocking != null) Models.Step(Models.Stage.PROXY, Models.State.SKIPPED, Models.Code.DEPENDENCY_FAILED, 0, "", 0)
                else {
                    run.check()
                    val remaining = 30_000 - TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - started)
                    if (remaining < 100) Models.Step(Models.Stage.PROXY, Models.State.FAILED, Models.Code.DEADLINE, 0, "", 0)
                    else {
                        val result = JSONObject(Mobile.probe(runtimeConfig, target, runID, minOf(15_000, remaining)))
                        if (beforeNetwork != AndroidCorePlatform(app).underlying())
                            Models.Step(Models.Stage.PROXY, Models.State.STALE, Models.Code.NETWORK_CHANGED, result.optLong("elapsedMs"), "", 0)
                        else proxyStep(result)
                    }
                }
                steps.add(proxy)
                report = Models.Report(runID, auxiliary.timestamp, auxiliary.networkType, steps, TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - started))
            } catch (_: Exception) {
                val stop = runCatching { run.check() }.exceptionOrNull() as? ProbeFailure
                val steps = mutableDiagnosis.value.steps + Models.Step(Models.Stage.PROXY,
                    stop?.state ?: Models.State.FAILED, stop?.code ?: Models.Code.INTERNAL_ERROR, 0, "", 0)
                report = Models.Report(runID, java.time.Instant.now().toString(), tr(R.string.message_4d8c1c5b42), steps, TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - started))
            } finally {
                if (report != null && requestKey(data.value) != parametersVersion) {
                    val outdated = report
                    report = Models.Report(outdated.runId, outdated.timestamp, outdated.networkType, outdated.steps +
                        Models.Step(Models.Stage.PROXY, Models.State.STALE, Models.Code.CONFIG_CHANGED, 0, "", 0), outdated.elapsedMs)
                }
                run.close(); Mobile.discardProbe(runID); control = null; nativeRun = null
                mutableDiagnosis.value = DiagnosticUiState(steps = report?.steps.orEmpty(), report = report, nodeId = node.id)
            }
        }
    }

    private fun proxyStep(result: JSONObject): Models.Step {
        val code = when (result.optString("code")) {
            "proxy_request_verified" -> Models.Code.PROXY_OK
            "target_http_status" -> Models.Code.PROXY_HTTP_STATUS
            "timeout_stage_unknown" -> Models.Code.PROXY_TIMEOUT
            "proxy_certificate_failed" -> Models.Code.PROXY_CERTIFICATE
            "target_certificate_failed" -> Models.Code.TARGET_CERTIFICATE
            "proxy_quic_handshake_timeout" -> Models.Code.PROXY_QUIC_TIMEOUT
            "proxy_quic_tls_failed" -> Models.Code.PROXY_QUIC_TLS
            "proxy_dns_failed" -> Models.Code.PROXY_DNS
            "proxy_channel_timeout" -> Models.Code.PROXY_CHANNEL_TIMEOUT
            "proxy_channel_failed" -> Models.Code.PROXY_CHANNEL_FAILED
            "cancelled" -> Models.Code.CANCELLED
            "config_invalid", "target_invalid", "timeout_invalid" -> Models.Code.PROXY_CONFIG_INVALID
            "already_running", "resource_busy" -> Models.Code.CORE_BUSY
            "internal_error" -> Models.Code.INTERNAL_ERROR
            "local_network_restriction" -> Models.Code.LOCAL_RESTRICTION
            else -> Models.Code.PROXY_FAILED
        }
        val state = when {
            code == Models.Code.PROXY_OK -> Models.State.PASSED
            code == Models.Code.CANCELLED -> Models.State.CANCELLED
            code == Models.Code.CORE_BUSY || code == Models.Code.INTERNAL_ERROR || code == Models.Code.LOCAL_RESTRICTION -> Models.State.BLOCKED
            else -> Models.State.FAILED
        }
        return Models.Step(Models.Stage.PROXY, state, code, result.optLong("elapsedMs"), "", 0, result.optInt("httpStatus"))
    }

    fun cancelDiagnosis() {
        val current = control; val id = nativeRun
        viewModelScope.launch(Dispatchers.IO) { current?.cancel(); if (id != null) Mobile.cancel(id) }
    }
    override fun onCleared() {
        cancelProxyTests()
        control?.cancel(); nativeRun?.let { Mobile.cancel(it) }
        super.onCleared()
    }
}
