package dev.pingclash.app

import org.junit.rules.TestRule
import org.junit.runner.Description
import org.junit.runners.model.Statement

/** UI fixtures have a declared locale; language-changing tests cannot leak it. */
class ResourceLocaleRule: TestRule {
    private fun reset() {
        val app=androidx.test.platform.app.InstrumentationRegistry.getInstrumentation().targetContext.applicationContext as PingClashApplication
        app.repository.appearance("zh",app.repository.data.value.client.theme)
    }
    override fun apply(base: Statement, description: Description): Statement=object:Statement() {
        override fun evaluate() {
            reset()
            try {base.evaluate()} finally {reset()}
        }
    }
}
