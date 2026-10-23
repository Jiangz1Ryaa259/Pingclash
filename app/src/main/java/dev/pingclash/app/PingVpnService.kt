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
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.Channel
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
    val phase: String = "idle", val message: String = tr(R.string.message_93ae902da0),
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
        if (previous.active || !mutableState.compareAndSet(previous, VpnUiState("connecting", tr(R.string.message_55910a2986)))) return
        try { context.startForegroundService(Intent(context, PingVpnService::class.java).setAction(PingVpnService.CONNECT)) }
        catch (error: Exception) { publish(VpnUiState("error", tr(R.string.message_7c2b616daa))); throw error }
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
    private val networkChanges=Channel<Unit>(Channel.CONFLATED)
    private var statisticsJob: Job?=null
    @Volatile private var terminalMessage: String? = null
    private var descriptor: ParcelFileDescriptor? = null
    @Volatile internal var boundNetwork: Network? = null
        private set
    private var observing = false
    private var usageStarted=false
    private val usageRecorded=AtomicBoolean(false)
    private val manager by lazy { getSystemService(ConnectivityManager::class.java) }
    private val observer = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) { networkChanges.trySend(Unit) }
        override fun onCapabilitiesChanged(network: Network, capabilities: NetworkCapabilities) { networkChanges.trySend(Unit) }
        override fun onLost(network: Network) { networkChanges.trySend(Unit) }
    }

    override fun onCreate() {
        super.onCreate()
        instance = this
        getSystemService(NotificationManager::class.java).createNotificationChannel(
            NotificationChannel(CHANNEL, tr(R.string.message_38854bf43e), NotificationManager.IMPORTANCE_LOW).apply { setShowBadge(false) },
        )
        scope.launch {
            for(ignored in networkChanges) {
                delay(300)
                mutex.withLock {
                    if(starting.get()&&!stopRequested.get()&&descriptor!=null) {
                        try { rebindNetwork() }
                        catch(cancelled: kotlinx.coroutines.CancellationException) {throw cancelled}
                        catch(_: Exception) {shutdown(tr(R.string.message_5567ea6394))}
                    }
                }
            }
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == DISCONNECT) { requestStop(); return START_NOT_STICKY }
        val settings=(application as PingClashApplication).repository.data.value.client
        val resume=intent==null&&settings.autoReconnect&&getSharedPreferences("vpn_runtime",0).getBoolean("resume_requested",false)&&prepare(this)==null
        if (intent?.action != CONNECT && !isAlwaysOn && !resume) { requestStop(); return START_NOT_STICKY }
        if (!starting.compareAndSet(false, true)) return START_NOT_STICKY
        stopRequested.set(false)
        getSharedPreferences("vpn_runtime",0).edit().putBoolean("resume_requested",true).apply()
        try {
            val notification = notification(tr(R.string.message_5e3a9fc406))
            if (Build.VERSION.SDK_INT >= 34) startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_SYSTEM_EXEMPTED)
            else startForeground(NOTIFICATION_ID, notification)
        } catch (_: Exception) {
            getSharedPreferences("vpn_runtime",0).edit().putBoolean("resume_requested",false).apply()
            VpnRuntime.publish(VpnUiState("error", tr(R.string.message_2bb1c4d7fe))); stopSelf(); return START_NOT_STICKY
        }
        VpnRuntime.publish(VpnUiState("connecting", tr(R.string.message_98b4972bbe)))
        scope.launch { mutex.withLock { establish() } }
        return if(isAlwaysOn||settings.autoReconnect) START_STICKY else START_NOT_STICKY
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
            val network = currentNetwork()
            boundNetwork = network
            if(descriptor!=null)check(setUnderlyingNetworks(network?.let {arrayOf(it)}?:emptyArray()))
            if(!observing) {
                manager.registerNetworkCallback(NetworkRequest.Builder().addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                    .addCapability(NetworkCapabilities.NET_CAPABILITY_NOT_VPN).build(), observer)
                observing = true
            }
            if (stopRequested.get()) { shutdown(); return }
            stage = "tun"
            val builder = Builder().setSession("PingClash").setMtu(data.client.mtu)
                .setUnderlyingNetworks(network?.let {arrayOf(it)}?:emptyArray())
                .addAddress("172.29.0.1", 30).addAddress("fdfe:7069:6e67::1", 126)
                .addRoute("0.0.0.0", 0).addRoute("::", 0).addDnsServer("172.29.0.2")
            // Always capture both address families. Disabling IPv6 rejects it in
            // the forwarder rather than allowing it to escape the VPN route.
            if(data.client.appMode=="include") data.client.packages.forEach(builder::addAllowedApplication)
            else {builder.addDisallowedApplication(packageName);if(data.client.appMode=="exclude") data.client.packages.forEach(builder::addDisallowedApplication)}
            if(descriptor==null)descriptor = builder.establish() ?: error("tun_unavailable")
            if(network==null) {
                if(!data.client.autoReconnect)error("network_unavailable")
                VpnRuntime.publish(VpnUiState("connecting",tr(R.string.vpn_waiting_network)))
                getSystemService(NotificationManager::class.java).notify(NOTIFICATION_ID,notification(tr(R.string.vpn_waiting_network)))
                return
            }
            val result = JSONObject(Mobile.startVPNWithOptions(runtimeConfig, requireNotNull(descriptor).fd.toLong(), data.dnsAddress,options))
            stage = if (result.optString("code") == "config_or_dns_invalid") "configuration" else "forwarder"
            check(result.optString("code") == "tun_established_not_verified") { "native_start_failed" }
            if (stopRequested.get()) { shutdown(); return }
            VpnRuntime.publish(VpnUiState("established", tr(R.string.message_35f7d981fb)))
            usageStarted=true
            usageRecorded.set(false)
            getSystemService(NotificationManager::class.java).notify(NOTIFICATION_ID, notification(tr(R.string.message_247da58fe9)))
            statisticsJob=scope.launch {
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
                "native" -> tr(R.string.message_d448425494)
                "permission" -> tr(R.string.message_4e452fc776)
                "configuration" -> tr(R.string.message_b021d95102)
                "network" -> tr(R.string.message_593ea482b0)
                "tun" -> tr(R.string.message_961e46b3b5)
                else -> tr(R.string.message_5567ea6394)
            }
            shutdown(message)
        }
    }

    private fun currentNetwork(): Network?=manager.activeNetwork?.takeIf {network ->
        manager.getNetworkCapabilities(network)?.let {
            it.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)&&!it.hasTransport(NetworkCapabilities.TRANSPORT_VPN)
        }==true
    }

    private suspend fun rebindNetwork() {
        val next=currentNetwork()
        val running=runCatching {JSONObject(Mobile.vpnStatus()).optBoolean("running")}.getOrDefault(false)
        if(next==boundNetwork&&(running||next==null))return
        if(!(application as PingClashApplication).repository.data.value.client.autoReconnect) {
            shutdown(tr(R.string.message_8d668116e3));return
        }
        statisticsJob?.cancel();statisticsJob=null
        saveUsage();usageStarted=false
        // Stop old outbound sockets before installing the new physical route.
        // The original TUN descriptor remains open throughout the transition.
        boundNetwork=null
        check(setUnderlyingNetworks(emptyArray()))
        Mobile.stopVPN()
        if(stopRequested.get()){shutdown();return}
        val message=tr(if(next==null)R.string.vpn_waiting_network else R.string.vpn_reconnecting)
        VpnRuntime.publish(VpnUiState("connecting",message))
        getSystemService(NotificationManager::class.java).notify(NOTIFICATION_ID,notification(message))
        establish()
    }

    private fun requestStop(message: String? = null) {
        stopRequested.set(true)
        getSharedPreferences("vpn_runtime",0).edit().putBoolean("resume_requested",false).apply()
        scope.launch { mutex.withLock { shutdown(message) } }
    }

    private fun shutdown(message: String? = null) {
        if (message != null) terminalMessage = message
        saveUsage()
        statisticsJob?.cancel();statisticsJob=null
        getSharedPreferences("vpn_runtime",0).edit().putBoolean("resume_requested",false).apply()
        VpnRuntime.publish(VpnUiState("stopping", tr(R.string.message_ee2fa91fe1)))
        runCatching { Mobile.stopVPN() }
        runCatching { descriptor?.close() }; descriptor = null
        if (observing) { runCatching { manager.unregisterNetworkCallback(observer) }; observing = false }
        boundNetwork = null
        runCatching { setUnderlyingNetworks(null) }
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    override fun onRevoke() { terminalMessage = tr(R.string.message_9bcd9db7c0); requestStop(terminalMessage); super.onRevoke() }
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
        networkChanges.close()
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
            .setCategory(Notification.CATEGORY_SERVICE).setOnlyAlertOnce(true).setShowWhen(false)
            .apply {if(Build.VERSION.SDK_INT>=31)setForegroundServiceBehavior(Notification.FOREGROUND_SERVICE_IMMEDIATE)}
            .addAction(Notification.Action.Builder(null, tr(R.string.message_f33ac04eec), stop).build()).build()
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
