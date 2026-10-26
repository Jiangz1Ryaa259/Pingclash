# Build PingClash

Requirements: Windows PowerShell, Git, JDK 17+ (development used JDK 21), Android SDK Platform 35 / Build-Tools 35.0.0, NDK 27.2.12479018. Minimum Android version is 10. Build targets arm64-v8a and x86_64.

Set JAVA_HOME to your JDK. The scripts keep downloaded toolchains and private signing material inside the ignored `.tools` directory. Android SDK terms must be reviewed and accepted before using `-AcceptSdkLicense`.

```powershell
$env:JAVA_HOME = 'C:\Path\To\Your\JDK'
$env:Path = $env:JAVA_HOME + '\bin;' + $env:Path
.\tools\bootstrap.ps1 -AcceptSdkLicense
.\tools\build-release.ps1
```

The native bridge pins Go 1.27.3, Mihomo v1.19.32 and the exact module graph in core/go.mod / core/go.sum. Terminal sources are included in terminal-emulator and terminal-view; the same NDK builds their JNI libraries. Gradle wrapper and dependency hashes are pinned in gradle/verification-metadata.xml.

The release script generates a private project-local signing identity if none exists. Keep `.tools/signing` private and backed up separately. The public repository does not contain the original developer signing identity. Output uses the version declared in app/build.gradle.kts (currently 0.1.2-preview.3/build 33). Debug builds use tools/build-android.ps1.

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

The pinned Backdrop source module is built with the existing Kotlin/Compose toolchain. Run `python tools/verify-backdrop.py` to check upstream source fidelity and the four documented compatibility shims.

## Current UI regression map

Beta.11/build 29 adds renderer navigation lifetime, real physical-tab residual-pixel,
and actual launcher task-preview regressions (64 integration tests total). See
[UI design](ui-design.md#bottom-navigation-code-map-beta11) for the complete bottom
navigation source map, and [validation](security-testing.md) for APK identity and
API-specific results. Main-page screenshots are permitted; sensitive pages retain
FLAG_SECURE and temporary task-snapshot protection.

## Quiet re-entry regressions

The local 0.1.2-preview.1 candidate has 65 integration cases. Native recovery is
bounded independently of JavaScript callbacks; a real WebGL fixture drops one
resume message, then verifies recovery, view identity and unchanged flip count.
Five additional pure lifecycle cases bring the offline renderer suite to 25.
The main navigation page transition fades Home without shifting its 3D anchor;
the bottom glass navigation component/material/gestures are unchanged.

## Measurement-plan regressions

The measurement-plan candidate introduced three cases (68 total at preview.2). `ProxyDelayPlanTest` covers
unique native requests across overlapping groups, member-result aliases, a fast
node scheduled before failing group members, the ten-worker bound and cancellation,
and bounded cyclic/chained graph handling. Fixtures use synthetic loopback servers;
public subscriptions, real mobile latency and OEM behavior are not implied.

## Navigation selector regressions

Preview.3 has 70 integration cases. NavigationSelectorTest checks physical accent
pixels, two-axis press growth, release cleanup, fixed glyph positions, large-font
RTL alignment and a single interactive row. LiquidOpticsTest retains the actual
rim-displacement and residual-state checks. Test evidence names the emulator and
graphics backend; no physical OEM/GPU equivalence is implied.
