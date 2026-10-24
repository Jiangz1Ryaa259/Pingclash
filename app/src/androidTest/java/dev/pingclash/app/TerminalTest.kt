package dev.pingclash.app

import android.content.ClipData
import android.content.ClipboardManager
import android.view.WindowManager
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.lifecycle.Lifecycle
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test
import org.junit.Before
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class TerminalTest {
    @get:org.junit.Rule(order=0) val resourceLocale=ResourceLocaleRule()
    @get:Rule(order=1) val compose=createAndroidComposeRule<TerminalActivity>()
    private val model get()=compose.activity.terminal
    @Before fun acceptExplicitNotice() {
        if(!model.noticeAccepted)compose.onNodeWithTag("terminal-notice-accept").performClick()
    }
    private fun output()=model.sessions.firstOrNull()?.emulator?.screen?.transcriptText.orEmpty()
    private fun command(text:String) {compose.runOnUiThread {model.send(text+"\r")}}
    private fun awaitText(text:String) {try {compose.waitUntil(5000) {output().contains(text)}}catch(e:Exception){throw AssertionError("Synthetic terminal output: "+output(),e)}}
    @Test fun unacknowledgedNoticeCannotStartShell() {
        compose.runOnUiThread {model.noticeAccepted=false;model.create()}
        assertTrue(model.sessions.isEmpty())
        compose.onNodeWithTag("terminal-notice-accept").assertIsDisplayed().performClick()
        assertTrue(compose.activity.getSharedPreferences("terminal_ui",0).getBoolean("uid_notice_accepted",false))
        compose.onNodeWithTag("terminal-new").assertIsEnabled()
    }
    @Test fun terminalDoesNotAutomaticallyExposeProfileCredentialsOrHistory() {
        val app=compose.activity.application as PingClashApplication
        val profile=app.repository.importProfile("Synthetic terminal privacy",
            "proxies: [{name: fixture, type: anytls, server: example.invalid, " +
                "port: 443, password: CANARY-PASSWORD-1234}]",
            "https://example.invalid/?token=CANARY-SUB-TOKEN-1234")
        try {
            compose.onNodeWithTag("terminal-new").performClick()
            compose.waitUntil(10000) {model.sessions.firstOrNull()?.pid?.let {it>0}==true}
            command("env; history; printf 'PRIVACY_%s\\n' DONE")
            awaitText("PRIVACY_DONE")
            assertFalse(output().contains("CANARY-"))
            assertTrue(output().contains("HISTFILE=/dev/null"))
            // Standard shell output remains literal after an explicit command.
            command("printf 'CANARY-USER-%s\\n' REQUESTED")
            awaitText("CANARY-USER-REQUESTED")
        } finally {compose.runOnUiThread {model.stopAll()};app.repository.delete(profile.id)}
    }
    @Test fun realShellPtyPipesInteractiveInputAndInterrupt() {
        compose.onNodeWithTag("terminal-new").performClick()
        compose.waitUntil(10000) {model.sessions.firstOrNull()?.pid?.let {it>0}==true}
        command("test -t 0 && printf 'PTY_%s\\n' OK; X=kept; printf 'b\\na\\n' | sort; pwd")
        compose.waitUntil(5000) {output().contains("PTY_OK")&&output().contains("/cache/terminal")}
        command("printf 'STATE_%s\\n' \"\$X\"; read -r answer; printf 'READ_%s\\n' \"\$answer\"")
        awaitText("STATE_kept")
        command("hello")
        awaitText("READ_hello")
        command("sleep 60")
        compose.onNodeWithTag("terminal-key-0").performClick()
        command("printf 'AFTER_%s\\n' INTERRUPT")
        compose.waitUntil(5000) {output().contains("AFTER_INTERRUPT")}
        assertTrue(compose.activity.window.attributes.flags and WindowManager.LayoutParams.FLAG_SECURE!=0)
        command("exit 23")
        awaitText("会话已结束：23")
        assertFalse(output().contains("press Enter"))
        assertEquals(23,model.sessions.first().exitStatus)
        compose.runOnUiThread {model.closeCurrent()}
        assertEquals(0,model.sessions.size)
    }
    @Test fun clipboardEscapeCannotReplaceClipboardAndSessionsBoundedAndStopped() {
        val clipboard=compose.activity.getSystemService(ClipboardManager::class.java)
        compose.runOnUiThread {clipboard.setPrimaryClip(ClipData.newPlainText("fixture","keep-clipboard"))}
        compose.onNodeWithTag("terminal-new").performClick()
        compose.waitUntil(10000) {model.sessions.firstOrNull()?.pid?.let {it>0}==true}
        command("printf '\\033]52;c;Y2hhbmdlZA==\\007'; printf 'OSC_%s\\n' DONE")
        awaitText("OSC_DONE")
        compose.runOnUiThread {assertEquals("keep-clipboard",clipboard.primaryClip!!.getItemAt(0).text.toString());model.create();model.create();model.create()}
        assertEquals(3,model.sessions.size)
        val pids=model.sessions.map {it.pid}.filter {it>0}
        compose.activityRule.scenario.moveToState(Lifecycle.State.CREATED)
        assertTrue(model.sessions.isEmpty())
        compose.waitUntil(5000) {pids.all {pid->runCatching {android.system.Os.kill(pid,0)}.isFailure}}
    }
}
