// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput
import kotlin.math.roundToInt

internal data class NavigationDragGeometry(val cellWidth: Float,val rtl: Boolean,val selected: Int)
@Stable internal class NavigationDragState {
    var position by mutableStateOf<Float?>(null)
}
@Composable internal fun Modifier.navigationDrag(geometry: NavigationDragGeometry,drag: NavigationDragState,
    onSelect: (Int)->Unit): Modifier {
    val selected by rememberUpdatedState(geometry.selected)
    val select by rememberUpdatedState(onSelect)
    return pointerInput(geometry.cellWidth,geometry.rtl) {
        detectHorizontalDragGestures(
            onDragStart={drag.position=selected.toFloat()},
            onHorizontalDrag={change,amount -> change.consume()
                val delta=amount/geometry.cellWidth*(if(geometry.rtl)-1 else 1)
                drag.position=((drag.position?:selected.toFloat())+delta).coerceIn(0f,3f)},
            onDragCancel={drag.position=null},
            onDragEnd={val target=(drag.position?:selected.toFloat()).roundToInt().coerceIn(0,3)
                drag.position=null
                if(target!=selected)select(target)})
    }
}
