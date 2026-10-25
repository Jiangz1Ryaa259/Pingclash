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
    val storedData by model.data.collectAsStateWithLifecycle()
    val configuration=androidx.compose.ui.platform.LocalConfiguration.current
    val data=if(Build.VERSION.SDK_INT>=33)storedData.copy(client=storedData.client.copy(language=UiStrings.preference())) else storedData
    val vpn by model.vpn.collectAsStateWithLifecycle()
    val ui by model.ui.collectAsStateWithLifecycle()
    val diagnosis by model.diagnosis.collectAsStateWithLifecycle()
    val tests by model.proxyTests.collectAsStateWithLifecycle()
    val serviceTests by model.serviceChecks.state.collectAsStateWithLifecycle()
    var tool by rememberSaveable {mutableIntStateOf(1)}
    var tab by rememberSaveable { mutableIntStateOf(0) }
    val snackbar = remember { SnackbarHostState() }
    val uiMessage=ui.message?.let {(it)}
    val acknowledge=(tr(R.string.message_de32e20193))
    LaunchedEffect(uiMessage) { uiMessage?.let { snackbar.showSnackbar(it, acknowledge, duration = SnackbarDuration.Long); model.dismissMessage() } }
    val context = LocalContext.current
    val vpnPermission = rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) runCatching { VpnRuntime.connect(context) }.onFailure { model.message(tr(R.string.message_7c2b616daa)) }
        else model.message(tr(R.string.message_a4ce3f2daf))
    }
    fun requestVpn() {
        val authorization = VpnService.prepare(context)
        if (authorization == null) runCatching { VpnRuntime.connect(context) }.onFailure { model.message(tr(R.string.message_7c2b616daa)) }
        else vpnPermission.launch(authorization)
    }
    val notificationPermission = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { requestVpn() }
    val locked = ui.busy || vpn.active || diagnosis.running || tests.running || serviceTests.running
    val motion=rememberMotionAllowed(data.client.reduceEffects)
    CompositionLocalProvider(LocalMotionAllowed provides motion) {
    ScenicFrame(tab,data.client.scene,data.client.reduceTransparency,onSelect={tab=it}) {
    Scaffold(containerColor = Color.Transparent,contentWindowInsets=WindowInsets(0,0,0,0),snackbarHost = {
        Box(Modifier.padding(bottom=LocalNavigationClearance.current)) {SnackbarHost(snackbar)}
    }) { padding ->
        Box(Modifier.fillMaxSize().padding(padding).statusBarsPadding()) {
            AnimatedContent(tab, transitionSpec = {
                if(motion) {
                    val direction=if(targetState>initialState) 1 else -1
                    (slideInHorizontally(spring(dampingRatio=1f,stiffness=650f)) {it/12*direction}+fadeIn(tween(190))) togetherWith
                        (slideOutHorizontally(tween(140)) {-it/16*direction}+fadeOut(tween(110)))
                } else fadeIn(snap()) togetherWith fadeOut(snap())
            }, modifier=Modifier.fillMaxSize().clip(RoundedCornerShape(0.dp)),label = "main-navigation") { page ->
                when (page) {
                    0 -> DashboardScreen(
                        DashboardState(data,vpn,diagnosis,tests,model.nativeReady,ui.busy,serviceTests),
                        DashboardActions(nodes={tab=if(data.activeProfile==null)2 else 1},
                            diagnose={tab=3;tool=0;model.diagnose()},test={data.activeProfile?.let {profile ->
                                data.selected?.let {model.testProxies(profile,listOf(it.name))}
                            }},mode=model::routeMode,selectProfile=model::activate,
                            themeMode={model.appearance(data.client.language,it)},serviceTest={
                                if(serviceTests.running)model.serviceChecks.cancel() else {
                                    val config=if(data.client.mode=="direct")data.activeProfile?.runtimeConfig("DIRECT")
                                        else data.selectedRuntimeConfig
                                    if(model.nativeReady)config?.let {
                                        model.serviceChecks.start(it,data.client.probeTimeout)
                                    }
                                }
                            },connect={
                        model.serviceChecks.cancel()
                        if (vpn.active) { model.cancelDiagnosis(); VpnRuntime.disconnect(context) }
                        else if (data.selected == null) tab = if(data.activeProfile==null)2 else 1
                        else if (Build.VERSION.SDK_INT >= 33 && context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) notificationPermission.launch(Manifest.permission.POST_NOTIFICATIONS)
                        else requestVpn()
                    }))
                    1 -> ProxyScreen(data,locked,model,tests,onProfiles={tab=2},onDiagnosis={tab=3;tool=0;model.diagnose()})
                    2 -> ProfilesScreen(data,locked,model,ui) {tab=1}
                    else -> Column(Modifier.fillMaxSize()) {
                        Row(Modifier.padding(horizontal=20.dp,vertical=8.dp),horizontalArrangement=Arrangement.spacedBy(8.dp)) {
                            FilterChip(tool==1,{tool=1},label={Text((tr(R.string.message_df3d58c7d8)))},modifier=Modifier.testTag("tool-settings"))
                            FilterChip(tool==0,{tool=0},label={Text((tr(R.string.message_40ff6300f9)))},modifier=Modifier.testTag("tool-diagnosis"))
                            FilterChip(false,{context.startActivity(Intent(context,TerminalActivity::class.java))},label={Text((tr(R.string.message_e2a76ef1f1)))},modifier=Modifier.testTag("tool-terminal"))
                        }
                        Box(Modifier.weight(1f)) {if(tool==0)NodeDiagnosisScreen(data,diagnosis,ui.busy||tests.running,model) else SettingsHub(data,vpn,locked,model,onProfiles={tab=2},onProxies={tab=1},onDashboard={tab=0},onDiagnose={tool=0})}
                    }
                }
            }
        }
    }
    }
    }
    if (!data.loadFailed && !data.certificateNoticeAcknowledged && data.selected?.certificateVerificationSkipped == true) {
        AlertDialog(onDismissRequest=model::acknowledgeCertificateNotice,
            title={Text((tr(R.string.message_023cf0425e)))},
            text={Text(tr(R.string.message_d11a5add31))},
            confirmButton={TextButton(onClick=model::acknowledgeCertificateNotice) {Text((tr(R.string.message_100a19b574)))}})
    }
}


