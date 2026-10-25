// SPDX-License-Identifier: GPL-3.0-only
// Surface opacity and responsive layout metrics are deliberate visual design values.
@file:Suppress("MagicNumber")

package dev.pingclash.app

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.only
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.graphics.Color
import kotlinx.coroutines.flow.collectLatest
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp

internal data class DashboardState(
    val data: AppData, val vpn: VpnUiState, val diagnosis: DiagnosticUiState,
    val tests: ProxyTestState, val ready: Boolean, val busy: Boolean,
    val services: ServiceCheckState=ServiceCheckState(),
)

internal data class DashboardActions(
    val connect: () -> Unit, val nodes: () -> Unit, val diagnose: () -> Unit, val test: () -> Unit,
    val mode: (String)->Unit={},val selectProfile: (String)->Unit={},
    val themeMode: (String)->Unit={},val serviceTest: (List<String>)->Unit={},
)

@Composable internal fun DashboardScreen(state: DashboardState, actions: DashboardActions) {
    androidx.compose.foundation.layout.BoxWithConstraints(Modifier.fillMaxSize()
        .windowInsetsPadding(WindowInsets.safeDrawing.only(WindowInsetsSides.Horizontal))
        .padding(bottom=LocalNavigationClearance.current).padding(horizontal=16.dp,vertical=6.dp)
        .testTag("dashboard")) {
        val shown=if(maxHeight<560.dp||LocalDensity.current.fontScale>=1.4f)2 else 4
        if(maxWidth>maxHeight)Row(Modifier.fillMaxSize(),
            horizontalArrangement=Arrangement.spacedBy(12.dp),verticalAlignment=Alignment.CenterVertically) {
            HomeConnection(state,actions,Modifier.weight(1.2f).fillMaxHeight())
            Box(Modifier.weight(1f)) {HomeConfiguration(state,actions)}
            Box(Modifier.weight(1.3f)) {HomeServiceChecks(state,actions.serviceTest,shown)}
        } else Column(Modifier.fillMaxSize(),verticalArrangement=Arrangement.spacedBy(8.dp)) {
            HomeConnection(state,actions,Modifier.weight(1f).fillMaxWidth())
            HomeConfiguration(state,actions)
            HomeServiceChecks(state,actions.serviceTest,shown)
        }
    }
}

@Composable private fun HomeConnection(state: DashboardState,actions: DashboardActions,modifier: Modifier) {
    androidx.compose.foundation.layout.BoxWithConstraints(modifier.testTag("home-control")) {
        LanyardPowerControl(state.vpn.phase,connectionControlEnabled(state),connectLabel(state),
            maxHeight.coerceAtLeast(112.dp),actions.connect)
        Text("PingClash",Modifier.align(Alignment.TopStart),style=MaterialTheme.typography.titleMedium)
    }
}

internal fun measurementEnabled(state: DashboardState): Boolean {
    val usable = state.ready && state.data.selected != null
    val blocked = listOf(state.busy, state.diagnosis.running, state.tests.running,
        state.vpn.phase in setOf("connecting", "stopping")).any { it }
    return usable && !blocked
}

internal fun connectionControlEnabled(state: DashboardState): Boolean {
    val usable = state.ready && !state.data.loadFailed && !state.busy
    val testing = state.diagnosis.running || state.tests.running || state.services.running
    return usable && (state.vpn.active || !testing)
}

@Composable internal fun ConnectionBadge(vpn: VpnUiState) {
    val color = when (vpn.phase) {
        "established" -> Success
        "error" -> MaterialTheme.colorScheme.error
        else -> Muted
    }
    Surface(color = MaterialTheme.colorScheme.surfaceVariant, shape = UiCorners.Pill) {
        Row(Modifier.padding(horizontal = 10.dp, vertical = 6.dp), verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            Spacer(Modifier.size(6.dp).background(color, CircleShape))
            Text(tr(when (vpn.phase) {
                "established" -> R.string.message_35f7d981fb
                "connecting" -> R.string.message_694186911a
                "stopping" -> R.string.message_b8d23e6673
                "error" -> R.string.ui_connection_failed
                else -> R.string.message_93ae902da0
            }), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurface)
        }
    }
}

@Composable internal fun UrlMeasurement(delay: ProxyDelay?, modifier: Modifier) {
    Column(modifier.padding(vertical = 6.dp), verticalArrangement = Arrangement.spacedBy(2.dp)) {
        if (delay?.state == "passed") {
            val tone = latencyColor(delay.elapsedMs)
            Text(tr(R.string.latency_url, "${delay.elapsedMs.coerceAtLeast(1)} ms"),
                style = MaterialTheme.typography.titleLarge, color = tone)
            Text(tr(R.string.ui_last_url_result, tr(latencyLabel(delay.elapsedMs))),
                color = tone, style = MaterialTheme.typography.bodySmall)
        } else {
            Text(tr(when (delay?.state) {
                "running" -> R.string.ui_checking
                "timeout" -> R.string.message_e512cf016f
                "failed" -> R.string.message_28384d7afd
                else -> R.string.ui_not_measured
            }), style = MaterialTheme.typography.titleMedium,
                color = if (delay?.state in setOf("failed", "timeout")) MaterialTheme.colorScheme.error else Muted)
            Text(tr(R.string.ui_url_note), color = Muted, style = MaterialTheme.typography.bodySmall)
        }
        Text(tr(R.string.ui_tap_latency), color = Mint, style = MaterialTheme.typography.labelSmall)
    }
}

@Composable internal fun connectLabel(state: DashboardState): String = tr(when {
    state.vpn.phase == "connecting" -> R.string.ui_cancel_connection
    state.vpn.phase == "stopping" -> R.string.message_b8d23e6673
    state.vpn.active -> R.string.message_a33f380476
    state.data.selected == null -> R.string.ui_choose_configuration
    else -> R.string.message_beecafaf89
})

@Composable internal fun latencyColor(elapsed: Long) = when (latencyLabel(elapsed)) {
    R.string.ui_latency_fast -> Success
    R.string.ui_latency_moderate -> Warning
    else -> MaterialTheme.colorScheme.error
}
