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
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

@Composable internal fun LanyardClasp(tilt: Float,modifier: Modifier) {
    Canvas(modifier) {
        val metal=Brush.linearGradient(listOf(Color(0xFF363E44),Color(0xFFE9EDF0),Color(0xFF6C797E),
            Color.White,Color(0xFF414C52),Color(0xFFC4CFD3)),
            start=Offset((tilt*.03f).dp.toPx(),0f),end=Offset(size.width,size.height))
        val center=size.width/2
        drawOval(Color.Black.copy(alpha=.35f),Offset(center-12.dp.toPx(),2.dp.toPx()),Size(24.dp.toPx(),29.dp.toPx()),
            style=Stroke(4.dp.toPx()))
        drawOval(Color(0xFF47545B),Offset(center-10.dp.toPx(),1.dp.toPx()),Size(20.dp.toPx(),27.dp.toPx()),
            style=Stroke(4.5.dp.toPx()))
        drawOval(metal,Offset(center-10.dp.toPx(),1.dp.toPx()),Size(20.dp.toPx(),27.dp.toPx()),
            style=Stroke(3.4.dp.toPx()))
        drawOval(Color.White.copy(alpha=.7f),Offset(center-10.5f.dp.toPx(),.4f.dp.toPx()),
            Size(20.dp.toPx(),27.dp.toPx()),style=Stroke(.7f.dp.toPx()))
        drawRoundRect(metal,Offset(center-17.dp.toPx(),22.dp.toPx()),
            Size(34.dp.toPx(),20.dp.toPx()),CornerRadius(4.dp.toPx()))
        drawLine(Color.White.copy(alpha=.75f),Offset(center-13.dp.toPx(),25.dp.toPx()),
            Offset(center+13.dp.toPx(),25.dp.toPx()),.7.dp.toPx())
        drawRoundRect(Color(0xFF101719),Offset(center-11.dp.toPx(),33.dp.toPx()),
            Size(22.dp.toPx(),3.dp.toPx()),CornerRadius(1.dp.toPx()))
    }
}
