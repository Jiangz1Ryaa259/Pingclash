// SPDX-License-Identifier: GPL-3.0-only
// Only local geometry and fixed UI state enter this renderer. No profile data or credentials.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.os.Handler
import android.os.Looper
import android.webkit.WebView
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.unit.Density
import org.json.JSONObject

internal val LocalLanyardThree=staticCompositionLocalOf<LanyardThreeState?> {null}
internal val LocalAllowLanyardThree=staticCompositionLocalOf {true}
internal data class ThreeControlText(val phase: String,val label: String,val status: String)

@Stable internal class LanyardThreeState {
    var ready by mutableStateOf(false);private set
    var scrollOffset by mutableFloatStateOf(0f);private set
    var hasControl by mutableStateOf(false);private set
    var active=false;private set
    private var view: WebView?=null
    private val handler=Handler(Looper.getMainLooper())
    private var loaded=false
    private var scheduled=false
    private var polling=false
    private var viewportWidth=1
    private var viewportHeight=1
    private var initialTop: Float?=null
    private var slotTop=0f
    private var slotHeight=0f
    private var label=""
    private var status=""
    private var phase="idle"
    private var dx=0f
    private var dy=0f
    private var held=false
    private var motion=false
    private var fontScale=1f
    private var lastFrame=""
    private val emit=Runnable {scheduled=false;flush()}
    private val poll=object: Runnable {
        override fun run() {
            val current=view?:return
            if(!loaded)return
            if(!polling) {
                polling=true
                current.evaluateJavascript("JSON.stringify(window.PingClashScene?.status()||{})") {result ->
                    if(view!==current)return@evaluateJavascript
                    polling=false
                    val json=runCatching {JSONObject(org.json.JSONTokener(result).nextValue().toString())}.getOrNull()
                    ready=json?.optBoolean("ready")==true
                }
            }
            if(active)handler.postDelayed(this,500)
        }
    }
    fun attach(value: WebView) {view=value}
    fun pageLoaded() {loaded=true;lastFrame="";flush();handler.post(poll)}
    fun failed() {ready=false;loaded=false;polling=false;handler.removeCallbacks(poll)}
    fun viewport(width: Int,height: Int) {
        if(viewportWidth!=width||viewportHeight!=height)initialTop=null
        viewportWidth=width.coerceAtLeast(1);viewportHeight=height.coerceAtLeast(1);schedule()
    }
    fun visible(value: Boolean) {
        if(active==value)return
        active=value;flush();handler.removeCallbacks(poll)
        if(value) {view?.onResume();handler.post(poll)} else view?.onPause()
    }
    fun slot(top: Float,height: Float) {
        if(!top.isFinite()||!height.isFinite())return
        val newControl=!hasControl||slotHeight!=height
        val lowerAnchor=top>(initialTop?:top)
        if(initialTop==null||newControl||lowerAnchor)initialTop=top
        hasControl=height>0
        slotTop=top;slotHeight=height;scrollOffset=top-(initialTop?:top);schedule()
    }
    fun pose(value: LanyardPose,offset: Offset,density: Density,allowMotion: Boolean,text: ThreeControlText) {
        dx=offset.x*density.density;dy=offset.y*density.density;held=value.holding;motion=allowMotion
        phase=text.phase.takeIf {it in listOf("idle","connecting","established","stopping","error")}?:"idle"
        label=text.label.take(120);status=text.status.take(120);fontScale=density.fontScale.coerceIn(1f,2f)
        schedule()
    }
    private fun schedule() {
        if(scheduled)return
        scheduled=true;handler.postDelayed(emit,32)
    }
    private fun flush() {
        val current=view?:return
        if(!loaded)return
        val frame=JSONObject().put("active",active&&slotHeight>0).put("motion",motion).put("held",held)
            .put("back",lanyardBackFace(phase)).put("phase",phase).put("label",label).put("status",status)
            .put("viewportWidth",viewportWidth).put("viewportHeight",viewportHeight)
            .put("top",initialTop?:slotTop).put("height",slotHeight).put("fontScale",fontScale)
            .put("dx",dx).put("dy",dy).toString()
        if(frame!=lastFrame) {
            lastFrame=frame
            current.evaluateJavascript("window.PingClashScene?.frame($frame)",null)
        }
    }
    fun dispose() {
        handler.removeCallbacksAndMessages(null)
        val current=view;view=null;ready=false;loaded=false;polling=false;active=false
        current?.stopLoading();current?.destroy()
    }
}
