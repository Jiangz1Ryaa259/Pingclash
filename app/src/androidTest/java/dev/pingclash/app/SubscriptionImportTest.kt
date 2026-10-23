package dev.pingclash.app

import android.util.Base64
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.AndroidComposeTestRule
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.UiDevice
import java.io.Closeable
import java.io.File
import java.net.InetAddress
import java.net.ServerSocket
import java.security.KeyStore
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicInteger
import javax.net.ssl.*
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

/** Public, synthetic fixture key only. It is in androidTest assets, never the main APK. */
private class SubscriptionFixture : Closeable {
    val requests = AtomicInteger()
    private val workers = Executors.newFixedThreadPool(3)
    private val previousFactory = HttpsURLConnection.getDefaultSSLSocketFactory()
    private val socket: ServerSocket
    val source: String get() = "https://127.0.0.1:${socket.localPort}/redirect?fixture-token=private"
    val html: String get() = "https://127.0.0.1:${socket.localPort}/html?fixture-token=private"
    init {
        val asset = InstrumentationRegistry.getInstrumentation().context.assets.open("subscription-fixture.base64").use { it.readBytes() }
        val store = KeyStore.getInstance("PKCS12").apply { load(Base64.decode(asset, Base64.DEFAULT).inputStream(), "public-test-password".toCharArray()) }
        val keys = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm()).apply { init(store, "public-test-password".toCharArray()) }
        val roots = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm()).apply { init(store) }
        val serverContext = SSLContext.getInstance("TLS").apply { init(keys.keyManagers, null, null) }
        val clientContext = SSLContext.getInstance("TLS").apply { init(null, roots.trustManagers, null) }
        // Restore in close(). Production code never changes certificate trust or hostname checks.
        HttpsURLConnection.setDefaultSSLSocketFactory(clientContext.socketFactory)
        socket = serverContext.serverSocketFactory.createServerSocket(0, 8, InetAddress.getByName("127.0.0.1"))
        workers.execute {
            while (!socket.isClosed) runCatching {
                val connection = socket.accept()
                workers.execute {
                    connection.use {
                        it.soTimeout = 5000
                        val reader = it.getInputStream().bufferedReader()
                        val first = reader.readLine() ?: return@use
                        var total = first.length
                        while (true) { val line = reader.readLine() ?: break; total += line.length; require(total < 32768); if (line.isEmpty()) break }
                        requests.incrementAndGet()
                        val redirect = first.contains(" /redirect")
                        val html = first.contains(" /html")
                        val raw = "anytls://fixture-password@example.invalid:443?sni=example.invalid&insecure=1#HK%20AnyTLS"
                        val body = if (html) "<!doctype html><html>login page</html>" else Base64.encodeToString(raw.toByteArray(), Base64.NO_WRAP)
                        val response = if (redirect) "HTTP/1.1 302 Found\r\nLocation: /subscribe\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"
                        else "HTTP/1.1 200 OK\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: ${body.toByteArray().size}\r\nConnection: close\r\n\r\n$body"
                        it.getOutputStream().write(response.toByteArray()); it.getOutputStream().flush()
                    }
                }
            }
        }
    }
    override fun close() { HttpsURLConnection.setDefaultSSLSocketFactory(previousFactory); socket.close(); workers.shutdownNow() }
}

