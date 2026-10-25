// SPDX-License-Identifier: GPL-3.0-only
// Weave, brushed metal and softbox dimensions are visual design values.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.foundation.Canvas
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.clipPath
import androidx.compose.ui.unit.dp

@Composable internal fun LanyardStrap(x: Float,y: Float,modifier: Modifier) {
    Canvas(modifier) {
        val center=size.width/2
        val end=Offset(center+x.dp.toPx(),(74+y).dp.toPx())
        val path=Path().apply {
            moveTo(center,-8.dp.toPx())
            cubicTo(center-4.dp.toPx(),26.dp.toPx(),end.x+x.dp.toPx()*.2f,end.y-26.dp.toPx(),end.x,end.y)
        }
        drawPath(path,Color.Black.copy(alpha=.28f),style=Stroke(20.dp.toPx(),cap=StrokeCap.Butt))
        drawPath(path,Brush.horizontalGradient(listOf(Color(0xFF0A0C0D),Color(0xFF333B3E),
            Color(0xFF0D1113)),center-12.dp.toPx(),center+20.dp.toPx()),style=Stroke(15.dp.toPx()))
        val mask=Path().apply {
            moveTo(center-7.dp.toPx(),0f);lineTo(center+7.dp.toPx(),0f)
            lineTo(end.x+7.dp.toPx(),end.y);lineTo(end.x-7.dp.toPx(),end.y);close()
        }
        clipPath(mask) {
            var line=0f
            while(line<end.y) {
                drawLine(Color.White.copy(alpha=.10f),Offset(center-55.dp.toPx(),line),
                    Offset(center+55.dp.toPx(),line+6.dp.toPx()),.45.dp.toPx())
                line+=2.dp.toPx()
            }
        }
        drawPath(path,Color.White.copy(alpha=.08f),style=Stroke(.5.dp.toPx()))
    }
}

@Composable internal fun LanyardClasp(modifier: Modifier) {
    Canvas(modifier) {
        val metal=Brush.linearGradient(listOf(Color(0xFF454F55),Color(0xFFF3F5F6),Color(0xFF737D83),
            Color(0xFFDDE3E6),Color(0xFF343E43)))
        val center=size.width/2
        drawOval(Color.Black.copy(alpha=.35f),Offset(center-12.dp.toPx(),2.dp.toPx()),Size(24.dp.toPx(),29.dp.toPx()),
            style=Stroke(4.dp.toPx()))
        drawOval(metal,Offset(center-10.dp.toPx(),1.dp.toPx()),Size(20.dp.toPx(),27.dp.toPx()),
            style=Stroke(3.dp.toPx()))
        drawRoundRect(metal,Offset(center-17.dp.toPx(),22.dp.toPx()),
            Size(34.dp.toPx(),20.dp.toPx()),CornerRadius(4.dp.toPx()))
        drawLine(Color.White.copy(alpha=.75f),Offset(center-13.dp.toPx(),25.dp.toPx()),
            Offset(center+13.dp.toPx(),25.dp.toPx()),.7.dp.toPx())
        drawRoundRect(Color(0xFF101719),Offset(center-11.dp.toPx(),33.dp.toPx()),
            Size(22.dp.toPx(),3.dp.toPx()),CornerRadius(1.dp.toPx()))
    }
}

@Composable internal fun LanyardFinish(tilt: Float,modifier: Modifier) {
    Canvas(modifier) {
        val highlight=size.width*(.12f+tilt*.006f)
        drawRect(Brush.linearGradient(listOf(Color.White.copy(alpha=.18f),Color.Transparent,
            Color.White.copy(alpha=.025f)),
            start=Offset(highlight,0f),end=Offset(highlight+size.width*.85f,size.height*.82f)))
        val seam=18.dp.toPx()
        drawLine(Color.White.copy(alpha=.07f),Offset(seam,0f),Offset(seam,size.height),.5.dp.toPx())
        drawLine(Color.White.copy(alpha=.035f),Offset(size.width-seam,0f),
            Offset(size.width-seam,size.height),.5.dp.toPx())
        var line=1.dp.toPx()
        while(line<size.height) {
            drawLine(Color.White.copy(alpha=.013f),Offset(0f,line),Offset(size.width,line),.4.dp.toPx())
            line+=3.dp.toPx()
        }
    }
}
