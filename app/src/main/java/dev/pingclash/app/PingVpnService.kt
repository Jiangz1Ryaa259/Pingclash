// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.net.VpnService
import android.os.Build
import android.os.ParcelFileDescriptor
import android.os.SystemClock
import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import org.json.JSONObject
import java.util.concurrent.atomic.AtomicBoolean

data class VpnUiState(
    val phase: String = "idle", val message: String = "尚未连接",
    val uploaded: Long = 0, val downloaded: Long = 0, val failures: Long = 0,
    val uploadSpeed: Long=0,val downloadSpeed: Long=0,val uptime: Long=0,val connections: Int=0,
    val totalConnections: Long=0,val dnsQueries: Long=0,val rejected: Long=0,val heapBytes: Long=0,val goroutines: Int=0,
    val history: List<SpeedSample> = emptyList(),
) { val active get() = phase in listOf("connecting", "established", "stopping") }
data class SpeedSample(val up: Long,val down: Long)

object VpnRuntime {
    private val mutableState = MutableStateFlow(VpnUiState())
    val state = mutableState.asStateFlow()
    internal fun publish(value: VpnUiState) { mutableState.value = value }
    internal fun stats(owner: PingVpnService, status: JSONObject,upSpeed: Long,downSpeed: Long) {
        mutableState.update { if (it.phase == "established" && PingVpnService.instance === owner)
            it.copy(uploaded=status.optLong("uploaded"),downloaded=status.optLong("downloaded"),failures=status.optLong("failures"),
                uploadSpeed=upSpeed,downloadSpeed=downSpeed,uptime=status.optLong("uptime"),connections=status.optInt("activeConnections"),
                totalConnections=status.optLong("totalConnections"),dnsQueries=status.optLong("dnsQueries"),rejected=status.optLong("rejected"),heapBytes=status.optLong("heapBytes"),goroutines=status.optInt("goroutines"),history=(it.history+SpeedSample(upSpeed,downSpeed)).takeLast(60)) else it }
    }
    fun connect(context: Context) {
        val previous = mutableState.value
        if (previous.active || !mutableState.compareAndSet(previous, VpnUiState("connecting", "正在启动 VPN"))) return
        try { context.startForegroundService(Intent(context, PingVpnService::class.java).setAction(PingVpnService.CONNECT)) }
        catch (error: Exception) { publish(VpnUiState("error", "系统未允许启动 VPN")); throw error }
    }
    fun disconnect(context: Context) {
        if (state.value.active) context.startService(Intent(context, PingVpnService::class.java).setAction(PingVpnService.DISCONNECT))
    }
}

class PingVpnService : VpnService() {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val mutex = Mutex()
    private val stopRequested = AtomicBoolean(false)
    private val starting = AtomicBoolean(false)
    @Volatile private var terminalMessage: String? = null
    private var descriptor: ParcelFileDescriptor? = null
    @Volatile internal var boundNetwork: Network? = null
        private set
    private var observing = false
    private var usageStarted=false
    private val usageRecorded=AtomicBoolean(false)
    private val manager by lazy { getSystemService(ConnectivityManager::class.java) }
    private val observer = object : ConnectivityManager.NetworkCallback() {
        override fun onLost(network: Network) {
            if (network == boundNetwork) requestStop("网络已变化，VPN 已断开，请重新连接")
        }
    }

