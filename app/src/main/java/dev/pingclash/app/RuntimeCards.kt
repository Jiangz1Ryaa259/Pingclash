// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.app.ActivityManager
import android.content.Context
import android.os.Debug
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.util.Locale

internal fun formatBytes(value: Long): String {
    val units=listOf("B","KiB","MiB","GiB","TiB")
    var amount=value.coerceAtLeast(0).toDouble();var unit=0
    while(amount>=1024&&unit<units.lastIndex) {amount/=1024;unit++}
    return if(unit==0) "${amount.toLong()} B" else String.format(Locale.ROOT,"%.1f %s",amount,units[unit])
}
internal fun durationText(seconds: Long)="%02d:%02d:%02d".format(Locale.ROOT,seconds/3600,seconds/60%60,seconds%60)
@Composable internal fun SettingsCard(content: @Composable ColumnScope.()->Unit) {
    Card(Modifier.fillMaxWidth(),shape=RoundedCornerShape(22.dp),border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),colors=CardDefaults.cardColors(containerColor=Panel)) {
        Column(Modifier.padding(18.dp),verticalArrangement=Arrangement.spacedBy(12.dp),content=content)
    }
}
@Composable internal fun StatLine(label: String,value: String) {
    Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.spacedBy(12.dp)) {
        Text((label),Modifier.weight(1f),color=Muted,style=MaterialTheme.typography.bodyMedium)
        Text(value,style=MaterialTheme.typography.bodyMedium)
    }
}
@Composable internal fun RuntimeCards(data: AppData,vpn: VpnUiState,all: Boolean=false) {
    val prefs=data.client
    if(prefs.showSpeed||all) SettingsCard {
        Text((tr(R.string.message_e68cf04b35)),style=MaterialTheme.typography.titleMedium)
        Row(Modifier.fillMaxWidth()) {
            Column(Modifier.weight(1f)) {Text("↑ ${formatBytes(vpn.uploadSpeed)}/s",color=Mint,style=MaterialTheme.typography.titleLarge);Text((tr(R.string.message_9e07e3c053)),color=Muted)}
            Column(Modifier.weight(1f)) {Text("↓ ${formatBytes(vpn.downloadSpeed)}/s",color=Success,style=MaterialTheme.typography.titleLarge);Text((tr(R.string.message_4673a23061)),color=Muted)}
        }
        val upload=Mint;val download=Success;val grid=MaterialTheme.colorScheme.outlineVariant
        val chartDescription=(tr(R.string.message_8cdc5372a8))
        Canvas(Modifier.fillMaxWidth().height(110.dp).testTag("traffic-chart").semantics {contentDescription=chartDescription}) {
            repeat(3) {i -> val y=size.height*i/2;drawLine(grid,Offset(0f,y),Offset(size.width,y),1.dp.toPx())}
            val samples=vpn.history
            val max=samples.maxOfOrNull {maxOf(it.up,it.down)}?.coerceAtLeast(1024)?:1024
            if(samples.size>1) for(i in 1 until samples.size) {
                fun point(index: Int,value: Long)=Offset(size.width*(60-samples.size+index)/59f,size.height*(1-value.toFloat()/max))
                drawLine(upload,point(i-1,samples[i-1].up),point(i,samples[i].up),2.dp.toPx())
                drawLine(download,point(i-1,samples[i-1].down),point(i,samples[i].down),2.dp.toPx())
            }
        }
        Text((tr(R.string.message_8cdc5372a8)),color=Muted,style=MaterialTheme.typography.bodySmall)
    }
    if(prefs.showTraffic||all) SettingsCard {
        Text((tr(R.string.message_bf817b54c8)),style=MaterialTheme.typography.titleMedium)
        StatLine(tr(R.string.message_f2f0204946),formatBytes(vpn.uploaded));StatLine(tr(R.string.message_e2f12da7fa),formatBytes(vpn.downloaded))
        StatLine(tr(R.string.message_fd1e76eafb),durationText(vpn.uptime));StatLine(tr(R.string.message_6b566e6b22),vpn.totalConnections.toString())
        Text((tr(R.string.message_518eae8255)),color=Muted,style=MaterialTheme.typography.bodySmall)
    }
    if(prefs.showService||all) SettingsCard {
        Text((tr(R.string.message_e8a4f7c09d)),style=MaterialTheme.typography.titleMedium)
        StatLine(tr(R.string.message_03d39aa1b9),(when(vpn.phase){"established"->tr(R.string.message_1f0eb99b7e);"connecting"->tr(R.string.message_087739b986);"error"->tr(R.string.message_0cb3fb5b86);else->tr(R.string.message_f006455e3b)}))
        StatLine(tr(R.string.message_daae3125b8),(when(prefs.mode){"rule"->tr(R.string.message_1123245d1b);"direct"->tr(R.string.message_b06325c566);else->tr(R.string.message_f1880deaae)}))
        StatLine(tr(R.string.message_3726bcb690),vpn.connections.toString());StatLine(tr(R.string.message_058ff47156),vpn.dnsQueries.toString())
        StatLine(tr(R.string.message_e38ff950f7),vpn.rejected.toString());StatLine(tr(R.string.message_c6abe0d5e7),vpn.failures.toString())
        StatLine(tr(R.string.message_47d56387f5),data.activeProfile?.groups?.size?.toString()?:"0")
    }
    if(prefs.showMemory||all) MemoryCard(vpn)
}
@Composable private fun MemoryCard(vpn: VpnUiState) {
    val context=LocalContext.current
    var snapshot by remember {mutableStateOf(listOf(0L,0L,0L,0L,0L))}
    LaunchedEffect(vpn.active) {
        while(true) {
            snapshot=withContext(Dispatchers.IO) {
                val memory=Debug.MemoryInfo();Debug.getMemoryInfo(memory)
                val system=ActivityManager.MemoryInfo();context.getSystemService(ActivityManager::class.java).getMemoryInfo(system)
                val core=if(vpn.active) JSONObject() else runCatching {JSONObject(Mobile.vpnStatus())}.getOrDefault(JSONObject())
                listOf(memory.totalPss.toLong()*1024,Runtime.getRuntime().totalMemory()-Runtime.getRuntime().freeMemory(),system.availMem,core.optLong("heapBytes"),core.optLong("goroutines"))
            };delay(2000)
        }
    }
    SettingsCard {
        Text((tr(R.string.message_8d27645263)),style=MaterialTheme.typography.titleMedium)
        StatLine(tr(R.string.message_77939c5206),formatBytes(snapshot[0]));StatLine(tr(R.string.message_e72275ffce),formatBytes(snapshot[1]))
        StatLine(tr(R.string.message_ea2678384d),formatBytes(if(vpn.active)vpn.heapBytes else snapshot[3]));StatLine(tr(R.string.message_da5ea7565a),(if(vpn.active)vpn.goroutines.toLong() else snapshot[4]).toString())
        StatLine(tr(R.string.message_a51797a853),formatBytes(snapshot[2]));Text((tr(R.string.message_2b379681df)),color=Muted,style=MaterialTheme.typography.bodySmall)
    }
}
