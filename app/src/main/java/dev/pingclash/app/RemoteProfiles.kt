// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import dev.pingclash.mobile.Mobile
import org.json.JSONArray
import org.json.JSONObject
import java.time.Instant

// URLs, authorization headers and payloads are private profile data. Persist
// only through ProfileRepository's authenticated encryption, never as filenames.
data class RemoteProfile(val original: String, val bodies: Map<String,String>, val updated: Map<String,Long>, val retryAfter: Long=0, val error: String="", val pending: Boolean=false) {
    fun json()=JSONObject().put("original",original).put("bodies",JSONObject(bodies)).put("updated",JSONObject(updated))
        .put("retryAfter",retryAfter).put("error",error).put("pending",pending)
    companion object {
        fun read(value: JSONObject?): RemoteProfile?=value?.let {
            val original=it.getString("original");require(original.toByteArray().size<=2*1024*1024)
            val bodies=it.getJSONObject("bodies");val times=it.getJSONObject("updated");require(bodies.length()<=16 && times.length()<=16)
            RemoteProfile(original,bodies.keys().asSequence().associateWith(bodies::getString),times.keys().asSequence().associateWith(times::getLong),it.optLong("retryAfter"),it.optString("error").takeIf {s->s.matches(Regex("[0-9]{1,2}:(proxy|rule):(provider_invalid|provider_payload|provider_network)"))}.orEmpty(),it.optBoolean("pending"))
        }
    }
}

internal class ProviderFailure(val index: Int,val kind: String,val code: String): Exception("provider_failed") {
    fun publicMessage()=tr(R.string.provider_failure,index,kind,tr(when(code){"provider_network"->R.string.provider_network;"provider_invalid"->R.string.provider_invalid;else->R.string.provider_payload}))
}
internal fun providerFailure(reply: JSONObject)=ProviderFailure(reply.optInt("index"),reply.optString("kind").takeIf {it in setOf("proxy","rule")}.orEmpty(),reply.optString("code"))
internal data class PreparedRemoteProfile(val content: String,val remote: RemoteProfile?)

internal object RemoteProfiles {
    fun plan(text: String): JSONArray {
        val reply=JSONObject(Mobile.planRemoteProviders(text))
        if(reply.optString("state")!="passed")throw providerFailure(reply)
        return reply.optJSONArray("providers")?:JSONArray()
    }
    fun resolve(text: String,bodies: Map<String,String>): String {
        val reply=JSONObject(Mobile.resolveRemoteProviders(text,JSONObject(bodies).toString()))
        if(reply.optString("state")!="passed")throw providerFailure(reply)
        return reply.getString("content")
    }
    fun load(text: String,userAgent: String,old: RemoteProfile?=null,force: Boolean=false,now: Long=Instant.now().epochSecond): PreparedRemoteProfile {
        val specs=plan(text)
        if(specs.length()==0)return PreparedRemoteProfile(text,null)
        val deadline=System.nanoTime()+java.util.concurrent.TimeUnit.SECONDS.toNanos(60)
        val bodies=mutableMapOf<String,String>();val updated=mutableMapOf<String,Long>()
        for(i in 0 until specs.length()) {
            val spec=specs.getJSONObject(i);val id=spec.getString("id")
            val previous=old?.takeIf {it.original==text}
            val stamp=previous?.updated?.get(id)?:0
            if(!force && previous?.bodies?.containsKey(id)==true && now>=stamp && now-stamp<spec.getInt("interval")) {
                bodies[id]=previous.bodies.getValue(id);updated[id]=stamp
            } else {
                val headers=spec.getJSONObject("headers").let {h->h.keys().asSequence().associateWith(h::getString)}
                try {
                    val remaining=java.util.concurrent.TimeUnit.NANOSECONDS.toMillis(deadline-System.nanoTime())
                    if(remaining<=0)throw java.net.SocketTimeoutException("provider_deadline")
                    bodies[id]=SubscriptionDownloader.fetchResponse(spec.getString("url"),userAgent,headers,remaining.coerceAtMost(30_000).toInt()).content
                    updated[id]=now
                } catch(_: Exception) {throw ProviderFailure(spec.getInt("index"),spec.getString("kind"),"provider_network")}
            }
            if(bodies.values.sumOf {it.toByteArray().size}>2*1024*1024)throw ProviderFailure(spec.getInt("index"),spec.getString("kind"),"provider_payload")
        }
        return PreparedRemoteProfile(resolve(text,bodies),RemoteProfile(text,bodies,updated))
    }
    fun due(remote: RemoteProfile,now: Long=Instant.now().epochSecond): Boolean {
        if(now<remote.retryAfter)return false
        val specs=plan(remote.original)
        return (0 until specs.length()).any {i->val spec=specs.getJSONObject(i);val last=remote.updated[spec.getString("id")]?:0;now<last || now-last>=spec.getInt("interval")}
    }
}
