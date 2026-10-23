// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.VpnService
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.snap
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import kotlinx.coroutines.launch
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.relocation.BringIntoViewRequester
import androidx.compose.foundation.relocation.bringIntoViewRequester
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.SecureFlagPolicy
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import dev.pingclash.diagnostics.Models
import dev.pingclash.diagnostics.ReportFormatter
import org.json.JSONObject



@Composable internal fun PingClashApp(model: AppViewModel = viewModel()) {
    val data by model.data.collectAsStateWithLifecycle()
    val vpn by model.vpn.collectAsStateWithLifecycle()
    val ui by model.ui.collectAsStateWithLifecycle()
    val diagnosis by model.diagnosis.collectAsStateWithLifecycle()
    val tests by model.proxyTests.collectAsStateWithLifecycle()
    var tool by rememberSaveable {mutableIntStateOf(1)}
    var tab by rememberSaveable { mutableIntStateOf(0) }
    val snackbar = remember { SnackbarHostState() }
    val uiMessage=ui.message?.let {localize(it)}
    val acknowledge=localize("知道了")
    LaunchedEffect(uiMessage) { uiMessage?.let { snackbar.showSnackbar(it, acknowledge, duration = SnackbarDuration.Long); model.dismissMessage() } }
    val context = LocalContext.current
    val vpnPermission = rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) runCatching { VpnRuntime.connect(context) }.onFailure { model.message("系统未允许启动 VPN") }
        else model.message("VPN 授权未完成")
    }
    fun requestVpn() {
        val authorization = VpnService.prepare(context)
        if (authorization == null) runCatching { VpnRuntime.connect(context) }.onFailure { model.message("系统未允许启动 VPN") }
        else vpnPermission.launch(authorization)
    }
    val notificationPermission = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { requestVpn() }
    val locked = ui.busy || vpn.active || diagnosis.running || tests.running
    val motion=rememberMotionAllowed()
    CompositionLocalProvider(LocalMotionAllowed provides motion) {
    Scaffold(containerColor = Ink, snackbarHost = { SnackbarHost(snackbar) }, bottomBar = {
        GlassNavigation(tab) {tab=it}
    }) { padding ->
        Box(Modifier.fillMaxSize().padding(padding)) {
            AnimatedContent(tab, transitionSpec = {
                if(motion) {
                    val direction=if(targetState>initialState) 1 else -1
                    (slideInHorizontally(spring(dampingRatio=1f,stiffness=650f)) {it/12*direction}+fadeIn(tween(190))) togetherWith
                        (slideOutHorizontally(tween(140)) {-it/16*direction}+fadeOut(tween(110)))
                } else fadeIn(snap()) togetherWith fadeOut(snap())
            }, modifier=Modifier.fillMaxSize().clip(RoundedCornerShape(0.dp)),label = "main-navigation") { page ->
                when (page) {
                    0 -> ConnectionScreen(data, vpn, diagnosis, model.nativeReady, ui.busy, onNodes = { tab = 1 }, onDiagnose = { tab = 3;tool=0; model.diagnose() }) {
                        if (vpn.active) { model.cancelDiagnosis(); VpnRuntime.disconnect(context) }
                        else if (data.selected == null) tab = 1
                        else if (Build.VERSION.SDK_INT >= 33 && context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) notificationPermission.launch(Manifest.permission.POST_NOTIFICATIONS)
                        else requestVpn()
                    }
                    1 -> ProxyScreen(data,locked,model,tests,onProfiles={tab=2},onDiagnosis={tab=3;tool=0;model.diagnose()})
                    2 -> ProfilesScreen(data,locked,model,ui) {tab=1}
                    else -> Column(Modifier.fillMaxSize()) {
                        Row(Modifier.padding(horizontal=20.dp,vertical=8.dp),horizontalArrangement=Arrangement.spacedBy(8.dp)) {
                            FilterChip(tool==1,{tool=1},label={Text(localize("设置"))},modifier=Modifier.testTag("tool-settings"))
                            FilterChip(tool==0,{tool=0},label={Text(localize("诊断"))},modifier=Modifier.testTag("tool-diagnosis"))
                            FilterChip(false,{context.startActivity(Intent(context,TerminalActivity::class.java))},label={Text(localize("终端"))},modifier=Modifier.testTag("tool-terminal"))
                        }
                        Box(Modifier.weight(1f)) {if(tool==0)NodeDiagnosisScreen(data,diagnosis,ui.busy||tests.running,model) else SettingsHub(data,vpn,locked,model,onProfiles={tab=2},onProxies={tab=1},onDashboard={tab=0},onDiagnose={tool=0})}
                    }
                }
            }
        }
    }
    }
    if (!data.loadFailed && !data.certificateNoticeAcknowledged && data.selected?.certificateVerificationSkipped == true) {
        AlertDialog(onDismissRequest=model::acknowledgeCertificateNotice,
            title={Text(localize("节点证书校验提示"))},
            text={Text("当前配置包含跳过服务器证书校验的节点，无法通过证书确认节点身份。这不代表连接失败；HTTPS 网站和订阅下载仍校验证书。\n\n关闭后不再重复提醒，证书策略仍保留在诊断报告中。")},
            confirmButton={TextButton(onClick=model::acknowledgeCertificateNotice) {Text(localize("知道了，不再提醒"))}})
    }
}


