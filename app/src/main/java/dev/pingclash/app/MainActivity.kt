package dev.pingclash.app

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.SystemBarStyle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import dev.pingclash.diagnostics.Models
import dev.pingclash.diagnostics.ReportFormatter
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.auto(android.graphics.Color.TRANSPARENT, android.graphics.Color.TRANSPARENT),
            navigationBarStyle = SystemBarStyle.auto(0xFFF7F8FA.toInt(), 0xFF0C0E12.toInt()),
        )
        setContent {
            val data by (application as PingClashApplication).repository.data.collectAsStateWithLifecycle()
            val systemLanguage=androidx.compose.ui.platform.LocalConfiguration.current.locales[0].language
            val language=if(data.client.language=="system") {if(systemLanguage=="zh")"zh" else "en"} else data.client.language
            CompositionLocalProvider(LocalUiLanguage provides language) {
                PingClashTheme(data.client.theme) {
                    val light=MaterialTheme.colorScheme.background.luminance()>.5f
                    SideEffect {
                        androidx.core.view.WindowCompat.getInsetsController(window,window.decorView).apply {
                            isAppearanceLightStatusBars=light;isAppearanceLightNavigationBars=light
                        }
                    }
                    Surface(Modifier.fillMaxSize(), color = Ink) { PingClashApp() }
                }
            }
        }
    }
}

@Composable
internal fun AuxiliaryDiagnosticScreen(model: DiagnosticViewModel = viewModel()) {
    val state by model.state.collectAsStateWithLifecycle()
    var host by remember { mutableStateOf("") }
    var port by remember { mutableStateOf("443") }
    var sni by remember { mutableStateOf("") }
    var useTls by rememberSaveable { mutableStateOf(true) }
    var family by rememberSaveable { mutableStateOf(Models.Family.AUTO) }
    var error by remember { mutableStateOf<String?>(null) }
    var showReport by rememberSaveable { mutableStateOf(false) }
    var pendingExport by rememberSaveable { mutableStateOf("") }
    val context = LocalContext.current
    val saveReport = rememberLauncherForActivityResult(
        ActivityResultContracts.CreateDocument("text/markdown"),
    ) { uri ->
        if (uri != null) ReportExporter.save(context, uri, pendingExport)
    }

    Column(
        Modifier.fillMaxSize().safeDrawingPadding().imePadding().verticalScroll(rememberScrollState())
            .padding(horizontal = 24.dp, vertical = 28.dp).widthIn(max = 720.dp),
        verticalArrangement = Arrangement.spacedBy(22.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Box(Modifier.size(42.dp).background(Mint, RoundedCornerShape(14.dp)), contentAlignment = Alignment.Center) {
                Text("P", color = Ink, fontSize = 25.sp, fontWeight = FontWeight.Black)
            }
            Column(Modifier.weight(1f)) {
                Text("PingClash", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Text("连接诊断实验室", color = Muted, style = MaterialTheme.typography.labelMedium)
            }
            Text("0.2 · 辅助探测", color = Mint, style = MaterialTheme.typography.labelMedium)
        }

        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text("让连接问题，\n有迹可循。", fontSize = 34.sp, lineHeight = 43.sp, fontWeight = FontWeight.Bold)
            Text("从域名解析到 TLS，一步一步确认连接在哪里停下。", color = Muted, lineHeight = 23.sp)
        }

        Card(colors = CardDefaults.cardColors(containerColor = Panel), shape = RoundedCornerShape(24.dp)) {
            Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("探测目标", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text("直连辅助探测", color = Mint, style = MaterialTheme.typography.labelMedium)
                }
                OutlinedTextField(
                    host, { host = it; error = null }, Modifier.fillMaxWidth(),
                    enabled = !state.running, singleLine = true, label = { Text("服务器域名 / IP") },
                    placeholder = { Text("填写你要检查的服务器") },
                    supportingText = { Text("仅填写地址，无需密码或订阅链接") },
                )
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
                    OutlinedTextField(
                        port, { if (it.length <= 5 && it.all(Char::isDigit)) port = it }, Modifier.width(110.dp),
                        enabled = !state.running, singleLine = true, label = { Text("端口") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    )
                    Column(Modifier.weight(1f)) {
                        Text("TLS 握手", fontWeight = FontWeight.Medium)
                        Text("始终校验证书", color = Muted, style = MaterialTheme.typography.labelSmall)
                    }
                    Switch(useTls, { useTls = it }, enabled = !state.running)
                }
                if (useTls) {
                    OutlinedTextField(
                        sni, { sni = it }, Modifier.fillMaxWidth(), enabled = !state.running,
                        singleLine = true, label = { Text("SNI / 证书主机名（可选）") },
                        placeholder = { Text("留空则使用上面的地址") },
                    )
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf(Models.Family.AUTO to "自动", Models.Family.IPV4 to "IPv4", Models.Family.IPV6 to "IPv6")
                        .forEach { (option, label) ->
                            FilterChip(family == option, { family = option }, label = { Text(label) }, enabled = !state.running)
                        }
                }
                error?.let { Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall) }
                Button(
                    onClick = {
                        try {
                            val number = port.toIntOrNull() ?: throw IllegalArgumentException("请输入有效端口")
                            val request = Models.Request(host, number, useTls, sni, family)
                            error = null
                            model.start(request)
                        } catch (invalid: IllegalArgumentException) {
                            error = invalid.message
                        }
                    },
                    enabled = !state.running,
                    modifier = Modifier.fillMaxWidth().height(52.dp), shape = RoundedCornerShape(16.dp),
                ) { Text(if (state.running) "正在收集连接证据…" else "开始诊断", fontWeight = FontWeight.Bold) }
                if (state.running) {
                    LinearProgressIndicator(Modifier.fillMaxWidth())
                    TextButton(onClick = model::cancel, modifier = Modifier.align(Alignment.CenterHorizontally)) { Text("取消本次诊断") }
                }
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text("证据时间线", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Text("${state.steps.count { it.state == Models.State.PASSED }} 项通过", color = Muted, style = MaterialTheme.typography.labelMedium)
            }
            if (state.steps.isEmpty()) {
                Text("运行一次诊断后，这里会显示每一步的真实结果。", color = Muted, lineHeight = 23.sp)
            } else {
                state.steps.forEach { StepCard(it) }
            }
        }

        state.report?.let { report ->
            Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer), shape = RoundedCornerShape(22.dp)) {
                Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("本次结论", color = Mint, fontWeight = FontWeight.Bold)
                    Text(report.conclusion(), lineHeight = 24.sp)
                    Text("${report.networkType} · ${report.elapsedMs} ms", color = Muted, style = MaterialTheme.typography.labelMedium)
                    OutlinedButton(onClick = { showReport = true }) { Text("预览脱敏报告") }
                }
            }
        }

        HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("辅助探测的范围", fontWeight = FontWeight.Medium)
            Text("本页检查 DNS、TCP 和系统 TLS。实际代理访问请使用节点诊断；无法仅凭这些结果确认基站拦截。", color = Muted, style = MaterialTheme.typography.bodySmall, lineHeight = 21.sp)
            Text("本地执行 · 报告默认脱敏 · 无需 root", color = Mint, style = MaterialTheme.typography.labelSmall)
        }
    }

    if (showReport && state.report != null) {
        val report = requireNotNull(state.report)
        val markdown = remember(report) { ReportFormatter.markdown(report) }
        AlertDialog(
            onDismissRequest = { showReport = false },
            title = { Text("脱敏报告预览") },
            text = {
                Column(Modifier.heightIn(max = 420.dp).verticalScroll(rememberScrollState())) {
                    Text("已省略域名、IP、SNI、端口及原始错误消息。", color = Mint)
                    Spacer(Modifier.height(16.dp))
                    Text(markdown, style = MaterialTheme.typography.bodySmall)
                }
            },
            confirmButton = {
                TextButton(onClick = {
                    pendingExport = markdown
                    saveReport.launch("PingClash-${report.runId.take(8)}.md")
                }) { Text("保存 .md") }
            },
            dismissButton = {
                TextButton(onClick = {
                    val intent = Intent(Intent.ACTION_SEND).apply {
                        type = "text/plain"
                        putExtra(Intent.EXTRA_SUBJECT, "PingClash 脱敏诊断报告")
                        putExtra(Intent.EXTRA_TEXT, markdown)
                    }
                    context.startActivity(Intent.createChooser(intent, "分享诊断报告"))
                }) { Text("分享") }
            },
        )
    }
}

