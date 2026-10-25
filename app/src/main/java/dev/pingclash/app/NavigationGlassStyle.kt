// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/** Shared material tokens: optics are confined to backdrops, foreground stays sharp. */
@Immutable internal data class NavigationGlassStyle(
    val tint: Color,
    val blur: Dp=16.dp,
    val refractionHeight: Dp=22.dp,
    val refractionAmount: Dp=20.dp,
    val saturation: Float=1.25f,
    val highlightAlpha: Float=.78f,
    val shadowAlpha: Float=.12f,
    val innerShadowAlpha: Float=.10f,
)
internal fun navigationGlassStyle(dark: Boolean)=NavigationGlassStyle(
    tint=if(dark)Color(0xFF10151B).copy(alpha=.28f) else Color.White.copy(alpha=.18f),
    highlightAlpha=if(dark).52f else .80f,
    shadowAlpha=if(dark).20f else .12f,
)
internal fun navLabelColor(dark: Boolean)=if(dark)Color.White else Color.Black
internal fun navLabelOutline(dark: Boolean)=if(dark)Color.Black else Color.White
internal const val NAV_LABEL_CONTOUR_ALPHA=.68f
internal const val NAV_LABEL_CONTOUR_WIDTH=.65f

internal val LocalNavigationGlassStyle=staticCompositionLocalOf<NavigationGlassStyle?> {null}
