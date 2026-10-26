// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.SemanticsActions
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.assert
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.dp
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class CompactHomeTest {
    @get:Rule(order=0) val locale=ResourceLocaleRule()
    @get:Rule(order=1) val compose=createAndroidComposeRule<MainActivity>()

    @Test fun sessionTimeUsesMonotonicSessionStartAcrossReconnectAndResetsOnDisconnect() {
        val active=VpnUiState("established",uptime=1,sessionStartedElapsed=1000)
        assertEquals(65L,sessionSeconds(active,66000))
        assertEquals(125L,sessionSeconds(active.copy(phase="connecting",uptime=0),126000))
        assertEquals(0L,sessionSeconds(active.copy(phase="idle"),126000))
        assertEquals(0L,sessionSeconds(active,0))
    }

    @Test fun websiteSelectionIsBoundedDeduplicatedAndRejectsUnknownTargets() {
        val selected=serviceSelection(listOf("google","google","file:///private","unknown"))
        assertEquals(listOf("google"),selected.map {it.id})
        assertTrue(serviceTargets.all {it.url.startsWith("https://")})
        assertEquals(12,serviceTargets.size)
    }

    @Test fun smallLargeFontHomeDoesNotScrollAndMoreDoesNotStartHiddenChecks() {
        val calls=mutableListOf<List<String>>()
        val profile=LocalProfile("p","Fixture",null,
            listOf(LocalNode("node","Fixture","socks5","{}")),0,false)
        compose.runOnUiThread {compose.activity.setContent {
            val density=LocalDensity.current
            PingClashTheme("light") {CompositionLocalProvider(LocalAllowLanyardThree provides false,
                LocalMotionAllowed provides false,LocalDensity provides Density(density.density,1.8f),
                LocalSessionOverlay provides {SessionTimer(VpnUiState())}) {
                ScenicFrame(0,"none",true,{}) {
                    Box(Modifier.height(600.dp).fillMaxSize()) {
                        DashboardScreen(DashboardState(AppData(listOf(profile),selectedId="node"),
                            VpnUiState(),DiagnosticUiState(),ProxyTestState(),true,false),
                            DashboardActions({}, {}, {}, {},serviceTest={calls.add(it)}))
                    }
                }
            }}
        }}
        compose.onNodeWithTag("dashboard").assert(SemanticsMatcher.keyNotDefined(SemanticsActions.ScrollBy))
        val navTop=compose.onNodeWithTag("glass-navigation").fetchSemanticsNode().boundsInRoot.top
        for(tag in listOf("vpn-power","vpn-session-strip","home-profile-picker","mode-rule",
            "service-check-more","service-check-start")) {
            val node=compose.onNodeWithTag(tag).assertIsDisplayed().fetchSemanticsNode()
            assertTrue("$tag hidden behind navigation",node.boundsInRoot.bottom<=navTop)
        }
        compose.onNodeWithTag("theme-toggle").assertDoesNotExist()
        compose.onNodeWithText("Gemini").assertDoesNotExist()
        compose.onNodeWithTag("service-check-start").performClick()
        assertEquals(listOf("google","chatgpt"),calls.single())
        compose.onNodeWithTag("service-check-more").performClick()
        assertEquals(1,calls.size)
        compose.onNodeWithTag("service-detail-github").performScrollTo().performClick()
        assertEquals(listOf("github"),calls.last())
    }
}
