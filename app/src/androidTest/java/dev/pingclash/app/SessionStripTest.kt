// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class SessionStripTest {
    @get:Rule(order=0) val locale=ResourceLocaleRule()
    @get:Rule(order=1) val compose=createAndroidComposeRule<MainActivity>()

    @Test fun leavingHomeWidensThenAutoCollapsesAndActionsDoNotPauseClock() {
        val away=mutableStateOf(false)
        var home=0;var disconnect=0
        compose.runOnUiThread {compose.activity.setContent {
            PingClashTheme("light") {CompositionLocalProvider(LocalMotionAllowed provides false) {
                Box(Modifier.fillMaxSize()) {SessionTimer(VpnUiState("established",uptime=65),away=away.value,
                    onHome={home++},onDisconnect={disconnect++})}
            }}
        }}
        compose.mainClock.autoAdvance=false
        try {
            compose.mainClock.advanceTimeBy(50)
            val narrow=compose.onNodeWithTag("vpn-session-strip").fetchSemanticsNode().boundsInRoot.width
            compose.runOnIdle {away.value=true}
            compose.mainClock.advanceTimeBy(100)
            val wide=compose.onNodeWithTag("vpn-session-strip").fetchSemanticsNode().boundsInRoot.width
            assertTrue("Leaving home did not widen the top strip",wide>narrow*1.3f)
            compose.onNodeWithTag("session-strip-toggle").performClick()
            compose.mainClock.advanceTimeBy(300)
            compose.onNodeWithTag("session-action-card").assertExists()
            compose.onNodeWithTag("vpn-session-time",useUnmergedTree=true).assertExists()
            compose.mainClock.advanceTimeBy(5000)
            compose.onNodeWithTag("session-action-card").assertDoesNotExist()
            assertEquals(narrow,compose.onNodeWithTag("vpn-session-strip").fetchSemanticsNode().boundsInRoot.width,2f)
            compose.onNodeWithTag("session-strip-toggle").performClick()
            compose.mainClock.advanceTimeBy(300)
            compose.onNodeWithTag("session-open-home").performClick()
            assertEquals(1,home);assertEquals(0,disconnect)
            compose.onNodeWithTag("session-strip-toggle").performClick()
            compose.mainClock.advanceTimeBy(300)
            compose.onNodeWithTag("session-disconnect").performClick()
            assertEquals(1,disconnect)
        } finally {compose.mainClock.autoAdvance=true}
    }
}
