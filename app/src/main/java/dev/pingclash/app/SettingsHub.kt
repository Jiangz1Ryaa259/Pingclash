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
    val titles=mapOf("live" to "实时状态","connections" to "连接管理","dns" to "DNS","network" to "网络与连接","apps" to "应用分流","rules" to "出站规则","lan" to "内网","appearance" to "语言与外观","usage" to "使用情况","control" to "控制","privacy" to "隐私与安全","about" to "关于与许可")
    val dirty=draft!=data.client||dns!=data.dnsAddress||target!=data.probeUrl
    key(page) {
        Column(Modifier.fillMaxSize().imePadding().verticalScroll(rememberScrollState()).padding(horizontal=20.dp,vertical=12.dp).testTag("settings-page"),verticalArrangement=Arrangement.spacedBy(16.dp)) {
            Row(verticalAlignment=Alignment.CenterVertically) {
                if(page.isNotEmpty()) TextButton({page=""},Modifier.testTag("settings-back")){Text(localize("返回"))}
                Text(localize(titles[page]?:"设置"),style=MaterialTheme.typography.headlineMedium,fontWeight=FontWeight.Bold,modifier=Modifier.weight(1f))
            }
            if(locked&&page in listOf("dns","network","apps","rules","lan","usage")) Text(localize("先断开 VPN，再修改转发设置。"),color=Warning,style=MaterialTheme.typography.bodySmall)
            when(page) {
                "" -> {
                    SettingsCard {
                        StatLine("VPN 服务",localize(if(vpn.phase=="established")"运行中" else "已停止"))
                        StatLine("活动连接",vpn.connections.toString())
                        StatLine("语言与外观",localize(when(data.client.theme){"light"->"浅色";"dark"->"深色";else->"跟随系统"}))
                    }
                    SettingsCard {
                        SettingLink("live","实时状态","实时速度 · 流量 · 内存 · 服务") {page="live"}
                        SettingLink("connections","连接管理","活动连接与关闭控制") {page="connections"}
                        SettingLink("appearance","语言与外观","语言、主题与仪表盘卡片") {page="appearance"}
                    }
                    SettingsCard {
                        SettingLink("dns","DNS","TCP DNS / HTTPS DNS") {page="dns"}
                        SettingLink("network","网络与连接","IPv6、UDP、MTU、超时与测速") {page="network"}
                        SettingLink("apps","应用分流","按应用选择代理范围") {page="apps"}
                        SettingLink("rules","出站规则","模式、订阅规则与自定义规则") {page="rules"}
                        SettingLink("lan","内网","代理、直连或阻断内网") {page="lan"}
                    }
                    SettingsCard {
                        SettingLink("profiles","配置","添加、刷新、重命名与导出") {onProfiles()}
                        SettingLink("groups","策略组","保留原分组与嵌套成员") {onProxies()}
                        SettingLink("control","控制","VPN 服务与任务控制") {page="control"}
                        SettingLink("usage","使用情况","仅本机累计用量，默认关闭") {page="usage"}
                    }
                    SettingsCard {
                        SettingLink("diagnosis","连接诊断","分层探测与脱敏报告") {onDiagnose()}
                        SettingLink("privacy","隐私与安全","本机加密与数据保留") {page="privacy"}
                        SettingLink("about","关于与许可","版本、内核与开源声明") {page="about"}
                    }
                }
                "live" -> RuntimeCards(data,vpn,all=true)
                "connections" -> ConnectionsPanel(vpn,model)
                "dns" -> SettingsCard {
                    Choices("模式",draft.dnsMode,listOf("tcp" to "DNS over TCP","https" to "DNS over HTTPS"),!locked) {draft=draft.copy(dnsMode=it)}
                    SettingField("VPN DNS",dns,!locked) {if(it.length<=80)dns=it}
                    if(draft.dnsMode=="https") SettingField("加密 DNS 地址",draft.dnsHttps,!locked) {if(it.length<=2048)draft=draft.copy(dnsHttps=it)}
                    Text(localize("DNS 始终经过主代理，不因直连规则改用系统解析器。加密 DNS 校验 HTTPS 证书，不跟随重定向。节点入口和必要的引导解析可能使用系统网络。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                    Text(localize("应用的 UDP / TCP 53 请求统一交由此解析器处理。规则域名匹配使用本次 DNS 关联；应用自带 DoH 或共享 IP 无法可靠还原域名，可使用 IP / 端口规则。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                }
                "network" -> {
                    SettingsCard {
                        SettingSwitch("启用 IPv6",draft.ipv6,!locked) {draft=draft.copy(ipv6=it)}
                        Text(localize("关闭 IPv6 时继续接管 IPv6 路由并阻断转发，避免绕过 VPN。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                        SettingSwitch("启用 UDP",draft.udp,!locked) {draft=draft.copy(udp=it)}
                        NumberSetting("MTU",draft.mtu,1280..9000,!locked) {draft=draft.copy(mtu=it)}
                        NumberSetting("连接超时（秒）",draft.connectTimeout,3..60,!locked) {draft=draft.copy(connectTimeout=it)}
                        NumberSetting("UDP 空闲超时（秒）",draft.udpTimeout,10..300,!locked) {draft=draft.copy(udpTimeout=it)}
                        NumberSetting("最大活动连接",draft.maxConnections,16..512,!locked) {draft=draft.copy(maxConnections=it)}
                    }
                    SettingsCard {
                        SettingField("诊断测试目标",target,!locked) {if(it.length<=2048)target=it}
                        SettingField("测速目标（留空跟随策略组）",draft.delayUrl,!locked) {if(it.length<=2048)draft=draft.copy(delayUrl=it)}
                        NumberSetting("测速超时（毫秒）",draft.probeTimeout,1000..20000,!locked) {draft=draft.copy(probeTimeout=it)}
                        NumberSetting("测速并发",draft.probeConcurrency,1..16,!locked) {draft=draft.copy(probeConcurrency=it)}
                        SettingSwitch("统一延迟",draft.unifiedDelay,!locked) {draft=draft.copy(unifiedDelay=it)}
                        Text("开启后以连接复用的第二次 HEAD 请求计时；关闭则测首次请求。比较客户端时请使用相同目标与计时方式。",color=Muted,style=MaterialTheme.typography.bodySmall)
                        Text(localize("仅主动测速或诊断时访问测试目标。自动策略组仍按原组测试配置执行。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                    }
                }
                "lan" -> SettingsCard {
                    Choices("内网",draft.lan,listOf("proxy" to "代理内网","direct" to "内网直连","block" to "阻断内网"),!locked) {draft=draft.copy(lan=it)}
                    Text(localize("覆盖私有 IP、回环和链路本地单播地址。内网选项优先于出站规则；默认经过主代理。直连仍经受保护的底层网络，不开放 LAN 监听端口。组播和未指定地址始终阻断。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                }
                "rules" -> {
                    SettingsCard {
                        Choices("出站模式",draft.mode,listOf("global" to "全局代理","rule" to "规则","direct" to "直连"),!locked) {draft=draft.copy(mode=it)}
                        Text(localize("直连模式会绕过代理服务器。全局代理忽略出站规则；规则模式按自定义规则、订阅原规则、主代理的顺序匹配。"),color=Warning,style=MaterialTheme.typography.bodySmall)
                        SettingSwitch("合并订阅原规则",draft.useProviderRules,!locked) {draft=draft.copy(useProviderRules=it)}
                        StatLine("配置",data.activeProfile?.name?:"—")
                        Text("${data.activeProfile?.rules?.size?:0} ${localize("条原规则")} · ${data.activeProfile?.rulesOmitted?:0} ${localize("条超限或无效")}",color=Muted)
                        TextButton({showProviderRules=true},enabled=!data.activeProfile?.rules.isNullOrEmpty()) {Text(localize("查看原规则"))}
                    }
                    SettingsCard {
                        Text(localize("自定义规则优先于订阅规则"),style=MaterialTheme.typography.titleMedium)
                        OutlinedTextField(draft.customRules,{if(it.toByteArray().size<=64*1024)draft=draft.copy(customRules=it)},Modifier.fillMaxWidth().heightIn(min=200.dp,max=400.dp).testTag("custom-rules"),enabled=!locked,label={Text(localize("自定义规则"))},shape=RoundedCornerShape(16.dp))
                        Text("DOMAIN-SUFFIX,example.com,PROXY\nIP-CIDR,192.168.0.0/16,DIRECT,no-resolve\nDST-PORT,443,PROXY\nNETWORK,udp,REJECT\nMATCH,PROXY",style=MaterialTheme.typography.bodySmall,color=Muted)
                        Text(localize("支持 DOMAIN、DOMAIN-SUFFIX、DOMAIN-KEYWORD、IP-CIDR、IP-CIDR6、DST-PORT、NETWORK、MATCH。出站可填 PROXY、DIRECT、REJECT 或原配置的节点 / 策略组名称。最多 2000 条、16 个额外出站；不兼容的规则会阻止启用，绝不静默忽略。GEOSITE、GEOIP、RULE-SET 和逻辑规则尚未执行。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                    }
                }
                "apps" -> AppRoutingPanel(draft,!locked) {draft=it}
                "appearance" -> {
                    SettingsCard {
                        Choices("语言",data.client.language,listOf("system" to "跟随系统","zh" to "简体中文","en" to "英语"),true) {model.appearance(it,data.client.theme)}
                        Choices("主题",data.client.theme,listOf("system" to "跟随系统","light" to "浅色","dark" to "深色"),true) {model.appearance(data.client.language,it)}
                    }
                    SettingsCard {
                        Text(localize("仪表盘卡片"),style=MaterialTheme.typography.titleMedium)
                        SettingSwitch("显示速度图",draft.showSpeed,!locked) {draft=draft.copy(showSpeed=it)}
                        SettingSwitch("显示本次流量",draft.showTraffic,!locked) {draft=draft.copy(showTraffic=it)}
                        SettingSwitch("显示服务状态",draft.showService,!locked) {draft=draft.copy(showService=it)}
                        SettingSwitch("显示内存",draft.showMemory,!locked) {draft=draft.copy(showMemory=it)}
                        SettingSwitch("通知栏显示速度",draft.notificationSpeed,!locked) {draft=draft.copy(notificationSpeed=it)}
                    }
                }
                "usage" -> SettingsCard {
                    Text(localize("本机累计用量"),style=MaterialTheme.typography.titleMedium)
                    SettingSwitch("在本机保存累计用量",draft.keepUsage,!locked) {draft=draft.copy(keepUsage=it)}
                    Text(localize("默认关闭。开启后仅在断开时加密保存累计字节、时长和会话数；不保存域名、IP、应用历史。强制结束或系统杀进程可能丢失本次计数。关闭后清除历史累计值。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                    StatLine("累计上传",formatBytes(data.usage.uploaded));StatLine("累计下载",formatBytes(data.usage.downloaded))
                    StatLine("累计时长",durationText(data.usage.seconds));StatLine("累计会话",data.usage.sessions.toString())
                    OutlinedButton(model::resetUsage,enabled=!locked) {Text(localize("清除累计用量"))}
                }
                "control" -> {
                    SettingsCard {
                        StatLine("VPN 服务",localize(if(vpn.phase=="established")"运行中" else "已停止"))
                        Button({if(vpn.active)VpnRuntime.disconnect(context) else onDashboard()},Modifier.fillMaxWidth()) {Text(localize(if(vpn.active)"断开连接" else "前往连接"))}
                        OutlinedButton(model::restartVpn,enabled=vpn.phase=="established",modifier=Modifier.fillMaxWidth()) {Text(localize("重启连接"))}
                        OutlinedButton({model.closeConnection(0)},enabled=vpn.phase=="established",modifier=Modifier.fillMaxWidth()) {Text(localize("关闭全部连接"))}
                        OutlinedButton({model.cancelDiagnosis();model.cancelProxyTests()},Modifier.fillMaxWidth()) {Text(localize("取消诊断与测速"))}
                    }
                    SettingsCard {
                        TextButton({runCatching {context.startActivity(Intent(Settings.ACTION_VPN_SETTINGS))}}) {Text(localize("系统 VPN 设置"))}
                        TextButton({runCatching {context.startActivity(Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS))}}) {Text(localize("系统电池设置"))}
                        Text(localize("常开 VPN 和阻止未经过 VPN 的连接由 Android 系统管理。应用不自行授予权限，不开放远程控制 API；仅在系统常开 VPN 已获授权时接受系统启动。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                        TextButton({reset=true},enabled=!locked) {Text(localize("恢复默认设置"))}
                    }
                }
                "privacy" -> {
                    SettingsCard {
                        Text(localize("隐私默认"),style=MaterialTheme.typography.titleMedium)
                        Text(localize("没有遥测、广告、设备标识或远程崩溃上报。配置与偏好通过 Android Keystore 加密保存，禁用云备份和迁移。服务状态、实时曲线和活动连接仅存于内存。"))
                        SettingSwitch("显示连接目标（仅本次会话内存）",draft.inspectConnections,!locked) {draft=draft.copy(inspectConnections=it)}
                        Text(localize("默认不记录连接目标。开启后仅保留活动连接的 IP / 域名；连接结束或服务停止即删除，不写报告或日志。目标、规则编辑与明文配置页面禁止截屏；普通页面允许截屏。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                        Text(localize("订阅更新、测速、解析 DNS 和代理连接会联系对应服务。订阅和网站 TLS 始终校验；节点证书策略沿用原订阅，首次提示后不常驻。"),color=Muted,style=MaterialTheme.typography.bodySmall)
                    }
                }
                "about" -> AboutPanel(model.nativeReady)
            }
            if(page in listOf("dns","network","lan","rules","apps","appearance","usage","privacy")) {
                Button({model.clientSettings(draft,dns.trim(),target.trim())},enabled=dirty&&!locked,modifier=Modifier.fillMaxWidth().heightIn(min=48.dp).testTag("settings-save")) {Text(localize(if(dirty)"保存设置" else "已保存"))}
            }
            Spacer(Modifier.height(8.dp))
        }
    }
    if(showProviderRules) AlertDialog(onDismissRequest={showProviderRules=false},properties=DialogProperties(securePolicy=SecureFlagPolicy.SecureOn),title={Text(localize("查看原规则"))},text={Text(data.activeProfile?.rules?.joinToString("\n").orEmpty(),Modifier.heightIn(max=400.dp).verticalScroll(rememberScrollState()),style=MaterialTheme.typography.bodySmall)},confirmButton={TextButton({showProviderRules=false}){Text(localize("关闭"))}})
    if(reset) AlertDialog(onDismissRequest={reset=false},title={Text(localize("恢复默认设置"))},text={Text(localize("将重置网络与显示偏好、应用分流、自定义规则及本机累计用量；保留已导入配置。"))},confirmButton={TextButton({model.clientSettings(ClientSettings(),"1.1.1.1","https://www.gstatic.com/generate_204");reset=false}){Text(localize("恢复默认设置"))}},dismissButton={TextButton({reset=false}){Text(localize("取消"))}})
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
        Column(Modifier.weight(1f),verticalArrangement=Arrangement.spacedBy(3.dp)) {Text(localize(title),style=MaterialTheme.typography.titleMedium);Text(localize(description),color=Muted,style=MaterialTheme.typography.bodySmall)}
        AppGlyph(5,tint=Muted)
    }
}
@Composable private fun SettingSwitch(title: String,value: Boolean,enabled: Boolean,onChange:(Boolean)->Unit) {
    Row(Modifier.fillMaxWidth(),verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.spacedBy(12.dp)) {Text(localize(title),Modifier.weight(1f));Switch(value,onChange,enabled=enabled,modifier=Modifier.testTag("switch-$title"))}
}
@Composable private fun Choices(title: String,value: String,choices: List<Pair<String,String>>,enabled: Boolean,onChange:(String)->Unit) {
    Text(localize(title),color=Muted,style=MaterialTheme.typography.labelLarge)
    choices.forEach {(id,name) -> Row(Modifier.fillMaxWidth().clickable(enabled=enabled){onChange(id)}.testTag("choice-$title-$id"),verticalAlignment=Alignment.CenterVertically) {RadioButton(value==id,{onChange(id)},enabled=enabled);Text(localize(name),Modifier.weight(1f))}}
}
@Composable private fun SettingField(title: String,value: String,enabled: Boolean,onChange:(String)->Unit) {
    OutlinedTextField(value,onChange,Modifier.fillMaxWidth().testTag("field-$title"),enabled=enabled,singleLine=true,label={Text(localize(title))},shape=RoundedCornerShape(16.dp))
}
@Composable private fun NumberSetting(title: String,value: Int,range: IntRange,enabled: Boolean,onChange:(Int)->Unit) {
    var raw by remember {mutableStateOf(value.toString())}
    val valid=raw.toIntOrNull() in range
    OutlinedTextField(raw,{if(it.length<=6&&it.all(Char::isDigit)){raw=it;onChange(it.toIntOrNull()?:0)}},Modifier.fillMaxWidth().testTag("number-$title"),enabled=enabled,singleLine=true,label={Text(localize(title))},isError=!valid,supportingText={Text("${range.first}–${range.last}")},keyboardOptions=androidx.compose.foundation.text.KeyboardOptions(keyboardType=androidx.compose.ui.text.input.KeyboardType.Number),shape=RoundedCornerShape(16.dp))
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
        Choices("模式",draft.appMode,listOf("all" to "全部代理","exclude" to "排除选中应用","include" to "仅代理选中应用"),enabled) {onChange(draft.copy(appMode=it))}
        Text(localize("应用始终排除自身，不申请读取全体应用权限；仅列出可见的启动应用，也可手填包名。"),color=Muted,style=MaterialTheme.typography.bodySmall)
        SettingField("搜索应用",query,true) {query=it.take(100)}
        val selected=draft.packages.toSet()
        val listed=available.filter {it.name.contains(query,true)||it.packageName.contains(query,true)}
        LazyColumn(Modifier.fillMaxWidth().heightIn(min=120.dp,max=360.dp).testTag("app-list")) {items(listed,key={it.packageName}) {app -> Row(Modifier.fillMaxWidth().clickable(enabled=enabled&&draft.appMode!="all"){toggle(app.packageName)},verticalAlignment=Alignment.CenterVertically) {
            Checkbox(app.packageName in selected,{toggle(app.packageName)},enabled=enabled&&draft.appMode!="all")
            Column(Modifier.weight(1f)) {Text(app.name,maxLines=1,overflow=TextOverflow.Ellipsis);Text(app.packageName,color=Muted,style=MaterialTheme.typography.bodySmall)}
        }}}
        SettingField("应用包名",manual,enabled) {manual=it.take(255)}
        TextButton({if(manual !in selected)onChange(draft.copy(packages=(draft.packages+manual.trim()).take(300)));manual=""},enabled=enabled&&manual.isNotBlank()) {Text(localize("添加包名"))}
        draft.packages.forEach {pkg -> Row(verticalAlignment=Alignment.CenterVertically) {Text(pkg,Modifier.weight(1f),style=MaterialTheme.typography.bodySmall);TextButton({onChange(draft.copy(packages=draft.packages-pkg))},enabled=enabled){Text(localize("移除"))}}}
    }
}
@Composable private fun ConnectionsPanel(vpn: VpnUiState,model: AppViewModel) {
    var rows by remember {mutableStateOf(emptyList<ConnectionRow>())}
    LaunchedEffect(vpn.phase) {while(true) {rows=withContext(Dispatchers.IO) {runCatching {
        val raw=JSONArray(Mobile.vpnConnections());(0 until raw.length().coerceAtMost(512)).map {val r=raw.getJSONObject(it);ConnectionRow(r.getLong("id"),r.getString("network"),r.getString("route"),r.getString("destination"),r.getLong("seconds"),r.getLong("uploaded"),r.getLong("downloaded"))}.sortedByDescending {it.id}
    }.getOrDefault(emptyList())};delay(1000)}}
    SettingsCard {StatLine("活动连接",rows.size.toString());OutlinedButton({model.closeConnection(0)},enabled=rows.isNotEmpty()) {Text(localize("关闭全部连接"))}}
    if(rows.isEmpty()) Text(localize("没有活动连接"),color=Muted)
    // Bound composition independently from the service connection budget.
    LazyColumn(Modifier.fillMaxWidth().heightIn(min=100.dp,max=520.dp),verticalArrangement=Arrangement.spacedBy(10.dp)) {items(rows,key={it.id}) {r -> SettingsCard {
        Text("#${r.id} · ${r.network.uppercase()} · ${r.route}",style=MaterialTheme.typography.titleSmall)
        Text(r.destination.ifEmpty {localize("未记录目标")},color=Muted,style=MaterialTheme.typography.bodySmall)
        Text("↑ ${formatBytes(r.up)}  ↓ ${formatBytes(r.down)} · ${durationText(r.seconds)}",style=MaterialTheme.typography.bodySmall)
        TextButton({model.closeConnection(r.id)}) {Text(localize("关闭此连接"))}
    }}}
}
private data class ConnectionRow(val id: Long,val network: String,val route: String,val destination: String,val seconds: Long,val up: Long,val down: Long)
@Composable private fun AboutPanel(ready: Boolean) {
    val context=LocalContext.current
    var license by remember {mutableStateOf<String?>(null)}
    SettingsCard {
        Text("PingClash",style=MaterialTheme.typography.titleLarge)
        Text("0.1.0-beta.1 · GPL-3.0",color=Muted)
        StatLine("代理内核",if(ready)"mihomo v1.19.32" else "—")
        Text(localize("配置仅在本机解密；未开放外部控制端口或后台遥测接口。"),color=Muted,style=MaterialTheme.typography.bodySmall)
        listOf("NOTICE.md","GPL-3.0.txt","Apache-2.0.txt").forEach {file -> TextButton({license=file}) {Text(file)}}
    }
    license?.let {file -> val text=remember(file) {runCatching {context.assets.open("licenses/$file").bufferedReader().use {it.readText()}}.getOrDefault(file)}
        AlertDialog(onDismissRequest={license=null},title={Text(file)},text={Text(text,Modifier.heightIn(max=400.dp).verticalScroll(rememberScrollState()),style=MaterialTheme.typography.bodySmall)},confirmButton={TextButton({license=null}){Text(localize("关闭"))}})
    }
}