@Composable private fun Page(title: String, subtitle: String, content: @Composable ColumnScope.() -> Unit) {
    Column(Modifier.fillMaxSize().imePadding().verticalScroll(rememberScrollState())
        .padding(horizontal=20.dp,vertical=16.dp).padding(bottom=LocalNavigationClearance.current),
        verticalArrangement=Arrangement.spacedBy(20.dp)) {
        Column(Modifier.padding(top=8.dp,bottom=4.dp),verticalArrangement=Arrangement.spacedBy(5.dp)) {
            Text((title),style=MaterialTheme.typography.headlineLarge,letterSpacing=(-.6).sp)
            if(subtitle.isNotBlank()) Text((subtitle),color=Muted,style=MaterialTheme.typography.bodyMedium)
        }
        content()
        Spacer(Modifier.height(8.dp))
    }
}
@Composable private fun Tile(content: @Composable ColumnScope.() -> Unit) {
    Card(Modifier.fillMaxWidth(),shape=UiCorners.Card,border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),
        colors=CardDefaults.cardColors(containerColor=Panel)) {
        Column(Modifier.padding(20.dp),verticalArrangement=Arrangement.spacedBy(14.dp),content=content)
    }
}
@Composable private fun IconBadge(index: Int) {
    Box(Modifier.size(44.dp).background(MaterialTheme.colorScheme.primaryContainer,RoundedCornerShape(14.dp)),contentAlignment=Alignment.Center) { AppGlyph(index,tint=Mint) }
}

