// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.annotation.SuppressLint
import android.content.Context
import android.view.MotionEvent
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.MutableState
import androidx.compose.ui.Modifier
import androidx.compose.ui.zIndex
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.viewinterop.AndroidView

/** This view only paints. Native Compose retains input, accessibility and VPN actions. */
@SuppressLint("ClickableViewAccessibility") // Noninteractive renderer; the native button owns accessible actions.
internal class LanyardThreeView(context: Context): WebView(context) {
    override fun onTouchEvent(event: MotionEvent?): Boolean=false
}

@SuppressLint("SetJavaScriptEnabled") // Pinned offline bundle, strict request allowlist, no Java/JS interface.
internal fun createLanyardView(context: Context,state: LanyardThreeState): LanyardThreeView {
    WebView.setWebContentsDebuggingEnabled(false)
    return LanyardThreeView(context).apply {
        tag="lanyard-offline-webview"
        setBackgroundColor(android.graphics.Color.TRANSPARENT)
        importantForAccessibility=android.view.View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS
        isFocusable=false;isClickable=false
        settings.apply {
            javaScriptEnabled=true;allowFileAccess=false;allowContentAccess=false
            domStorageEnabled=false;databaseEnabled=false;setGeolocationEnabled(false)
            mixedContentMode=WebSettings.MIXED_CONTENT_NEVER_ALLOW
            cacheMode=WebSettings.LOAD_NO_CACHE;blockNetworkLoads=true
            javaScriptCanOpenWindowsAutomatically=false;setSupportMultipleWindows(false)
            mediaPlaybackRequiresUserGesture=true
        }
        state.renderer=this
        webViewClient=OfflineLanyardClient(context.assets,state::pageLoaded,state::failed)
        loadUrl(LANYARD_PAGE)
    }
}

@Composable internal fun rememberLanyardThreeState(): LanyardThreeState? {
    val allow=LocalAllowLanyardThree.current
    return remember(allow) {if(allow)LanyardThreeState() else null}
}

@Composable internal fun LanyardSceneLayers(state: LanyardThreeState?,cable: MutableState<Offset?>,
    selected: Int,secure: Boolean) {
    val foreground=rememberForeground()
    if(state!=null&&state.started)LanyardThreeLayer(state,selected==0&&state.hasControl&&!secure&&foreground,
        selected==0&&state.hasControl&&!secure)
    if(selected==0&&state==null)WindowLanyardCable(cable)
}

@Composable internal fun LanyardThreeLayer(state: LanyardThreeState,active: Boolean,show: Boolean=active) {
    SideEffect {state.visible(active)}
    DisposableEffect(state) {onDispose {state.dispose()}}
    AndroidView(factory={createLanyardView(it,state)},onRelease={
        if(state.renderer===it)state.renderer=null
        it.stopLoading();it.destroy()
    },
        modifier=Modifier.fillMaxSize().zIndex(if(state.dragging)1f else 0f)
        .onSizeChanged {state.viewport(it.width,it.height)}
        .graphicsLayer {alpha=if(state.ready&&show)1f else 0f;translationY=state.scrollOffset})
}