@Composable private fun Page(title: String, subtitle: String, content: @Composable ColumnScope.() -> Unit) {
    Column(Modifier.fillMaxSize().imePadding().verticalScroll(rememberScrollState()).padding(horizontal = 20.dp, vertical = 16.dp), verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Column(Modifier.padding(top=8.dp,bottom=4.dp),verticalArrangement=Arrangement.spacedBy(5.dp)) {
            Text(localize(title),style=MaterialTheme.typography.headlineLarge,letterSpacing=(-.6).sp)
            if(subtitle.isNotBlank()) Text(localize(subtitle),color=Muted,style=MaterialTheme.typography.bodyMedium)
        }
        content()
        Spacer(Modifier.height(8.dp))
    }
}
@Composable private fun Tile(content: @Composable ColumnScope.() -> Unit) {
    Card(Modifier.fillMaxWidth(),shape=RoundedCornerShape(22.dp),border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),colors=CardDefaults.cardColors(containerColor=Panel)) {
        Column(Modifier.padding(20.dp),verticalArrangement=Arrangement.spacedBy(14.dp),content=content)
    }
}
@Composable private fun SectionLabel(text: String) { Text(localize(text),Modifier.padding(start=4.dp),color=Muted,style=MaterialTheme.typography.labelLarge) }
@Composable private fun IconBadge(index: Int) {
    Box(Modifier.size(44.dp).background(MaterialTheme.colorScheme.primaryContainer,RoundedCornerShape(14.dp)),contentAlignment=Alignment.Center) { AppGlyph(index,tint=Mint) }
}
@Composable private fun IssueBanner(text: String) {
    Surface(color=MaterialTheme.colorScheme.errorContainer,shape=RoundedCornerShape(16.dp)) {
        Text(text,Modifier.fillMaxWidth().padding(16.dp),color=MaterialTheme.colorScheme.onErrorContainer,style=MaterialTheme.typography.bodyMedium)
    }
}