@RunWith(AndroidJUnit4::class)
class SubscriptionImportTest {
    @get:Rule val compose = createAndroidComposeRule<MainActivity>()
    @Test fun mixedSubscriptionRetainsAllThirtyTwoVlessNodesWithLegacyPlaceholders() {
        val app = compose.activity.application as PingClashApplication
        val nodes = org.json.JSONArray()
        repeat(48) { index -> nodes.put(org.json.JSONObject().apply {
            put("name", "混合节点 $index"); put("server", "example.invalid"); put("port", 443)
            put("skip-cert-verify", true)
            if (index < 16) { put("type", "hysteria2"); put("password", "synthetic-secret") }
            else {
                put("type", "vless"); put("uuid", "ca3ea70c-6845-4e3b-88d4-e4ac64ffbfa8"); put("tls", true)
                put("alterId", if(index%2==0) "0" else 0); put("cipher", "auto")
            }
        }) }
        val profile = app.repository.importProfile("混合订阅回归", org.json.JSONObject().put("proxies", nodes).toString())
        try {
            assertEquals(48, profile.nodes.size); assertEquals(0, profile.unsupported)
            assertEquals(32, profile.nodes.count { it.type == "vless" })
            assertTrue(profile.fieldIssues.isEmpty())
            val restored = ProfileRepository(app).data.value.profiles.single { it.id == profile.id }
            assertEquals(48, restored.nodes.size)
            restored.nodes.filter { it.type == "vless" }.forEach {
                val config = org.json.JSONObject(it.config)
                assertFalse(config.has("alterId")); assertFalse(config.has("cipher"))
                assertTrue(config.getBoolean("tls")); assertTrue(config.getBoolean("skip-cert-verify"))
            }
            compose.onNodeWithTag("nav-2").performClick()
            if(app.repository.data.value.profiles.size>1) compose.onNode(hasText("混合订阅回归") and hasClickAction()).performClick()
            compose.onNodeWithText("48 个节点 · 本地导入").assertIsDisplayed()
        } finally { app.repository.delete(profile.id) }
    }
    @Test fun nativeQuicUsesProtectedAndroidUdpAndReportsBoundedFailure() {
        val socket = java.net.DatagramSocket(0, InetAddress.getByName("127.0.0.1"))
        val worker = Executors.newSingleThreadExecutor()
        try {
            val config = org.json.JSONObject().apply {
                put("type", "hysteria2"); put("server", "127.0.0.1"); put("port", socket.localPort)
                put("password", "synthetic-quic-private"); put("sni", "example.invalid")
            }.toString()
            val result = worker.submit<String> { dev.pingclash.mobile.Mobile.probe(config, "https://example.invalid/", "android-quic-fixture", 1000) }
            socket.soTimeout = 4000
            val packet = java.net.DatagramPacket(ByteArray(2048), 2048)
            socket.receive(packet)
            assertTrue("No QUIC initial reached UDP listener", packet.length >= 1200)
            val encoded = result.get(5, java.util.concurrent.TimeUnit.SECONDS)
            val reply = org.json.JSONObject(encoded)
            assertEquals("failed", reply.getString("state"))
            assertTrue(reply.getString("code") in setOf("timeout_stage_unknown", "proxy_channel_timeout", "proxy_quic_handshake_timeout"))
            assertFalse(encoded.contains("synthetic-quic-private")); assertFalse(encoded.contains("example.invalid"))
        } finally { socket.close(); worker.shutdownNow() }
    }
    @Test fun rejectedVlessFieldsAreVisibleWithoutCredentials() {
        val app = compose.activity.application as PingClashApplication
        val input = """{"proxies":[{"type":"anytls","server":"example.invalid","port":443,"password":"synthetic-secret"},{"type":"vless","server":"private.invalid","port":443,"uuid":"ca3ea70c-6845-4e3b-88d4-e4ac64ffbfa8","tls":true,"tfo":true}]}"""
        val profile = app.repository.importProfile("字段诊断测试", input)
        assertEquals(1, ProfileRepository(app).data.value.profiles.single { it.id == profile.id }.fieldIssues["vless.tfo"])
        compose.onNodeWithTag("nav-2").performClick()
        if (app.repository.data.value.profiles.size > 1) compose.onNode(hasText("字段诊断测试") and hasClickAction()).performClick()
        compose.onNodeWithText("查看未导入详情").performScrollTo().performClick()
        compose.onNodeWithText("VLESS · tfo：1 个节点").assertIsDisplayed()
        compose.onNodeWithText("synthetic-secret", substring=true).assertDoesNotExist()
        compose.onNodeWithText("private.invalid", substring=true).assertDoesNotExist()
        app.repository.delete(profile.id)
    }
    @Test fun screenshotsAllowedExceptWhenCredentialsAreVisible() {
        val instrumentation = InstrumentationRegistry.getInstrumentation()
        val device = UiDevice.getInstance(instrumentation)
        fun assertCaptureProtected(expected: Boolean) {
            compose.waitForIdle(); device.waitForIdle(1000)
            // Observe compositor output, without changing production window flags.
            var protected = !expected
            compose.waitUntil(5000) {
                val bitmap = instrumentation.uiAutomation.takeScreenshot() ?: return@waitUntil false
                var dark = 0; var samples = 0
                for (x in 2..8) for (y in 6..8) {
                    val pixel = bitmap.getPixel(bitmap.width*x/10, bitmap.height*y/10)
                    if (android.graphics.Color.red(pixel)<8 && android.graphics.Color.green(pixel)<8 && android.graphics.Color.blue(pixel)<8) dark++
                    samples++
                }
                bitmap.recycle()
                protected = dark == samples
                protected == expected
            }
            assertEquals(expected, protected)
        }
        compose.onNodeWithTag("nav-2").performClick()
        assertCaptureProtected(false)
        compose.onNodeWithText("添加订阅").performClick()
        compose.onNodeWithTag("subscription-content").performTextInput("https://example.invalid/subscribe?token=synthetic-private")
        device.pressBack() // Dismiss the keyboard before checking the import sheet.
        assertCaptureProtected(false)
        compose.onNodeWithText("显示").performClick()
        assertCaptureProtected(true)
        compose.onNodeWithText("隐藏").performClick()
        assertCaptureProtected(false)
        compose.onNodeWithText("节点配置").performClick()
        assertCaptureProtected(true)
        device.pressBack()
        compose.waitForIdle()
        // Changing the input type may reopen the IME; the first back closes it.
        if (compose.onAllNodesWithText("添加配置").fetchSemanticsNodes().isNotEmpty()) device.pressBack()
        compose.waitUntil(5000) { compose.onAllNodesWithText("添加配置").fetchSemanticsNodes().isEmpty() }
        compose.onNodeWithText("添加订阅").assertIsDisplayed()
        assertCaptureProtected(false)
    }
    @Test fun realHttpsRedirectBase64ImportAndFailureRetainsInput() {
        val app = compose.activity.application as PingClashApplication
        val before = app.repository.data.value.profiles.size
        val model = androidx.lifecycle.ViewModelProvider(compose.activity)[AppViewModel::class.java]
        val device = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())
        SubscriptionFixture().use { fixture ->
            compose.onNodeWithTag("nav-2").performClick()
            compose.onNodeWithText("添加订阅").performClick()
            compose.onNodeWithTag("subscription-content").performTextInput(fixture.html)
            compose.onNodeWithText("下载并导入").performScrollTo().performClick()
            compose.waitUntil(15_000) { model.ui.value.importIssue?.contains("网页") == true }
            compose.onNodeWithText("添加配置").assertExists()
            compose.onNodeWithTag("subscription-content").assert(hasText(fixture.html))
            assertEquals(before, app.repository.data.value.profiles.size)
            captureSyntheticFixture(compose, device, "import-error-light.png")
            compose.onNodeWithTag("subscription-content").performTextReplacement(fixture.source)
            compose.onNodeWithText("下载并导入").performScrollTo().performClick()
            compose.waitUntil(15_000) { app.repository.data.value.profiles.size == before + 1 }
            app.repository.activate(app.repository.data.value.profiles.last().id)
            compose.onNodeWithTag("nav-1").performClick()
            compose.onNodeWithText("HK AnyTLS").assertIsDisplayed()
            assertTrue(fixture.requests.get() >= 3)
            val profile = app.repository.data.value.profiles.last()
            assertEquals("我的订阅", profile.name)
            assertEquals(fixture.source, profile.source)
            assertEquals("anytls", profile.nodes.single().type)
            assertEquals(0, profile.verificationEnabled)
            assertEquals(1, profile.unverifiedNodes)
            assertTrue(org.json.JSONObject(profile.nodes.single().config).getBoolean("skip-cert-verify"))
            val encrypted = File(app.filesDir, "profiles.enc").readText(Charsets.ISO_8859_1)
            assertFalse(encrypted.contains("fixture-password")); assertFalse(encrypted.contains("fixture-token"))
        }
        compose.waitUntil(5000) { compose.onAllNodesWithText("知道了").fetchSemanticsNodes().isNotEmpty() }
        compose.onNodeWithText("知道了").performClick()
        compose.onNodeWithTag("nav-3").performClick()
        compose.onNodeWithTag("tool-settings").performClick()
        captureSyntheticFixture(compose, device, "settings-light.png")
    }
    @Test fun systemDarkThemeAndLargeTextRemainUsable() {
        val device=UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())
        try {
            device.executeShellCommand("cmd uimode night yes")
            compose.waitUntil(10000) { compose.activity.resources.configuration.uiMode and android.content.res.Configuration.UI_MODE_NIGHT_MASK == android.content.res.Configuration.UI_MODE_NIGHT_YES }
            compose.onNodeWithTag("nav-0").performClick()
            captureSyntheticFixture(compose,device,"connection-dark.png")
            device.executeShellCommand("settings put system font_scale 1.3")
            compose.waitUntil(10000) { compose.activity.resources.configuration.fontScale > 1.2f }
            compose.onNodeWithTag("nav-3").performClick()
        compose.onNodeWithTag("tool-settings").performClick()
            compose.onNodeWithText("跟随系统").assertIsDisplayed()
            captureSyntheticFixture(compose,device,"settings-dark-large.png")
        } finally {
            device.executeShellCommand("settings put system font_scale 1.0")
            device.executeShellCommand("cmd uimode night no")
        }
    }
}

