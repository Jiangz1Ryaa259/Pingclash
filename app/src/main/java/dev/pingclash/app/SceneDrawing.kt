// SPDX-License-Identifier: GPL-3.0-only
// Scene coordinates and colors are local visual design tokens.
@file:Suppress("MagicNumber")

package dev.pingclash.app

import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.geometry.RoundRect
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.withTransform
import androidx.compose.ui.unit.dp
import kotlin.math.PI
import kotlin.math.sin

internal fun sceneCloudPath()=Path().apply {
    addRoundRect(RoundRect(0f,8f,100f,34f,CornerRadius(13f)))
    addOval(Rect(7f,-5f,41f,29f))
    addOval(Rect(27f,-20f,75f,28f))
    addOval(Rect(59f,-5f,95f,31f))
}

internal fun DrawScope.drawSceneSky(dark: Boolean,phase: Float,cloudy: Boolean,cloud: Path) {
    val top=if(dark)Color(0xFF0B2035) else Color(0xFFB9E0F7)
    val bottom=if(dark)Color(0xFF21465D) else Color(0xFFF1FAFF)
    drawRect(Brush.verticalGradient(listOf(top,bottom)))
    val sun=Offset(size.width*.80f,size.height*.105f)
    drawCircle(if(dark)Color(0xFFCFDDE6).copy(alpha=.12f) else Color(0xFFFFF1C8).copy(alpha=.35f),
        40.dp.toPx(),sun)
    drawCircle(if(dark)Color(0xFFD2E1E9) else Color(0xFFFFF5D7),23.dp.toPx(),sun)
    val white=if(dark)Color(0xFF466C86) else Color.White.copy(alpha=.90f)
    repeat(if(cloudy)7 else 3) {index ->
        val x=((index*.43f+phase*1.6f)%1.6f-.3f)*size.width
        val y=size.height*(if(cloudy).09f+index*.14f else .075f+index*.047f)
        drawSceneCloud(Offset(x,y),if(index%2==0).85f else 1.15f,white,cloud)
    }
}

private fun DrawScope.drawSceneCloud(origin: Offset,factor: Float,color: Color,cloud: Path) {
    val scale=factor*density
    withTransform({translate(origin.x,origin.y);scale(scale,scale,Offset.Zero)}) {
        drawPath(cloud,color)
    }
}

internal fun DrawScope.drawSceneOcean(dark: Boolean,phase: Float,colors: List<Color>,paths: List<Path>) {
    val horizon=size.height*.20f
    drawRect(Brush.verticalGradient(listOf(colors[0],colors[1],colors[2]),horizon,size.height),
        Offset(0f,horizon),Size(size.width,size.height-horizon))
    drawLine(Color.White.copy(alpha=if(dark).12f else .45f),Offset(0f,horizon),
        Offset(size.width,horizon),1.dp.toPx())
    drawReflections(horizon,phase,dark)
    paths.forEachIndexed {index,path ->
        val base=size.height*(.48f+index*.22f)
        val amplitude=(12+index*4).dp.toPx()
        path.rewind();path.moveTo(0f,size.height)
        var x=0f
        while(x<=size.width+12.dp.toPx()) {
            val angle=x/size.width*PI*(1.8+index*.3)+phase*PI*12+index
            path.lineTo(x,base+amplitude*sin(angle).toFloat())
            x+=12.dp.toPx()
        }
        path.lineTo(size.width,size.height);path.close()
        drawPath(path,colors[index].copy(alpha=if(dark).7f else .65f))
        path.rewind();x=0f
        while(x<=size.width+12.dp.toPx()) {
            val angle=x/size.width*PI*(1.8+index*.3)+phase*PI*12+index
            val y=base+amplitude*sin(angle).toFloat()
            if(x==0f)path.moveTo(x,y) else path.lineTo(x,y)
            x+=12.dp.toPx()
        }
        drawPath(path,Color.White.copy(alpha=if(dark).16f else .34f),style=Stroke(1.3.dp.toPx()))
    }
}

private fun DrawScope.drawReflections(horizon: Float,phase: Float,dark: Boolean) {
    repeat(9) {index ->
        val y=horizon+14.dp.toPx()+index*14.dp.toPx()
        val drift=sin(phase*PI*12+index).toFloat()*12.dp.toPx()
        val half=(10+index*4).dp.toPx()
        val center=size.width*.80f+drift
        drawLine(Color.White.copy(alpha=if(dark).12f else .30f),Offset(center-half,y),
            Offset(center+half,y),1.5.dp.toPx(),StrokeCap.Round)
    }
}
