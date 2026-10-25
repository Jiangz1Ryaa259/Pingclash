// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.IconButton
import androidx.compose.material3.FilterChip
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.Stable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.withFrameNanos
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp

@Composable internal fun SessionTimer(vpn: VpnUiState) {
    val seconds=if(vpn.phase=="established")vpn.uptime else 0
    Surface(shape=UiCorners.Pill,color=Panel.copy(alpha=.7f)) {
        Column(Modifier.padding(horizontal=12.dp,vertical=6.dp)) {
            AnimatedContent(durationText(seconds),label="vpn-uptime") {Text(it,
                style=MaterialTheme.typography.labelMedium,modifier=Modifier.testTag("vpn-session-time"))}
            LinearProgressIndicator(progress={(seconds%60).toFloat()/60f},
                modifier=Modifier.width(68.dp).height(2.dp),color=Mint,
                    trackColor=MaterialTheme.colorScheme.outlineVariant)
        }
    }
}

@Composable internal fun HomeConfiguration(state: DashboardState,actions: DashboardActions) {
    var menu by remember {mutableStateOf(false)}
    val enabled=!state.busy&&!state.tests.running&&!state.services.running&&!state.diagnosis.running&&
        state.vpn.phase !in listOf("connecting","stopping")
    Surface(shape=UiCorners.Sheet,color=Panel.copy(alpha=.86f),
        border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),
            modifier=Modifier.testTag("home-configuration")) {
        Column(Modifier.padding(16.dp).animateContentSize(),verticalArrangement=Arrangement.spacedBy(10.dp)) {
            Row(Modifier.fillMaxWidth(),verticalAlignment=Alignment.CenterVertically) {
                Text(tr(R.string.ui_home_configuration),Modifier.weight(1f),style=MaterialTheme.typography.titleSmall)
                Box {
                    TextButton({if(state.data.profiles.isEmpty())actions.nodes() else menu=true},
                        enabled=enabled&&!state.vpn.active,modifier=Modifier.testTag("home-profile-picker")) {
                        Text(state.data.activeProfile?.name?:tr(R.string.ui_choose_configuration),maxLines=1)
                        AppGlyph(25,Modifier.padding(start=6.dp).size(16.dp))
                    }
                    DropdownMenu(menu,{menu=false}) {
                        state.data.profiles.forEach {profile ->DropdownMenuItem(text={Text(profile.name)},
                            onClick={menu=false;actions.selectProfile(profile.id)})}
                    }
                }
            }
            ModeSegments(state.data.client.mode,enabled,actions.mode)
        }
    }
}

@Composable internal fun HomeServiceChecks(state: DashboardState,onTest: ()->Unit) {
    var details by remember {mutableStateOf(false)}
    Surface(shape=UiCorners.Sheet,color=Panel.copy(alpha=.86f),
        border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),
            modifier=Modifier.testTag("home-service-checks")) {
        Column(Modifier.padding(16.dp).animateContentSize(),verticalArrangement=Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment=Alignment.CenterVertically) {
                Text(tr(R.string.ui_connection_tests),Modifier.weight(1f),style=MaterialTheme.typography.titleSmall)
                TextButton(onTest,enabled=state.services.running||measurementEnabled(state),
                    modifier=Modifier.testTag("service-check-start")) {
                    Text(tr(if(state.services.running)R.string.cancel else R.string.ui_test_sites))
                }
            }
            serviceTargets.forEach {target ->ServiceTestRow(target,state.services.values[target.id])}
            TextButton({details=!details}) {Text(tr(if(details)R.string.ui_hide_details else R.string.ui_show_details))}
            AnimatedVisibility(details) {Text(tr(R.string.ui_service_check_note),color=Muted,
                style=MaterialTheme.typography.bodySmall)}
        }
    }
}

@Composable private fun ServiceTestRow(target: ServiceTarget,result: ServiceResult?) {
    val ok=result?.status in 200..399
    val tone=when {
        ok->Success
        (result?.status?:0)>=400->Warning
        result?.state=="failed"->MaterialTheme.colorScheme.error
        else->Muted
    }
    Row(Modifier.fillMaxWidth().heightIn(min=40.dp),verticalAlignment=Alignment.CenterVertically) {
        Text(target.name,Modifier.weight(1f),style=MaterialTheme.typography.bodyMedium)
        AnimatedContent(result,label="service-${target.id}") {current ->
            Text(when {
                current==null->tr(R.string.ui_no_test_result)
                current.state=="running"->tr(R.string.ui_checking)
                current.status in 200..399->tr(R.string.ui_reachable,current.elapsed.toString())
                current.status>=400->tr(R.string.ui_service_restricted,current.status)
                else->tr(R.string.message_28384d7afd)
            },color=tone,style=MaterialTheme.typography.labelMedium)
        }
    }
}
