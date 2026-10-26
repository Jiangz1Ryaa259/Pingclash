// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.app.ActivityManager
import android.os.Debug
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import org.json.JSONObject

@Suppress("MagicNumber")
@Composable internal fun MemoryStats(vpn: VpnUiState,compact: Boolean) {
    val context=LocalContext.current
    val foreground=rememberForeground()
    var snapshot by remember {mutableStateOf(listOf(0L,0L,0L,0L,0L))}
    LaunchedEffect(vpn.active,foreground) {
        if(!foreground)return@LaunchedEffect
        while(true) {
            snapshot=withContext(Dispatchers.IO) {
                val memory=Debug.MemoryInfo();Debug.getMemoryInfo(memory)
                val system=ActivityManager.MemoryInfo()
                context.getSystemService(ActivityManager::class.java).getMemoryInfo(system)
                val core=if(vpn.active) JSONObject() else runCatching {JSONObject(Mobile.vpnStatus())}
                    .getOrDefault(JSONObject())
                listOf(memory.totalPss.toLong()*1024,
                    Runtime.getRuntime().totalMemory()-Runtime.getRuntime().freeMemory(),system.availMem,
                    core.optLong("heapBytes"),core.optLong("goroutines"))
            }
            delay(2000)
        }
    }
    if(!compact)Text(tr(R.string.message_8d27645263),style=MaterialTheme.typography.titleSmall)
    StatLine(tr(R.string.message_77939c5206),formatBytes(snapshot[0]))
    if(!compact) {
        StatLine(tr(R.string.message_e72275ffce),formatBytes(snapshot[1]))
        StatLine(tr(R.string.message_ea2678384d),formatBytes(if(vpn.active)vpn.heapBytes else snapshot[3]))
        StatLine(tr(R.string.message_da5ea7565a),(if(vpn.active)vpn.goroutines.toLong() else snapshot[4]).toString())
        StatLine(tr(R.string.message_a51797a853),formatBytes(snapshot[2]))
    }
}
