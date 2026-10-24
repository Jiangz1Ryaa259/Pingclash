// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.content.Context
import dev.pingclash.diagnostics.RunControl
import dev.pingclash.diagnostics.ProbeFailure
import dev.pingclash.diagnostics.SocketProbe
import org.json.JSONObject
import java.net.Inet4Address
import java.net.Inet6Address
import java.util.concurrent.TimeUnit

internal object TcpLatencyProbe {
    fun run(context: Context,node: LocalNode?,timeout: Int,control: RunControl): ProxyDelay {
        if(node==null || node.type in setOf("group","hysteria2","tuic"))return ProxyDelay("skipped")
        return try {
            val config=JSONObject(node.config)
            if(!config.has("server"))return ProxyDelay("skipped")
            AndroidNetworkBinding.open(context).use {binding ->
                val server=config.getString("server")
                val resolved=if(android.net.InetAddresses.isNumericAddress(server))listOf(android.net.InetAddresses.parseNumericAddress(server)) else binding.resolve(server,control.timeoutMillis(timeout.toLong()),control)
                val addresses=resolved.filter {ip ->
                    when(config.optString("ip-version")){"ipv4"->ip is Inet4Address;"ipv6"->ip is Inet6Address;else->true}
                }
                if(addresses.isEmpty())return ProxyDelay("dns")
                if(!binding.isCurrent())return ProxyDelay("stale")
                var result=ProxyDelay("failed")
                for(address in addresses.take(8)) {
                    control.check()
                    val started=System.nanoTime()
                    try {
                        val socket=SocketProbe().connect(binding,address,config.getInt("port"),control.timeoutMillis(timeout.toLong()),control)
                        control.release(socket)
                        return if(binding.isCurrent())ProxyDelay("passed",TimeUnit.NANOSECONDS.toMillis(System.nanoTime()-started)) else ProxyDelay("stale")
                    } catch(failure: ProbeFailure) {
                        control.check()
                        result=ProxyDelay(if(failure.code.name.contains("TIMEOUT"))"timeout" else "failed")
                    }
                }
                if(binding.isCurrent())result else ProxyDelay("stale")
            }
        } catch(failure: Exception) {
            when {
                runCatching {control.check()}.exceptionOrNull()?.let {it is ProbeFailure && it.code.name=="CANCELLED"}==true->ProxyDelay("idle")
                failure is java.util.concurrent.TimeoutException || failure is ProbeFailure && failure.code.name in setOf("DEADLINE","TCP_TIMEOUT")->ProxyDelay("timeout")
                failure is java.net.UnknownHostException->ProxyDelay("dns")
                else->ProxyDelay("failed")
            }
        }
    }
}
