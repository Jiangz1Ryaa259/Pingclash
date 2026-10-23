// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.content.Context
import android.database.ContentObserver
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.view.accessibility.AccessibilityManager
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.geometry.RoundRect
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathMeasure
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.math.roundToInt

internal val LocalMotionAllowed = staticCompositionLocalOf { true }

// Read only the system's motion preference, never network or device identifiers.
// No background worker: observers exist only while this composition is visible.
@Composable internal fun rememberMotionAllowed(): Boolean {
    val context=LocalContext.current.applicationContext
    val accessibility=remember(context) {context.getSystemService(Context.ACCESSIBILITY_SERVICE) as AccessibilityManager}
    fun allowed() = runCatching {Settings.Global.getFloat(context.contentResolver,Settings.Global.ANIMATOR_DURATION_SCALE,1f)>0f && !accessibility.isTouchExplorationEnabled}.getOrDefault(false)
    var enabled by remember(context) {mutableStateOf(allowed())}
    DisposableEffect(context,accessibility) {
        val observer=object: ContentObserver(Handler(Looper.getMainLooper())) {override fun onChange(selfChange: Boolean) {enabled=allowed()}}
        val listener=AccessibilityManager.TouchExplorationStateChangeListener {enabled=allowed()}
        context.contentResolver.registerContentObserver(Settings.Global.getUriFor(Settings.Global.ANIMATOR_DURATION_SCALE),false,observer)
        accessibility.addTouchExplorationStateChangeListener(listener)
        onDispose {context.contentResolver.unregisterContentObserver(observer);accessibility.removeTouchExplorationStateChangeListener(listener)}
    }
    return enabled
}

// Translucent material with a fine highlight. It does not screenshot or copy the
// page into a blur bitmap, so protected rules and credentials never enter a cache.
@Composable internal fun GlassNavigation(selected: Int,onSelect: (Int)->Unit) {
    val motion=LocalMotionAllowed.current
    val current by rememberUpdatedState(selected)
    val select by rememberUpdatedState(onSelect)
    val haptic=LocalHapticFeedback.current
    var dragPosition by remember {mutableStateOf<Float?>(null)}
    val position by animateFloatAsState(dragPosition?:selected.toFloat(),
        animationSpec=if(motion&&dragPosition==null) spring(dampingRatio=.86f,stiffness=550f) else snap(),label="glass-navigation-position")
    val panel=Panel;val line=MaterialTheme.colorScheme.outlineVariant;val accent=MaterialTheme.colorScheme.primaryContainer
    val light=MaterialTheme.colorScheme.onSurface
    val height=if(LocalDensity.current.fontScale>=1.6f) 88.dp else 72.dp
    BoxWithConstraints(Modifier.navigationBarsPadding().padding(horizontal=18.dp,vertical=10.dp).fillMaxWidth()
        .height(height).testTag("glass-navigation")) {
        val cellWidth=with(LocalDensity.current) {maxWidth.toPx()/4f}
        Box(Modifier.fillMaxSize().graphicsLayer {shadowElevation=2.dp.toPx();shape=RoundedCornerShape(30.dp);clip=false}
            .clip(RoundedCornerShape(30.dp)).background(Brush.verticalGradient(listOf(panel.copy(alpha=.98f),panel.copy(alpha=.88f))))
            .pointerInput(cellWidth) {
                detectHorizontalDragGestures(
                    onDragStart={dragPosition=current.toFloat()},
                    onHorizontalDrag={change,amount -> change.consume();dragPosition=((dragPosition?:current.toFloat())+amount/cellWidth).coerceIn(0f,3f)},
                    onDragCancel={dragPosition=null},
                    onDragEnd={val target=(dragPosition?:current.toFloat()).roundToInt().coerceIn(0,3);dragPosition=null
                        if(target!=current) {haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove);select(target)}})
            }) {
            Canvas(Modifier.matchParentSize()) {
                val inset=5.dp.toPx();val w=size.width/4f
                drawRoundRect(line.copy(alpha=.8f),cornerRadius=CornerRadius(30.dp.toPx()),style=Stroke(1.dp.toPx()))
                val x=position*w+inset
                drawRoundRect(Brush.linearGradient(listOf(accent.copy(alpha=.95f),accent.copy(alpha=.62f))),Offset(x,inset),Size(w-inset*2,size.height-inset*2),CornerRadius(25.dp.toPx()))
                drawRoundRect(light.copy(alpha=.035f),Offset(x,inset),Size(w-inset*2,size.height-inset*2),CornerRadius(25.dp.toPx()),style=Stroke(1.dp.toPx()))
                drawLine(Color.White.copy(alpha=.34f),Offset(30.dp.toPx(),1.dp.toPx()),Offset(size.width-30.dp.toPx(),1.dp.toPx()),1.dp.toPx(),StrokeCap.Round)
            }
            Row(Modifier.fillMaxSize()) {
                listOf(tr(R.string.message_0853bf3c01),tr(R.string.message_5e84ea61e8),tr(R.string.message_148d195e21),tr(R.string.message_df3d58c7d8)).forEachIndexed {index,label ->
                    val chosen=selected==index
                    val tint by animateColorAsState(if(chosen) Mint else Muted,if(motion)tween(160) else snap(),label="navigation-tint")
                    Column(Modifier.weight(1f).fillMaxHeight().testTag("nav-$index")
                        .selectable(chosen,role=Role.Tab,onClick={if(index!=current){haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove);select(index)}}),
                        horizontalAlignment=Alignment.CenterHorizontally,verticalArrangement=Arrangement.spacedBy(4.dp,Alignment.CenterVertically)) {
                        AppGlyph(listOf(12,14,7,3)[index],Modifier.size(23.dp),tint)
                        Text((label),fontSize=11.sp,lineHeight=15.sp,fontWeight=if(chosen)FontWeight.SemiBold else FontWeight.Normal,color=tint,maxLines=1)
                    }
                }
            }
        }
    }
}

