// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.app.Application
import android.net.ConnectivityManager
import android.net.DnsResolver
import android.net.Network
import android.net.NetworkCapabilities
import android.os.CancellationSignal
import android.os.ParcelFileDescriptor
import dev.pingclash.mobile.Mobile
import dev.pingclash.mobile.Platform
import kotlinx.coroutines.launch
import java.net.InetAddress
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Executor
import java.util.concurrent.TimeUnit

class PingClashApplication : Application() {
    lateinit var repository: ProfileRepository
        private set
    var nativeReady = false
        private set

    override fun onCreate() {
        super.onCreate()
        UiStrings.initialize(this)
        dev.pingclash.diagnostics.DiagnosticText.install {key -> diagnosticResources[key]?.let {tr(it)}?:key}
        dev.pingclash.diagnostics.DiagnosticText.setVersion(packageManager.getPackageInfo(packageName,0).versionName?:"development")
        nativeReady = runCatching {
            go.Seq.setContext(this)
            Mobile.setPlatform(AndroidCorePlatform(this))
            org.json.JSONObject(Mobile.info()).getString("engine") == "mihomo"
        }.getOrDefault(false)
        repository = ProfileRepository(this)
        UiStrings.migrate(repository.data.value.client.language)
        if(nativeReady) kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.SupervisorJob()+kotlinx.coroutines.Dispatchers.IO).launch {
            while(true) {
                repository.data.value.profiles.filter {it.remote!=null}.forEach {profile ->
                    runCatching {repository.refreshProviders(profile)}
                }
                kotlinx.coroutines.delay(60_000)
            }
        }
    }
}

internal class AndroidCorePlatform(context: Application) : Platform {
    private val manager = context.getSystemService(ConnectivityManager::class.java)
    fun underlying(): Network? {
        fun eligible(network: Network) = manager.getNetworkCapabilities(network)?.let {
            it.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) && !it.hasTransport(NetworkCapabilities.TRANSPORT_VPN)
        } == true
        PingVpnService.instance?.let { return it.boundNetwork?.takeIf(::eligible) }
        // Follow the current system route; never silently bypass another VPN or
        // choose a different physical network when the current one is absent.
        return manager.activeNetwork?.takeIf(::eligible)
    }

    override fun protect(fd: Long): Boolean = runCatching {
        val network = underlying() ?: return false
        val vpn = PingVpnService.instance
        if (vpn != null && !vpn.protect(fd.toInt())) return false
        ParcelFileDescriptor.fromFd(fd.toInt()).use { network.bindSocket(it.fileDescriptor) }
        true
    }.getOrDefault(false)

    override fun lookup(host: String, timeoutMillis: Long): String {
        val network = underlying() ?: return ""
        val signal = CancellationSignal()
        val answer = CompletableFuture<List<InetAddress>>()
        return try {
            DnsResolver.getInstance().query(network, host, DnsResolver.FLAG_EMPTY, Executor { it.run() }, signal,
                object : DnsResolver.Callback<List<InetAddress>> {
                    override fun onAnswer(values: List<InetAddress>, rcode: Int) {
                        if (rcode == 0) answer.complete(values) else answer.complete(emptyList())
                    }
                    override fun onError(error: DnsResolver.DnsException) { answer.complete(emptyList()) }
                })
            answer.get(timeoutMillis.coerceIn(1, 5000), TimeUnit.MILLISECONDS).joinToString("\n") { it.hostAddress.orEmpty() }
        } catch (_: Exception) { "" } finally { signal.cancel() }
    }
}
