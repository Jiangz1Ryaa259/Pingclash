// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.os.SystemClock
import androidx.compose.animation.AnimatedContent
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay

internal fun sessionSeconds(vpn: VpnUiState,now: Long): Long = when {
    !vpn.active -> 0
    vpn.sessionStartedElapsed>=0 -> ((now-vpn.sessionStartedElapsed)/1000).coerceAtLeast(0)
    else -> vpn.uptime.coerceAtLeast(0)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable internal fun SessionTimer(vpn: VpnUiState,modifier: Modifier=Modifier) {
    var now by remember {mutableLongStateOf(SystemClock.elapsedRealtime())}
    var expanded by remember {mutableStateOf(false)}
    val foreground=rememberForeground()
    LaunchedEffect(vpn.active,foreground) {
        now=SystemClock.elapsedRealtime()
        while(vpn.active&&foreground) {delay(1000);now=SystemClock.elapsedRealtime()}
    }
    val seconds=sessionSeconds(vpn,now)
    val description=tr(R.string.ui_timer_elapsed,durationText(seconds))
    val showLabel=LocalDensity.current.fontScale<1.4f
    Surface(modifier.widthIn(max=260.dp).fillMaxWidth().heightIn(min=40.dp)
        .testTag("vpn-session-strip").semantics {contentDescription=description},
        shape=UiCorners.Pill,color=Panel.copy(alpha=.78f)) {
        Column(Modifier.clickable {expanded=true}.padding(horizontal=16.dp,vertical=7.dp)) {
            Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.SpaceBetween,
                verticalAlignment=Alignment.CenterVertically) {
                if(showLabel)Text(tr(R.string.ui_session_duration),
                    style=MaterialTheme.typography.labelSmall,color=Muted)
                AnimatedContent(durationText(seconds),label="vpn-uptime") {Text(it,
                    style=MaterialTheme.typography.labelLarge,modifier=Modifier.testTag("vpn-session-time"))}
                AppGlyph(25,Modifier.size(14.dp),Muted)
            }
            val track=MaterialTheme.colorScheme.outlineVariant;val accent=Mint
            Canvas(Modifier.fillMaxWidth().padding(top=4.dp).height(2.dp)) {
                drawRoundRect(track,cornerRadius=CornerRadius(size.height))
                if(vpn.active)drawRoundRect(accent,size=Size(size.width*(seconds%60)/60f,size.height),
                    cornerRadius=CornerRadius(size.height))
            }
        }
    }
    if(expanded)ModalBottomSheet(onDismissRequest={expanded=false},containerColor=Panel) {
        Column(Modifier.fillMaxWidth().padding(24.dp).padding(bottom=24.dp),
            verticalArrangement=Arrangement.spacedBy(12.dp)) {
            Text(tr(R.string.ui_session_duration),style=MaterialTheme.typography.titleLarge)
            Text(durationText(seconds),style=MaterialTheme.typography.headlineLarge)
            Text(lanyardPhaseText(vpn.phase),color=Muted)
            if(vpn.message.isNotBlank())Text(vpn.message,style=MaterialTheme.typography.bodyMedium)
            Text(tr(R.string.ui_session_duration_note),color=Muted,style=MaterialTheme.typography.bodySmall)
        }
    }
}
