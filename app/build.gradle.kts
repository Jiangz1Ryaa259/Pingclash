plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "dev.pingclash.app"
    compileSdk = 35
    testBuildType = providers.gradleProperty("pingclashTestBuildType").getOrElse("debug")

    defaultConfig {
        applicationId = "dev.pingclash.app"
        minSdk = 29
        targetSdk = 35
        versionCode = 34
        versionName = "0.1.2-preview.4"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        ndk { abiFilters += listOf("arm64-v8a", "x86_64") }
    }

    buildFeatures { compose = true }
    bundle { language { enableSplit = false } }
    lint {
        error += setOf("MissingTranslation", "HardcodedText")
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
    buildTypes {
        release {
            isDebuggable = false
            isJniDebuggable = false
            isMinifyEnabled = false
        }
    }
}

dependencies {
    implementation(project(":terminal-view"))
    implementation(project(":backdrop"))
    implementation(files(rootProject.file(".tools/native/pingcore.aar")))
    implementation(project(":diagnostics"))
    implementation(platform(libs.compose.bom))
    implementation(libs.activity.compose)
    implementation(libs.compose.material3)
    implementation(libs.graphics.shapes)
    implementation(libs.haze)
    implementation(libs.haze.materials)
    implementation(libs.compose.preview)
    implementation(libs.lifecycle.viewmodel)
    implementation(libs.lifecycle.runtime)
    implementation(libs.coroutines.android)
    debugImplementation(libs.compose.tooling)
    androidTestImplementation(libs.test.runner)
    androidTestImplementation(libs.test.ext)
    androidTestImplementation(libs.test.uiautomator)
    androidTestImplementation(platform(libs.compose.bom))
    androidTestImplementation(libs.compose.test)
    debugImplementation(libs.compose.test.manifest)
}

