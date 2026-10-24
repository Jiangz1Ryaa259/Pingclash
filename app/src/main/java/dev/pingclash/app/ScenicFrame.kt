// SPDX-License-Identifier: GPL-3.0-only
// Navigation geometry and opacity are deliberate design values.
@file:Suppress("MagicNumber")

package dev.pingclash.app

import android.os.Build
import androidx.activity.compose.LocalActivity
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.remember
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import dev.chrisbanes.haze.HazeState
import dev.chrisbanes.haze.hazeSource

internal val LocalNavigationClearance=staticCompositionLocalOf {0.dp}
internal val LocalNavHaze=staticCompositionLocalOf<HazeState?> {null}

@Composable internal fun navigationHeight() =
    if(LocalDensity.current.fontScale>=1.6f)(43+36*LocalDensity.current.fontScale).dp else 72.dp

/** Source and glass are siblings. Scrollable content owns its bottom clearance. */
@Composable internal fun ScenicFrame(selected: Int,scene: String,reduceTransparency: Boolean,
    onSelect: (Int)->Unit,content: @Composable ()->Unit) {
    val haze=remember {HazeState()}
    val window=LocalActivity.current?.window
    val revision=SecurePage.revision
    val secure=remember(window,revision) {SecurePage.isProtected(window)}
    val blur=Build.VERSION.SDK_INT>=Build.VERSION_CODES.S&&!reduceTransparency&&!secure&&rememberForeground()
    val clearance=navigationHeight()+24.dp+WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding()
    CompositionLocalProvider(LocalNavigationClearance provides clearance,
        LocalNavHaze provides if(blur)haze else null) {
        Box(Modifier.fillMaxSize().background(Ink)) {
            Box(Modifier.fillMaxSize().then(if(blur)Modifier.hazeSource(haze) else Modifier)) {
                if(selected==0)OceanBackdrop(TrailTone.PENDING,false,Modifier.fillMaxSize(),scene)
                content()
            }
            GlassNavigation(selected,Modifier.align(Alignment.BottomCenter),onSelect)
        }
    }
}
