// SPDX-License-Identifier: GPL-3.0-only
// Physical proportions, lighting and spring values are deliberate visual design constants.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.snap
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.interaction.MutableInteractionSource
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsPropertyKey
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

internal val LanyardDisplacement=SemanticsPropertyKey<Float>("LanyardDisplacement")
internal val LanyardAnimating=SemanticsPropertyKey<Boolean>("LanyardAnimating")

@Stable private class LanyardPose {
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
    val interactions=remember {MutableInteractionSource()}
    val follow=moving&&pose.holding
    val spec=if(moving&&!pose.holding)spring<Float>(.64f,190f) else snap()
    val x by animateFloatAsState(if(follow)pose.drag.x else 0f,spec,label="lanyard-x")
    val y by animateFloatAsState(if(follow)pose.drag.y else 0f,spec,label="lanyard-y")
    val turn by animateFloatAsState(if(phase=="established")180f else 0f,
        if(moving)spring(.83f,180f) else snap(),label="lanyard-face")
    val large=density.fontScale>=1.6f
    val cardHeight=if(large)320.dp else 262.dp
    val description=vpnControlDescription(phase)
    LaunchedEffect(available,moving) {pose.drag=Offset.Zero;pose.holding=false}
    Box(Modifier.fillMaxWidth().height(cardHeight+84.dp).testTag("lanyard-stage")
        .semantics {this[LanyardDisplacement]=kotlin.math.abs(x)+kotlin.math.abs(y)
            this[LanyardAnimating]=lanyardInMotion(moving,pose.holding,kotlin.math.abs(x)+kotlin.math.abs(y))}) {
        LanyardStrap(x,y,Modifier.fillMaxSize())
        Box(Modifier.align(Alignment.TopCenter).padding(top=66.dp).width(222.dp).height(cardHeight)
            .graphicsLayer {
                translationX=x*density.density;translationY=y*density.density
                rotationZ=x*.19f;rotationX=-y*.38f;rotationY=turn+x*.30f
                transformOrigin=TransformOrigin(.5f,.04f);cameraDistance=1100f*density.density
                alpha=if(available)1f else .62f
            }
            .testTag("vpn-power").semantics {stateDescription=description}
            .lanyardDrag(available,moving,density.density,pose)
            .clickable(interactionSource=interactions,indication=null,enabled=available,
                role=Role.Button,onClickLabel=label) {
                haptics.performHapticFeedback(HapticFeedbackType.TextHandleMove);action()
            }) {
            val reverse=turn>90f&&turn<270f
            LanyardFace(phase,label,reverse,x,Modifier.fillMaxSize().padding(top=26.dp)
                .graphicsLayer {rotationY=if(reverse)180f else 0f})
            LanyardClasp(Modifier.align(Alignment.TopCenter).width(50.dp).height(50.dp))
        }
    }
}

private fun lanyardInMotion(moving: Boolean,holding: Boolean,distance: Float)=moving&&(holding||distance>.1f)

private fun Modifier.lanyardDrag(available: Boolean,moving: Boolean,density: Float,pose: LanyardPose)=
    pointerInput(available,moving) {
        if(available)try {
            detectDragGestures(onDragStart={pose.drag=Offset.Zero;pose.holding=true},onDragEnd={pose.holding=false},
                onDragCancel={pose.holding=false},onDrag={change,amount ->
                    change.consume()
                    if(moving)pose.drag=Offset((pose.drag.x+amount.x/density).coerceIn(-38f,38f),
                        (pose.drag.y+amount.y/density).coerceIn(-18f,26f))
                })
        } finally {pose.holding=false;pose.drag=Offset.Zero}
    }

@Composable private fun LanyardFace(phase: String,label: String,reverse: Boolean,tilt: Float,modifier: Modifier) {
    val ink=Color(0xFFEAF0F0)
    val accent=if(reverse)Color(0xFF9DDDD0) else Color(0xFFD0DCDD)
    val shape=RoundedCornerShape(15.dp)
    Column(modifier.graphicsLayer {shadowElevation=18.dp.toPx();this.shape=shape;clip=false}
        .clip(shape).background(Brush.linearGradient(if(reverse)
            listOf(Color(0xFF172D2D),Color(0xFF102020),Color(0xFF1C3836)) else
            listOf(Color(0xFF303739),Color(0xFF171D20),Color(0xFF232C30))))
        .border(1.dp,Brush.linearGradient(listOf(Color.White.copy(alpha=.48f),Color.White.copy(alpha=.05f),
            Color.White.copy(alpha=.22f))),shape),horizontalAlignment=Alignment.CenterHorizontally) {
        Box(Modifier.fillMaxSize()) {
            LanyardFinish(tilt,Modifier.matchParentSize())
            Column(Modifier.fillMaxSize().padding(horizontal=22.dp,vertical=24.dp),
                horizontalAlignment=Alignment.CenterHorizontally) {
                Row(Modifier.fillMaxWidth(),verticalAlignment=Alignment.CenterVertically,
                    horizontalArrangement=Arrangement.SpaceBetween) {
                    Text("PingClash",color=ink,style=MaterialTheme.typography.labelLarge,fontWeight=FontWeight.Medium)
                    Canvas(Modifier.size(6.dp)) {drawCircle(if(phase=="established")accent else ink.copy(alpha=.45f))}
                }
                Spacer(Modifier.weight(1f))
                Box(Modifier.size(66.dp).graphicsLayer {scaleX=1.9f;scaleY=1.9f},contentAlignment=Alignment.Center) {
                    VpnStateGlyph(phase,LocalMotionAllowed.current&&rememberForeground(),accent)
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
