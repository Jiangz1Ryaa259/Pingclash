// SPDX-License-Identifier: GPL-3.0-only
// Tint/blur values are visual design tokens, with an explicit older-API fallback.
@file:Suppress("MagicNumber")

package dev.pingclash.app

import androidx.compose.foundation.background
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.semantics.SemanticsPropertyKey
import androidx.compose.ui.unit.dp
import dev.chrisbanes.haze.HazeTint
import dev.chrisbanes.haze.hazeEffect
import dev.chrisbanes.haze.materials.ExperimentalHazeMaterialsApi
import dev.chrisbanes.haze.materials.HazeMaterials

internal const val NAV_FALLBACK_ALPHA=1f
internal val NavBlurEnabled=SemanticsPropertyKey<Boolean>("NavBlurEnabled")
internal fun navTintAlpha(dark: Boolean)=if(dark).66f else .60f
internal fun navLabelColor(dark: Boolean)=if(dark)Color.White else Color.Black

@OptIn(ExperimentalHazeMaterialsApi::class)
@Composable internal fun Modifier.navGlassMaterial(): Modifier {
    val haze=LocalNavHaze.current
    val surface=MaterialTheme.colorScheme.surface
    val dark=MaterialTheme.colorScheme.background.luminance()<.5f
    return if(haze==null)background(surface.copy(alpha=NAV_FALLBACK_ALPHA)) else {
        val style=HazeMaterials.thin(surface).copy(blurRadius=20.dp,noiseFactor=.01f,
            tints=listOf(HazeTint(surface.copy(alpha=navTintAlpha(dark)))),
            fallbackTint=HazeTint(surface.copy(alpha=NAV_FALLBACK_ALPHA)))
        hazeEffect(haze,style=style)
    }
}