@Composable private fun ProfilesScreen(data: AppData,locked: Boolean,model: AppViewModel,ui: AppUiState,onProxies: () -> Unit) {
    var uaProfile by remember {mutableStateOf<LocalProfile?>(null)}
    var uaText by remember {mutableStateOf(DEFAULT_SUBSCRIPTION_UA)}
    var importUa by remember {mutableStateOf(DEFAULT_SUBSCRIPTION_UA)}
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
    var details by remember {mutableStateOf<LocalProfile?>(null)}
    LaunchedEffect(ui.importedProfileId) {if(ui.importedProfileId!=null)showImport=false}
    val filePicker=rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri -> if(uri!=null) model.importFile(tr(R.string.message_e406825e0a),uri) }
    val commands: (ProfileCommand,LocalProfile)->Unit={command,profile ->
        when(command) {
            ProfileCommand.REFRESH->model.refresh(profile)
            ProfileCommand.DETAILS->details=profile
            ProfileCommand.RENAME->{rename=profile;renameText=profile.name}
            ProfileCommand.EXPORT->export=profile
            ProfileCommand.DELETE->delete=profile
            ProfileCommand.UA->{uaProfile=profile;uaText=profile.userAgent}
            ProfileCommand.REPARSE->model.reparse(profile)
            ProfileCommand.PROVIDERS->model.refreshProviders(profile)
            ProfileCommand.PROXIES->{if(profile.id!=data.activeProfile?.id)model.activate(profile.id);onProxies()}
        }
    }
    ProfilesOverview(data,locked,ui,ProfileActions(select={model.activate(it.id)},command=commands,
        add={model.clearImportIssue();showImport=true},
        file={model.clearImportIssue();filePicker.launch(arrayOf("*/*"))}))
    details?.let {profile ->
        ProfileDetailsSheet(data.profiles.firstOrNull {it.id==profile.id}?:profile,
            locked,{details=null},commands)
    }
    if(showImport) ImportDialog(ui,{if(!ui.busy)showImport=false},onUserAgent={importUa=it}) { name,body,subscription -> if(subscription)model.subscribe(name,body.trim(),importUa) else model.importText(name,body) }
    uaProfile?.let {profile -> AlertDialog(onDismissRequest={uaProfile=null},title={Text(tr(R.string.subscription_ua))},text={Column {OutlinedTextField(uaText,{if(it.length<=256)uaText=it},singleLine=true,isError=!validSubscriptionUa(uaText));Text(tr(R.string.subscription_ua_hint))}},confirmButton={TextButton({model.subscriptionUserAgent(profile.id,uaText);uaProfile=null},enabled=validSubscriptionUa(uaText)){Text(tr(R.string.message_a3030bf8f1))}},dismissButton={TextButton({uaProfile=null}){Text(tr(R.string.cancel))}})}
    rename?.let {profile -> AlertDialog(onDismissRequest={rename=null},title={Text((tr(R.string.message_0d0cbac2ee)))},text={OutlinedTextField(renameText,{if(it.length<=100)renameText=it},singleLine=true,label={Text((tr(R.string.message_9919db867b)))})},confirmButton={TextButton({model.rename(profile.id,renameText);rename=null},enabled=renameText.isNotBlank()){Text((tr(R.string.message_a3030bf8f1)))}},dismissButton={TextButton({rename=null}){Text((tr(R.string.message_2cd0f3be87)))}})}
    export?.let {profile -> AlertDialog(onDismissRequest={export=null},title={Text((tr(R.string.message_429ea3af44)))},text={Text((tr(R.string.message_cbf0717721)))},confirmButton={TextButton({exportId=profile.id;export=null;exportPicker.launch("PingClash-profile.json")}){Text((tr(R.string.message_429ea3af44)))}},dismissButton={TextButton({export=null}){Text((tr(R.string.message_2cd0f3be87)))}})}
    delete?.let { profile -> AlertDialog(onDismissRequest={delete=null},title={Text((tr(R.string.message_03300a88fe)))},text={Text(trPlural(R.plurals.message_9e39a158c5, (profile.nodes.size).toInt(), profile.nodes.size))},confirmButton={TextButton({model.delete(profile.id);delete=null}) {Text((tr(R.string.message_2f9daa8289)),color=MaterialTheme.colorScheme.error)}},dismissButton={TextButton({delete=null}) {Text((tr(R.string.message_2cd0f3be87)))}}) }
}

private const val MAX_IMPORT_BYTES=2*1024*1024

