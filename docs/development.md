# Build 0.1.0-beta.1

Requirements: Windows PowerShell, Git, JDK 17+ (development used JDK 21), Android SDK Platform 35 / Build-Tools 35.0.0, NDK 27.2.12479018. Minimum Android version is 10. Build targets arm64-v8a and x86_64.

Set JAVA_HOME to your JDK. The scripts keep downloaded toolchains and private signing material inside the ignored `.tools` directory. Android SDK terms must be reviewed and accepted before using `-AcceptSdkLicense`.

```powershell
$env:JAVA_HOME = 'C:\Path\To\Your\JDK'
$env:Path = $env:JAVA_HOME + '\bin;' + $env:Path
.\tools\bootstrap.ps1 -AcceptSdkLicense
.\tools\build-release.ps1
```

The native bridge pins Go 1.27.3, Mihomo v1.19.32 and the exact module graph in core/go.mod / core/go.sum. Terminal sources are included in terminal-emulator and terminal-view; the same NDK builds their JNI libraries. Gradle wrapper and dependency hashes are pinned in gradle/verification-metadata.xml.

The release script generates a private project-local signing identity if none exists. Keep `.tools/signing` private and backed up separately. The public repository does not contain the original developer signing identity. Output: dist/PingClash-0.1.0-beta.1.apk. Debug builds use tools/build-android.ps1.

## Verification

The normal debug build runs detekt 1.23.8 with `config/detekt.yml` and a reviewed `config/detekt-baseline.xml`. This is syntax-only Kotlin analysis for the app and instrumentation source sets; Android Lint remains separate. New findings fail CI. Existing debt is not fixed or declared safe by generating a baseline. For an intentional formatting migration, run `./gradlew.bat detektBaseline` locally and review its diff; never regenerate it in CI. Run `./gradlew.bat detekt` for the gate alone.

```powershell
.\tools\verify-core.ps1
.\tools\verify-native-core.ps1
.\tools\verify-security.ps1 -Fuzz
.\tools\install-test-environment.ps1 -AcceptSdkLicense
.\tools\verify-android.ps1 -Release -Visuals
```

Android verification uses only the explicitly named project AVD. It resets that emulator, installs the signed release plus instrumentation APK and runs controlled local proxy fixtures. Never substitute a personal device identifier. `tools/package-source.ps1` creates a corresponding source archive including vendored Go dependencies and excludes the private tool/signing directories.

See [validation](security-testing.md), [privacy](../PRIVACY.md), [security](../SECURITY.md) and [terminal](terminal.md).

## Offline 3D card renderer

The APK includes committed local assets. To change the Lanyard renderer, use
Node 24.14.0 and run `npm ci --ignore-scripts --no-fund --no-audit`, `npm run build`
and `npm test` in `ui/lanyard/`. Commit the source, emitted assets and integrity
manifest together. CI rebuilds and checks that they match. See the renderer
[build instructions and upstream license](../ui/lanyard/README.md).
