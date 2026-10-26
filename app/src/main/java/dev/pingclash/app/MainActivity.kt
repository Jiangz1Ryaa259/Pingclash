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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.contentDescription
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
        if(android.os.Build.VERSION.SDK_INT>=33)setRecentsScreenshotEnabled(true)
        enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.auto(android.graphics.Color.TRANSPARENT, android.graphics.Color.TRANSPARENT),
            navigationBarStyle = SystemBarStyle.auto(0xFFF7F8FA.toInt(), 0xFF0C0E12.toInt()),
        )
        setContent {
            val stored by (application as PingClashApplication).repository.data.collectAsStateWithLifecycle()
            val preference=if(android.os.Build.VERSION.SDK_INT>=33)UiStrings.preference() else stored.client.language
            val data=stored.copy(client=stored.client.copy(language=preference))
            val systemLanguage=androidx.compose.ui.platform.LocalConfiguration.current.locales[0].language
            val language=if(data.client.language=="system") {if(systemLanguage=="zh")"zh" else "en"} else data.client.language
            CompositionLocalProvider(LocalUiLanguage provides language) {
                ThemeRevealHost(data.client.theme+data.client.dynamicColor,data.client.reduceEffects) {
                PingClashTheme(data.client.theme,data.client.dynamicColor) {
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
                    Text(step.stage.title(), fontWeight = FontWeight.SemiBold)
                    Text(step.state.title(), color = color, style = MaterialTheme.typography.labelMedium)
                }
                Text(step.code.message(), color = Muted, style = MaterialTheme.typography.bodySmall, lineHeight = 20.sp)
                if (step.attempt > 0) {
                    Text(tr(R.string.message_18f7273d32, step.addressFamily, step.attempt, step.elapsedMs), color = Muted, style = MaterialTheme.typography.labelSmall)
                }
                if (step.attempt == 0 && step.elapsedMs > 0) Text("${step.elapsedMs} ms", color = Muted, style = MaterialTheme.typography.labelSmall)
                if (step.httpStatus > 0) Text("HTTP ${step.httpStatus}", color = color, style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}