@Composable private fun ConnectionScreen(data: AppData,vpn: VpnUiState,diagnosis: DiagnosticUiState,ready: Boolean,busy: Boolean,onNodes: () -> Unit,onDiagnose: () -> Unit,onConnect: () -> Unit) {
    Page("PingClash","你的连接，一目了然") {
        if(!ready||data.loadFailed) IssueBanner(if(!ready) "内核未能加载，请重新安装匹配设备架构的安装包。" else "本地资料读取失败，原加密文件已保留。请勿清除应用数据。")
        Card(shape=RoundedCornerShape(28.dp),border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),colors=CardDefaults.cardColors(containerColor=Panel)) {
            Column(Modifier.fillMaxWidth().padding(22.dp),horizontalAlignment=Alignment.CenterHorizontally,verticalArrangement=Arrangement.spacedBy(18.dp)) {
                Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.SpaceBetween,verticalAlignment=Alignment.CenterVertically) {
                    Text(localize("VPN 连接"),color=Muted,style=MaterialTheme.typography.labelLarge)
                    Surface(color=MaterialTheme.colorScheme.surfaceVariant,shape=CircleShape) { Row(Modifier.padding(horizontal=10.dp,vertical=6.dp),horizontalArrangement=Arrangement.spacedBy(6.dp),verticalAlignment=Alignment.CenterVertically) {
                        Box(Modifier.size(6.dp).background(if(vpn.phase=="established") Success else Muted,CircleShape));Text(localize(if(vpn.phase=="established") "已连接" else if(vpn.active) "处理中" else "未连接"),style=MaterialTheme.typography.labelSmall)
                    } }
                }
                VpnPowerControl(vpn.phase,ready&&!data.loadFailed&&!busy&&(!diagnosis.running||vpn.active),
                    if(vpn.active) "断开连接" else if(data.selected==null) {if(data.nodes.isEmpty()) "添加第一个订阅" else "选择节点"} else "建立 VPN 连接",onConnect)
                Column(horizontalAlignment=Alignment.CenterHorizontally,verticalArrangement=Arrangement.spacedBy(6.dp)) {
                    Text(localize(if(vpn.phase=="established") "连接已开启" else if(vpn.phase=="connecting") "正在连接" else if(vpn.phase=="stopping") "正在断开" else "尚未连接"),style=MaterialTheme.typography.titleLarge)
                    Text(localize(if(vpn.phase=="established") "VPN 隧道已建立" else if(data.selected==null) "添加订阅，选择一个节点" else "准备就绪，轻点即可连接"),color=Muted,style=MaterialTheme.typography.bodyMedium)
                }
                if(vpn.phase=="error") IssueBanner(vpn.message)
            }
        }
        SectionLabel("当前节点")
        Tile {
            Row(Modifier.fillMaxWidth().clickable(enabled=!vpn.active,onClick=onNodes),horizontalArrangement=Arrangement.spacedBy(14.dp),verticalAlignment=Alignment.CenterVertically) {
                IconBadge(1)
                Column(Modifier.weight(1f),verticalArrangement=Arrangement.spacedBy(3.dp)) {
                    Text(data.selected?.name?:"尚未选择节点",style=MaterialTheme.typography.titleMedium,maxLines=1,overflow=TextOverflow.Ellipsis)
                    Text(data.selected?.type?.uppercase()?:"从订阅或本地配置中选择",color=Muted,style=MaterialTheme.typography.bodySmall)
                }
                AppGlyph(5,tint=Muted)
            }
        }
        RuntimeCards(data,vpn)
        Tile {
            Row(horizontalArrangement=Arrangement.spacedBy(14.dp),verticalAlignment=Alignment.CenterVertically) {
                IconBadge(2)
                Column(Modifier.weight(1f),verticalArrangement=Arrangement.spacedBy(3.dp)) { Text(localize("连接诊断"),style=MaterialTheme.typography.titleMedium);Text(localize("连接不顺畅？逐步查找原因"),color=Muted,style=MaterialTheme.typography.bodySmall) }
            }
            diagnosis.report?.let { Text(it.conclusion(),color=Muted,style=MaterialTheme.typography.bodyMedium) }
            FilledTonalButton(onClick=onDiagnose,enabled=ready&&data.selected!=null&&!diagnosis.running&&!busy,modifier=Modifier.fillMaxWidth()) { Text(localize("诊断此节点")) }
        }
        Row(Modifier.padding(horizontal=4.dp),horizontalArrangement=Arrangement.spacedBy(8.dp)) {
            AppGlyph(6,Modifier.size(17.dp),Muted)
            Text(localize("资料仅存本机 · 无使用情况收集"),color=Muted,style=MaterialTheme.typography.bodySmall)
        }
        if(vpn.failures>0) Text("已有 ${vpn.failures} 次转发异常，请运行诊断。",color=Warning,style=MaterialTheme.typography.bodySmall)
    }
}

