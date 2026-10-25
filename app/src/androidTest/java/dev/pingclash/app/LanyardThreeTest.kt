// SPDX-License-Identifier: GPL-3.0-only
// Synthetic renderer fixture: no profile, credentials or real VPN connection.
package dev.pingclash.app

import android.net.Uri
import android.view.View
import android.view.ViewGroup
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import androidx.compose.ui.unit.dp
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.UiDevice
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import org.json.JSONObject
import org.json.JSONTokener
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class LanyardThreeTest {
    private lateinit var control: LanyardThreeState
    @get:Rule(order=0) val locale=ResourceLocaleRule()
    @get:Rule(order=1) val compose=createAndroidComposeRule<MainActivity>()

    @Test fun originalThreeSceneRendersAndNativeActionControlsBothFaces() {
        val phase=mutableStateOf("idle")
        val motion=mutableStateOf(true)
        fixture {CompositionLocalProvider(LocalMotionAllowed provides motion.value) {
            LanyardPowerControl(phase.value,true,"Fixture action") {
                phase.value=if(phase.value=="idle")"connecting" else "stopping"
            }
        }}
        val view=renderer()
        await {status(view).optBoolean("ready")}
        val rendered=status(view)
        assertTrue("Native frame delivered: "+evaluate(view,"JSON.stringify(window.__pingclashFrame)"),
            rendered.optBoolean("active"))
        assertEquals("three",rendered.getString("engine"))
        assertTrue(rendered.getInt("frames")>0)
        assertEquals(.42,rendered.getDouble("roughness"),.001)
        assertEquals(1.0,rendered.getDouble("clearcoat"),.001)
        assertEquals(.16,rendered.getDouble("metalRoughness"),.001)
        await {control.ready}
        compose.waitForIdle()
        assertEquals("Canvas size", "true",evaluate(view,
            "document.querySelector('canvas').clientHeight>100"))
        captureSyntheticFixture(compose,UiDevice.getInstance(InstrumentationRegistry.getInstrumentation()),
            "lanyard-three-front.png")
        compose.onNodeWithTag("vpn-power").performClick()
        compose.waitForIdle()
        await {evaluate(view,"window.__pingclashFrame.back")=="true"}
        compose.runOnIdle {phase.value="established"}
        compose.waitForIdle()
        await {evaluate(view,"window.__pingclashFrame.phase")=="\"established\""}
        compose.runOnIdle {motion.value=false}
        compose.waitForIdle()
        await {evaluate(view,"window.__pingclashFrame.motion")=="false"}
        Thread.sleep(1200)
        captureSyntheticFixture(compose,UiDevice.getInstance(InstrumentationRegistry.getInstrumentation()),
            "lanyard-three-back.png")
        compose.onNodeWithTag("vpn-power").performClick()
        compose.waitForIdle()
        await {evaluate(view,"window.__pingclashFrame.back")=="false"}
        assertFalse(VpnRuntime.state.value.active)
    }

    @Test fun rendererCannotReadLocalFilesNavigateOrConnectToRemoteHosts() {
        fixture {LanyardPowerControl("idle",true,"Fixture action") {}}
        val view=renderer()
        await {status(view).optBoolean("ready")}
        compose.runOnUiThread {
            assertFalse(view.settings.allowFileAccess)
            assertFalse(view.settings.allowContentAccess)
            assertFalse(view.settings.domStorageEnabled)
            assertTrue(view.settings.blockNetworkLoads)
            assertEquals(WebSettings.MIXED_CONTENT_NEVER_ALLOW,view.settings.mixedContentMode)
            val client=OfflineLanyardClient(compose.activity.assets,{}, {})
            assertTrue(client.permits(Uri.parse(LANYARD_PAGE)))
            for(url in listOf("http://appassets.androidplatform.net/lanyard/index.html",
                "$LANYARD_PAGE?token=CANARY-SUB-TOKEN-1234","$LANYARD_PAGE#fragment",
                "https://example.invalid/lanyard/index.html","file:///data/data/dev.pingclash.app/",
                "content://dev.pingclash.app/private","https://appassets.androidplatform.net/lanyard/../private",
                "https://user@appassets.androidplatform.net/lanyard/index.html")) {
                assertFalse(client.permits(Uri.parse(url)))
            }
        }
        assertEquals("\"undefined\"",evaluate(view,"typeof window.Android"))
        evaluate(view,"window.__blocked=false;fetch('https://example.invalid/').catch(()=>window.__blocked=true)")
        await {evaluate(view,"window.__blocked")=="true"}
        evaluate(view,"window.PingClashScene.frame({active:false})")
        Thread.sleep(250)
        val stopped=status(view).getInt("frames")
        Thread.sleep(250)
        assertEquals(stopped,status(view).getInt("frames"))
        evaluate(view,"window.PingClashScene.frame({active:true})")
        await {status(view).getInt("frames")>stopped}
    }

    private fun fixture(content: @androidx.compose.runtime.Composable ()->Unit) {
        compose.runOnUiThread {compose.activity.setContent {
            PingClashTheme("dark") {ScenicFrame(0,"ocean",true,{}) {
                val renderer=LocalLanyardThree.current
                SideEffect {control=requireNotNull(renderer)}
                Column(Modifier.fillMaxSize().padding(horizontal=24.dp,vertical=100.dp)) {content()}
            }}
        }}
        compose.waitForIdle()
    }
    private fun renderer(): WebView {
        var result: WebView?=null
        compose.runOnUiThread {result=find(compose.activity.window.decorView)}
        return requireNotNull(result)
    }
    private fun find(view: View): WebView? {
        return when {
            view is WebView&&view.tag=="lanyard-offline-webview" -> view
            view is ViewGroup -> (0 until view.childCount).asSequence()
                .mapNotNull {find(view.getChildAt(it))}.firstOrNull()
            else -> null
        }
    }
    private fun status(view: WebView): JSONObject=JSONObject(JSONTokener(
        evaluate(view,"JSON.stringify(window.PingClashScene?.status()||{})")).nextValue().toString())
    private fun evaluate(view: WebView,script: String): String {
        val latch=CountDownLatch(1);var result="null"
        InstrumentationRegistry.getInstrumentation().runOnMainSync {
            view.evaluateJavascript(script) {result=it;latch.countDown()}
        }
        assertTrue("Offline renderer JavaScript callback",latch.await(30,TimeUnit.SECONDS))
        return result
    }
    private fun await(predicate: ()->Boolean) {
        val deadline=System.nanoTime()+TimeUnit.SECONDS.toNanos(60)
        while(System.nanoTime()<deadline) {
            if(predicate())return
            Thread.sleep(100)
        }
        assertTrue("Offline Three renderer reached the expected state",predicate())
    }
}
