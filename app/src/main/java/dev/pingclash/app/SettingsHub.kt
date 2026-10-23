// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.provider.Settings
import android.view.WindowManager
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.clickable
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.DialogProperties
import androidx.compose.ui.window.SecureFlagPolicy
import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import org.json.JSONArray

@Composable internal fun SettingsHub(data: AppData,vpn: VpnUiState,locked: Boolean,model: AppViewModel,onProfiles:()->Unit,onProxies:()->Unit,onDashboard:()->Unit,onDiagnose:()->Unit) {
    var page by rememberSaveable {mutableStateOf("")}
    var draft by remember(data.client) {mutableStateOf(data.client)}
    var dns by remember(data.dnsAddress) {mutableStateOf(data.dnsAddress)}
    var target by remember(data.probeUrl) {mutableStateOf(data.probeUrl)}
    var showProviderRules by remember {mutableStateOf(false)}
    var reset by remember {mutableStateOf(false)}
    val context=LocalContext.current
    val sensitive=page=="rules"||page=="connections"&&data.client.inspectConnections
    DisposableEffect(sensitive) {
        val window=context.hostActivity()?.window
        val token=Any()
        if(sensitive&&window!=null)SecurePage.acquire(window,token)
        onDispose {if(sensitive&&window!=null)SecurePage.release(window,token)}
    }
    BackHandler(page.isNotEmpty()) {page=""}
    val titles=mapOf("live" to tr(R.string.message_caaf859d56),"connections" to tr(R.string.message_fc16aec85d),"dns" to "DNS","network" to tr(R.string.message_03fae6b449),"apps" to tr(R.string.message_d8618b5e19),"rules" to tr(R.string.message_beae79496b),"lan" to tr(R.string.message_4f8389a45d),"appearance" to tr(R.string.message_f3d6b6c03b),"usage" to tr(R.string.message_e7370f8097),"control" to tr(R.string.message_4f51d0285e),"privacy" to tr(R.string.message_58e6ce61a6),"about" to tr(R.string.message_495dc9e725))
    val dirty=draft!=data.client||dns!=data.dnsAddress||target!=data.probeUrl
    key(page) {
        Column(Modifier.fillMaxSize().imePadding().verticalScroll(rememberScrollState()).padding(horizontal=20.dp,vertical=12.dp).testTag("settings-page"),verticalArrangement=Arrangement.spacedBy(16.dp)) {
            Row(verticalAlignment=Alignment.CenterVertically) {
                if(page.isNotEmpty()) TextButton({page=""},Modifier.testTag("settings-back")){Text((tr(R.string.message_572cf45ba4)))}
                Text((titles[page]?:tr(R.string.message_df3d58c7d8)),style=MaterialTheme.typography.headlineMedium,fontWeight=FontWeight.Bold,modifier=Modifier.weight(1f))
            }
            if(locked&&page in listOf("dns","network","apps","rules","lan","usage")) Text((tr(R.string.message_0845a173b1)),color=Warning,style=MaterialTheme.typography.bodySmall)
            when(page) {
                "" -> {
                    SettingsCard {
                        StatLine(tr(R.string.message_03d39aa1b9),(if(vpn.phase=="established")tr(R.string.message_1f0eb99b7e) else tr(R.string.message_f006455e3b)))
                        StatLine(tr(R.string.message_3726bcb690),vpn.connections.toString())
                        StatLine(tr(R.string.message_f3d6b6c03b),(when(data.client.theme){"light"->tr(R.string.message_aa0819dfc4);"dark"->tr(R.string.message_a6b75d0680);else->tr(R.string.message_217cfe7db1)}))
                    }
                    SettingsCard {
                        SettingLink("live",tr(R.string.message_caaf859d56),tr(R.string.message_3a2c23fbc8)) {page="live"}
                        SettingLink("connections",tr(R.string.message_fc16aec85d),tr(R.string.message_36dd5f6649)) {page="connections"}
                        SettingLink("appearance",tr(R.string.message_f3d6b6c03b),tr(R.string.message_a9a0dc61a9)) {page="appearance"}
                    }
                    SettingsCard {
                        SettingLink("dns","DNS","TCP DNS / HTTPS DNS") {page="dns"}
                        SettingLink("network",tr(R.string.message_03fae6b449),tr(R.string.message_b187f37b87)) {page="network"}
                        SettingLink("apps",tr(R.string.message_d8618b5e19),tr(R.string.message_3223a06434)) {page="apps"}
                        SettingLink("rules",tr(R.string.message_beae79496b),tr(R.string.message_9724800c57)) {page="rules"}
                        SettingLink("lan",tr(R.string.message_4f8389a45d),tr(R.string.message_9c70f051e3)) {page="lan"}
                    }
                    SettingsCard {
                        SettingLink("profiles",tr(R.string.message_148d195e21),tr(R.string.message_08083cb518)) {onProfiles()}
                        SettingLink("groups",tr(R.string.message_47d56387f5),tr(R.string.message_8d039d6835)) {onProxies()}
                        SettingLink("control",tr(R.string.message_4f51d0285e),tr(R.string.message_868b06e262)) {page="control"}
                        SettingLink("usage",tr(R.string.message_e7370f8097),tr(R.string.message_5848c8f018)) {page="usage"}
                    }
                    SettingsCard {
                        SettingLink("diagnosis",tr(R.string.message_75793291b7),tr(R.string.message_dde1ab0b99)) {onDiagnose()}
                        SettingLink("privacy",tr(R.string.message_58e6ce61a6),tr(R.string.message_1b7a562155)) {page="privacy"}
                        SettingLink("about",tr(R.string.message_495dc9e725),tr(R.string.message_87f447012c)) {page="about"}
                    }
                }
                "live" -> RuntimeCards(data,vpn,all=true)
                "connections" -> ConnectionsPanel(vpn,model)
                "dns" -> SettingsCard {
                    Choices(tr(R.string.message_47a270081a),draft.dnsMode,listOf("tcp" to "DNS over TCP","https" to "DNS over HTTPS"),!locked) {draft=draft.copy(dnsMode=it)}
                    SettingField("VPN DNS",dns,!locked) {if(it.length<=80)dns=it}
                    if(draft.dnsMode=="https") SettingField(tr(R.string.message_56dcdaae6d),draft.dnsHttps,!locked) {if(it.length<=2048)draft=draft.copy(dnsHttps=it)}
                    Text((tr(R.string.message_ec049f51a4)),color=Muted,style=MaterialTheme.typography.bodySmall)
                    Text((tr(R.string.message_c3856a32e8)),color=Muted,style=MaterialTheme.typography.bodySmall)
                }
                "network" -> {
                    SettingsCard {
                        SettingSwitch(tr(R.string.auto_reconnect),draft.autoReconnect,!locked) {draft=draft.copy(autoReconnect=it)}
                        Text(tr(R.string.auto_reconnect_detail),color=Muted,style=MaterialTheme.typography.bodySmall)
                        SettingSwitch(tr(R.string.message_2ff888afea),draft.ipv6,!locked) {draft=draft.copy(ipv6=it)}
                        Text((tr(R.string.message_4f4b8ea262)),color=Muted,style=MaterialTheme.typography.bodySmall)
                        SettingSwitch(tr(R.string.message_bec328ac8e),draft.udp,!locked) {draft=draft.copy(udp=it)}
                        NumberSetting("MTU",draft.mtu,1280..9000,!locked) {draft=draft.copy(mtu=it)}
                        NumberSetting(tr(R.string.message_84b0b71bc5),draft.connectTimeout,3..60,!locked) {draft=draft.copy(connectTimeout=it)}
                        NumberSetting(tr(R.string.message_6052d6f653),draft.udpTimeout,10..300,!locked) {draft=draft.copy(udpTimeout=it)}
                        NumberSetting(tr(R.string.message_c2e266e57d),draft.maxConnections,16..512,!locked) {draft=draft.copy(maxConnections=it)}
                    }
                    SettingsCard {
                        SettingField(tr(R.string.message_6943224f0d),target,!locked) {if(it.length<=2048)target=it}
                        SettingField(tr(R.string.message_09ed073054),draft.delayUrl,!locked) {if(it.length<=2048)draft=draft.copy(delayUrl=it)}
                        NumberSetting(tr(R.string.message_d4d74926c2),draft.probeTimeout,1000..20000,!locked) {draft=draft.copy(probeTimeout=it)}
                        NumberSetting(tr(R.string.message_8f7e175c9a),draft.probeConcurrency,1..16,!locked) {draft=draft.copy(probeConcurrency=it)}
                        SettingSwitch(tr(R.string.message_57ef467828),draft.unifiedDelay,!locked) {draft=draft.copy(unifiedDelay=it)}
                        Text(tr(R.string.message_b70091e752),color=Muted,style=MaterialTheme.typography.bodySmall)
                        Text((tr(R.string.message_80a58f0749)),color=Muted,style=MaterialTheme.typography.bodySmall)
                    }
                }
                "lan" -> SettingsCard {
                    Choices(tr(R.string.message_4f8389a45d),draft.lan,listOf("proxy" to tr(R.string.message_244df9f228),"direct" to tr(R.string.message_72a607c93d),"block" to tr(R.string.message_58c11726a2)),!locked) {draft=draft.copy(lan=it)}
                    Text((tr(R.string.message_e9a1f1fe25)),color=Muted,style=MaterialTheme.typography.bodySmall)
                }
                "rules" -> {
                    SettingsCard {
                        Choices(tr(R.string.message_daae3125b8),draft.mode,listOf("global" to tr(R.string.message_f1880deaae),"rule" to tr(R.string.message_1123245d1b),"direct" to tr(R.string.message_b06325c566)),!locked) {draft=draft.copy(mode=it)}
                        Text((tr(R.string.message_2843c2d9dd)),color=Warning,style=MaterialTheme.typography.bodySmall)
                        SettingSwitch(tr(R.string.message_8f93778b08),draft.useProviderRules,!locked) {draft=draft.copy(useProviderRules=it)}
                        StatLine(tr(R.string.message_148d195e21),data.activeProfile?.name?:"—")
                        Text("${data.activeProfile?.rules?.size?:0} ${(tr(R.string.message_d60617d759))} · ${data.activeProfile?.rulesOmitted?:0} ${(tr(R.string.message_01e0c3f814))}",color=Muted)
                        TextButton({showProviderRules=true},enabled=!data.activeProfile?.rules.isNullOrEmpty()) {Text((tr(R.string.message_a89096ffdb)))}
                    }
                    SettingsCard {
                        Text((tr(R.string.message_b34cdfde80)),style=MaterialTheme.typography.titleMedium)
                        OutlinedTextField(draft.customRules,{if(it.toByteArray().size<=64*1024)draft=draft.copy(customRules=it)},Modifier.fillMaxWidth().heightIn(min=200.dp,max=400.dp).testTag("custom-rules"),enabled=!locked,label={Text((tr(R.string.message_51c22886b5)))},shape=RoundedCornerShape(16.dp))
                        Text("DOMAIN-SUFFIX,example.com,PROXY\nIP-CIDR,192.168.0.0/16,DIRECT,no-resolve\nDST-PORT,443,PROXY\nNETWORK,udp,REJECT\nMATCH,PROXY",style=MaterialTheme.typography.bodySmall,color=Muted)
                        Text((tr(R.string.message_5103a81309)),color=Muted,style=MaterialTheme.typography.bodySmall)
                    }
                }
                "apps" -> AppRoutingPanel(draft,!locked) {draft=it}
                "appearance" -> {
                    SettingsCard {
                        Choices(tr(R.string.message_9f6fee1aba),data.client.language,listOf("system" to tr(R.string.message_217cfe7db1),"zh" to tr(R.string.message_9937e365aa),"en" to tr(R.string.message_d1648bacbc)),true) {model.appearance(it,data.client.theme)}
                        Choices(tr(R.string.message_788db1cfec),data.client.theme,listOf("system" to tr(R.string.message_217cfe7db1),"light" to tr(R.string.message_aa0819dfc4),"dark" to tr(R.string.message_a6b75d0680)),true) {model.appearance(data.client.language,it)}
                    }
                    SettingsCard {
                        Text((tr(R.string.message_02ae2080b8)),style=MaterialTheme.typography.titleMedium)
                        SettingSwitch(tr(R.string.message_a706781246),draft.showSpeed,!locked) {draft=draft.copy(showSpeed=it)}
                        SettingSwitch(tr(R.string.message_89d9fceeb2),draft.showTraffic,!locked) {draft=draft.copy(showTraffic=it)}
                        SettingSwitch(tr(R.string.message_a3c3934d25),draft.showService,!locked) {draft=draft.copy(showService=it)}
                        SettingSwitch(tr(R.string.message_b01eb09ae9),draft.showMemory,!locked) {draft=draft.copy(showMemory=it)}
                        SettingSwitch(tr(R.string.message_1a8e6963af),draft.notificationSpeed,!locked) {draft=draft.copy(notificationSpeed=it)}
                    }
                }
                "usage" -> SettingsCard {
                    Text((tr(R.string.message_4dd958cc24)),style=MaterialTheme.typography.titleMedium)
                    SettingSwitch(tr(R.string.message_3356dda6d6),draft.keepUsage,!locked) {draft=draft.copy(keepUsage=it)}
                    Text((tr(R.string.message_2d69df5d6b)),color=Muted,style=MaterialTheme.typography.bodySmall)
                    StatLine(tr(R.string.message_4211d1e5e4),formatBytes(data.usage.uploaded));StatLine(tr(R.string.message_996c971317),formatBytes(data.usage.downloaded))
                    StatLine(tr(R.string.message_60b4864be8),durationText(data.usage.seconds));StatLine(tr(R.string.message_051009442f),data.usage.sessions.toString())
                    OutlinedButton(model::resetUsage,enabled=!locked) {Text((tr(R.string.message_1f48dd6240)))}
                }
                "control" -> {
                    SettingsCard {
                        StatLine(tr(R.string.message_03d39aa1b9),(if(vpn.phase=="established")tr(R.string.message_1f0eb99b7e) else tr(R.string.message_f006455e3b)))
                        Button({if(vpn.active)VpnRuntime.disconnect(context) else onDashboard()},Modifier.fillMaxWidth()) {Text((if(vpn.active)tr(R.string.message_a33f380476) else tr(R.string.message_a01b7b224b)))}
                        OutlinedButton(model::restartVpn,enabled=vpn.phase=="established",modifier=Modifier.fillMaxWidth()) {Text((tr(R.string.message_ce42fad515)))}
                        OutlinedButton({model.closeConnection(0)},enabled=vpn.phase=="established",modifier=Modifier.fillMaxWidth()) {Text((tr(R.string.message_39bfc9edc3)))}
                        OutlinedButton({model.cancelDiagnosis();model.cancelProxyTests()},Modifier.fillMaxWidth()) {Text((tr(R.string.message_c04d2e604f)))}
                    }
                    SettingsCard {
                        TextButton({runCatching {context.startActivity(Intent(Settings.ACTION_VPN_SETTINGS))}}) {Text((tr(R.string.message_23e3eef5b0)))}
                        TextButton({runCatching {context.startActivity(Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE,context.packageName))}}) {Text(tr(R.string.notification_settings))}
                        TextButton({runCatching {context.startActivity(Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS))}}) {Text((tr(R.string.message_11a3eb2648)))}
                        Text(tr(R.string.background_detail),color=Muted,style=MaterialTheme.typography.bodySmall)
                        Text((tr(R.string.message_d9b31e5cac)),color=Muted,style=MaterialTheme.typography.bodySmall)
                        TextButton({reset=true},enabled=!locked) {Text((tr(R.string.message_3b1473939a)))}
                    }
                }
                "privacy" -> {
                    SettingsCard {
                        Text((tr(R.string.message_3731779ddd)),style=MaterialTheme.typography.titleMedium)
                        Text((tr(R.string.message_8967970252)))
                        SettingSwitch(tr(R.string.message_1de996dcd1),draft.inspectConnections,!locked) {draft=draft.copy(inspectConnections=it)}
                        Text((tr(R.string.message_4fadf7a9a5)),color=Muted,style=MaterialTheme.typography.bodySmall)
                        Text((tr(R.string.message_854d45ab64)),color=Muted,style=MaterialTheme.typography.bodySmall)
                    }
                }
                "about" -> AboutPanel(model.nativeReady)
            }
            if(page in listOf("dns","network","lan","rules","apps","appearance","usage","privacy")) {
                Button({model.clientSettings(draft,dns.trim(),target.trim())},enabled=dirty&&!locked,modifier=Modifier.fillMaxWidth().heightIn(min=48.dp).testTag("settings-save")) {Text((if(dirty)tr(R.string.message_c8550237ba) else tr(R.string.message_1bd91a7d0c)))}
            }
            Spacer(Modifier.height(8.dp))
        }
    }
    if(showProviderRules) AlertDialog(onDismissRequest={showProviderRules=false},properties=DialogProperties(securePolicy=SecureFlagPolicy.SecureOn),title={Text((tr(R.string.message_a89096ffdb)))},text={Text(data.activeProfile?.rules?.joinToString("\n").orEmpty(),Modifier.heightIn(max=400.dp).verticalScroll(rememberScrollState()),style=MaterialTheme.typography.bodySmall)},confirmButton={TextButton({showProviderRules=false}){Text((tr(R.string.message_3fd47edce4)))}})
    if(reset) AlertDialog(onDismissRequest={reset=false},title={Text((tr(R.string.message_3b1473939a)))},text={Text((tr(R.string.message_c323a1f237)))},confirmButton={TextButton({model.clientSettings(ClientSettings(),"1.1.1.1","https://www.gstatic.com/generate_204");reset=false}){Text((tr(R.string.message_3b1473939a)))}},dismissButton={TextButton({reset=false}){Text((tr(R.string.message_2cd0f3be87)))}})
}