@OptIn(ExperimentalMaterial3Api::class)
@Composable internal fun ImportDialog(ui: AppUiState,onDismiss: () -> Unit,onUserAgent: (String)->Unit={},onSubmit: (String,String,Boolean) -> Unit) {
    var step by remember {mutableIntStateOf(0)}
    var edited by remember {mutableIntStateOf(0)}
    var failedAt by remember {mutableIntStateOf(-1)}
    var localError by remember {mutableStateOf<String?>(null)}
    var name by remember {mutableStateOf("")}
    var content by remember {mutableStateOf("")}
    var subscription by remember {mutableStateOf(true)}
    var visible by remember {mutableStateOf(false)}
    var userAgent by remember {mutableStateOf(DEFAULT_SUBSCRIPTION_UA)}
    val focus=LocalFocusManager.current
    val errorLocation=remember { BringIntoViewRequester() }
    LaunchedEffect(ui.importIssue) {if(ui.importIssue!=null) {
        failedAt=edited;step=0;focus.clearFocus();errorLocation.bringIntoView()
    }}
    ModalBottomSheet(onDismissRequest=onDismiss,sheetState=rememberModalBottomSheetState(skipPartiallyExpanded=true),containerColor=Panel,
        properties=ModalBottomSheetProperties(securePolicy=if(!subscription||visible)SecureFlagPolicy.SecureOn else SecureFlagPolicy.SecureOff)) {
        Column(Modifier.fillMaxWidth().imePadding().verticalScroll(rememberScrollState()).padding(horizontal=24.dp).padding(bottom=28.dp),verticalArrangement=Arrangement.spacedBy(18.dp)) {
            Column(verticalArrangement=Arrangement.spacedBy(6.dp)) {Text((tr(R.string.message_108c6cdd56)),style=MaterialTheme.typography.headlineMedium);Text((tr(R.string.message_a12140eb61)),color=Muted,style=MaterialTheme.typography.bodyMedium)}
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                listOf(tr(R.string.message_6a113a5edf),tr(R.string.message_33e74eb6db)).forEachIndexed { index,label ->
                SegmentedButton(subscription==(index==0),{
                    subscription=index==0;content="";step=0;edited++;localError=null
                },shape=SegmentedButtonDefaults.itemShape(index,2),enabled=!ui.busy) {Text(label)} }
            }
            AnimatedVisibility(step==0) {Column(verticalArrangement=Arrangement.spacedBy(14.dp)) {
            OutlinedTextField(content,{
                if(it.length<=MAX_IMPORT_BYTES&&it.toByteArray().size<=MAX_IMPORT_BYTES) {
                    content=it;localError=null;edited++
                } else localError=tr(R.string.ui_import_too_large)},Modifier.testTag("subscription-content").fillMaxWidth().heightIn(min=if(subscription)60.dp else 120.dp,max=220.dp),enabled=!ui.busy,
                label={Text(if(subscription)tr(R.string.message_6a113a5edf) else tr(R.string.message_f77aab4c7a))},placeholder={Text(if(subscription)"https://example.com/subscribe" else tr(R.string.message_57f2275452))},
                isError=(ui.importIssue!=null&&failedAt==edited)||localError!=null,
                shape=UiCorners.Compact,singleLine=subscription,
                visualTransformation=if(subscription&&!visible)PasswordVisualTransformation()
                    else VisualTransformation.None,
                trailingIcon=if(subscription){{TextButton({visible=!visible}){Text(if(visible)tr(R.string.message_145219e726) else tr(R.string.message_4e1449e7d5))}}}else null,
                keyboardOptions=KeyboardOptions(autoCorrectEnabled=false,keyboardType=if(subscription)KeyboardType.Uri else KeyboardType.Text,imeAction=if(subscription)ImeAction.Next else ImeAction.Default))
            ImportNameField(name,ui.busy) {name=it}
            }}
            AnimatedVisibility(step==1) {ImportReview(ImportReviewState(name,content,userAgent,subscription,ui.busy)) {
                userAgent=it;onUserAgent(it)}}
            (localError?:ui.importIssue?.takeIf {failedAt==edited})?.let {
                Box(Modifier.bringIntoViewRequester(errorLocation)){InputIssue(it)}
            }
            if(step==1)TextButton({step=0},enabled=!ui.busy) {Text(tr(R.string.ui_back))}
            Row(horizontalArrangement=Arrangement.spacedBy(8.dp)) { AppGlyph(6,Modifier.size(18.dp),Muted);Text((tr(R.string.message_8e3b073b9e)),color=Muted,style=MaterialTheme.typography.bodySmall) }
            Button({
                localError=importInputIssue(content,subscription)
                if(localError==null) {if(step==0)step=1 else onSubmit(name.trim(),content,subscription)}
            },Modifier.fillMaxWidth().height(54.dp),enabled=!ui.busy&&(!subscription||validSubscriptionUa(userAgent)),shape=CircleShape) {
                if(ui.busy) {CircularProgressIndicator(Modifier.size(18.dp),strokeWidth=2.dp);Spacer(Modifier.width(10.dp));Text((tr(R.string.message_f6dc1b1641)))} else Text(if(step==0)tr(R.string.ui_next)
                    else if(subscription)tr(R.string.message_ad5bb4ebe0) else tr(R.string.message_576d81bb06))
            }

        }
    }
}


