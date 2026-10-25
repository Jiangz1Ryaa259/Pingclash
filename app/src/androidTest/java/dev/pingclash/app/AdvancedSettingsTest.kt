package dev.pingclash.app

import android.view.WindowManager
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.lifecycle.ViewModelProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.UiDevice
import org.json.JSONObject
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import java.io.File

@RunWith(AndroidJUnit4::class)
class AdvancedSettingsTest {
    @get:org.junit.Rule(order=0) val resourceLocale=ResourceLocaleRule()
    @get:Rule(order=1) val compose=createAndroidComposeRule<MainActivity>()
    private fun root() {
        compose.onNodeWithTag("nav-3").performClick()
        compose.onNodeWithTag("tool-settings").performClick()
    }
    private fun section(id: String) {
        visibleControl("settings-$id").performClick();compose.waitForIdle()
        compose.onNodeWithTag("settings-back").assertIsDisplayed()
    }
    private fun back() {visibleControl("settings-back").performClick();compose.waitForIdle()}
    // ScrollTo sees the full viewport; an overlaid navigation bar still owns its taps.
    private fun visibleControl(tag: String): SemanticsNodeInteraction {
        val node=compose.onNodeWithTag(tag).performScrollTo()
        val navTop=compose.onNodeWithTag("glass-navigation").fetchSemanticsNode().boundsInRoot.top
        val clearance=12*compose.activity.resources.displayMetrics.density
        val distance=node.fetchSemanticsNode().boundsInRoot.bottom-navTop+clearance
        if(distance>0)compose.onNodeWithTag("settings-page").performSemanticsAction(
            androidx.compose.ui.semantics.SemanticsActions.ScrollBy) {it(0f,distance)}
        compose.waitForIdle()
        assertTrue("Settings control remains behind navigation",
            node.fetchSemanticsNode().boundsInRoot.bottom<=navTop)
        return node
    }
    private fun save() {
        hideFixtureKeyboard()
        visibleControl("settings-save").assertIsEnabled().performClick()
        val model=ViewModelProvider(compose.activity)[AppViewModel::class.java]
        compose.waitUntil(10000) {!model.ui.value.busy}
        model.dismissMessage()
        compose.waitForIdle()
    }
    @Test fun categoriesSaveEffectiveNetworkOptionsEncryptedAndSwitchLanguageAndTheme() {
        val app=compose.activity.application as PingClashApplication
        val repo=app.repository;val before=repo.data.value
        val originalLanguage=UiStrings.preference()
        val device=UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())
        try {
            assertFalse(before.client.keepUsage);assertFalse(before.client.inspectConnections)
            root();section("network")
            compose.onNodeWithTag("number-MTU").performScrollTo().performTextReplacement("1400")
            compose.onNodeWithTag("number-连接超时（秒）").performScrollTo().performTextReplacement("8")
            save()
            compose.waitUntil(10000) {repo.data.value.client.mtu==1400}
            assertEquals(8,ProfileRepository(app).data.value.client.connectTimeout)
            back();section("dns")
            visibleControl("choice-模式-https").performClick()
            compose.onNodeWithTag("field-加密 DNS 地址").performScrollTo().performTextReplacement("https://example.invalid/dns-query")
            save();compose.waitUntil(10000) {repo.data.value.client.dnsMode=="https"}
            assertEquals("https://example.invalid/dns-query",ProfileRepository(app).data.value.client.dnsHttps)
            assertFalse(File(app.filesDir,"profiles.enc").readBytes().toString(Charsets.ISO_8859_1).contains("example.invalid/dns-query"))
            captureSyntheticFixture(compose,device,"settings-dns.png")
            back();section("appearance")
            visibleControl("theme-toggle").performClick()
            compose.waitUntil(10000) {repo.data.value.client.theme=="dark"}
            visibleControl("choice-语言-en").performClick()
            compose.waitUntil(10000) {repo.data.value.client.language=="en"}
            compose.waitUntil(10000) {compose.onAllNodesWithText("Theme").fetchSemanticsNodes().isNotEmpty()}
            compose.onNodeWithText("Theme").assertIsDisplayed()
            compose.onNodeWithText("Language").assertIsDisplayed()
            captureSyntheticFixture(compose,device,"settings-english-dark.png")
            repo.appearance("zh","system");back();section("rules")
            assertTrue(compose.activity.window.attributes.flags and WindowManager.LayoutParams.FLAG_SECURE!=0)
            // Rule editors are deliberately protected; capture only non-sensitive categories.
            back()
            compose.waitUntil(5000) {compose.activity.window.attributes.flags and WindowManager.LayoutParams.FLAG_SECURE==0}
            section("live")
            compose.onNodeWithTag("traffic-chart").performScrollTo().assertIsDisplayed()
            captureSyntheticFixture(compose,device,"settings-live.png")
        } finally {
            repo.clientSettings(before.client,before.dnsAddress,before.probeUrl)
            UiStrings.apply(originalLanguage)
        }
    }
    @Test fun invalidRulesCannotMutateStorageAndOriginalRulesSurviveGroupChoices() {
        val app=compose.activity.application as PingClashApplication
        val repo=app.repository;val before=repo.data.value
        val input="""{"proxies":[{"name":"fixture-node","type":"trojan","server":"example.invalid","port":443,"password":"private-settings-fixture"}],"proxy-groups":[{"name":"provider-root","type":"select","proxies":["fixture-node","REJECT"]}],"rules":["DOMAIN-SUFFIX,private-rule.test,REJECT","MATCH,provider-root"]}"""
        val profile=repo.importProfile("原规则回归",input)
        try {
            repo.activate(profile.id)
            repo.selectGroup(profile.id,"provider-root","REJECT")
            assertEquals(2,repo.data.value.activeProfile!!.rules.size)
            repo.selectGroup(profile.id,"provider-root","fixture-node")
            val original=File(app.filesDir,"profiles.enc").readBytes()
            val invalid=before.client.copy(mode="rule",useProviderRules=false,customRules="GEOSITE,private-target-name,PROXY")
            val failure=runCatching {repo.clientSettings(invalid,before.dnsAddress,before.probeUrl)}.exceptionOrNull()
            assertTrue(failure is SettingsFailure)
            assertFalse((failure as SettingsFailure).publicMessage.contains("private-target-name"))
            assertArrayEquals(original,File(app.filesDir,"profiles.enc").readBytes())
            repo.clientSettings(before.client.copy(mode="rule",customRules="DST-PORT,443,PROXY"),before.dnsAddress,before.probeUrl)
            assertEquals("passed",JSONObject(dev.pingclash.mobile.Mobile.validateRuntimeOptions(repo.data.value.runtimeOptions())).getString("state"))
            val reread=ProfileRepository(app).data.value
            assertEquals("rule",reread.client.mode);assertEquals(2,reread.activeProfile!!.rules.size)
            assertFalse(File(app.filesDir,"profiles.enc").readBytes().toString(Charsets.ISO_8859_1).contains("private-settings-fixture"))
            assertTrue(runCatching {repo.clientSettings(before.client.copy(appMode="include",packages=emptyList()),before.dnsAddress,before.probeUrl)}.isFailure)
            assertTrue(runCatching {repo.clientSettings(before.client.copy(appMode="include",packages=listOf("dev.pingclash.app")),before.dnsAddress,before.probeUrl)}.isFailure)
        } finally {
            repo.clientSettings(before.client,before.dnsAddress,before.probeUrl)
            repo.delete(profile.id)
            before.selectedId?.takeIf {id->repo.data.value.profiles.any {it.containsTarget(id)}}?.let(repo::select)
        }
    }

    @Test fun concurrentReadersDoNotInterfereWithEncryptedAtomicWrites() {
        val app=compose.activity.application as PingClashApplication
        val repo=app.repository;val before=repo.data.value
        val workers=java.util.concurrent.Executors.newFixedThreadPool(2)
        try {
            val writer=workers.submit {repeat(30) {repo.appearance("zh",if(it%2==0)"light" else "dark")}}
            val reader=workers.submit {repeat(60) {assertFalse("Concurrent read lost storage integrity",ProfileRepository(app).data.value.loadFailed)}}
            writer.get(20,java.util.concurrent.TimeUnit.SECONDS);reader.get(20,java.util.concurrent.TimeUnit.SECONDS)
            assertEquals(repo.data.value.client,ProfileRepository(app).data.value.client)
        } finally {workers.shutdownNow();repo.clientSettings(before.client,before.dnsAddress,before.probeUrl)}
    }
}