@Composable private fun ProfilesScreen(data: AppData,locked: Boolean,model: AppViewModel,ui: AppUiState,onProxies: () -> Unit) {
    var rename by remember {mutableStateOf<LocalProfile?>(null)}
    var export by remember {mutableStateOf<LocalProfile?>(null)}
    var renameText by remember {mutableStateOf("")}
    var exportId by remember {mutableStateOf<String?>(null)}
    val exportPicker=rememberLauncherForActivityResult(ActivityResultContracts.CreateDocument("application/json")) {uri ->
        val id=exportId;exportId=null
        if(uri!=null&&id!=null)model.exportProfile(id,uri)
    }
    var showImport by remember { mutableStateOf(false) }
    var delete by remember { mutableStateOf<LocalProfile?>(null) }
    var viewedProfile by rememberSaveable { mutableStateOf<String?>(null) }
    val viewed=data.profiles.firstOrNull { it.id==viewedProfile }
        ?:data.profiles.firstOrNull { profile -> profile.nodes.any { it.id==data.selectedId } || profile.groups.any { profile.groupId(it.name)==data.selectedId } }
        ?:data.profiles.firstOrNull()
    LaunchedEffect(ui.importedProfileId) { ui.importedProfileId?.let { viewedProfile=it;showImport=false } }
    val filePicker=rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri -> if(uri!=null) model.importFile("本地配置",uri) }
    Page("配置","订阅与本地配置") {
        Row(horizontalArrangement=Arrangement.spacedBy(10.dp)) {
            Button(onClick={model.clearImportIssue();showImport=true},enabled=!locked&&!data.loadFailed) { AppGlyph(4,Modifier.size(18.dp));Spacer(Modifier.width(6.dp));Text(localize("添加订阅")) }
            OutlinedButton(onClick={model.clearImportIssue();filePicker.launch(arrayOf("*/*"))},enabled=!locked&&!data.loadFailed) { Text(localize("导入文件")) }
        }
        if(!showImport) ui.importIssue?.let { IssueBanner(it) }
        if(data.profiles.isEmpty()) Tile {
            Column(Modifier.fillMaxWidth().padding(vertical=28.dp),horizontalAlignment=Alignment.CenterHorizontally,verticalArrangement=Arrangement.spacedBy(16.dp)) {
                Box(Modifier.size(76.dp).background(MaterialTheme.colorScheme.primaryContainer,RoundedCornerShape(24.dp)),contentAlignment=Alignment.Center) {AppGlyph(1,Modifier.size(36.dp),Mint)}
                Text(localize("让连接从这里开始"),style=MaterialTheme.typography.titleLarge)
                Text("添加订阅链接，或导入节点配置。\n你的链接与凭据会加密保存在本机。",color=Muted,style=MaterialTheme.typography.bodyMedium,textAlign=androidx.compose.ui.text.style.TextAlign.Center)
            }
        }
        if(data.profiles.size>1) LazyRow(horizontalArrangement=Arrangement.spacedBy(8.dp)) { items(data.profiles,key={it.id}) { profile -> FilterChip(viewed?.id==profile.id,{viewedProfile=profile.id},label={Text(profile.name,maxLines=1)}) } }
        viewed?.let { profile ->
            Card(shape=RoundedCornerShape(24.dp),colors=CardDefaults.cardColors(containerColor=Panel)) {
                Column(Modifier.fillMaxWidth()) {
                    Row(Modifier.padding(start=20.dp,end=8.dp,top=12.dp,bottom=10.dp),verticalAlignment=Alignment.CenterVertically) {
                        Column(Modifier.weight(1f),verticalArrangement=Arrangement.spacedBy(4.dp)) {Text(profile.name,fontWeight=FontWeight.SemiBold,maxLines=1,overflow=TextOverflow.Ellipsis);Text("${profile.nodes.size} 个节点 · ${if(profile.source==null) "本地导入" else "订阅"}",color=Muted,style=MaterialTheme.typography.bodySmall)}
                        if(profile.source!=null) TextButton({model.refresh(profile)},enabled=!locked) {Text(localize("更新"))}
                        TextButton({delete=profile},enabled=!locked) {Text(localize("删除"),color=MaterialTheme.colorScheme.error)}
                    }
                    Text(if(profile.hasSubscriptionGroups) "分组：订阅原配置" else "分组：未提供，展示全部节点",Modifier.padding(horizontal=20.dp,vertical=4.dp),color=Muted,style=MaterialTheme.typography.bodySmall)
                    if(profile.groupsUnsupported>0) Text("${profile.groupsUnsupported} 个策略组暂未支持；依赖它们的节点不会改走直连。",Modifier.padding(horizontal=20.dp,vertical=8.dp),color=Warning,style=MaterialTheme.typography.bodySmall)
                    if(profile.unsupported>0) Text(rejectionSummary(profile.rejections).ifBlank {"${profile.unsupported} 个节点未导入"},Modifier.padding(horizontal=20.dp,vertical=8.dp),color=Warning,style=MaterialTheme.typography.bodySmall)
                    if(profile.fieldIssues.isNotEmpty()) {
                        var showIssues by remember(profile.id, profile.fieldIssues) { mutableStateOf(false) }
                        TextButton({showIssues=!showIssues},Modifier.padding(horizontal=12.dp)) { Text(if(showIssues) "收起未导入详情" else "查看未导入详情") }
                        if(showIssues) Text(importFieldSummary(profile.fieldIssues),Modifier.padding(horizontal=20.dp,vertical=8.dp),color=Muted,style=MaterialTheme.typography.bodySmall)
                    }
                    if(profile.verificationEnabled>0) Text(localize("旧版曾改写此资料的证书设置，请更新订阅或重新导入以恢复原配置。"),Modifier.padding(horizontal=20.dp,vertical=8.dp),color=Warning,style=MaterialTheme.typography.bodySmall)
                    Row(Modifier.padding(horizontal=20.dp,vertical=12.dp),horizontalArrangement=Arrangement.spacedBy(8.dp)) {
                        FilledTonalButton({if(profile.id!=data.activeProfile?.id)model.activate(profile.id);onProxies()},enabled=!locked) {Text(if(profile.id==data.activeProfile?.id) "查看代理" else "使用配置")}
                    }
                    Row(Modifier.padding(horizontal=12.dp),horizontalArrangement=Arrangement.spacedBy(8.dp)) {
                        TextButton({rename=profile;renameText=profile.name},enabled=!locked) {Text(localize("重命名"))}
                        TextButton({export=profile},enabled=!locked) {Text(localize("导出配置"))}
                    }
                    if(profile.definition.isNotBlank() && (profile.unsupported>0||profile.groupsUnsupported>0)) TextButton({model.reparse(profile)},enabled=!locked,modifier=Modifier.padding(horizontal=12.dp).testTag("profile-reparse-${profile.id}")) {Text("重新解析本地配置")}
                }
            }
            Text(localize("选择配置后，在代理页切换策略组与节点。"),Modifier.padding(horizontal=4.dp),color=Muted,style=MaterialTheme.typography.bodySmall)
        }
    }
    if(showImport) ImportDialog(ui,{if(!ui.busy)showImport=false}) { name,body,subscription -> if(subscription)model.subscribe(name,body.trim()) else model.importText(name,body) }
    rename?.let {profile -> AlertDialog(onDismissRequest={rename=null},title={Text(localize("重命名"))},text={OutlinedTextField(renameText,{if(it.length<=100)renameText=it},singleLine=true,label={Text(localize("配置名称"))})},confirmButton={TextButton({model.rename(profile.id,renameText);rename=null},enabled=renameText.isNotBlank()){Text(localize("保存"))}},dismissButton={TextButton({rename=null}){Text(localize("取消"))}})}
    export?.let {profile -> AlertDialog(onDismissRequest={export=null},title={Text(localize("导出配置"))},text={Text(localize("导出文件包含完整节点凭据，不受本机密钥保护。请选择可信保存位置，不会自动上传或发送。导出原节点、分组和规则，不导出订阅链接或应用偏好。"))},confirmButton={TextButton({exportId=profile.id;export=null;exportPicker.launch("PingClash-profile.json")}){Text(localize("导出配置"))}},dismissButton={TextButton({export=null}){Text(localize("取消"))}})}
    delete?.let { profile -> AlertDialog(onDismissRequest={delete=null},title={Text(localize("删除此配置？"))},text={Text("将删除本机保存的 ${profile.nodes.size} 个节点及订阅地址。")},confirmButton={TextButton({model.delete(profile.id);delete=null}) {Text(localize("删除"),color=MaterialTheme.colorScheme.error)}},dismissButton={TextButton({delete=null}) {Text(localize("取消"))}}) }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable internal fun ImportDialog(ui: AppUiState,onDismiss: () -> Unit,onSubmit: (String,String,Boolean) -> Unit) {
    var name by remember {mutableStateOf("")}
    var content by remember {mutableStateOf("")}
    var subscription by remember {mutableStateOf(true)}
    var visible by remember {mutableStateOf(false)}
    val focus=LocalFocusManager.current
    val errorLocation=remember { BringIntoViewRequester() }
    LaunchedEffect(ui.importIssue) {if(ui.importIssue!=null) {focus.clearFocus();errorLocation.bringIntoView()} }
    ModalBottomSheet(onDismissRequest=onDismiss,sheetState=rememberModalBottomSheetState(skipPartiallyExpanded=true),containerColor=Panel,
        properties=ModalBottomSheetProperties(securePolicy=if(!subscription||visible)SecureFlagPolicy.SecureOn else SecureFlagPolicy.SecureOff)) {
        Column(Modifier.fillMaxWidth().imePadding().verticalScroll(rememberScrollState()).padding(horizontal=24.dp).padding(bottom=28.dp),verticalArrangement=Arrangement.spacedBy(18.dp)) {
            Column(verticalArrangement=Arrangement.spacedBy(6.dp)) {Text(localize("添加配置"),style=MaterialTheme.typography.headlineMedium);Text(localize("选择一种方式，开始导入。"),color=Muted,style=MaterialTheme.typography.bodyMedium)}
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                listOf("订阅链接","节点配置").forEachIndexed { index,label -> SegmentedButton(subscription==(index==0),{subscription=index==0;content=""},shape=SegmentedButtonDefaults.itemShape(index,2),enabled=!ui.busy) {Text(label)} }
            }
            OutlinedTextField(content,{if(it.length<=2*1024*1024)content=it},Modifier.testTag("subscription-content").fillMaxWidth().heightIn(min=if(subscription)60.dp else 120.dp,max=220.dp),enabled=!ui.busy,
                label={Text(if(subscription)"订阅链接" else "节点 JSON / Clash YAML")},placeholder={Text(if(subscription)"https://example.com/subscribe" else "粘贴配置或节点分享链接")},
                shape=RoundedCornerShape(16.dp),singleLine=subscription,visualTransformation=if(subscription&&!visible)PasswordVisualTransformation()else VisualTransformation.None,
                trailingIcon=if(subscription){{TextButton({visible=!visible}){Text(if(visible)"隐藏" else "显示")}}}else null,
                keyboardOptions=KeyboardOptions(autoCorrectEnabled=false,keyboardType=if(subscription)KeyboardType.Uri else KeyboardType.Text,imeAction=if(subscription)ImeAction.Next else ImeAction.Default))
            OutlinedTextField(name,{if(it.length<=100)name=it},Modifier.fillMaxWidth(),enabled=!ui.busy,singleLine=true,shape=RoundedCornerShape(16.dp),label={Text(localize("名称（可选）"))},placeholder={Text(if(subscription)"我的订阅" else "本地配置")})
            ui.importIssue?.let { Box(Modifier.bringIntoViewRequester(errorLocation)){IssueBanner(it)} }
            Row(horizontalArrangement=Arrangement.spacedBy(8.dp)) { AppGlyph(6,Modifier.size(18.dp),Muted);Text(localize("支持 Clash、Base64 与常见分享链接。链接与凭据仅在本机处理。"),color=Muted,style=MaterialTheme.typography.bodySmall) }
            Button({onSubmit(name.trim(),content,subscription)},Modifier.fillMaxWidth().height(54.dp),enabled=!ui.busy&&content.isNotBlank()&&(!subscription||validHttps(content.trim())),shape=CircleShape) {
                if(ui.busy) {CircularProgressIndicator(Modifier.size(18.dp),strokeWidth=2.dp);Spacer(Modifier.width(10.dp));Text(localize("正在导入…"))} else Text(if(subscription)"下载并导入" else "导入")
            }
            if(subscription&&content.isNotBlank()&&!validHttps(content.trim())) Text(localize("请输入完整的 HTTPS 订阅链接；不支持带用户名或密码的地址。"),color=MaterialTheme.colorScheme.error,style=MaterialTheme.typography.bodySmall)
        }
    }
}