private data class ImportReviewState(val name: String,val content: String,val agent: String,
    val subscription: Boolean,val busy: Boolean)

@Composable private fun ImportNameField(name: String,busy: Boolean,onChange: (String)->Unit) {
    OutlinedTextField(name,{if(it.length<=100)onChange(it)},Modifier.fillMaxWidth(),
        enabled=!busy,singleLine=true,shape=UiCorners.Compact,
        label={Text(tr(R.string.message_091a5b5cb6))},placeholder={Text(tr(R.string.message_79aad303b1))})
}

@Composable private fun ImportReview(value: ImportReviewState,onChange: (String)->Unit) {
    Column(verticalArrangement=Arrangement.spacedBy(12.dp)) {
        Text(tr(R.string.ui_review_import),style=MaterialTheme.typography.titleLarge)
        Text(value.name.ifBlank {tr(R.string.message_79aad303b1)})
        if(value.subscription) {
            Text(runCatching {java.net.URI(value.content.trim()).host}.getOrNull().orEmpty(),color=Muted)
            OutlinedTextField(value.agent,{if(it.length<=256)onChange(it)},
                Modifier.fillMaxWidth().testTag("subscription-ua"),singleLine=true,enabled=!value.busy,
                isError=!validSubscriptionUa(value.agent),label={Text(tr(R.string.subscription_ua))})
        }
    }
}


private fun importInputIssue(content: String,subscription: Boolean): String? = when {
    content.isBlank()->tr(R.string.ui_input_required)
    subscription&&!validHttps(content.trim())->tr(R.string.message_24429aea8f)
    else->null
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
            TextButton(onClick = { auxiliary = false }) { Text((tr(R.string.message_2ecd1f47f6))) }
            Box(Modifier.weight(1f)) { AuxiliaryDiagnosticScreen(auxiliaryModel) }
        }
        return
    }
    Page(tr(R.string.message_75793291b7), tr(R.string.message_bf9f55ecd9)) {
        Tile {
            Row(horizontalArrangement=Arrangement.spacedBy(14.dp),verticalAlignment=Alignment.CenterVertically) {
                IconBadge(2)
                Column(Modifier.weight(1f)) { Text((tr(R.string.message_b138010267)),color=Muted,style=MaterialTheme.typography.bodySmall);Text(data.selected?.name ?: tr(R.string.message_428504d9a1),style=MaterialTheme.typography.titleMedium,maxLines=2,overflow=TextOverflow.Ellipsis) }
            }
            Text(if(data.selected?.type=="group") tr(R.string.message_c64f7a1712) else if (data.selected?.type in listOf("hysteria2", "tuic")) tr(R.string.message_7dc01582d2)
                else tr(R.string.message_beab869615), color = Muted, lineHeight = 22.sp)
            Button(onClick = model::diagnose, enabled = data.selected != null && !diagnosis.running && !busy,
                modifier = Modifier.fillMaxWidth().height(52.dp), shape = CircleShape) {
                Text(if (diagnosis.running) tr(R.string.message_113a2e4325) else tr(R.string.message_c1fdb389b7))
            }
            if (diagnosis.running) { LinearProgressIndicator(Modifier.fillMaxWidth()); TextButton(onClick = model::cancelDiagnosis) { Text((tr(R.string.message_e831d49866))) } }
        }
        diagnosis.report?.let { report -> Tile {
            Text((tr(R.string.message_98369d4ab0)), color = Mint, fontWeight = FontWeight.Bold)
            Text(report.conclusion(), lineHeight = 24.sp)
            Text("${report.elapsedMs} ms · ${report.networkType}", color = Muted, style = MaterialTheme.typography.labelMedium)
            OutlinedButton(onClick = { preview = true }) { Text((tr(R.string.message_e89513334b))) }
        } }
        if (diagnosis.steps.isEmpty()) Text((tr(R.string.message_7e185a6da8)), color = Muted, lineHeight = 23.sp)
        diagnosis.steps.filter { it.stage != Models.Stage.POLICY }.forEach { StepCard(it) }
        TextButton(onClick = { auxiliary = true }) { Text((tr(R.string.message_87533a0a61))) }
        TextButton(onClick = { console = !console }) { Text(if (console) tr(R.string.message_ddc2dcfebf) else tr(R.string.message_a030d422db)) }
        if (console) DiagnosticConsole(diagnosis, onNode = model::diagnose, onDns = { host ->
            runCatching { Models.Request(host, 443, false, "", Models.Family.AUTO, true) }
                .onSuccess { auxiliaryModel.start(it); auxiliary = true }.onFailure { model.message(tr(R.string.message_a2d331fa6a)) }
        }, onReport = { if (diagnosis.report != null) preview = true else model.message(tr(R.string.message_891736e998)) })
    }
    if (preview && diagnosis.report != null) ReportPreview(requireNotNull(diagnosis.report), onSave = { report ->
        pending = ReportFormatter.markdown(report); save.launch("PingClash-${report.runId.take(8)}.md")
    }) { preview = false }
}

