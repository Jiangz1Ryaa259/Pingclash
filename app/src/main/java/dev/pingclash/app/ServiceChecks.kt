// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit
import org.json.JSONObject
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

internal data class ServiceTarget(val id: String,val name: String,val url: String)
// Fixed public HTTPS targets. Brand ordering follows the services users commonly check;
// endpoint HEAD latency never claims account, regional access or service unlock.
internal val serviceTargets=listOf(
    ServiceTarget("google","Google","https://www.gstatic.com/generate_204"),
    ServiceTarget("chatgpt","ChatGPT","https://chatgpt.com/"),
    ServiceTarget("gemini","Gemini","https://gemini.google.com/"),
    ServiceTarget("youtube","YouTube","https://www.youtube.com/generate_204"),
    ServiceTarget("github","GitHub","https://github.com/"),
    ServiceTarget("claude","Claude","https://claude.ai/"),
    ServiceTarget("cloudflare","Cloudflare","https://www.cloudflare.com/cdn-cgi/trace"),
    ServiceTarget("netflix","Netflix","https://www.netflix.com/"),
    ServiceTarget("spotify","Spotify","https://open.spotify.com/"),
    ServiceTarget("discord","Discord","https://discord.com/"),
    ServiceTarget("telegram","Telegram","https://web.telegram.org/"),
    ServiceTarget("bilibili","Bilibili","https://www.bilibili.com/"),
)
internal data class ServiceResult(val state: String,val status: Int=0,val elapsed: Long=0)
internal data class ServiceCheckState(val running: Boolean=false,val values: Map<String,ServiceResult> = emptyMap())
internal fun serviceSelection(ids: List<String>)=serviceTargets.filter {it.id in ids.toSet()}

/** Explicit selection only; Mihomo URLTest, at most four simultaneous probes. No response bodies or raw errors. */
internal class ServiceChecks(private val scope: CoroutineScope) {
    private val mutable=MutableStateFlow(ServiceCheckState())
    val state=mutable.asStateFlow()
    private var job: Job?=null
    private val runs=ConcurrentHashMap.newKeySet<String>()
    @Volatile private var generation=0
    fun start(config: String,timeout: Int,ids: List<String>,unified: Boolean) {
        val targets=serviceSelection(ids)
        if(mutable.value.running||targets.isEmpty())return
        val ticket=++generation
        val limit=timeout.coerceIn(1000,10000)
        mutable.update {it.copy(running=true,values=it.values+targets.associate {t->t.id to ServiceResult("running")})}
        job=scope.launch(Dispatchers.IO) {
            val gate=Semaphore(4)
            try {targets.map {target->async {gate.withPermit {
                ensureActive()
                runTarget(config,target,limit,unified,ticket)
            }}}.awaitAll()} finally {if(ticket==generation)mutable.update {it.copy(running=false)}}
        }
    }
    private fun runTarget(config: String,target: ServiceTarget,timeout: Int,unified: Boolean,ticket: Int) {
        val id=UUID.randomUUID().toString()
        if(!Mobile.prepareProbe(id,timeout+1000L)) {
            publish(target.id,ServiceResult("failed"),ticket);return
        }
        runs.add(id)
        try {
            if(ticket!=generation) {Mobile.cancel(id);return}
            val result=runCatching {JSONObject(Mobile.probeDelay(config,target.url,id,timeout.toLong(),unified))}
                .getOrNull()
            val state=if(result?.optString("code")?.contains("timeout")==true)"timeout"
                else result?.optString("state")?:"failed"
            publish(target.id,ServiceResult(state,
                elapsed=(result?.optLong("elapsedMs")?:0).coerceAtLeast(0)),ticket)
        } finally {runs.remove(id);Mobile.discardProbe(id)}
    }
    private fun publish(id: String,value: ServiceResult,ticket: Int) {
        if(ticket==generation)mutable.update {it.copy(values=it.values+(id to value))}
    }
    fun cancel() {
        generation++
        val ids=runs.toList();job?.cancel();job=null
        scope.launch(Dispatchers.IO) {ids.forEach {Mobile.cancel(it)}}
        mutable.value=ServiceCheckState()
    }
}
