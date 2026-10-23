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
        Text(localize(label),Modifier.weight(1f),color=Muted,style=MaterialTheme.typography.bodyMedium)
        Text(value,style=MaterialTheme.typography.bodyMedium)
    }
}
@Composable internal fun RuntimeCards(data: AppData,vpn: VpnUiState,all: Boolean=false) {
    val prefs=data.client
    if(prefs.showSpeed||all) SettingsCard {
        Text(localize("实时速度"),style=MaterialTheme.typography.titleMedium)
        Row(Modifier.fillMaxWidth()) {
            Column(Modifier.weight(1f)) {Text("↑ ${formatBytes(vpn.uploadSpeed)}/s",color=Mint,style=MaterialTheme.typography.titleLarge);Text(localize("上传"),color=Muted)}
            Column(Modifier.weight(1f)) {Text("↓ ${formatBytes(vpn.downloadSpeed)}/s",color=Success,style=MaterialTheme.typography.titleLarge);Text(localize("下载"),color=Muted)}
        }
        val upload=Mint;val download=Success;val grid=MaterialTheme.colorScheme.outlineVariant
        val chartDescription=localize("最近 60 秒，仅本机内存")
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
        Text(localize("最近 60 秒，仅本机内存"),color=Muted,style=MaterialTheme.typography.bodySmall)
    }
    if(prefs.showTraffic||all) SettingsCard {
        Text(localize("本次流量"),style=MaterialTheme.typography.titleMedium)
        StatLine("已上传",formatBytes(vpn.uploaded));StatLine("已下载",formatBytes(vpn.downloaded))
        StatLine("连接时长",durationText(vpn.uptime));StatLine("连接总数",vpn.totalConnections.toString())
        Text(localize("统计应用转发的有效载荷，不含协议封装；不是运营商账单。"),color=Muted,style=MaterialTheme.typography.bodySmall)
    }
    if(prefs.showService||all) SettingsCard {
        Text(localize("服务状态"),style=MaterialTheme.typography.titleMedium)
        StatLine("VPN 服务",localize(when(vpn.phase){"established"->"运行中";"connecting"->"正在启动";"error"->"发生错误";else->"已停止"}))
        StatLine("出站模式",localize(when(prefs.mode){"rule"->"规则";"direct"->"直连";else->"全局代理"}))
        StatLine("活动连接",vpn.connections.toString());StatLine("DNS 查询",vpn.dnsQueries.toString())
        StatLine("策略阻断",vpn.rejected.toString());StatLine("转发异常",vpn.failures.toString())
        StatLine("策略组",data.activeProfile?.groups?.size?.toString()?:"0")
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
        Text(localize("内存信息"),style=MaterialTheme.typography.titleMedium)
        StatLine("应用 PSS",formatBytes(snapshot[0]));StatLine("Java 堆",formatBytes(snapshot[1]))
        StatLine("Go 堆",formatBytes(if(vpn.active)vpn.heapBytes else snapshot[3]));StatLine("Go 协程",(if(vpn.active)vpn.goroutines.toLong() else snapshot[4]).toString())
        StatLine("系统可用内存",formatBytes(snapshot[2]));Text(localize("实时读取本机内存，不采集其他应用使用记录。"),color=Muted,style=MaterialTheme.typography.bodySmall)
    }
}
