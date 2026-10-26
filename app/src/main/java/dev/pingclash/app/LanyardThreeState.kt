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
internal data class ThreeControlText(val phase: String,val label: String,val status: String,val motion: Boolean=false)

@Stable internal class LanyardThreeState {
    var ready by mutableStateOf(false);private set
    var displayReady by mutableStateOf(false);private set
    var unavailable by mutableStateOf(false);private set
    var started by mutableStateOf(false);private set
    private var owner: Any?=null
    private var resume=0L
    private var hadFrame=false
    private val recovery=LanyardRecovery()
    private var epoch=0L
        set(value) {
            field=value;ready=false;lastFrame=""
            if(hadFrame)recovery.arm()
        }
    var scrollOffset by mutableFloatStateOf(0f);private set
    var hasControl by mutableStateOf(false);private set
    var active=false;private set
    var dragging by mutableStateOf(false);private set
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
    private var slotCenterX: Float?=null
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
                    if(view!==current||!loaded)return@evaluateJavascript
                    polling=false
                    val json=runCatching {JSONObject(org.json.JSONTokener(result).nextValue().toString())}.getOrNull()
                    ready=json?.optBoolean("ready")==true&&json.optLong("epoch",-1)==epoch&&
                        json.optString("paintedPhase")==phase&&json.optLong("resume",-1)==resume
                    if(ready) {
                        unavailable=false;displayReady=true;hadFrame=true;recovery.clear()
                    }
                }
            }
            when(recovery.next(active,ready)) {
                LanyardRecovery.Action.RETRY->{lastFrame="";flush()}
                LanyardRecovery.Action.FALLBACK->failed()
                LanyardRecovery.Action.NONE->Unit
            }
            if(active&&loaded)handler.postDelayed(this,if(ready)400 else 80)
        }
    }
    var renderer: WebView?
        get()=view
        set(value) {
            view=value;ready=false;displayReady=false;hadFrame=false
            loaded=false;polling=false;lastFrame="";recovery.clear()
        }
    fun pageLoaded() {loaded=true;lastFrame="";flush();handler.post(poll)}
    fun failed() {
        ready=false;displayReady=false;unavailable=true;loaded=false;polling=false;handler.removeCallbacks(poll)
    }
    fun viewport(width: Int,height: Int) {
        if(viewportWidth!=width||viewportHeight!=height) {
            initialTop=null;displayReady=false;epoch++
        }
        viewportWidth=width.coerceAtLeast(1);viewportHeight=height.coerceAtLeast(1);schedule()
    }
    fun visible(value: Boolean) {
        if(active==value)return
        active=value;handler.removeCallbacks(poll)
        if(value) {
            view?.onResume();resume++;ready=false;polling=false
            if(hadFrame)recovery.arm()
            flush();handler.post(poll)
        } else {flush();view?.onPause()}
    }
    fun control(token: Any,attached: Boolean) {
        if(!attached&&owner!==token)return
        owner=if(attached)token else null
        held=false;dragging=false;dx=0f;dy=0f
        if(attached)started=true else hasControl=false
        schedule()
    }
    fun slot(token: Any,top: Float,height: Float,centerX: Float?=null) {
        if(owner!==token||!active)return
        if(!top.isFinite()||!height.isFinite())return
        val newControl=!hasControl||slotHeight!=height
        val lowerAnchor=top>(initialTop?:top)
        if(initialTop==null||newControl||lowerAnchor)initialTop=top
        hasControl=height>0
        slotTop=top;slotHeight=height;slotCenterX=centerX?.takeIf {it.isFinite()}
        scrollOffset=top-(initialTop?:top);schedule()
    }
    fun pose(token: Any,value: LanyardPose,offset: Offset,density: Density,text: ThreeControlText) {
        if(owner!==token)return
        if(phase!=text.phase) {
            epoch++
            if(!active)displayReady=false
        }
        dx=offset.x*density.density;dy=offset.y*density.density;held=value.holding;dragging=held;motion=text.motion
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
        val frame=JSONObject().put("active",active&&hasControl&&slotHeight>0).put("motion",motion).put("held",held)
            .put("epoch",epoch).put("resume",resume).put("back",lanyardBackFace(phase)).put("phase",phase)
            .put("label",label).put("status",status)
            .put("viewportWidth",viewportWidth).put("viewportHeight",viewportHeight)
            .put("top",initialTop?:slotTop).put("height",slotHeight).put("fontScale",fontScale)
            .put("centerX",slotCenterX?:viewportWidth/2f)
            .put("dx",dx).put("dy",dy).toString()
        if(frame!=lastFrame) {
            lastFrame=frame
            current.evaluateJavascript("window.PingClashScene?.frame($frame)",null)
        }
    }
    fun dispose() {
        handler.removeCallbacksAndMessages(null)
        view=null;ready=false;displayReady=false;hadFrame=false;recovery.clear()
        loaded=false;polling=false;active=false;scheduled=false
        owner=null;hasControl=false;started=false;held=false;dragging=false;lastFrame="";initialTop=null
    }
}
