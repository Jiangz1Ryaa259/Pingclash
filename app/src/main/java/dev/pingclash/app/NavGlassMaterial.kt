// SPDX-License-Identifier: GPL-3.0-only
// Backdrop 1.0.4 source dependency; optical kernel and layer lifecycle are upstream.
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
import com.kyant.backdrop.drawBackdrop
import com.kyant.backdrop.backdrops.LayerBackdrop
import com.kyant.backdrop.effects.blur
import com.kyant.backdrop.effects.colorControls
import com.kyant.backdrop.effects.lens
import com.kyant.backdrop.highlight.Highlight
import com.kyant.backdrop.shadow.InnerShadow
import com.kyant.backdrop.shadow.Shadow
import dev.chrisbanes.haze.HazeTint
import dev.chrisbanes.haze.hazeEffect
import dev.chrisbanes.haze.materials.ExperimentalHazeMaterialsApi
import dev.chrisbanes.haze.materials.HazeMaterials

internal const val NAV_FALLBACK_ALPHA=1f
internal val NavBlurEnabled=SemanticsPropertyKey<Boolean>("NavBlurEnabled")
internal val NavOpticalBackend=SemanticsPropertyKey<String>("NavOpticalBackend")

@OptIn(ExperimentalHazeMaterialsApi::class)
@Composable internal fun Modifier.navGlassMaterial(style: NavigationGlassStyle,
    selector: Boolean=false): Modifier {
    val backdrop=LocalNavigationBackdrop.current
    val haze=LocalNavHaze.current
    val surface=MaterialTheme.colorScheme.surface
    val dark=MaterialTheme.colorScheme.background.luminance()<.5f
    return when {
        backdrop!=null->backdropGlass(backdrop,style,selector,dark)
        haze==null->if(selector)background(surface.copy(alpha=.12f))
            else background(surface.copy(alpha=NAV_FALLBACK_ALPHA))
        selector->background(Color.White.copy(alpha=if(dark).10f else .18f))
        else->{
    val material=HazeMaterials.thin(surface).copy(blurRadius=style.blur,noiseFactor=.005f,
        tints=listOf(HazeTint(style.tint)),
        fallbackTint=HazeTint(surface.copy(alpha=NAV_FALLBACK_ALPHA)))
    hazeEffect(haze,style=material)
        }
    }
}

@Composable private fun Modifier.backdropGlass(backdrop: LayerBackdrop,style: NavigationGlassStyle,
    selector: Boolean,dark: Boolean)= drawBackdrop(backdrop=backdrop,shape={UiCorners.Pill},effects={
        colorControls(saturation=style.saturation)
        blur((if(selector)3.dp else style.blur).toPx())
        lens(style.refractionHeight.toPx(),style.refractionAmount.toPx(),
            chromaticAberration=selector)
    },highlight={Highlight(width=.65f.dp,alpha=style.highlightAlpha)},
        shadow={Shadow(radius=if(selector)8.dp else 18.dp,alpha=style.shadowAlpha)},
        innerShadow={InnerShadow(radius=if(selector)3.dp else 5.dp,alpha=style.innerShadowAlpha)},
        onDrawSurface={drawRect(if(selector)Color.White.copy(alpha=if(dark).08f else .10f) else style.tint)})
