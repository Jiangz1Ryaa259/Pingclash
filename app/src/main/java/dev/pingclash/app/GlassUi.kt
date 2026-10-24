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
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
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
@Composable internal fun rememberMotionAllowed(reduceEffects: Boolean=false): Boolean {
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
    return enabled&&!reduceEffects
}

// Translucent material with a fine highlight. It does not screenshot or copy the
// page into a blur bitmap, so protected rules and credentials never enter a cache.
@Suppress("MagicNumber")
@Composable internal fun GlassNavigation(selected: Int,onSelect: (Int)->Unit) {
    val motion=LocalMotionAllowed.current
    val current by rememberUpdatedState(selected)
    val select by rememberUpdatedState(onSelect)
    val haptic=LocalHapticFeedback.current
    var dragPosition by remember {mutableStateOf<Float?>(null)}
    val position by animateFloatAsState(dragPosition?:selected.toFloat(),
        animationSpec=if(motion&&dragPosition==null) spring(dampingRatio=.86f,stiffness=550f) else snap(),label="glass-navigation-position")
    val panel=Panel;val line=MaterialTheme.colorScheme.outlineVariant;val accent=MaterialTheme.colorScheme.primaryContainer
    val edge=Mint
    val fontScale=LocalDensity.current.fontScale
    val height=if(fontScale>=1.6f) (43+36*fontScale).dp else 72.dp
    BoxWithConstraints(Modifier.navigationBarsPadding().padding(horizontal=18.dp,vertical=10.dp).fillMaxWidth()
        .height(height).testTag("glass-navigation")) {
        val cellWidth=with(LocalDensity.current) {maxWidth.toPx()/4f}
        Box(Modifier.fillMaxSize().graphicsLayer {shadowElevation=2.dp.toPx();shape=UiCorners.Pill;clip=false}
            .clip(UiCorners.Pill).background(panel.copy(alpha=NAV_TINT_ALPHA))
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
                drawRoundRect(line.copy(alpha=.8f),cornerRadius=CornerRadius(size.height/2f),style=Stroke(1.dp.toPx()))
                val x=position*w+inset
                drawRoundRect(accent,Offset(x,inset),Size(w-inset*2,size.height-inset*2),
                    CornerRadius((size.height-inset*2)/2f))
                drawRoundRect(edge.copy(alpha=NAV_SELECTOR_EDGE_ALPHA),Offset(x,inset),
                    Size(w-inset*2,size.height-inset*2),
                    CornerRadius((size.height-inset*2)/2f),style=Stroke(1.dp.toPx()))
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
                        Text(label,style=MaterialTheme.typography.labelSmall,
                            fontWeight=if(chosen)FontWeight.SemiBold else FontWeight.Normal,color=tint,
                            maxLines=if(fontScale>=1.6f)2 else 1)
                    }
                }
            }
        }
    }
}

// Motion dimensions and timings are deliberate visual design constants.
@Suppress("MagicNumber")
@Composable internal fun VpnPowerControl(phase: String,enabled: Boolean,label: String,onClick: ()->Unit) {
    val motion=LocalMotionAllowed.current
    val foregroundVisible=rememberForeground()
    val connected=phase=="established"
    val interactions=remember {MutableInteractionSource()}
    val pressed by interactions.collectIsPressedAsState()
    val scale=animateFloatAsState(if(pressed) .97f else 1f,
        if(motion)spring(.85f,600f) else snap(),label="vpn-press")
    val color by animateColorAsState(if(connected) MaterialTheme.colorScheme.primaryContainer else Mint,
        if(motion)tween(280) else snap(),label="vpn-color")
    val preferred=if(connected)MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onPrimary
    val foreground=controlForeground(preferred,color)
    val haptic=LocalHapticFeedback.current
    val description=vpnControlDescription(phase)
    Box(Modifier.fillMaxWidth(),contentAlignment=Alignment.Center) {
        if(phase=="connecting"&&motion&&foregroundVisible) ConnectingRipples(Modifier.matchParentSize())
        Surface(onClick={haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove);onClick()},
            enabled=enabled&&phase!="stopping",shape=UiCorners.Pill,color=color,contentColor=foreground,
            border=BorderStroke(1.dp,if(connected)Mint else color),interactionSource=interactions,
            modifier=Modifier.padding(horizontal=12.dp,vertical=14.dp).fillMaxWidth().heightIn(min=64.dp)
                .graphicsLayer {scaleX=scale.value;scaleY=scale.value}.testTag("vpn-power")
                .semantics {stateDescription=description}) {
            Row(Modifier.padding(horizontal=18.dp,vertical=12.dp),verticalAlignment=Alignment.CenterVertically,
                horizontalArrangement=Arrangement.spacedBy(10.dp,Alignment.CenterHorizontally)) {
                VpnStateGlyph(phase,motion&&foregroundVisible,foreground)
                Text(label,textAlign=TextAlign.Center,style=MaterialTheme.typography.labelLarge)
            }
        }
    }
}

private fun vpnControlDescription(phase: String): String = tr(when(phase) {
    "established" -> R.string.message_5be0323e8a
    "connecting","stopping" -> R.string.message_694b71bc80
    else -> R.string.message_3d52574ce1
})

@Suppress("MagicNumber")
@Composable private fun ConnectingRipples(modifier: Modifier) {
    val progress=rememberInfiniteTransition(label="connect-ripples").animateFloat(
        0f,1f,infiniteRepeatable(tween(2400,easing=LinearEasing)),label="ripple-progress")
    val color=Mint
    Canvas(modifier) {
        repeat(3) {index ->
            val fraction=(progress.value+index/3f)%1f
            val inset=(1f-fraction)*12.dp.toPx()+1.dp.toPx()
            drawRoundRect(color.copy(alpha=(1f-fraction)*.22f),Offset(inset,inset),
                Size(size.width-2*inset,size.height-2*inset),CornerRadius(size.height/2f),
                style=Stroke(1.dp.toPx()))
        }
    }
}
