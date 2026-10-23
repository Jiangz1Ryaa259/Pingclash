package dev.pingclash.app

import org.junit.rules.TestRule
import org.junit.runner.Description
import org.junit.runners.model.Statement

/** UI fixtures have a declared locale; language-changing tests cannot leak it. */
class ResourceLocaleRule: TestRule {
    override fun apply(base: Statement, description: Description): Statement=object:Statement() {
        override fun evaluate() {
            UiStrings.apply("zh")
            try {base.evaluate()} finally {UiStrings.apply("zh")}
        }
    }
}
