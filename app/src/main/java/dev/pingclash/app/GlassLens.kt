// SPDX-License-Identifier: GPL-3.0-only
// Optical direction informed by FlClash v0.9.2, lib/ui/liquid_glass.dart and shaders/liquid_glass.frag (GPL-3.0).
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.graphics.RuntimeShader
import android.graphics.RenderEffect
import android.os.Build
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asComposeRenderEffect
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.graphics.layer.drawLayer
import androidx.compose.ui.graphics.rememberGraphicsLayer
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity

/** Refracts the Haze backdrop, not navigation labels; never captures a screen bitmap. */
@Composable internal fun GlassLensBackdrop(modifier: Modifier) {
    if(Build.VERSION.SDK_INT>=33&&LocalNavHaze.current!=null) {
        val shader=remember {RuntimeShader(LENS_SHADER)}
        val effect=remember(shader) {RenderEffect.createRuntimeShaderEffect(shader,"backdrop").asComposeRenderEffect()}
        val density=LocalDensity.current.density
        val layer=rememberGraphicsLayer()
        Box(modifier.fillMaxSize().clip(UiCorners.Pill).onSizeChanged {
            shader.setFloatUniform("extent",it.width.toFloat(),it.height.toFloat())
            shader.setFloatUniform("scale",density)
        }.drawWithContent {
            layer.record {this@drawWithContent.drawContent()}
            layer.renderEffect=effect
            drawLayer(layer)
        }) {
            // Separate render nodes: Haze owns its blur effect; the outer node refracts that result.
            Canvas(Modifier.fillMaxSize().navGlassMaterial()) {drawRect(Color.Transparent)}
        }
    } else Box(modifier.fillMaxSize().clip(UiCorners.Pill).navGlassMaterial())
}

private const val LENS_SHADER="""
uniform shader backdrop;
uniform float2 extent;
uniform float scale;
half4 main(float2 at) {
 float2 p=at-extent*.5;
 float radius=extent.y*.5;
 float2 q=abs(p)-float2(extent.x*.5-radius,0.);
 float distance=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
 float2 normal=normalize(float2(max(q.x,0.)*sign(p.x),p.y)+float2(.0001));
 float edge=1.-smoothstep(0.,18.*scale,-distance);
 float2 bend=normal*edge*edge*14.*scale;
 float2 sampleAt=clamp(at-bend,float2(.5),extent-.5);
 half4 color=backdrop.eval(sampleAt);
 half red=backdrop.eval(clamp(sampleAt+normal*edge*.55*scale,float2(.5),extent-.5)).r;
 half blue=backdrop.eval(clamp(sampleAt-normal*edge*.55*scale,float2(.5),extent-.5)).b;
 float rim=(1.-smoothstep(0.,1.7*scale,-distance))*.28;
 float light=pow(max(dot(normal,normalize(float2(-.4,-1.))),0.),3.)*rim;
 return half4(clamp(half3(red,color.g,blue)+half3(light),0.,1.),color.a);
}
"""