@Composable
private fun NodeDiagnosisScreen(data: AppData, diagnosis: DiagnosticUiState, busy: Boolean, model: AppViewModel) {
    var auxiliary by rememberSaveable { mutableStateOf(false) }
    var preview by rememberSaveable { mutableStateOf(false) }
    var console by rememberSaveable { mutableStateOf(false) }
    val auxiliaryModel: DiagnosticViewModel = viewModel()
    val context = LocalContext.current
    var pending by rememberSaveable { mutableStateOf("") }
    val save = rememberLauncherForActivityResult(ActivityResultContracts.CreateDocument("text/markdown")) { uri ->
        if (uri != null) ReportExporter.save(context, uri, pending)
    }
    if (auxiliary) {
        Column {
            TextButton(onClick = { auxiliary = false }) { Text(localize("← 返回节点诊断")) }
            Box(Modifier.weight(1f)) { AuxiliaryDiagnosticScreen(auxiliaryModel) }
        }
        return
    }
    Page("连接诊断", "一步步定位连接问题") {
        Tile {
            Row(horizontalArrangement=Arrangement.spacedBy(14.dp),verticalAlignment=Alignment.CenterVertically) {
                IconBadge(2)
                Column(Modifier.weight(1f)) { Text(localize("当前检查节点"),color=Muted,style=MaterialTheme.typography.bodySmall);Text(data.selected?.name ?: "请先选择节点",style=MaterialTheme.typography.titleMedium,maxLines=2,overflow=TextOverflow.Ellipsis) }
            }
            Text(if(data.selected?.type=="group") "策略组 → 按组策略选择成员 → 实际访问 HTTPS 目标。" else if (data.selected?.type in listOf("hysteria2", "tuic")) "入口 DNS → 指定 QUIC 节点访问 HTTPS 目标；直连 TCP 与标准 TLS 辅助不适用。"
                else "入口 DNS → TCP → 辅助 TLS → 指定节点访问 HTTPS 目标。", color = Muted, lineHeight = 22.sp)
            Button(onClick = model::diagnose, enabled = data.selected != null && !diagnosis.running && !busy,
                modifier = Modifier.fillMaxWidth().height(52.dp), shape = CircleShape) {
                Text(if (diagnosis.running) "正在收集连接证据…" else "开始节点诊断")
            }
            if (diagnosis.running) { LinearProgressIndicator(Modifier.fillMaxWidth()); TextButton(onClick = model::cancelDiagnosis) { Text(localize("取消本次诊断")) } }
        }
        diagnosis.report?.let { report -> Tile {
            Text(localize("本次结论"), color = Mint, fontWeight = FontWeight.Bold)
            Text(report.conclusion(), lineHeight = 24.sp)
            Text("${report.elapsedMs} ms · ${report.networkType}", color = Muted, style = MaterialTheme.typography.labelMedium)
            OutlinedButton(onClick = { preview = true }) { Text(localize("预览脱敏报告")) }
        } }
        if (diagnosis.steps.isEmpty()) Text(localize("结果会保留失败步骤与未知阶段；不会由超时推断基站拦截。"), color = Muted, lineHeight = 23.sp)
        diagnosis.steps.filter { it.stage != Models.Stage.POLICY }.forEach { StepCard(it) }
        TextButton(onClick = { auxiliary = true }) { Text(localize("手动检查域名 / IP →")) }
        TextButton(onClick = { console = !console }) { Text(if (console) "收起诊断控制台" else "打开诊断控制台") }
        if (console) DiagnosticConsole(diagnosis, onNode = model::diagnose, onDns = { host ->
            runCatching { Models.Request(host, 443, false, "", Models.Family.AUTO, true) }
                .onSuccess { auxiliaryModel.start(it); auxiliary = true }.onFailure { model.message("请提供有效域名或 IP") }
        }, onReport = { if (diagnosis.report != null) preview = true else model.message("请先完成一次节点诊断") })
    }
    if (preview && diagnosis.report != null) ReportPreview(requireNotNull(diagnosis.report), onSave = { report ->
        pending = ReportFormatter.markdown(report); save.launch("PingClash-${report.runId.take(8)}.md")
    }) { preview = false }
}