private fun Context.hostActivity(): Activity? {
    var current: Context=this
    repeat(16) {if(current is Activity)return current as Activity;current=(current as? ContextWrapper)?.baseContext?:return null}
    return null
}

@Composable private fun SettingLink(id: String,title: String,description: String,onClick:()->Unit) {
    Row(Modifier.fillMaxWidth().testTag("settings-$id").clickable(onClick=onClick).padding(vertical=7.dp),verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.spacedBy(12.dp)) {
        Box(Modifier.size(34.dp).background(MaterialTheme.colorScheme.surfaceVariant,RoundedCornerShape(10.dp)),contentAlignment=Alignment.Center) {
            AppGlyph(when(id) {"live","diagnosis"->2;"usage"->19;"connections"->20;"network"->22;"dns"->21;"lan"->23;"apps"->27;"profiles"->7;"rules"->17;"about"->24;"privacy"->6;"control"->0;"appearance"->18;"groups"->14;else->12},Modifier.size(19.dp),Muted)
        }
        Column(Modifier.weight(1f),verticalArrangement=Arrangement.spacedBy(3.dp)) {Text((title),style=MaterialTheme.typography.titleMedium);Text((description),color=Muted,style=MaterialTheme.typography.bodySmall)}
        AppGlyph(5,tint=Muted)
    }
}
@Composable private fun SettingSwitch(title: String,value: Boolean,enabled: Boolean,onChange:(Boolean)->Unit) {
    Row(Modifier.fillMaxWidth(),verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.spacedBy(12.dp)) {Text((title),Modifier.weight(1f));Switch(value,onChange,enabled=enabled,modifier=Modifier.testTag("switch-$title"))}
}
@Composable private fun Choices(title: String,value: String,choices: List<Pair<String,String>>,enabled: Boolean,onChange:(String)->Unit) {
    Text((title),color=Muted,style=MaterialTheme.typography.labelLarge)
    choices.forEach {(id,name) -> Row(Modifier.fillMaxWidth().clickable(enabled=enabled){onChange(id)}.testTag("choice-$title-$id"),verticalAlignment=Alignment.CenterVertically) {RadioButton(value==id,{onChange(id)},enabled=enabled);Text((name),Modifier.weight(1f))}}
}
@Composable private fun SettingField(title: String,value: String,enabled: Boolean,onChange:(String)->Unit) {
    OutlinedTextField(value,onChange,Modifier.fillMaxWidth().testTag("field-$title"),enabled=enabled,singleLine=true,label={Text((title))},shape=RoundedCornerShape(16.dp))
}
@Composable private fun NumberSetting(title: String,value: Int,range: IntRange,enabled: Boolean,onChange:(Int)->Unit) {
    var raw by remember {mutableStateOf(value.toString())}
    val valid=raw.toIntOrNull() in range
    OutlinedTextField(raw,{if(it.length<=6&&it.all(Char::isDigit)){raw=it;onChange(it.toIntOrNull()?:0)}},Modifier.fillMaxWidth().testTag("number-$title"),enabled=enabled,singleLine=true,label={Text((title))},isError=!valid,supportingText={Text("${range.first}–${range.last}")},keyboardOptions=androidx.compose.foundation.text.KeyboardOptions(keyboardType=androidx.compose.ui.text.input.KeyboardType.Number),shape=RoundedCornerShape(16.dp))
}
private data class VisibleApp(val name: String,val packageName: String)
@Composable private fun AppRoutingPanel(draft: ClientSettings,enabled: Boolean,onChange:(ClientSettings)->Unit) {
    val context=LocalContext.current
    var available by remember {mutableStateOf(emptyList<VisibleApp>())}
    var query by remember {mutableStateOf("")}
    var manual by remember {mutableStateOf("")}
    LaunchedEffect(Unit) {available=withContext(Dispatchers.IO) {
        context.packageManager.queryIntentActivities(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER),0).mapNotNull {info ->
            info.activityInfo?.packageName?.takeIf {it!=context.packageName}?.let {VisibleApp(info.loadLabel(context.packageManager).toString().take(100),it)}
        }.distinctBy {it.packageName}.sortedBy {it.name}.take(500)
    }}
    fun toggle(pkg: String) {onChange(draft.copy(packages=if(pkg in draft.packages)draft.packages-pkg else (draft.packages+pkg).take(300)))}
    SettingsCard {
        Choices(tr(R.string.message_47a270081a),draft.appMode,listOf("all" to tr(R.string.message_b4de26e01a),"exclude" to tr(R.string.message_b74c5a407d),"include" to tr(R.string.message_cddb6c9475)),enabled) {onChange(draft.copy(appMode=it))}
        Text((tr(R.string.message_d324a67582)),color=Muted,style=MaterialTheme.typography.bodySmall)
        SettingField(tr(R.string.message_06351ff759),query,true) {query=it.take(100)}
        val selected=draft.packages.toSet()
        val listed=available.filter {it.name.contains(query,true)||it.packageName.contains(query,true)}
        LazyColumn(Modifier.fillMaxWidth().heightIn(min=120.dp,max=360.dp).testTag("app-list")) {items(listed,key={it.packageName}) {app -> Row(Modifier.fillMaxWidth().clickable(enabled=enabled&&draft.appMode!="all"){toggle(app.packageName)},verticalAlignment=Alignment.CenterVertically) {
            Checkbox(app.packageName in selected,{toggle(app.packageName)},enabled=enabled&&draft.appMode!="all")
            Column(Modifier.weight(1f)) {Text(app.name,maxLines=1,overflow=TextOverflow.Ellipsis);Text(app.packageName,color=Muted,style=MaterialTheme.typography.bodySmall)}
        }}}
        SettingField(tr(R.string.message_ad6016ea6b),manual,enabled) {manual=it.take(255)}
        TextButton({if(manual !in selected)onChange(draft.copy(packages=(draft.packages+manual.trim()).take(300)));manual=""},enabled=enabled&&manual.isNotBlank()) {Text((tr(R.string.message_c363ad1f5f)))}
        draft.packages.forEach {pkg -> Row(verticalAlignment=Alignment.CenterVertically) {Text(pkg,Modifier.weight(1f),style=MaterialTheme.typography.bodySmall);TextButton({onChange(draft.copy(packages=draft.packages-pkg))},enabled=enabled){Text((tr(R.string.message_6135d4159e)))}}}
    }
}
@Composable private fun ConnectionsPanel(vpn: VpnUiState,model: AppViewModel) {
    var rows by remember {mutableStateOf(emptyList<ConnectionRow>())}
    LaunchedEffect(vpn.phase) {while(true) {rows=withContext(Dispatchers.IO) {runCatching {
        val raw=JSONArray(Mobile.vpnConnections());(0 until raw.length().coerceAtMost(512)).map {val r=raw.getJSONObject(it);ConnectionRow(r.getLong("id"),r.getString("network"),r.getString("route"),r.getString("destination"),r.getLong("seconds"),r.getLong("uploaded"),r.getLong("downloaded"))}.sortedByDescending {it.id}
    }.getOrDefault(emptyList())};delay(1000)}}
    SettingsCard {StatLine(tr(R.string.message_3726bcb690),rows.size.toString());OutlinedButton({model.closeConnection(0)},enabled=rows.isNotEmpty()) {Text((tr(R.string.message_39bfc9edc3)))}}
    if(rows.isEmpty()) Text((tr(R.string.message_3696c244fd)),color=Muted)
    // Bound composition independently from the service connection budget.
    LazyColumn(Modifier.fillMaxWidth().heightIn(min=100.dp,max=520.dp),verticalArrangement=Arrangement.spacedBy(10.dp)) {items(rows,key={it.id}) {r -> SettingsCard {
        Text("#${r.id} · ${r.network.uppercase()} · ${r.route}",style=MaterialTheme.typography.titleSmall)
        Text(r.destination.ifEmpty {(tr(R.string.message_cbd4ad8d7c))},color=Muted,style=MaterialTheme.typography.bodySmall)
        Text("↑ ${formatBytes(r.up)}  ↓ ${formatBytes(r.down)} · ${durationText(r.seconds)}",style=MaterialTheme.typography.bodySmall)
        TextButton({model.closeConnection(r.id)}) {Text((tr(R.string.message_df4e60a8c8)))}
    }}}
}
private data class ConnectionRow(val id: Long,val network: String,val route: String,val destination: String,val seconds: Long,val up: Long,val down: Long)
@Composable private fun AboutPanel(ready: Boolean) {
    val context=LocalContext.current
    var license by remember {mutableStateOf<String?>(null)}
    SettingsCard {
        Text("PingClash",style=MaterialTheme.typography.titleLarge)
        Text("0.1.0-beta.1 · GPL-3.0",color=Muted)
        StatLine(tr(R.string.message_3b50348ec3),if(ready)"mihomo v1.19.32" else "—")
        Text((tr(R.string.message_0fce3b3509)),color=Muted,style=MaterialTheme.typography.bodySmall)
        listOf("NOTICE.md","GPL-3.0.txt","Apache-2.0.txt").forEach {file -> TextButton({license=file}) {Text(file)}}
    }
    license?.let {file -> val text=remember(file) {runCatching {context.assets.open("licenses/$file").bufferedReader().use {it.readText()}}.getOrDefault(file)}
        AlertDialog(onDismissRequest={license=null},title={Text(file)},text={Text(text,Modifier.heightIn(max=400.dp).verticalScroll(rememberScrollState()),style=MaterialTheme.typography.bodySmall)},confirmButton={TextButton({license=null}){Text((tr(R.string.message_3fd47edce4)))}})
    }
}
