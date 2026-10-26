// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.graphics.Bitmap
import android.os.Handler
import android.os.Looper
import android.view.PixelCopy
import android.view.Window
import androidx.activity.compose.LocalActivity
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxWidth
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
import androidx.compose.runtime.CompositionLocalProvider
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
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.ClipOp
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.drawscope.clipPath
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.layout.positionInWindow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.platform.testTag
import androidx.compose.animation.AnimatedContent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume
import kotlin.math.hypot

internal val LocalThemeReveal=staticCompositionLocalOf<ThemeRevealController?> {null}

/** One transient app-window frame, never encoded, saved, logged or captured on protected pages. */
@Stable internal class ThemeRevealController(private val scope: CoroutineScope,private val window: Window?) {
    var bitmap by mutableStateOf<Bitmap?>(null);private set
    var origin by mutableStateOf(Offset.Zero);private set
    val progress=Animatable(0f)
    var enabled=false
    private var pending=false
    private var generation=0
    fun request(point: Offset,change: ()->Unit) {
        val target=window
        if(!enabled||target==null||SecurePage.isProtected(target)) {change();return}
        if(pending)return
        pending=true
        val id=++generation
        scope.launch {
            val frame=capture(target)
            if(!enabled||SecurePage.isProtected(target)) {clear();change();return@launch}
            if(frame==null) {clear();change();return@launch}
            origin=point;progress.snapTo(0f);bitmap=frame
            change()
            delay(1800)
            if(id==generation)clear()
        }
    }
    suspend fun reveal() {
        if(bitmap==null)return
        progress.animateTo(1f,tween(620))
        clear()
    }
    fun clear() {bitmap=null;pending=false;generation++}
    private suspend fun capture(target: Window): Bitmap? = suspendCancellableCoroutine {continuation ->
        val decor=target.decorView
        if(decor.width<=0||decor.height<=0) {continuation.resume(null);return@suspendCancellableCoroutine}
        val frame=Bitmap.createBitmap(decor.width,decor.height,Bitmap.Config.ARGB_8888)
        runCatching {PixelCopy.request(target,frame,{status ->
            if(continuation.isActive)continuation.resume(frame.takeIf {status==PixelCopy.SUCCESS})
        },Handler(Looper.getMainLooper()))}.onFailure {if(continuation.isActive)continuation.resume(null)}
    }
}

@Composable internal fun ThemeRevealHost(key: String,reduceEffects: Boolean,content: @Composable ()->Unit) {
    val window=LocalActivity.current?.window
    val scope=rememberCoroutineScope()
    val controller=remember(window) {ThemeRevealController(scope,window)}
    val allowed=rememberMotionAllowed(reduceEffects)&&rememberForeground()
    val protection=SecurePage.revision
    SideEffect {controller.enabled=allowed}
    LaunchedEffect(key) {controller.reveal()}
    LaunchedEffect(allowed,protection) {if(!allowed||SecurePage.isProtected(window))controller.clear()}
    DisposableEffect(controller) {onDispose {controller.clear()}}
    CompositionLocalProvider(LocalThemeReveal provides controller) {
        Box(Modifier.fillMaxSize()) {
            content()
            controller.bitmap?.let {bitmap ->
                val image=remember(bitmap) {bitmap.asImageBitmap()}
                Canvas(Modifier.fillMaxSize()) {
                    val o=controller.origin
                    val radius=hypot(maxOf(o.x,size.width-o.x),maxOf(o.y,size.height-o.y))*controller.progress.value
                    val hole=Path().apply {addOval(Rect(o.x-radius,o.y-radius,o.x+radius,o.y+radius))}
                    clipPath(hole,ClipOp.Difference) {drawImage(image)}
                }
            }
        }
    }
}

@Composable internal fun ThemeToggle(settings: ClientSettings,onChange: (String)->Unit) {
    val dark=settings.theme=="dark"||settings.theme=="system"&&
        MaterialTheme.colorScheme.background.let {it.red+it.green+it.blue<1.5f}
    val reveal=LocalThemeReveal.current
    var center by remember {mutableStateOf(Offset.Zero)}
    Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.SpaceBetween,
        verticalAlignment=androidx.compose.ui.Alignment.CenterVertically) {
        Text(tr(R.string.ui_dark_mode),style=MaterialTheme.typography.bodyLarge)
        androidx.compose.material3.Switch(checked=dark,onCheckedChange={value ->
            val change={onChange(if(value)"dark" else "light")}
            reveal?.request(center,change)?:change()
        },modifier=Modifier.testTag("theme-toggle").onGloballyPositioned {
            center=it.positionInWindow()+Offset(it.size.width/2f,it.size.height/2f)
        },thumbContent={AppGlyph(if(dark)GLYPH_MOON else GLYPH_SUN,Modifier.size(16.dp))})
    }
}

@Composable internal fun ThemePicker(value: String,onChange: (String)->Unit) {
    val reveal=LocalThemeReveal.current
    var center by remember {mutableStateOf(Offset.Zero)}
    Text(tr(R.string.message_788db1cfec),style=MaterialTheme.typography.labelLarge,color=Muted)
    ThemeToggle(ClientSettings(theme=value),onChange)
    FilterChip(value=="system",{
        val change={onChange("system")};reveal?.request(center,change)?:change()
    },label={Text(tr(R.string.ui_follow_system))},modifier=Modifier.onGloballyPositioned {
        center=it.positionInWindow()+Offset(it.size.width/2f,it.size.height/2f)
    })
}