@Composable internal fun VpnPowerControl(phase: String,enabled: Boolean,label: String,onClick: ()->Unit) {
    val motion=LocalMotionAllowed.current
    val connected=phase=="established"
    val working=phase=="connecting"||phase=="stopping"
    val interactions=remember {MutableInteractionSource()}
    val pressed by interactions.collectIsPressedAsState()
    val scale by animateFloatAsState(if(pressed) .94f else 1f,if(motion)spring(.65f,600f) else snap(),label="vpn-press")
    val corner by animateIntAsState(if(connected) 36 else 50,if(motion)spring(.85f,400f) else snap(),label="vpn-shape")
    val color by animateColorAsState(if(connected) Mint else MaterialTheme.colorScheme.onSurface,
        if(motion)tween(280) else snap(),label="vpn-color")
    val foreground=if(connected) MaterialTheme.colorScheme.onPrimary else Panel
    val ring by animateFloatAsState(if(connected) 1f else 0f,if(motion)tween(460) else snap(),label="vpn-ring")
    val haptic=LocalHapticFeedback.current
    val state=(if(connected) tr(R.string.message_5be0323e8a) else if(working) tr(R.string.message_694b71bc80) else tr(R.string.message_3d52574ce1))
    val powerSize=if(LocalDensity.current.fontScale>=1.6f) 178.dp else 142.dp
    Column(horizontalAlignment=Alignment.CenterHorizontally,verticalArrangement=Arrangement.spacedBy(14.dp)) {
        Box(Modifier.size(powerSize+20.dp),contentAlignment=Alignment.Center) {
            val track=MaterialTheme.colorScheme.outlineVariant;val blue=Mint
            Canvas(Modifier.matchParentSize()) {
                val inset=3.dp.toPx();val extent=Size(size.width-2*inset,size.height-2*inset)
                val radius=CornerRadius(powerSize.toPx()*corner/100f+7.dp.toPx())
                drawRoundRect(track,Offset(inset,inset),extent,radius,style=Stroke(1.dp.toPx()))
                if(ring>0f) {
                    val outline=Path().apply {addRoundRect(RoundRect(inset,inset,size.width-inset,size.height-inset,radius))}
                    val measure=PathMeasure().apply {setPath(outline,true)}
                    val progress=Path();measure.getSegment(0f,measure.length*ring,progress,true)
                    drawPath(progress,blue,style=Stroke(2.dp.toPx(),cap=StrokeCap.Round))
                }
            }
            Surface(onClick={haptic.performHapticFeedback(HapticFeedbackType.LongPress);onClick()},enabled=enabled&&phase!="stopping",
                shape=RoundedCornerShape(corner),color=if(enabled)color else color.copy(alpha=.45f),contentColor=foreground,
                border=BorderStroke(1.dp,foreground.copy(alpha=.12f)),interactionSource=interactions,
                modifier=Modifier.size(powerSize).graphicsLayer {scaleX=scale;scaleY=scale}.testTag("vpn-power").semantics {stateDescription=state}) {
                Column(horizontalAlignment=Alignment.CenterHorizontally,verticalArrangement=Arrangement.spacedBy(10.dp,Alignment.CenterVertically)) {
                    if(working) CircularProgressIndicator(Modifier.size(34.dp),color=foreground,strokeWidth=2.dp)
                    else AppGlyph(0,Modifier.size(38.dp),foreground)
                    Text((label),Modifier.padding(horizontal=10.dp),textAlign=TextAlign.Center,style=MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}
