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
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.SemanticsPropertyKey
import androidx.compose.ui.semantics.semantics
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import kotlin.math.PI
import kotlin.math.sin

internal val DecorativeEffectRunning = SemanticsPropertyKey<Boolean>("DecorativeEffectRunning")
internal const val NAV_TINT_ALPHA = .92f
internal const val CONNECTION_TINT_ALPHA = .94f
internal const val NAV_SELECTOR_EDGE_ALPHA = .8f

@Composable internal fun rememberForeground(): Boolean =
    LocalLifecycleOwner.current.lifecycle.currentStateFlow.collectAsState().value == Lifecycle.State.RESUMED

/** No bitmap, screen capture, network input, or work outside the visible dashboard. */
@Composable internal fun OceanBackdrop(tone: TrailTone, connecting: Boolean, modifier: Modifier = Modifier) {
    val animate = connecting && LocalMotionAllowed.current && rememberForeground()
    val phase: State<Float> = if (animate) {
        rememberInfiniteTransition(label = "ocean-drift").animateFloat(
            0f, (2 * PI).toFloat(), infiniteRepeatable(tween(14000, easing = LinearEasing)), label = "ocean-phase",
        )
    } else remember { mutableStateOf(0f) }
    val dark = MaterialTheme.colorScheme.background.luminance() < .5f
    val colors = oceanWaveColors(dark,tone)
    Canvas(modifier.testTag("ocean-backdrop").semantics { this[DecorativeEffectRunning] = animate }) {
        colors.forEachIndexed { index, color ->
            val base = size.height * (.42f + index * .17f)
            val amplitude = size.height * (.025f + index * .009f)
            val path = Path().apply {
                moveTo(0f, size.height)
                var x = 0f
                while (x < size.width) {
                    val angle = x / size.width * PI * (1.15f + index * .15f) + phase.value + index
                    lineTo(x, base + amplitude * sin(angle).toFloat())
                    x += 12f * density
                }
                lineTo(size.width, base + amplitude * sin(PI * (1.15f + index * .15f) + phase.value + index).toFloat())
                lineTo(size.width, size.height)
                close()
            }
            drawPath(path, color)
        }
    }
}

internal fun oceanWaveColors(dark: Boolean,tone: TrailTone): List<Color> = when (tone) {
        TrailTone.FAILED -> if (dark) listOf(0xFF282930, 0xFF343039, 0xFF40323C)
            else listOf(0xFFEEE9E7, 0xFFE8DEDC, 0xFFDFD4D4)
        TrailTone.INCOMPLETE -> if (dark) listOf(0xFF292F2D, 0xFF353B33, 0xFF424438)
            else listOf(0xFFF0EDDF, 0xFFE9E5D1, 0xFFDFDDC7)
        else -> if (dark) listOf(0xFF1A3038, 0xFF213E45, 0xFF2C4B50)
            else listOf(0xFFE4EFED, 0xFFD4E6E2, 0xFFC2DCD7)
    }.map(::Color)
