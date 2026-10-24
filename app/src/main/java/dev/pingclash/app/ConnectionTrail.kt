// SPDX-License-Identifier: GPL-3.0-only
// Point spacing and connector geometry are visual design values.
@file:Suppress("MagicNumber")

package dev.pingclash.app

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.dp

@Composable internal fun ConnectionTrail(states: List<TrailTone>) {
    val columns = if (LocalDensity.current.fontScale >= 1.6f) 2 else 4
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        states.indices.chunked(columns).forEach { indices ->
            val line = MaterialTheme.colorScheme.outline
            Box(Modifier.fillMaxWidth()) {
                Canvas(Modifier.matchParentSize()) {
                    val cell = size.width / indices.size
                    for (i in 1 until indices.size) {
                        drawLine(line, Offset(cell * (i - .5f) + 18.dp.toPx(), 16.dp.toPx()),
                            Offset(cell * (i + .5f) - 18.dp.toPx(), 16.dp.toPx()), 1.dp.toPx())
                    }
                }
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    indices.forEach { index -> TrailPoint(index, states[index], Modifier.weight(1f)) }
                }
            }
        }
    }
}

@Composable private fun TrailPoint(index: Int, tone: TrailTone, modifier: Modifier) {
    val label = tr(listOf(R.string.ui_device, R.string.ui_dns, R.string.ui_node, R.string.ui_target)[index])
    val state = tr(trailStateLabel(tone))
    val color = trailColor(tone)
    Column(modifier.testTag("trail-$index").semantics(mergeDescendants = true) { stateDescription = state },
        horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Surface(shape = CircleShape, color = MaterialTheme.colorScheme.surfaceVariant,
            border = BorderStroke(1.dp, MaterialTheme.colorScheme.outlineVariant)) {
            Box(Modifier.size(32.dp), contentAlignment = Alignment.Center) {
                when (tone) {
                    TrailTone.PASSED -> AppGlyph(15, Modifier.size(17.dp), color)
                    TrailTone.FAILED -> Text("×", style = MaterialTheme.typography.titleMedium, color = color)
                    else -> Text((index + 1).toString(), style = MaterialTheme.typography.labelMedium, color = color)
                }
            }
        }
        Text(label, style = MaterialTheme.typography.labelMedium)
        Text(state, color = color, style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(top = 1.dp))
    }
}

private fun trailStateLabel(tone: TrailTone): Int = when (tone) {
        TrailTone.PASSED -> R.string.ui_observed_pass
        TrailTone.FAILED -> R.string.ui_observed_failure
        TrailTone.CHECKING -> R.string.ui_checking
        TrailTone.SKIPPED -> R.string.ui_not_separately_tested
        TrailTone.INCOMPLETE -> R.string.ui_incomplete
        TrailTone.STALE -> R.string.ui_retest
        else -> R.string.ui_not_measured
}

@Composable private fun trailColor(tone: TrailTone) = when (tone) {
        TrailTone.PASSED -> Success
        TrailTone.FAILED -> MaterialTheme.colorScheme.error
        TrailTone.INCOMPLETE -> Warning
        TrailTone.CHECKING -> Mint
        else -> Muted
    }