@Composable
private fun DiagnosticConsole(diagnosis: DiagnosticUiState, onNode: () -> Unit, onDns: (String) -> Unit, onReport: () -> Unit) {
    var command by remember { mutableStateOf("") }
    var output by remember { mutableStateOf(tr(R.string.message_35410a62be)) }
    Tile {
        Text((tr(R.string.message_47b5d86936)), fontWeight = FontWeight.Bold)
        Text(output, color = Muted, lineHeight = 22.sp, style = MaterialTheme.typography.bodySmall)
        OutlinedTextField(command, { if (it.length <= 512) command = it }, Modifier.fillMaxWidth(), singleLine = true, label = { Text((tr(R.string.message_617f4593d8))) })
        TextButton(onClick = {
            val input = command.trim(); command = ""
            when {
                input == "help" -> output = tr(R.string.message_ec5dbb4b87)
                input == "diag node" -> { onNode(); output = tr(R.string.message_4941596c41) }
                input.startsWith("diag dns ") -> { onDns(input.removePrefix("diag dns ").trim()); output = tr(R.string.message_904d1683cf) }
                input == "logs --recent" -> output = diagnosis.steps.joinToString("\n") { "${it.stage.title()} · ${it.state.title()} · ${it.code.message()}" }.ifEmpty { tr(R.string.message_d2fbb7ebe4) }
                input == "report preview" -> onReport()
                else -> output = tr(R.string.message_acbcd289d3)
            }
        }, enabled = !diagnosis.running) { Text((tr(R.string.message_32c8d373af))) }
    }
}

@Composable
private fun ReportPreview(report: Models.Report, onSave: (Models.Report) -> Unit, onDismiss: () -> Unit) {
    val context = LocalContext.current
    val markdown = remember(report,UiStrings.resources().configuration.locales.toLanguageTags()) { ReportFormatter.markdown(report) }
    AlertDialog(onDismissRequest = onDismiss, title = { Text((tr(R.string.message_423dd8c4db))) },
        text = { Column(Modifier.heightIn(max = 420.dp).verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            Text((tr(R.string.message_0343a8806f)), color = Mint)
            Text(markdown, style = MaterialTheme.typography.bodySmall)
        } },
        confirmButton = { TextButton(onClick = { onSave(report) }) { Text((tr(R.string.message_e7a44965ac))) } },
        dismissButton = { TextButton(onClick = {
            runCatching { context.startActivity(Intent.createChooser(Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"; putExtra(Intent.EXTRA_TEXT, markdown); putExtra(Intent.EXTRA_SUBJECT, tr(R.string.message_20b6001a93))
            }, tr(R.string.message_bdb39a7662))) }
        }) { Text((tr(R.string.message_7e564575eb))) } })
}

private fun bytes(value: Long): String = when {
    value >= 1024L * 1024 -> String.format(java.util.Locale.ROOT, "%.1f MB", value / (1024.0 * 1024))
    value >= 1024 -> String.format(java.util.Locale.ROOT, "%.1f KB", value / 1024.0)
    else -> "$value B"
}
