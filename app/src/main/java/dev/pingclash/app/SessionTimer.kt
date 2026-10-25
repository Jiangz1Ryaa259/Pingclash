// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.os.SystemClock
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.snap
import androidx.compose.animation.core.spring
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.PointerEventPass
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay

internal fun sessionSeconds(vpn: VpnUiState,now: Long): Long = when {
    !vpn.active -> 0
    vpn.sessionStartedElapsed>=0 -> ((now-vpn.sessionStartedElapsed)/1000).coerceAtLeast(0)
    else -> vpn.uptime.coerceAtLeast(0)
}

/** One activity-owned timer: it survives tab changes, never pauses the real session. */
@Composable internal fun SessionTimer(vpn: VpnUiState,modifier: Modifier=Modifier,away: Boolean=false,
    onHome: ()->Unit={},onDisconnect: ()->Unit={}) {
    var now by remember {mutableLongStateOf(SystemClock.elapsedRealtime())}
    var expanded by remember {mutableStateOf(false)}
    var wide by remember {mutableStateOf(false)}
    var interaction by remember {mutableIntStateOf(0)}
    val foreground=rememberForeground()
    val motion=LocalMotionAllowed.current&&foreground
    LaunchedEffect(vpn.active,foreground) {
        now=SystemClock.elapsedRealtime()
        while(vpn.active&&foreground) {delay(1000);now=SystemClock.elapsedRealtime()}
    }
    LaunchedEffect(away,vpn.active,foreground) {
        expanded=false;wide=away&&vpn.active&&foreground
    }
    LaunchedEffect(expanded,wide,interaction,foreground) {
        if(foreground&&(expanded||wide)) {delay(4500);expanded=false;wide=false}
    }
    val seconds=sessionSeconds(vpn,now)
    val fraction by animateFloatAsState(sessionWidth(expanded,wide),
        if(motion)spring(.86f,400f) else snap(),label="session-strip-width")
    val shape=if(expanded)UiCorners.Card else UiCorners.Pill
    val description=tr(R.string.ui_timer_elapsed,durationText(seconds))
    Surface(modifier.widthIn(max=420.dp).fillMaxWidth(fraction).heightIn(min=40.dp)
        .animateContentSize(if(motion)spring(.86f,400f) else snap())
        .testTag("vpn-session-strip").semantics {contentDescription=description}
        .sessionTouches {interaction++},shape=shape,color=Panel.copy(alpha=.96f),
        border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),shadowElevation=4.dp) {
        Column(Modifier.padding(horizontal=12.dp,vertical=4.dp)) {
            SessionStripRow(vpn.phase,durationText(seconds),expanded||wide,expanded) {
                expanded=!expanded;interaction++
            }
            AnimatedVisibility(expanded) {
                SessionActions(vpn,onHome={expanded=false;wide=false;onHome()},
                    onDisconnect={expanded=false;wide=false;onDisconnect()})
            }
        }
    }
}

private fun sessionWidth(expanded: Boolean,wide: Boolean)=when {
    expanded->.94f
    wide->.78f
    else->.46f
}

@Composable private fun SessionStripRow(phase: String,time: String,wide: Boolean,expanded: Boolean,
    onClick: ()->Unit) {
    Row(Modifier.fillMaxWidth().heightIn(min=36.dp).testTag("session-strip-toggle").clickable(onClick=onClick),
        horizontalArrangement=Arrangement.spacedBy(8.dp),verticalAlignment=Alignment.CenterVertically) {
        AppGlyph(if(phase=="established")15 else 0,Modifier.size(16.dp),
            if(phase=="established")Success else Muted)
        if(wide)Text(tr(R.string.ui_session_duration),Modifier.weight(1f),
            style=MaterialTheme.typography.labelSmall,maxLines=1,overflow=TextOverflow.Ellipsis)
        Text(time,style=MaterialTheme.typography.labelLarge.copy(fontFeatureSettings="tnum"),
            modifier=Modifier.weight(if(wide).65f else 1f).testTag("vpn-session-time"),maxLines=1)
        AppGlyph(if(expanded)24 else 25,Modifier.size(12.dp),Muted)
    }
}

private fun Modifier.sessionTouches(onTouch: ()->Unit)=pointerInput(Unit) {
    awaitPointerEventScope {while(true) {
        val event=awaitPointerEvent(PointerEventPass.Initial)
        if(event.changes.any {it.pressed&&!it.previousPressed})onTouch()
    }}
}

@Composable private fun SessionActions(vpn: VpnUiState,onHome: ()->Unit,onDisconnect: ()->Unit) {
    Column(Modifier.fillMaxWidth().testTag("session-action-card"),
        verticalArrangement=Arrangement.spacedBy(4.dp)) {
        Text(lanyardPhaseText(vpn.phase),color=Muted,style=MaterialTheme.typography.labelMedium)
        Text(tr(R.string.ui_session_duration_note),color=Muted,style=MaterialTheme.typography.bodySmall)
        Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.End) {
            TextButton(onHome,Modifier.testTag("session-open-home")) {Text(tr(R.string.ui_session_open_home))}
            TextButton(onDisconnect,enabled=vpn.active&&vpn.phase!="stopping",
                modifier=Modifier.testTag("session-disconnect")) {Text(tr(R.string.message_a33f380476))}
        }
    }
}
