// SPDX-License-Identifier: GPL-3.0-only
// Surface opacity and responsive layout metrics are deliberate visual design values.
@file:Suppress("MagicNumber")

package dev.pingclash.app

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
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
)

internal data class DashboardActions(
    val connect: () -> Unit, val nodes: () -> Unit, val diagnose: () -> Unit, val test: () -> Unit,
)

@Composable internal fun DashboardScreen(state: DashboardState, actions: DashboardActions) {
    val scroll=rememberScrollState()
    val depth=LocalSceneDepth.current
    val immersive=LocalImmersiveScene.current
    val motion=LocalMotionAllowed.current
    val travel=with(LocalDensity.current) {LocalConfiguration.current.screenHeightDp.dp.toPx()*.6f}
    LaunchedEffect(scroll,immersive,motion,travel) {
        snapshotFlow {scroll.value}.collectLatest {
            depth.floatValue=if(immersive&&motion)(it/travel).coerceIn(0f,1f) else 0f
        }
    }
    Column(
        Modifier.fillMaxSize().verticalScroll(scroll).padding(horizontal = 24.dp, vertical = 16.dp)
            .padding(bottom=LocalNavigationClearance.current)
            .testTag("dashboard"), verticalArrangement = Arrangement.spacedBy(18.dp),
    ) {
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("PingClash", style = MaterialTheme.typography.titleLarge)
                Text(buildIdentity(),color=if(immersive)Color.White else Muted,
                    style=MaterialTheme.typography.labelSmall)
            }
            Text(tr(when (state.data.client.mode) {
                "rule" -> R.string.message_1123245d1b
                "direct" -> R.string.message_b06325c566
                else -> R.string.message_f1880deaae
            }), color = if(immersive)Color.White else Muted, style = MaterialTheme.typography.labelMedium)
        }
        if (!state.ready || state.data.loadFailed) {
            Surface(color = MaterialTheme.colorScheme.errorContainer, shape = UiCorners.Card) {
                Text(tr(if (!state.ready) R.string.message_0fef4c3028 else R.string.message_9e30b1eb6a),
                    Modifier.padding(16.dp), color = MaterialTheme.colorScheme.onErrorContainer)
            }
        }
        if(immersive)ImmersiveDashboardHero(state,actions) else ConnectionPanel(state, actions)
        CurrentRoute(state, actions.nodes)
        DashboardTelemetry(state.data.client, state.vpn)
        Text(tr(R.string.ui_diagnostic_boundary), color = Muted, style = MaterialTheme.typography.bodySmall)
        Spacer(Modifier.height(4.dp))
    }
}

@Composable private fun ConnectionPanel(state: DashboardState, actions: DashboardActions) {
    val vpn = state.vpn
    val canTest = measurementEnabled(state)
    Column(Modifier.fillMaxWidth(),verticalArrangement=Arrangement.spacedBy(12.dp)) {
    LanyardPowerControl(vpn.phase,connectionControlEnabled(state),connectLabel(state),actions.connect)
    Surface(shape = UiCorners.Sheet, color = Panel.copy(alpha = CONNECTION_TINT_ALPHA),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outlineVariant)) {
        Column(Modifier.fillMaxWidth().padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(tr(R.string.ui_connection), Modifier.weight(1f), color = Muted,
                    style = MaterialTheme.typography.labelLarge)
                ConnectionBadge(vpn)
            }
            if (LocalDensity.current.fontScale >= 1.6f) {
                SelectedName(state.data)
                UrlMeasurement(selectedUrlDelay(state.data, state.tests),
                    Modifier.fillMaxWidth().clickable(enabled = canTest, role = Role.Button,
                        onClickLabel = tr(R.string.ui_test_latency), onClick = actions.test)
                        .testTag("dashboard-url-test"))
            } else Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) { SelectedName(state.data) }
                UrlMeasurement(selectedUrlDelay(state.data, state.tests),
                    Modifier.widthIn(min = 96.dp, max = 132.dp).heightIn(min = 64.dp)
                        .clickable(enabled = canTest, role = Role.Button,
                            onClickLabel = tr(R.string.ui_test_latency), onClick = actions.test)
                        .testTag("dashboard-url-test"))
            }
            if (vpn.phase == "error") {
                Text(vpn.message, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
            }
            HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text(tr(R.string.ui_connection_path), style = MaterialTheme.typography.titleSmall)
                    Text(tr(if (state.diagnosis.running) R.string.ui_checking else R.string.ui_snapshot),
                        color = Muted, style = MaterialTheme.typography.labelSmall)
                }
                TextButton(actions.diagnose, enabled = canTest, modifier = Modifier.testTag("dashboard-diagnose")) {
                    Text(tr(R.string.message_625924befc))
                }
            }
            ConnectionTrail(diagnosticTrail(state.diagnosis, state.data.selectedId))
        }
    }
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
    val testing = state.diagnosis.running || state.tests.running
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

@Composable private fun SelectedName(data: AppData) {
    Text(data.selected?.name ?: tr(R.string.ui_choose_configuration),
        style = MaterialTheme.typography.titleLarge, maxLines = 2, overflow = TextOverflow.Ellipsis)
    Text(data.selected?.type?.uppercase().orEmpty(), color = Muted, style = MaterialTheme.typography.bodySmall)
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

@Composable private fun CurrentRoute(state: DashboardState, onNodes: () -> Unit) {
    val enabled = !state.vpn.active && !state.tests.running && !state.diagnosis.running && !state.busy
    Surface(shape = UiCorners.Card, color = Panel.copy(alpha = if(LocalImmersiveScene.current).86f else .96f)) {
        Row(Modifier.fillMaxWidth().heightIn(min = 64.dp).clickable(enabled = enabled, onClick = onNodes)
            .padding(16.dp), verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            AppGlyph(14, Modifier.size(22.dp), Muted)
            Column(Modifier.weight(1f)) {
                Text(tr(R.string.ui_current_route), style = MaterialTheme.typography.titleSmall)
                Text(state.data.activeProfile?.name ?: tr(R.string.ui_choose_configuration), color = Muted,
                    style = MaterialTheme.typography.bodySmall, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
            Text(tr(R.string.ui_switch_route), color = if (enabled) Mint else Muted,
                style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.Medium)
        }
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
