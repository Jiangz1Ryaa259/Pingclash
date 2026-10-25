// SPDX-License-Identifier: GPL-3.0-only
// Analytic wave normals, reflected procedural sky and clouds; no image or video input.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.graphics.Paint
import android.graphics.RuntimeShader
import androidx.annotation.RequiresApi
import androidx.compose.foundation.Canvas
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.tween
import androidx.compose.animation.core.LinearEasing
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
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
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.semantics
import kotlinx.coroutines.isActive

@RequiresApi(33)
@Composable internal fun RealtimeOcean(modifier: Modifier,clouds: Boolean) {
    val shader=remember {RuntimeShader(OCEAN_SHADER)}
    val paint=remember(shader) {Paint().apply {this.shader=shader}}
    val active=LocalMotionAllowed.current&&rememberForeground()
    val time=if(active)rememberInfiniteTransition(label="live-ocean").animateFloat(0f,125.663706f,
        infiniteRepeatable(tween(125664,easing=LinearEasing)),label="ocean-time")
        else remember {mutableFloatStateOf(0f)}
    val depth=LocalSceneDepth.current
    val dark=MaterialTheme.colorScheme.background.luminance()<.5f
    Canvas(modifier.testTag("ocean-backdrop").semantics {
        this[DecorativeEffectRunning]=active;this[SceneDiveProgress]=depth.floatValue
    }) {
        shader.setFloatUniform("resolution",size.width,size.height)
        shader.setFloatUniform("clock",time.value)
        shader.setFloatUniform("night",if(dark)1f else 0f)
        shader.setFloatUniform("cloudOnly",if(clouds)1f else 0f)
        shader.setFloatUniform("dive",depth.floatValue.coerceIn(0f,1f))
        drawIntoCanvas {it.nativeCanvas.drawRect(0f,0f,size.width,size.height,paint)}
    }
}

private const val OCEAN_SHADER="""
uniform float2 resolution;
uniform float clock;
uniform float night;
uniform float cloudOnly;
uniform float dive;
float hash(float2 p) {return fract(sin(dot(p,float2(127.1,311.7)))*43758.5453);}
float noise(float2 p) {
 float2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+float2(1,0)),f.x),mix(hash(i+float2(0,1)),hash(i+float2(1,1)),f.x),f.y);
}
float cloud(float2 p) {
 float v=.55*noise(p);p=p*2.03+11.2;v+=.28*noise(p);p=p*2.01-7.4;return v+.14*noise(p);
}
float3 sky(float3 ray) {
 float h=clamp(ray.y,0.,1.);
 float3 day=mix(float3(.76,.86,.89),float3(.16,.40,.61),pow(h,.52));
 float3 dark=mix(float3(.17,.25,.34),float3(.025,.055,.11),pow(h,.55));
 float3 c=mix(day,dark,night);
 float2 cp=ray.xz/max(.12,ray.y)*1.6+float2(sin(clock*.05)*.45,(cos(clock*.05)-1.)*.15);
 float n=cloud(cp),light=cloud(cp+float2(-.12,.07));
 float mask=smoothstep(.34,.67,n)*smoothstep(.0,.10,h);
 float3 white=mix(float3(.97,.95,.88),float3(.25,.32,.42),night);
 c=mix(c,white*(.73+.3*light),mask*.88);
 float sun=pow(max(dot(ray,normalize(float3(.18,.24,1.05))),0.),260.);
 return c+sun*mix(float3(1.,.78,.46),float3(.42,.48,.58),night)*.9;
}
float3 normalAt(float2 p) {
 float t=clock;
 float a=p.x*.75+p.y*1.4-t*.9;
 float b=p.x*-1.5+p.y*.6-t*1.25;
 float c=p.x*3.8+p.y*2.5-t*1.7;
 float d=p.x*-7.1+p.y*5.6-t*2.2;
 float dx=.13*.75*cos(a)-.06*1.5*cos(b)+.022*3.8*cos(c)-.008*7.1*cos(d);
 float dz=.13*1.4*cos(a)+.06*.6*cos(b)+.022*2.5*cos(c)+.008*5.6*cos(d);
 return normalize(float3(-dx,1.,-dz));
}
float waveHeight(float2 p) {
 return .13*sin(p.x*.75+p.y*1.4-clock*.9)+.06*sin(p.x*-1.5+p.y*.6-clock*1.25)
  +.022*sin(p.x*3.8+p.y*2.5-clock*1.7)+.008*sin(p.x*-7.1+p.y*5.6-clock*2.2);
}
half4 main(float2 pixel) {
 float2 uv=(pixel/resolution-.5)*float2(resolution.x/resolution.y,1.);
 float3 ray=normalize(float3(uv.x,(.38-dive*.3)-pixel.y/resolution.y,1.05));
 float3 color;
 if(ray.y>=0. || cloudOnly>.5) {color=sky(normalize(float3(ray.x,abs(ray.y)+cloudOnly*.22,ray.z)));}
 else {
  float distance=min(110.,1.5/max(.015,-ray.y));
  for(int step=0;step<4;step++) {
   float hit=(1.5-waveHeight(ray.xz*distance))/max(.015,-ray.y);
   distance=mix(distance,clamp(hit,0.,110.),.45);
  }
  float2 p=ray.xz*distance;
  float3 n=normalAt(p);
  float3 reflected=reflect(ray,n);
  float fresnel=.035+.965*pow(1.-max(dot(-ray,n),0.),4.);
  float3 water=mix(float3(.02,.19,.24),float3(.008,.047,.085),night);
  color=mix(water,sky(float3(reflected.x,abs(reflected.y),reflected.z)),fresnel*.88+.12);
  float glint=pow(max(dot(reflect(-normalize(float3(.18,.24,1.05)),n),-ray),0.),110.);
  color+=glint*mix(float3(1.3,1.04,.67),float3(.4,.46,.57),night);
  color=mix(color,sky(float3(ray.x,.015,ray.z)),exp(-distance*.075)*.03);
  float fog=smoothstep(16.,65.,distance);color=mix(color,sky(float3(ray.x,.01,ray.z)),fog);
 }
 color=mix(color,float3(.008,.14,.20),dive*.7);
 color*=1.-.15*length(uv);
 return half4(clamp(color,0.,1.),1.);
}
"""
