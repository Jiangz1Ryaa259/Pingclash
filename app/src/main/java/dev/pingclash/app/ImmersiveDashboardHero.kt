// SPDX-License-Identifier: GPL-3.0-only
// Scene spacing, optical borders and panel opacity are deliberate design values.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable internal fun ImmersiveDashboardHero(state: DashboardState,actions: DashboardActions) {
    val canTest=measurementEnabled(state)
    Column(Modifier.fillMaxWidth().padding(top=88.dp,bottom=12.dp),verticalArrangement=Arrangement.spacedBy(20.dp)) {
        Text(tr(R.string.ui_connection),style=MaterialTheme.typography.labelLarge,color=Color.White)
        Text(tr(when(state.vpn.phase) {
            "established"->R.string.message_35f7d981fb
            "connecting"->R.string.message_694186911a
            "stopping"->R.string.message_b8d23e6673
            "error"->R.string.ui_connection_failed
            else->R.string.message_93ae902da0
        }),fontSize=38.sp,lineHeight=46.sp,fontWeight=FontWeight.Medium,color=Color.White)
        Text(state.data.selected?.name?:tr(R.string.ui_choose_configuration),
            style=MaterialTheme.typography.titleMedium,color=Color.White,maxLines=2,overflow=TextOverflow.Ellipsis)
        Spacer(Modifier.height(8.dp))
        Surface(shape=UiCorners.Sheet,color=Panel.copy(alpha=.86f),
            border=BorderStroke(1.dp,Color.White.copy(alpha=.18f))) {
            Column(Modifier.fillMaxWidth().padding(16.dp),verticalArrangement=Arrangement.spacedBy(12.dp)) {
                VpnPowerControl(state.vpn.phase,connectionControlEnabled(state),connectLabel(state),actions.connect)
                ImmersiveLatency(state,actions)
                if(state.vpn.phase=="error")Text(state.vpn.message,color=MaterialTheme.colorScheme.error,
                    style=MaterialTheme.typography.bodySmall)
            }
        }
        Surface(shape=UiCorners.Sheet,color=Panel.copy(alpha=.86f),
            border=BorderStroke(1.dp,Color.White.copy(alpha=.12f))) {
            Column(Modifier.fillMaxWidth().padding(16.dp),verticalArrangement=Arrangement.spacedBy(8.dp)) {
                Row(verticalAlignment=Alignment.CenterVertically) {
                    Text(tr(R.string.ui_connection_path),Modifier.weight(1f),style=MaterialTheme.typography.titleSmall)
                    TextButton(actions.diagnose,enabled=canTest,modifier=Modifier.testTag("dashboard-diagnose")) {
                        Text(tr(R.string.message_625924befc))
                    }
                }
                ConnectionTrail(diagnosticTrail(state.diagnosis,state.data.selectedId))
            }
        }
    }
}

@Composable private fun ImmersiveLatency(state: DashboardState,actions: DashboardActions) {
    val delay=selectedUrlDelay(state.data,state.tests)
    val value=if(delay?.state=="passed")tr(R.string.latency_url,"${delay.elapsedMs.coerceAtLeast(1)} ms")
        else tr(when(delay?.state) {
            "running"->R.string.ui_checking
            "timeout"->R.string.message_e512cf016f
            "failed"->R.string.message_28384d7afd
            else->R.string.ui_not_measured
        })
    Row(Modifier.fillMaxWidth().clickable(enabled=measurementEnabled(state),role=Role.Button,
        onClickLabel=tr(R.string.ui_test_latency),onClick=actions.test).padding(vertical=8.dp)
        .testTag("dashboard-url-test"),verticalAlignment=Alignment.CenterVertically) {
        Text(tr(R.string.ui_test_latency),Modifier.weight(1f),color=Muted,
            style=MaterialTheme.typography.bodySmall)
        Text(value,color=if(delay?.state=="passed")latencyColor(delay.elapsedMs) else Muted,
            style=MaterialTheme.typography.labelLarge)
    }
}
