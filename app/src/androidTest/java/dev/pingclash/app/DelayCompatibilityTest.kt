// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.lifecycle.ViewModelProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import java.net.ServerSocket
import java.net.Socket
import java.util.concurrent.CopyOnWriteArrayList
import java.util.concurrent.atomic.AtomicInteger
import kotlin.concurrent.thread

@RunWith(AndroidJUnit4::class)
class DelayCompatibilityTest {
    @get:Rule val compose=createAndroidComposeRule<MainActivity>()

    @Test fun nullBandwidthHttpGroupsImportAndRefreshButtonRemainsEnabled() {
        val app=compose.activity.application as PingClashApplication
        val nodes=JSONArray();val names=(0 until 112).map {"节点$it"}
        names.forEachIndexed {i,name ->nodes.put(JSONObject().put("name",name).put("type",if(i>=101)"hysteria2" else "anytls").put("server","example.invalid").put("port",443).put("password","delay-compat-fixture").apply {if(i>=101){put("up",JSONObject.NULL);put("down",JSONObject.NULL)}})}
        fun group(name: String,type: String,members: List<String>)=JSONObject().put("name",name).put("type",type).put("proxies",JSONArray(members)).apply {if(type!="select")put("url","http://www.gstatic.com/generate_204")}
        val raw=JSONObject().put("proxies",nodes).put("proxy-groups",JSONArray().put(group("主代理","select",listOf("自动选择","故障转移")+names)).put(group("自动选择","url-test",names)).put(group("故障转移","fallback",names))).toString()
        val profile=app.repository.importProfile("兼容性回归",raw)
        try {
            app.repository.activate(profile.id)
            assertEquals(112,profile.nodes.size);assertEquals(0,profile.unsupported);assertEquals(0,profile.groupsUnsupported)
            compose.onNodeWithTag("nav-1").performClick()
            compose.onNodeWithTag("proxy-test-group").assertIsEnabled()
            compose.onNodeWithTag("group-choice-主代理-自动选择").assertIsEnabled()
            captureSyntheticFixture(compose,androidx.test.uiautomator.UiDevice.getInstance(androidx.test.platform.app.InstrumentationRegistry.getInstrumentation()),"delay-compatibility.png")
            app.repository.reparse(profile.id)
            val saved=ProfileRepository(app).data.value.activeProfile!!
            assertEquals(112,saved.nodes.size);assertEquals(listOf("主代理","自动选择","故障转移"),saved.groups.map {it.name})
            assertEquals("自动选择",saved.groups[0].selected)
        } finally {app.repository.delete(profile.id)}
    }

    @Test fun delayQueueRunsTenAtOnceCancelsAndCompletesBeyondThirtySeconds() {
        val app=compose.activity.application as PingClashApplication
        val repo=app.repository;val before=repo.data.value
        val model=ViewModelProvider(compose.activity)[AppViewModel::class.java]
        val server=ServerSocket(0,64,java.net.InetAddress.getByName("127.0.0.1"))
        val sockets=CopyOnWriteArrayList<Socket>();val active=AtomicInteger();val peak=AtomicInteger()
        val acceptor=thread(isDaemon=true) {
            while(!server.isClosed) {
                val socket=runCatching {server.accept()}.getOrNull()?:break
                sockets.add(socket);val count=active.incrementAndGet();peak.updateAndGet {maxOf(it,count)}
                thread(isDaemon=true) {try {val buffer=ByteArray(4096);while(socket.getInputStream().read(buffer)>=0){} }catch(_:Exception){}finally{active.decrementAndGet();socket.close()}}
            }
        }
        val names=(0 until 32).map {"慢节点$it"}
        val nodes=JSONArray(names.map {name ->JSONObject().put("name",name).put("type","anytls").put("server","127.0.0.1").put("port",server.localPort).put("password","delay-queue-fixture")})
        val raw=JSONObject().put("proxies",nodes).put("proxy-groups",JSONArray().put(JSONObject().put("name","测速队列").put("type","select").put("proxies",JSONArray(names)))).toString()
        val p=repo.importProfile("队列回归",raw)
        try {
            assertEquals(10,ClientSettings().probeConcurrency)
            assertEquals(10,ClientSettings.read(JSONObject().put("probeConcurrency",2)).probeConcurrency)
            assertEquals(2,ClientSettings.read(ClientSettings(probeConcurrency=2).json()).probeConcurrency)
            repo.activate(p.id)
            repo.clientSettings(before.client.copy(probeConcurrency=10,probeTimeout=1000,delayUrl="http://127.0.0.1:1/"),before.dnsAddress,before.probeUrl)
            compose.waitForIdle();compose.onNodeWithTag("nav-1").performClick()
            compose.onNodeWithTag("proxy-test-group").assertIsEnabled().performClick()
            compose.waitUntil(10000) {peak.get()>=10}
            compose.onNodeWithTag("proxy-test-group").assertIsEnabled().performClick()
            compose.waitUntil(10000) {!model.proxyTests.value.running&&active.get()==0}
            // One worker and 32 one-second timeouts would previously stop at 30 s.
            repo.clientSettings(before.client.copy(probeConcurrency=1,probeTimeout=1000,delayUrl="http://127.0.0.1:1/"),before.dnsAddress,before.probeUrl)
            compose.waitForIdle()
            compose.onNodeWithTag("proxy-test-group").performClick()
            compose.waitUntil(50000) {!model.proxyTests.value.running&&model.proxyTests.value.completed==32}
            assertEquals(32,model.proxyTests.value.total)
            assertEquals(32,model.proxyTests.value.values.values.count {it.state=="timeout"})
            assertTrue(peak.get()<=16)
        } finally {
            model.cancelProxyTests();server.close();sockets.forEach {runCatching {it.close()}};acceptor.join(2000)
            compose.waitUntil(10000) {active.get()==0}
            repo.clientSettings(before.client,before.dnsAddress,before.probeUrl);repo.delete(p.id)
        }
    }
}
