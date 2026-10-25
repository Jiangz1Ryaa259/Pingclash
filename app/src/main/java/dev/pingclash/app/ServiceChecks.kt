// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import dev.pingclash.mobile.Mobile
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import org.json.JSONObject
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

internal data class ServiceTarget(val id: String,val name: String,val url: String)
internal val serviceTargets=listOf(
    ServiceTarget("google","Google","https://www.gstatic.com/generate_204"),
    ServiceTarget("chatgpt","ChatGPT","https://chatgpt.com/"),
    ServiceTarget("gemini","Gemini","https://gemini.google.com/"),
)
internal data class ServiceResult(val state: String,val status: Int=0,val elapsed: Long=0)
internal data class ServiceCheckState(val running: Boolean=false,val values: Map<String,ServiceResult> = emptyMap())

/** User-triggered, three fixed HTTPS endpoints, no cookies, account data, response bodies or raw errors retained. */
private const val MIN_SERVICE_TIMEOUT=1000
private const val MAX_SERVICE_TIMEOUT=10000

internal class ServiceChecks(private val scope: CoroutineScope) {
    private val mutable=MutableStateFlow(ServiceCheckState())
    val state=mutable.asStateFlow()
    private var job: Job?=null
    private val runs=ConcurrentHashMap.newKeySet<String>()
    @Volatile private var generation=0
    fun start(config: String,timeout: Int) {
        if(mutable.value.running)return
        val ticket=++generation
        mutable.value=ServiceCheckState(true,serviceTargets.associate {it.id to ServiceResult("running")})
        job=scope.launch(Dispatchers.IO) {
            try {serviceTargets.map {target ->async {
                val id=UUID.randomUUID().toString();runs.add(id)
                try {
                    val result=runCatching {JSONObject(Mobile.probe(config,target.url,id,
                        timeout.coerceIn(MIN_SERVICE_TIMEOUT,MAX_SERVICE_TIMEOUT).toLong()))}
                        .getOrNull()
                    val value=ServiceResult(result?.optString("state")?:"failed",
                        result?.optInt("httpStatus")?:0,result?.optLong("elapsedMs")?:0)
                    if(ticket==generation)mutable.update {it.copy(values=it.values+(target.id to value))}
                } finally {runs.remove(id)}
            }}.awaitAll()} finally {if(ticket==generation)mutable.update {it.copy(running=false)}}
        }
    }
    fun cancel() {
        generation++
        val ids=runs.toList();job?.cancel();job=null
        scope.launch(Dispatchers.IO) {ids.forEach {Mobile.cancel(it)}}
        mutable.value=ServiceCheckState()
    }
}
