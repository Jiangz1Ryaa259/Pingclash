// SPDX-License-Identifier: GPL-3.0-only
// Physical proportions, lighting and spring values are deliberate visual design constants.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.snap
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.SemanticsPropertyKey
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

internal val LanyardDisplacement=SemanticsPropertyKey<Float>("LanyardDisplacement")
internal val LanyardAnimating=SemanticsPropertyKey<Boolean>("LanyardAnimating")
internal val LanyardFaceAngle=SemanticsPropertyKey<Float>("LanyardFaceAngle")

@Stable internal class LanyardPose {
    var drag by mutableStateOf(Offset.Zero)
    var holding by mutableStateOf(false)
}

/** Native hanging control. Dragging only changes its pose; VPN actions come from clicks. */
@Composable internal fun LanyardPowerControl(phase: String,enabled: Boolean,label: String,onClick: ()->Unit) {
    val moving=LocalMotionAllowed.current&&rememberForeground()
    val available=enabled&&phase!="stopping"
    val density=LocalDensity.current
    val haptics=LocalHapticFeedback.current
    val action by rememberUpdatedState(onClick)
    val pose=remember {LanyardPose()}
    val follow=moving&&pose.holding
    val spec=if(moving&&!pose.holding)spring<Float>(.64f,190f) else snap()
    val x by animateFloatAsState(if(follow)pose.drag.x else 0f,spec,label="lanyard-x")
    val y by animateFloatAsState(if(follow)pose.drag.y else 0f,spec,label="lanyard-y")
    val turn by animateFloatAsState(if(lanyardBackFace(phase))180f else 0f,
        if(moving)spring(.83f,180f) else snap(),label="lanyard-face")
    val large=density.fontScale>=1.6f
    val cardHeight=if(large)320.dp else 262.dp
    val description=vpnControlDescription(phase)
    val anchor=Modifier.lanyardAnchor()
    val performTap={haptics.performHapticFeedback(HapticFeedbackType.TextHandleMove);action()}
    LaunchedEffect(available,moving) {pose.drag=Offset.Zero;pose.holding=false}
    Box(Modifier.fillMaxWidth().height(cardHeight+84.dp).testTag("lanyard-stage")
        .semantics {this[LanyardDisplacement]=kotlin.math.abs(x)+kotlin.math.abs(y)
            this[LanyardFaceAngle]=turn
            this[LanyardAnimating]=lanyardInMotion(moving,pose.holding,kotlin.math.abs(x)+kotlin.math.abs(y))}) {
        LocalLanyardStrap(x,y,Modifier.fillMaxSize())
        Box(Modifier.align(Alignment.TopCenter).padding(top=66.dp).width(222.dp).height(cardHeight)
            .graphicsLayer {
                translationX=x*density.density;translationY=y*density.density
                rotationZ=x*.19f;rotationX=-y*.38f;rotationY=turn+x*.30f
                transformOrigin=TransformOrigin(.5f,.04f);cameraDistance=1100f*density.density
                alpha=if(available)1f else .62f
            }
            .then(anchor).testTag("vpn-power")
            .lanyardAction(available,label,description,performTap)
            .lanyardGestures(available,moving,density.density,pose,performTap)) {
            val reverse=turn>90f&&turn<270f
            LanyardFace(phase,label,reverse,x,Modifier.fillMaxSize().padding(top=26.dp)
                .graphicsLayer {rotationY=if(reverse)180f else 0f})
            LanyardClasp(x,Modifier.align(Alignment.TopCenter).width(50.dp).height(50.dp))
        }
    }
}

private fun lanyardInMotion(moving: Boolean,holding: Boolean,distance: Float)=moving&&(holding||distance>.1f)

internal fun lanyardBackFace(phase: String)=phase in listOf("connecting","established")

@Composable private fun LanyardFace(phase: String,label: String,reverse: Boolean,tilt: Float,modifier: Modifier) {
    val ink=if(reverse)Color(0xFFEAF0F0) else Color(0xFF172329)
    val accent=if(reverse)Color(0xFF9DDDD0) else Color(0xFF263A43)
    val shape=RoundedCornerShape(15.dp)
    Column(modifier.graphicsLayer {shadowElevation=18.dp.toPx();this.shape=shape;clip=false}
        .clip(shape),horizontalAlignment=Alignment.CenterHorizontally) {
        Box(Modifier.fillMaxSize()) {
            LanyardSurface(reverse,tilt,Modifier.matchParentSize())
            Column(Modifier.fillMaxSize().padding(horizontal=22.dp,vertical=24.dp),
                horizontalAlignment=Alignment.CenterHorizontally) {
                Row(Modifier.fillMaxWidth(),verticalAlignment=Alignment.CenterVertically,
                    horizontalArrangement=Arrangement.SpaceBetween) {
                    Text("PingClash",color=ink,style=MaterialTheme.typography.labelLarge,fontWeight=FontWeight.Medium)
                    Canvas(Modifier.size(6.dp)) {drawCircle(if(phase=="established")accent else ink.copy(alpha=.45f))}
                }
                Spacer(Modifier.weight(1f))
                Box(Modifier.size(66.dp),contentAlignment=Alignment.Center) {
                    CardPowerMark(phase,accent)
                }
                Spacer(Modifier.height(18.dp))
                Text(tr(when(phase) {
                    "established"->R.string.message_35f7d981fb
                    "connecting"->R.string.message_694186911a
                    "stopping"->R.string.message_b8d23e6673
                    "error"->R.string.ui_connection_failed
                    else->R.string.message_93ae902da0
                }),color=ink.copy(alpha=.76f),style=MaterialTheme.typography.labelMedium,
                    textAlign=TextAlign.Center)
                Spacer(Modifier.weight(1f))
                Canvas(Modifier.fillMaxWidth().height(1.dp)) {
                    drawLine(ink.copy(alpha=.16f),Offset.Zero,Offset(size.width,0f))
                }
                Spacer(Modifier.height(14.dp))
                Text(label,color=ink,style=MaterialTheme.typography.titleMedium,fontWeight=FontWeight.Medium,
                    textAlign=TextAlign.Center)
            }
        }
    }
}

@Composable private fun CardPowerMark(phase: String,color: Color) {
    if(phase in listOf("connecting","stopping")) {
        if(LocalMotionAllowed.current&&rememberForeground()) {
            CircularProgressIndicator(Modifier.size(36.dp),color=color,strokeWidth=1.5.dp)
        } else AppGlyph(16,Modifier.size(36.dp),color)
    } else AppGlyph(if(phase=="established")15 else 0,Modifier.size(40.dp),color)
}
