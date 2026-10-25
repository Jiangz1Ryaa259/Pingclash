// SPDX-License-Identifier: GPL-3.0-only
// Softbox lighting, bevels and micrograin are intentional material constants.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.graphics.Bitmap
import android.graphics.BitmapShader
import android.graphics.Canvas
import android.graphics.LinearGradient
import android.graphics.Paint
import android.graphics.RuntimeShader
import android.graphics.Shader
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.Canvas as ComposeCanvas
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.SemanticsPropertyKey
import androidx.compose.ui.semantics.semantics

internal val LanyardMaterialMode=SemanticsPropertyKey<String>("LanyardMaterialMode")

@Composable internal fun LanyardSurface(back: Boolean,tilt: Float,modifier: Modifier) {
    val painter=remember {createCardMaterial()}
    ComposeCanvas(modifier.testTag("lanyard-material").semantics {this[LanyardMaterialMode]=painter.mode}) {
        drawIntoCanvas {painter.draw(it.nativeCanvas,size.width,size.height,back,tilt)}
    }
}

private interface CardMaterial {
    val mode: String
    fun draw(canvas: Canvas,width: Float,height: Float,back: Boolean,tilt: Float)
}

private fun createCardMaterial(): CardMaterial {
    if(Build.VERSION.SDK_INT>=33) {
        try {return LitCardMaterial()} catch(_: IllegalArgumentException) { /* Unsupported shader: native fallback. */ }
    }
    return SatinCardMaterial()
}

@RequiresApi(33)
private class LitCardMaterial: CardMaterial {
    override val mode="agsl"
    private val shader=RuntimeShader(CARD_LIGHTING)
    private val paint=Paint(Paint.ANTI_ALIAS_FLAG).apply {this.shader=this@LitCardMaterial.shader}
    override fun draw(canvas: Canvas,width: Float,height: Float,back: Boolean,tilt: Float) {
        shader.setFloatUniform("resolution",width,height)
        shader.setFloatUniform("tilt",tilt)
        shader.setFloatUniform("back",if(back)1f else 0f)
        canvas.drawRect(0f,0f,width,height,paint)
    }
}

/** Older APIs retain a micrograined satin finish, native highlights and a beveled rim. */
private class SatinCardMaterial: CardMaterial {
    override val mode="satin"
    private val paint=Paint(Paint.ANTI_ALIAS_FLAG)
    private val grain=Bitmap.createBitmap(96,96,Bitmap.Config.ARGB_8888).apply {
        val pixels=IntArray(96*96) {i ->
            val n=((i*1103515245+12345).ushr(17) and 7)
            (n shl 24) or 0x00FFFFFF
        }
        setPixels(pixels,0,96,0,0,96,96)
    }
    private val grainShader=BitmapShader(grain,Shader.TileMode.REPEAT,Shader.TileMode.REPEAT)
    override fun draw(canvas: Canvas,width: Float,height: Float,back: Boolean,tilt: Float) {
        val colors=if(back)intArrayOf(0xFF1E3B42.toInt(),0xFF102027.toInt(),0xFF28434A.toInt())
            else intArrayOf(0xFFF1F0EA.toInt(),0xFFD2D7D7.toInt(),0xFFE8EBE6.toInt())
        paint.shader=LinearGradient(0f,0f,width,height,colors,null,Shader.TileMode.CLAMP)
        canvas.drawRect(0f,0f,width,height,paint)
        paint.shader=grainShader;canvas.drawRect(0f,0f,width,height,paint)
        val center=width*(.18f+tilt*.008f)
        paint.shader=LinearGradient(center-width*.3f,0f,center+width*.6f,height*.35f,
            intArrayOf(0x00FFFFFF,0x40FFFFFF,0x00FFFFFF),floatArrayOf(0f,.5f,1f),Shader.TileMode.CLAMP)
        canvas.drawRect(0f,0f,width,height,paint)
        paint.shader=null;paint.style=Paint.Style.STROKE;paint.strokeWidth=2f;paint.color=0x88FFFFFF.toInt()
        canvas.drawRoundRect(1f,1f,width-1,height-1,width*.06f,width*.06f,paint)
        paint.style=Paint.Style.FILL
    }
}

private const val CARD_LIGHTING="""
uniform float2 resolution;
uniform float tilt;
uniform float back;

float edge(float2 p,float2 halfSize,float radius) {
    float2 q=abs(p)-halfSize+radius;
    return length(max(q,0.0))+min(max(q.x,q.y),0.0)-radius;
}
float hash(float2 p) {
    return fract(sin(dot(p,float2(127.1,311.7)))*43758.5453);
}
half4 main(float2 frag) {
    float2 uv=frag/resolution;
    float aspect=resolution.y/resolution.x;
    float2 p=(uv-0.5)*float2(1.0,aspect);
    float2 bounds=float2(0.5,aspect*0.5);
    float distance=edge(p,bounds,0.065);
    if(distance>0.002)return half4(0.0);
    float2 gradient=normalize(float2(
        edge(p+float2(0.001,0.0),bounds,0.065)-edge(p-float2(0.001,0.0),bounds,0.065)+0.000001,
        edge(p+float2(0.0,0.001),bounds,0.065)-edge(p-float2(0.0,0.001),bounds,0.065)+0.000001));
    float bevel=smoothstep(-0.014,0.001,distance)*0.86;
    float3 n=normalize(float3(gradient*bevel,1.0-bevel*0.65));
    float angle=tilt*0.012;
    n=float3(n.x*cos(angle)+n.z*sin(angle),n.y,n.z*cos(angle)-n.x*sin(angle));
    float3 view=normalize(float3((uv-0.5)*0.35,1.0));
    float3 ray=reflect(-view,n);
    float strip=exp(-pow((ray.x+ray.z*0.46)/0.12,2.0));
    float fill=exp(-pow((ray.x-ray.z*0.55)/0.34,2.0))*0.5;
    float sky=0.18+0.24*max(0.0,ray.y);
    float fresnel=0.04+0.96*pow(1.0-max(dot(n,view),0.0),5.0);
    float grain=(hash(frag)-0.5)*0.011;
    float brushing=sin(frag.y*2.5+hash(float2(frag.y,1.0))*2.0)*0.002;
    float light=max(dot(n,normalize(float3(-0.5,-0.7,1.0))),0.0);
    float3 base=mix(float3(0.80,0.82,0.80),float3(0.035,0.075,0.09),back);
    float3 color=base*(0.74+0.22*light)+grain+brushing;
    color+=(strip*1.5+fill+sky)*(0.08+fresnel*0.65);
    color+=bevel*float3(0.15,0.17,0.17);
    float glint=pow(max(dot(n,normalize(view+normalize(float3(-0.6,-0.8,1.0)))),0.0),90.0);
    color+=glint*0.13;
    return half4(clamp(color,0.0,1.0),1.0);
}
"""