@Composable
internal fun StepCard(step: Models.Step) {
    val color = when (step.state) {
        Models.State.PASSED -> Success
        Models.State.FAILED -> MaterialTheme.colorScheme.error
        Models.State.BLOCKED, Models.State.STALE -> Warning
        else -> Muted
    }
    Card(colors = CardDefaults.cardColors(containerColor = Panel), shape = RoundedCornerShape(18.dp)) {
        Row(Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.spacedBy(14.dp)) {
            Box(Modifier.size(30.dp).background(color.copy(alpha = 0.12f), RoundedCornerShape(10.dp)), contentAlignment = Alignment.Center) {
                Text(if (step.state == Models.State.PASSED) "✓" else "·", color = color, fontWeight = FontWeight.Bold)
            }
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(step.stage.title, fontWeight = FontWeight.SemiBold)
                    Text(step.state.title, color = color, style = MaterialTheme.typography.labelMedium)
                }
                Text(step.code.message, color = Muted, style = MaterialTheme.typography.bodySmall, lineHeight = 20.sp)
                if (step.attempt > 0) {
                    Text("${step.addressFamily} · 尝试 ${step.attempt} · ${step.elapsedMs} ms", color = Muted, style = MaterialTheme.typography.labelSmall)
                }
                if (step.attempt == 0 && step.elapsedMs > 0) Text("${step.elapsedMs} ms", color = Muted, style = MaterialTheme.typography.labelSmall)
                if (step.httpStatus > 0) Text("HTTP ${step.httpStatus}", color = color, style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}
