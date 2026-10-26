// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import java.util.Locale

internal fun formatBytes(value: Long): String {
    val units=listOf("B","KiB","MiB","GiB","TiB")
    var amount=value.coerceAtLeast(0).toDouble();var unit=0
    while(amount>=1024&&unit<units.lastIndex) {amount/=1024;unit++}
    return if(unit==0) "${amount.toLong()} B" else String.format(Locale.ROOT,"%.1f %s",amount,units[unit])
}
internal fun durationText(seconds: Long)="%02d:%02d:%02d".format(Locale.ROOT,seconds/3600,seconds/60%60,seconds%60)
@Composable internal fun SettingsCard(content: @Composable ColumnScope.()->Unit) {
    Surface(Modifier.fillMaxWidth(),shape=UiCorners.Card,
        color=Panel.copy(alpha=if(LocalImmersiveScene.current).86f else 1f)) {
        Column(Modifier.padding(16.dp),verticalArrangement=Arrangement.spacedBy(10.dp),content=content)
    }
}
@Composable internal fun StatLine(label: String,value: String) {
    Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.spacedBy(12.dp)) {
        Text(label,Modifier.weight(1f),color=Muted,style=MaterialTheme.typography.bodyMedium)
        Text(value,style=MaterialTheme.typography.bodyMedium)
    }
}
@Composable internal fun DashboardTelemetry(settings: ClientSettings,vpn: VpnUiState) {
    TelemetryGroup(settings,vpn,true)
}
@Composable internal fun RuntimeCards(data: AppData,vpn: VpnUiState,all: Boolean=false) {
    val settings=if(all)data.client.copy(showSpeed=true,showTraffic=true,showService=true,showMemory=true)
        else data.client
    TelemetryGroup(settings,vpn,false,data)
}
@Composable private fun TelemetryGroup(settings: ClientSettings,vpn: VpnUiState,compact: Boolean,data: AppData?=null) {
    if(listOf(settings.showSpeed,settings.showTraffic,settings.showService,settings.showMemory).none {it})return
    SettingsCard {
        if(settings.showSpeed) {
            Text(tr(if(compact)R.string.ui_traffic_overview else R.string.message_e68cf04b35),
                style=MaterialTheme.typography.titleSmall)
            Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.spacedBy(12.dp)) {
                Column(Modifier.weight(1f)) {
                    Text("↑ ${formatBytes(vpn.uploadSpeed)}/s",color=Mint,style=MaterialTheme.typography.titleLarge)
                    Text(tr(R.string.message_9e07e3c053),color=Muted,style=MaterialTheme.typography.bodySmall)
                }
                Column(Modifier.weight(1f)) {
                    Text("↓ ${formatBytes(vpn.downloadSpeed)}/s",style=MaterialTheme.typography.titleLarge)
                    Text(tr(R.string.message_4673a23061),color=Muted,style=MaterialTheme.typography.bodySmall)
                }
            }
            TrafficChart(vpn)
        }
        if(settings.showTraffic) {
            if(!compact)Text(tr(R.string.message_bf817b54c8),style=MaterialTheme.typography.titleSmall)
            if(settings.showSpeed)HorizontalDivider(color=MaterialTheme.colorScheme.outlineVariant)
            StatLine(tr(R.string.message_f2f0204946),formatBytes(vpn.uploaded))
            StatLine(tr(R.string.message_e2f12da7fa),formatBytes(vpn.downloaded))
        }
        if(settings.showService) {
            TelemetryDivider(settings.showSpeed||settings.showTraffic)
            ServiceMetrics(vpn,compact,data)
        }
        if(settings.showMemory) {
            TelemetryDivider(listOf(settings.showSpeed,settings.showTraffic,settings.showService).any {it})
            MemoryStats(vpn,compact)
        }
    }
}

@Composable private fun TelemetryDivider(visible: Boolean) {
    if(visible)HorizontalDivider(color=MaterialTheme.colorScheme.outlineVariant)
}

@Composable private fun ServiceMetrics(vpn: VpnUiState,compact: Boolean,data: AppData?) {
    if(!compact)Text(tr(R.string.message_e8a4f7c09d),style=MaterialTheme.typography.titleSmall)
    StatLine(tr(R.string.message_fd1e76eafb),durationText(vpn.uptime))
    StatLine(tr(R.string.message_3726bcb690),vpn.connections.toString())
    if(!compact) {
        ServiceConfiguration(vpn,data)
        StatLine(tr(R.string.message_6b566e6b22),vpn.totalConnections.toString())
        StatLine(tr(R.string.message_058ff47156),vpn.dnsQueries.toString())
        StatLine(tr(R.string.message_e38ff950f7),vpn.rejected.toString())
        StatLine(tr(R.string.message_c6abe0d5e7),vpn.failures.toString())
    }
}

// Draw faithful samples; no simulated activity or decorative gradient fills.
@Suppress("MagicNumber")
@Composable private fun TrafficChart(vpn: VpnUiState) {
    val upload=Mint
    val download=Muted
    val grid=MaterialTheme.colorScheme.outlineVariant
    val description=tr(R.string.message_8cdc5372a8)
    Canvas(Modifier.fillMaxWidth().height(80.dp).testTag("traffic-chart").semantics {contentDescription=description}) {
        repeat(3) {index ->
            val y=size.height*index/2
            drawLine(grid,Offset(0f,y),Offset(size.width,y),1.dp.toPx())
        }
        val samples=vpn.history
        val maximum=samples.maxOfOrNull {maxOf(it.up,it.down)}?.coerceAtLeast(1024)?:1024
        fun point(index: Int,value: Long)=Offset(size.width*(60-samples.size+index)/59f,
            size.height*(1-(value.toFloat()/maximum).coerceIn(0f,1f)))
        if(samples.size>1) {
            for(down in listOf(false,true)) {
                val path=androidx.compose.ui.graphics.Path()
                samples.forEachIndexed {index,sample ->
                    val p=point(index,if(down)sample.down else sample.up)
                    if(index==0)path.moveTo(p.x,p.y) else path.lineTo(p.x,p.y)
                }
                drawPath(path,if(down)download else upload,style=androidx.compose.ui.graphics.drawscope.Stroke(
                    2.dp.toPx(),cap=androidx.compose.ui.graphics.StrokeCap.Round,
                    pathEffect=if(down)androidx.compose.ui.graphics.PathEffect.dashPathEffect(
                        floatArrayOf(6.dp.toPx(),4.dp.toPx())) else null))
            }
        }
    }
}