    override fun onCreate() {
        super.onCreate()
        instance = this
        getSystemService(NotificationManager::class.java).createNotificationChannel(
            NotificationChannel(CHANNEL, "VPN 连接", NotificationManager.IMPORTANCE_LOW).apply { setShowBadge(false) },
        )
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == DISCONNECT) { requestStop(); return START_NOT_STICKY }
        if (intent?.action != CONNECT && !isAlwaysOn) { requestStop(); return START_NOT_STICKY }
        if (!starting.compareAndSet(false, true)) return START_NOT_STICKY
        stopRequested.set(false)
        try {
            val notification = notification("正在建立 VPN 隧道")
            if (Build.VERSION.SDK_INT >= 34) startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_SYSTEM_EXEMPTED)
            else startForeground(NOTIFICATION_ID, notification)
        } catch (_: Exception) {
            VpnRuntime.publish(VpnUiState("error", "系统未允许启动 VPN 前台服务")); stopSelf(); return START_NOT_STICKY
        }
        VpnRuntime.publish(VpnUiState("connecting", "正在建立隧道"))
        scope.launch { mutex.withLock { establish() } }
        return if(isAlwaysOn) START_STICKY else START_NOT_STICKY
    }

    private suspend fun establish() {
        var stage = "native"
        try {
            val app = application as PingClashApplication
            check(app.nativeReady) { "native_unavailable" }
            stage = "permission"
            check(prepare(this) == null) { "vpn_permission_required" }
            val data = app.repository.data.value
            val node = data.selected ?: error("node_required")
            stage = "configuration"
            val runtimeConfig = requireNotNull(data.selectedRuntimeConfig)
            check(JSONObject(Mobile.validateNode(runtimeConfig)).optString("state") == "passed")
            val options=data.runtimeOptions()
            check(JSONObject(Mobile.validateRuntimeOptions(options)).optString("state")=="passed")
            stage = "network"
            val network = AndroidCorePlatform(app).underlying() ?: error("network_unavailable")
            boundNetwork = network
            setUnderlyingNetworks(arrayOf(network))
            manager.registerNetworkCallback(NetworkRequest.Builder().addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .addCapability(NetworkCapabilities.NET_CAPABILITY_NOT_VPN).build(), observer)
            observing = true
            if (stopRequested.get()) { shutdown(); return }
            stage = "tun"
            val builder = Builder().setSession("PingClash").setMtu(data.client.mtu)
                .addAddress("172.29.0.1", 30).addAddress("fdfe:7069:6e67::1", 126)
                .addRoute("0.0.0.0", 0).addRoute("::", 0).addDnsServer("172.29.0.2")
            // Always capture both address families. Disabling IPv6 rejects it in
            // the forwarder rather than allowing it to escape the VPN route.
            if(data.client.appMode=="include") data.client.packages.forEach(builder::addAllowedApplication)
            else {builder.addDisallowedApplication(packageName);if(data.client.appMode=="exclude") data.client.packages.forEach(builder::addDisallowedApplication)}
            descriptor = builder.establish() ?: error("tun_unavailable")
            val result = JSONObject(Mobile.startVPNWithOptions(runtimeConfig, requireNotNull(descriptor).fd.toLong(), data.dnsAddress,options))
            stage = if (result.optString("code") == "config_or_dns_invalid") "configuration" else "forwarder"
            check(result.optString("code") == "tun_established_not_verified") { "native_start_failed" }
            if (stopRequested.get()) { shutdown(); return }
            VpnRuntime.publish(VpnUiState("established", "VPN 隧道已建立"))
            usageStarted=true
            getSystemService(NotificationManager::class.java).notify(NOTIFICATION_ID, notification("VPN 隧道已建立 · 点击查看"))
            scope.launch {
                var previousTime=SystemClock.elapsedRealtime();var previousUp=0L;var previousDown=0L
                while (VpnRuntime.state.value.phase == "established") {
                    delay(1000)
                    runCatching {
                        val status = JSONObject(Mobile.vpnStatus())
                        if (status.optBoolean("running")) {
                            val now=SystemClock.elapsedRealtime();val duration=(now-previousTime).coerceAtLeast(1)
                            val up=((status.optLong("uploaded")-previousUp).coerceAtLeast(0)*1000/duration)
                            val down=((status.optLong("downloaded")-previousDown).coerceAtLeast(0)*1000/duration)
                            VpnRuntime.stats(this@PingVpnService,status,up,down)
                            previousTime=now;previousUp=status.optLong("uploaded");previousDown=status.optLong("downloaded")
                            if(data.client.notificationSpeed) getSystemService(NotificationManager::class.java).notify(NOTIFICATION_ID,notification("↑ ${formatBytes(up)}/s   ↓ ${formatBytes(down)}/s"))
                        }
                    }
                }
            }
        } catch (_: Exception) {
            val message = when (stage) {
                "native" -> "原生内核未能加载，VPN 未启动"
                "permission" -> "系统 VPN 授权未完成，请重新连接并授权"
                "configuration" -> "节点或 DNS 配置未通过内核校验，VPN 已清理"
                "network" -> "没有可用的非 VPN 网络，或无法绑定网络"
                "tun" -> "系统未能建立 TUN 接口，VPN 已清理"
                else -> "TUN 转发模块未能启动，VPN 已清理"
            }
            shutdown(message)
        }
    }

    private fun requestStop(message: String? = null) {
        stopRequested.set(true)
        scope.launch { mutex.withLock { shutdown(message) } }
    }

    private fun shutdown(message: String? = null) {
        if (message != null) terminalMessage = message
        saveUsage()
        VpnRuntime.publish(VpnUiState("stopping", "正在清理 VPN 连接"))
        runCatching { Mobile.stopVPN() }
        runCatching { descriptor?.close() }; descriptor = null
        if (observing) { runCatching { manager.unregisterNetworkCallback(observer) }; observing = false }
        boundNetwork = null
        runCatching { setUnderlyingNetworks(null) }
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    override fun onRevoke() { terminalMessage = "VPN 授权已撤销，连接已清理"; requestStop(terminalMessage); super.onRevoke() }
    override fun onDestroy() {
        stopRequested.set(true)
        saveUsage()
        runCatching { Mobile.stopVPN() }
        runCatching { descriptor?.close() }; descriptor = null
        if (observing) runCatching { manager.unregisterNetworkCallback(observer) }
        boundNetwork = null
        if (instance === this) instance = null
        VpnRuntime.publish(terminalMessage?.let { VpnUiState("error", it) } ?: VpnUiState())
        scope.cancel()
        super.onDestroy()
    }

    private fun saveUsage() {
        if(!usageStarted||!usageRecorded.compareAndSet(false,true))return
        runCatching {
            val status=JSONObject(Mobile.vpnStatus())
            (application as PingClashApplication).repository.recordUsage(status.optLong("uploaded"),status.optLong("downloaded"),status.optLong("uptime"))
        }
    }

    private fun notification(message: String): Notification {
        val open = PendingIntent.getActivity(this, 0, Intent(this, MainActivity::class.java), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val stop = PendingIntent.getService(this, 1, Intent(this, PingVpnService::class.java).setAction(DISCONNECT), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        return Notification.Builder(this, CHANNEL).setSmallIcon(dev.pingclash.app.R.drawable.ic_status)
            .setContentTitle("PingClash").setContentText(message).setContentIntent(open).setOngoing(true)
            .addAction(Notification.Action.Builder(null, "断开", stop).build()).build()
    }

    companion object {
        const val CONNECT = "dev.pingclash.CONNECT"
        const val DISCONNECT = "dev.pingclash.DISCONNECT"
        private const val CHANNEL = "vpn"
        private const val NOTIFICATION_ID = 1
        @Volatile internal var instance: PingVpnService? = null
            private set
    }
}