@Composable
private fun DiagnosticConsole(diagnosis: DiagnosticUiState, onNode: () -> Unit, onDns: (String) -> Unit, onReport: () -> Unit) {
    var command by remember { mutableStateOf("") }
    var output by remember { mutableStateOf("输入 help 查看命令。") }
    Tile {
        Text(localize("诊断控制台"), fontWeight = FontWeight.Bold)
        Text(output, color = Muted, lineHeight = 22.sp, style = MaterialTheme.typography.bodySmall)
        OutlinedTextField(command, { if (it.length <= 512) command = it }, Modifier.fillMaxWidth(), singleLine = true, label = { Text(localize("输入诊断命令")) })
        TextButton(onClick = {
            val input = command.trim(); command = ""
            when {
                input == "help" -> output = "help\ndiag node\ndiag dns <域名或 IP>\nlogs --recent\nreport preview\n\n控制台只执行以上诊断命令，无需 root。"
                input == "diag node" -> { onNode(); output = "已请求诊断当前选中节点。" }
                input.startsWith("diag dns ") -> { onDns(input.removePrefix("diag dns ").trim()); output = "已请求仅 DNS 检查。" }
                input == "logs --recent" -> output = diagnosis.steps.joinToString("\n") { "${it.stage.title} · ${it.state.title} · ${it.code.message}" }.ifEmpty { "暂无本次诊断记录。" }
                input == "report preview" -> onReport()
                else -> output = "不支持此命令，输入 help 查看可用命令。"
            }
        }, enabled = !diagnosis.running) { Text(localize("执行")) }
    }
}

