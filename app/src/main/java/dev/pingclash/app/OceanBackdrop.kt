// SPDX-License-Identifier: GPL-3.0-only
// Palette coordinates and wave geometry are visual design values.
@file:Suppress("MagicNumber")

package dev.pingclash.app

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.State
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.SemanticsPropertyKey
import androidx.compose.ui.semantics.semantics
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner

internal val DecorativeEffectRunning = SemanticsPropertyKey<Boolean>("DecorativeEffectRunning")
internal const val CONNECTION_TINT_ALPHA = .94f
internal const val NAV_SELECTOR_EDGE_ALPHA = .8f

@Composable internal fun rememberForeground(): Boolean =
    LocalLifecycleOwner.current.lifecycle.currentStateFlow.collectAsState().value == Lifecycle.State.RESUMED

/** Local scene geometry; motion runs only on the visible, foreground home page. */
@Composable internal fun OceanBackdrop(tone: TrailTone,connecting: Boolean,modifier: Modifier=Modifier,
    scene: String="ocean") {
    if(scene=="none")return
    val animate=LocalMotionAllowed.current&&rememberForeground()
    val phase: State<Float> = if (animate) {
        rememberInfiniteTransition(label = "ocean-drift").animateFloat(
            0f,1f,infiniteRepeatable(tween(if(connecting)36000 else 60000,easing=LinearEasing)),label="ocean-phase",
        )
    } else remember {mutableFloatStateOf(0f)}
    val dark = MaterialTheme.colorScheme.background.luminance() < .5f
    val colors = oceanWaveColors(dark,tone)
    val paths=remember {List(3){Path()}}
    val cloud=remember {sceneCloudPath()}
    Canvas(modifier.testTag("ocean-backdrop").semantics { this[DecorativeEffectRunning] = animate }) {
        drawSceneSky(dark,phase.value,scene=="clouds",cloud)
        if(scene!="clouds")drawSceneOcean(dark,phase.value,colors,paths)
    }
}

internal fun oceanWaveColors(dark: Boolean,tone: TrailTone): List<Color> = when (tone) {
        TrailTone.FAILED,TrailTone.INCOMPLETE -> if(dark)listOf(0xFF234C65,0xFF173D57,0xFF0E3048)
            else listOf(0xFF76C1DE,0xFF358FB6,0xFF0F648F)
        else -> if(dark)listOf(0xFF234E6C,0xFF16425F,0xFF0A2F4C)
            else listOf(0xFF5FB9DA,0xFF2189B4,0xFF08618C)
    }.map(::Color)
