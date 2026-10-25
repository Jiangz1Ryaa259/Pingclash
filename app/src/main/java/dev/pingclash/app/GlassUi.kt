// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.content.Context
import android.database.ContentObserver
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.view.accessibility.AccessibilityManager
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.expandVertically
import androidx.compose.animation.shrinkVertically
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.clearAndSetSemantics
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
import androidx.compose.ui.graphics.luminance
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

// One optical material over one source; labels and original native actions stay sharp.
@Suppress("MagicNumber")
@Composable internal fun GlassNavigation(selected: Int,modifier: Modifier=Modifier,onSelect: (Int)->Unit) {
    val motion=LocalMotionAllowed.current
    val current by rememberUpdatedState(selected)
    val select by rememberUpdatedState(onSelect)
    val haptic=LocalHapticFeedback.current
    val rtl=androidx.compose.ui.platform.LocalLayoutDirection.current==androidx.compose.ui.unit.LayoutDirection.Rtl
    val drag=remember {NavigationDragState()}
    val dragPosition=drag.position
    val position by animateFloatAsState(dragPosition?:selected.toFloat(),
        if(motion&&dragPosition==null)spring(.78f,430f) else snap(),label="glass-navigation-position")
    val pressed by animateFloatAsState(if(dragPosition!=null&&motion)1f else 0f,
        if(motion)spring(.78f,550f) else snap(),label="glass-navigation-press")
    val dark=Ink.luminance()<.5f
    val style=LocalNavigationGlassStyle.current?:navigationGlassStyle(dark)
    val foreground=navLabelColor(dark)
    val backdrop=LocalNavigationBackdrop.current
    val blur=backdrop!=null||LocalNavHaze.current!=null
    val fontScale=LocalDensity.current.fontScale
    val height=navigationHeight()
    BoxWithConstraints(modifier.navigationBarsPadding().padding(horizontal=18.dp,vertical=12.dp).fillMaxWidth()
        .height(height).testTag("glass-navigation").semantics {this[NavBlurEnabled]=blur
            this[NavOpticalBackend]=if(backdrop!=null)"backdrop" else if(blur)"haze" else "opaque"}) {
        val cellWidth=with(LocalDensity.current) {maxWidth.toPx()/4f}
        val cellSize=maxWidth/4
        val visualPosition=if(rtl)3f-position else position
        Box(Modifier.fillMaxSize().navGlassMaterial(style)
            .navigationDrag(NavigationDragGeometry(cellWidth,rtl,current),drag) {
                haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove);select(it)
            }) {
            Box(Modifier.offset {androidx.compose.ui.unit.IntOffset((visualPosition*cellWidth+4.dp.toPx()).roundToInt(),4.dp.roundToPx())}
                .width(cellSize-8.dp).height(height-8.dp).testTag("glass-selector")
                .graphicsLayer {scaleX=1f+pressed*.06f;scaleY=1f-pressed*.035f}
                .navGlassMaterial(style.copy(refractionHeight=14.dp,refractionAmount=12.dp),selector=true))
            Row(Modifier.fillMaxSize()) {
                listOf(tr(R.string.message_0853bf3c01),tr(R.string.message_5e84ea61e8),
                    tr(R.string.message_148d195e21),tr(R.string.message_df3d58c7d8)).forEachIndexed {index,label ->
                    val chosen=selected==index
                    Column(Modifier.weight(1f).fillMaxHeight().testTag("nav-$index").semantics {contentDescription=label}
                        .selectable(chosen,role=Role.Tab,onClick={if(index!=current){
                            haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove);select(index)}}),
                        horizontalAlignment=Alignment.CenterHorizontally,
                        verticalArrangement=Arrangement.spacedBy(4.dp,Alignment.CenterVertically)) {
                        NavigationGlyph(listOf(12,14,7,3)[index],Modifier.size(23.dp),foreground)
                        NavigationLabel(label,chosen,fontScale,motion,foreground)
                    }
                }
            }
        }
    }
}


@Composable private fun NavigationLabel(label: String,chosen: Boolean,fontScale: Float,motion: Boolean,tint: Color) {
    androidx.compose.animation.AnimatedVisibility(chosen||fontScale>=1.6f,
        enter=if(motion)fadeIn()+expandVertically() else fadeIn(snap()),
        exit=if(motion)fadeOut()+shrinkVertically() else fadeOut(snap())) {
        val contour=navLabelOutline(tint==Color.White).copy(alpha=NAV_LABEL_CONTOUR_ALPHA)
        val stroke=with(LocalDensity.current) {NAV_LABEL_CONTOUR_WIDTH.dp.toPx()}
        Box {
            Text(label,style=MaterialTheme.typography.labelSmall.copy(drawStyle=Stroke(stroke)),
                modifier=Modifier.clearAndSetSemantics {},fontWeight=FontWeight.SemiBold,color=contour,
                maxLines=if(fontScale>=1.6f)2 else 1)
            Text(label,style=MaterialTheme.typography.labelSmall,fontWeight=FontWeight.SemiBold,color=tint,
                maxLines=if(fontScale>=1.6f)2 else 1)
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

internal fun vpnControlDescription(phase: String): String = tr(when(phase) {
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
