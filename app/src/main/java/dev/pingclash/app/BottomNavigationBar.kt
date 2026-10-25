// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.expandVertically
import androidx.compose.animation.shrinkVertically
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.snap
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.selection.selectable
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlin.math.roundToInt

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
    val pressed by animateFloatAsState(if((dragPosition!=null||drag.pressed)&&motion)1f else 0f,
        if(motion)spring(.78f,550f) else snap(),label="glass-navigation-press")
    val dark=Ink.luminance()<.5f
    val style=LocalNavigationGlassStyle.current?:navigationGlassStyle(dark)
    val foreground=navLabelColor(dark)
    val backdrop=LocalNavigationBackdrop.current
    val blur=navigationBackendActive()
    val fontScale=LocalDensity.current.fontScale
    val height=navigationHeight()
    BoxWithConstraints(modifier.navigationBarsPadding().padding(horizontal=18.dp,vertical=12.dp)
        .fillMaxWidth()
        .height(height).testTag("glass-navigation").semantics {this[NavBlurEnabled]=blur
            this[NavOpticalBackend]=navigationBackendName(backdrop!=null,blur)
        }) {
        val cellWidth=with(LocalDensity.current) {maxWidth.toPx()/4f}
        val cellSize=maxWidth/4
        val visualPosition=if(rtl)3f-position else position
        Box(Modifier.fillMaxSize().navGlassMaterial(style)
            .navigationDrag(NavigationDragGeometry(cellWidth,rtl,current),drag) {
                haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove);select(it)
            }) {
            Box(Modifier.offset {androidx.compose.ui.unit.IntOffset(
                (visualPosition*cellWidth+4.dp.toPx()).roundToInt(),4.dp.roundToPx())}
                .width(cellSize-8.dp).height(height-8.dp).testTag("glass-selector")
                .navGlassMaterial(style.copy(refractionHeight=18.dp,refractionAmount=18.dp),
                    selector=true,press=pressed))
            Row(Modifier.fillMaxSize()) {
                listOf(tr(R.string.message_0853bf3c01),tr(R.string.message_5e84ea61e8),
                    tr(R.string.message_148d195e21),tr(R.string.message_df3d58c7d8)).forEachIndexed {index,label ->
                    val chosen=selected==index
                    Column(Modifier.weight(1f).fillMaxHeight().testTag("nav-$index")
                        .semantics {contentDescription=label}
                        .selectable(chosen,interactionSource=remember(index){MutableInteractionSource()},
                            indication=null,role=Role.Tab,onClick={if(index!=current){
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


@Composable private fun navigationBackendActive()=LocalNavigationBackdrop.current!=null||LocalNavHaze.current!=null
private fun navigationBackendName(optical: Boolean,blur: Boolean)=when {
    optical->"backdrop"
    blur->"haze"
    else->"opaque"
}