/** Only our dedicated, cleared test emulator and synthetic labels are captured. */
internal fun captureSyntheticFixture(compose: AndroidComposeTestRule<*, MainActivity>, device: UiDevice, name: String) {
    val activity = compose.activity
    check(activity.filesDir.absolutePath.startsWith("/data/"))
    compose.waitForIdle()
    // Request a complete frame: the software emulator can otherwise return only
    // the damaged layers immediately after a pager/selection update.
    compose.runOnUiThread {activity.window.decorView.invalidate()}
    compose.waitForIdle(); device.waitForIdle(1000); Thread.sleep(300)
    check(device.takeScreenshot(File(activity.getExternalFilesDir(null), name)))
}

/** Consent is scoped to the verified project emulator and synthetic VPN fixture. */
internal fun approveSyntheticVpn(device: UiDevice,compose: AndroidComposeTestRule<*, MainActivity>) {
    if(android.net.VpnService.prepare(compose.activity)==null)return
    val present=device.wait(androidx.test.uiautomator.Until.hasObject(androidx.test.uiautomator.By.pkg("com.android.vpndialogs")),8000)
    device.dumpWindowHierarchy(File(compose.activity.getExternalFilesDir(null),"vpn-consent.xml"))
    check(present) {"System VPN consent dialog missing"}
    val checkBox=device.findObject(androidx.test.uiautomator.By.clazz("android.widget.CheckBox"))
    if(checkBox!=null&&!checkBox.isChecked)checkBox.click()
    val button=device.wait(androidx.test.uiautomator.Until.findObject(androidx.test.uiautomator.By.res("android","button1")),5000)
    check(button!=null&&button.isEnabled) {"System VPN consent action missing or disabled"}
    button.click()
    check(device.wait(androidx.test.uiautomator.Until.gone(androidx.test.uiautomator.By.pkg("com.android.vpndialogs")),5000)) {"System VPN consent was not accepted"}
}
