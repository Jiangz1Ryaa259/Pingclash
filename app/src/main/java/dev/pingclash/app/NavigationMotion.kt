// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.AnimationVector1D
import androidx.compose.animation.core.spring
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.snapshotFlow
import kotlinx.coroutines.flow.collectLatest
import kotlin.math.abs

@Stable internal class NavigationMotion(private val drag: NavigationDragState,selected: Int) {
    val position=Animatable(selected.toFloat())
    val press=Animatable(0f)
    fun visualPosition()=drag.position?:position.value
    fun pressure()=press.value.coerceIn(0f,1f)
    fun stretch()=(abs(if(drag.position!=null)drag.velocity else position.velocity)*.04f).coerceAtMost(.18f)*pressure()
}

internal fun navigationPhysicalPosition(position: Float,rtl: Boolean)=if(rtl)3f-position else position

@Composable internal fun rememberNavigationMotion(drag: NavigationDragState,selected: Int,
    enabled: Boolean): NavigationMotion {
    val state=remember(drag) {NavigationMotion(drag,selected)}
    val current by rememberUpdatedState(selected)
    LaunchedEffect(state,enabled) {
        snapshotFlow {(drag.position!=null) to (drag.position?:current.toFloat())}.collectLatest {(dragging,target)->
            // Finger tracking is direct. Springs are reserved for release/tab changes.
            state.position.moveTo(target,enabled&&!dragging,.78f,430f)
        }
    }
    LaunchedEffect(state,enabled) {
        snapshotFlow {drag.pressed||drag.position!=null}.collectLatest {pressed->
            state.press.moveTo(if(pressed&&enabled)1f else 0f,enabled,.78f,550f)
        }
    }
    return state
}

private suspend fun Animatable<Float,AnimationVector1D>.moveTo(target: Float,enabled: Boolean,
    damping: Float,stiffness: Float) {
    if(enabled)animateTo(target,spring(damping,stiffness)) else snapTo(target)
}