@Composable
private fun ReportPreview(report: Models.Report, onSave: (Models.Report) -> Unit, onDismiss: () -> Unit) {
    val context = LocalContext.current
    val markdown = remember(report) { ReportFormatter.markdown(report) }
    AlertDialog(onDismissRequest = onDismiss, title = { Text(localize("脱敏报告预览")) },
        text = { Column(Modifier.heightIn(max = 420.dp).verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            Text(localize("地址、SNI、节点名、端口、订阅链接与凭据已省略。"), color = Mint)
            Text(markdown, style = MaterialTheme.typography.bodySmall)
        } },
        confirmButton = { TextButton(onClick = { onSave(report) }) { Text(localize("保存 .md")) } },
        dismissButton = { TextButton(onClick = {
            runCatching { context.startActivity(Intent.createChooser(Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"; putExtra(Intent.EXTRA_TEXT, markdown); putExtra(Intent.EXTRA_SUBJECT, "PingClash 脱敏诊断报告")
            }, "分享诊断报告")) }
        }) { Text(localize("分享")) } })
}

private fun bytes(value: Long): String = when {
    value >= 1024L * 1024 -> String.format(java.util.Locale.ROOT, "%.1f MB", value / (1024.0 * 1024))
    value >= 1024 -> String.format(java.util.Locale.ROOT, "%.1f KB", value / 1024.0)
    else -> "$value B"
}
