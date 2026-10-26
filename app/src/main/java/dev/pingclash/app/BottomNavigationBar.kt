// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.absoluteOffset
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.selection.selectable
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.AbsoluteAlignment
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithCache
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.RoundRect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.clipPath
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import com.kyant.backdrop.backdrops.rememberCombinedBackdrop
import com.kyant.backdrop.backdrops.layerBackdrop
import com.kyant.backdrop.backdrops.rememberLayerBackdrop

// The non-interactive row records finished glass and accent labels; its source
// excludes the selector itself so it cannot feed back into the lens.
@Composable internal fun GlassNavigation(selected: Int,modifier: Modifier=Modifier,onSelect: (Int)->Unit) {
    val current by rememberUpdatedState(selected)
    val select by rememberUpdatedState(onSelect)
    val haptic=LocalHapticFeedback.current
    val rtl=LocalLayoutDirection.current==LayoutDirection.Rtl
    val drag=remember {NavigationDragState()}
    val motion=rememberNavigationMotion(drag,selected,LocalMotionAllowed.current)
    val dark=Ink.luminance()<.5f
    val style=LocalNavigationGlassStyle.current?:navigationGlassStyle(dark)
    val backdrop=LocalNavigationBackdrop.current
    val materialBackdrop=if(backdrop!=null)rememberLayerBackdrop() else null
    val tabsBackdrop=if(backdrop!=null)rememberLayerBackdrop() else null
    val selectorSource=if(materialBackdrop!=null&&tabsBackdrop!=null)
        rememberCombinedBackdrop(materialBackdrop,tabsBackdrop) else null
    val blur=backdrop!=null||LocalNavHaze.current!=null
    val height=navigationHeight()
    val labels=listOf(tr(R.string.message_0853bf3c01),tr(R.string.message_5e84ea61e8),
        tr(R.string.message_148d195e21),tr(R.string.message_df3d58c7d8))
    val choose: (Int)->Unit={if(it!=current){
        haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove);select(it)}}
    BoxWithConstraints(modifier.navigationBarsPadding().padding(horizontal=18.dp,vertical=12.dp)
        .fillMaxWidth().height(height).testTag("glass-navigation").semantics {
            this[NavBlurEnabled]=blur
            this[NavOpticalBackend]=navigationBackendName(backdrop!=null,blur)
        }) {
        val cellWidth=with(LocalDensity.current) {maxWidth.toPx()/4f}
        val selectorWidth=maxWidth/4-8.dp
        Box(Modifier.fillMaxSize().navigationDrag(NavigationDragGeometry(cellWidth,rtl,current),drag,choose)) {
            Box(Modifier.fillMaxSize()
                .then(if(materialBackdrop!=null)Modifier.layerBackdrop(materialBackdrop) else Modifier)
                .navGlassMaterial(style))
            NavigationTabs(labels,selected,navLabelColor(dark),choose)
            if(tabsBackdrop!=null) {
                Box(Modifier.fillMaxSize().clearAndSetSemantics {}
                    .graphicsLayer {alpha=0f}.layerBackdrop(tabsBackdrop)
                    .navSelectionWash(dark,motion::pressure)) {
                    NavigationTabs(labels,selected,navAccentColor(dark),null,motion::pressure)
                }
            }
            Box(Modifier.align(AbsoluteAlignment.TopLeft).absoluteOffset(4.dp,4.dp)
                .width(selectorWidth).height(height-8.dp)
                .navSelectorMaterial(style,selectorSource,motion) {
                    navigationPhysicalPosition(motion.visualPosition(),rtl)*cellWidth
                }.testTag("glass-selector"))
            if(tabsBackdrop==null)LegacyNavigationAccent(labels,selected,motion,cellWidth,rtl)
        }
    }
}

@Composable private fun NavigationTabs(labels: List<String>,selected: Int,tint: Color,
    onSelect: ((Int)->Unit)?,pressure: ()->Float={0f}) {
    val fontScale=LocalDensity.current.fontScale
    val interactive=onSelect!=null
    Row(Modifier.fillMaxSize()) {
        labels.forEachIndexed {index,label->
            val action=if(interactive)Modifier.testTag("nav-$index").semantics {contentDescription=label}
                .selectable(selected==index,interactionSource=remember(index){MutableInteractionSource()},
                    indication=null,role=Role.Tab,onClick={onSelect?.invoke(index)}) else Modifier
            Box(Modifier.weight(1f).fillMaxHeight().then(action),contentAlignment=Alignment.Center) {
                Column(Modifier.graphicsLayer {val scale=1f+.10f*pressure();scaleX=scale;scaleY=scale},
                    horizontalAlignment=Alignment.CenterHorizontally,
                    verticalArrangement=Arrangement.spacedBy(4.dp,Alignment.CenterVertically)) {
                    NavigationGlyph(listOf(12,14,7,3)[index],Modifier.size(23.dp)
                        .then(if(interactive)Modifier.testTag("nav-glyph-$index") else Modifier),tint)
                    Text(label,style=MaterialTheme.typography.labelSmall,fontWeight=FontWeight.SemiBold,
                        color=tint,maxLines=if(fontScale>=1.6f)2 else 1,
                        modifier=Modifier.clearAndSetSemantics {})
                }
            }
        }
    }
}

@Composable private fun LegacyNavigationAccent(labels: List<String>,selected: Int,motion: NavigationMotion,
    cellWidth: Float,rtl: Boolean) {
    Box(Modifier.fillMaxSize().clearAndSetSemantics {}.drawWithCache {
        val path=Path()
        onDrawWithContent {
        val width=cellWidth-8.dp.toPx();val height=size.height-8.dp.toPx()
        val left=navigationPhysicalPosition(motion.visualPosition(),rtl)*cellWidth+4.dp.toPx()
        val sx=1f+.12f*motion.pressure()+motion.stretch()
        val sy=1f+.08f*motion.pressure()-motion.stretch()*.35f
        val dx=width*(sx-1)/2;val dy=height*(sy-1)/2
        path.reset();path.addRoundRect(RoundRect(left-dx,4.dp.toPx()-dy,
            left+width+dx,4.dp.toPx()+height+dy,CornerRadius(height*sy/2)))
        clipPath(path){this@onDrawWithContent.drawContent()}
        }
    }) {
        NavigationTabs(labels,selected,navAccentColor(Ink.luminance()<.5f),null,motion::pressure)
    }
}

private fun navigationBackendName(optical: Boolean,blur: Boolean)=when {
    optical->"backdrop"
    blur->"haze"
    else->"opaque"
}
