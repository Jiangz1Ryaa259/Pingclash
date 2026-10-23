// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import org.json.JSONArray
import org.json.JSONObject

data class ClientSettings(
    val mode: String="global", val mtu: Int=1500, val ipv6: Boolean=true, val udp: Boolean=true,
    val lan: String="proxy", val connectTimeout: Int=10, val udpTimeout: Int=60, val maxConnections: Int=256,
    val dnsMode: String="tcp", val dnsHttps: String="https://cloudflare-dns.com/dns-query",
    val appMode: String="all", val packages: List<String> = emptyList(),
    val useProviderRules: Boolean=true, val customRules: String="", val inspectConnections: Boolean=false,
    val language: String="system", val theme: String="system", val keepUsage: Boolean=false,
    val showSpeed: Boolean=true, val showTraffic: Boolean=true, val showMemory: Boolean=true,
    val showService: Boolean=true, val notificationSpeed: Boolean=true,
    val probeTimeout: Int=5000, val probeConcurrency: Int=10, val unifiedDelay: Boolean=true, val delayUrl: String="",
) {
    fun json(): JSONObject = JSONObject().apply {
        put("mode",mode);put("mtu",mtu);put("ipv6",ipv6);put("udp",udp);put("lan",lan)
        put("connectTimeout",connectTimeout);put("udpTimeout",udpTimeout);put("maxConnections",maxConnections)
        put("dnsMode",dnsMode);put("dnsHttps",dnsHttps);put("appMode",appMode);put("packages",JSONArray(packages))
        put("useProviderRules",useProviderRules);put("customRules",customRules);put("inspectConnections",inspectConnections)
        put("language",language);put("theme",theme);put("keepUsage",keepUsage)
        put("showSpeed",showSpeed);put("showTraffic",showTraffic);put("showMemory",showMemory);put("showService",showService)
        put("notificationSpeed",notificationSpeed);put("probeTimeout",probeTimeout);put("probeConcurrency",probeConcurrency)
        put("probeSettingsVersion",2);put("unifiedDelay",unifiedDelay);put("delayUrl",delayUrl)
    }
    companion object {
        fun read(p: JSONObject?): ClientSettings {
            if(p==null) return ClientSettings()
            val defaults=ClientSettings()
            val packages=p.optJSONArray("packages") ?: JSONArray()
            require(packages.length()<=300)
            return ClientSettings(p.optString("mode","global"),p.optInt("mtu",1500),p.optBoolean("ipv6",true),p.optBoolean("udp",true),
                p.optString("lan","proxy"),p.optInt("connectTimeout",10),p.optInt("udpTimeout",60),p.optInt("maxConnections",256),
                p.optString("dnsMode","tcp"),p.optString("dnsHttps",defaults.dnsHttps),p.optString("appMode","all"),(0 until packages.length()).map(packages::getString),
                p.optBoolean("useProviderRules",true),p.optString("customRules"),p.optBoolean("inspectConnections"),p.optString("language","system"),p.optString("theme","system"),p.optBoolean("keepUsage"),
                p.optBoolean("showSpeed",true),p.optBoolean("showTraffic",true),p.optBoolean("showMemory",true),p.optBoolean("showService",true),p.optBoolean("notificationSpeed",true),p.optInt("probeTimeout",5000),
                p.optInt("probeConcurrency",10).let {if(p.optInt("probeSettingsVersion")<2&&it==2)10 else it},p.optBoolean("unifiedDelay",true),p.optString("delayUrl"))
        }
    }
}
data class LocalUsage(val uploaded: Long=0,val downloaded: Long=0,val seconds: Long=0,val sessions: Long=0) {
    fun json()=JSONObject().put("uploaded",uploaded).put("downloaded",downloaded).put("seconds",seconds).put("sessions",sessions)
    companion object {fun read(p: JSONObject?)=LocalUsage(p?.optLong("uploaded")?.coerceAtLeast(0)?:0,p?.optLong("downloaded")?.coerceAtLeast(0)?:0,p?.optLong("seconds")?.coerceAtLeast(0)?:0,p?.optLong("sessions")?.coerceAtLeast(0)?:0)}
}
internal fun AppData.runtimeOptions(settings: ClientSettings=client): String {
    val rules=if(settings.mode=="rule") settings.customRules.lineSequence().map(String::trim).filter {it.isNotBlank()&&!it.startsWith("#")}.toList() +
        (if(settings.useProviderRules) activeProfile?.rules.orEmpty() else emptyList()) else emptyList()
    if(settings.mode=="rule"&&settings.useProviderRules) require((activeProfile?.rulesOmitted?:0)==0) {"原配置存在超限或无效规则，不能启用规则模式"}
    return JSONObject().put("mode",settings.mode).put("mtu",settings.mtu).put("ipv6",settings.ipv6).put("udp",settings.udp).put("lan",settings.lan)
        .put("connectTimeout",settings.connectTimeout).put("udpTimeout",settings.udpTimeout).put("maxConnections",settings.maxConnections)
        .put("dnsMode",settings.dnsMode).put("dnsHttps",settings.dnsHttps).put("inspectConnections",settings.inspectConnections)
        .put("rules",JSONArray(rules)).put("definition",if(settings.mode=="rule")activeProfile?.definition.orEmpty() else "").toString()
}
internal fun validateClientSettings(value: ClientSettings) {
    require(value.delayUrl.isEmpty() || value.delayUrl.length<=2048 && runCatching {
        val url=java.net.URI(value.delayUrl)
        url.scheme in listOf("http","https")&&!url.host.isNullOrBlank()&&url.rawUserInfo==null&&url.rawFragment==null&&(url.port==-1||url.port in 1..65535)
    }.getOrDefault(false)) {"测速目标必须是无用户名和密码的 HTTP 或 HTTPS 地址"}
    require(value.mode in listOf("global","rule","direct")&&value.mtu in 1280..9000&&value.lan in listOf("proxy","direct","block")&&value.connectTimeout in 3..60&&value.udpTimeout in 10..300&&value.maxConnections in 16..512&&value.dnsMode in listOf("tcp","https")) {"网络选项无效或超过限制"}
    require(value.appMode in listOf("all","exclude","include")&&value.packages.size<=300&&value.packages.distinct().size==value.packages.size&&value.packages.all {it.length<=255&&it!="dev.pingclash.app"&&it.matches(Regex("[A-Za-z][A-Za-z0-9_]*(\\.[A-Za-z0-9_]+)+"))}&&(value.appMode!="include"||value.packages.isNotEmpty())) {"应用分流列表无效；仅代理模式至少选择一个应用"}
    require(value.language in listOf("system","zh","en")&&value.theme in listOf("system","light","dark")&&value.customRules.toByteArray().size<=64*1024&&value.probeTimeout in 1000..20000&&value.probeConcurrency in 1..16) {"显示或测速选项无效或超过限制"}
}
