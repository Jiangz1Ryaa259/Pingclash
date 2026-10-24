# Canary output regression tests

Synthetic markers include `CANARY-SUB-TOKEN-1234`, `CANARY-PASSWORD-1234`, `CANARY-HEADER-1234`, `CANARY-UA-1234`, and reserved UUID `00000000-0000-4000-8000-000000000001`. These are non-working test values. Assertions use constant failure messages instead of printing the payload.

Covered paths:

- Native validation, malformed imports, provider failures, probe errors and metadata. Successful private imports/resolution must retain credentials and are never treated as public diagnostics.
- Java diagnostic exception conversion and exported Markdown. Report IDs must match UUID syntax; timestamps must parse as instants. Raw errors or credentials cannot pass through those metadata slots.
- Android public network/import/SSL/provider errors, diagnostic Markdown, encrypted persisted bytes and app-UID logcat output after synthetic operations.
- Full configuration export excludes source subscription URL and UA. **It deliberately contains node passwords/UUIDs**, behind the existing credential warning and destination picker. It is not a diagnostic report or suitable issue attachment.
- Terminal startup/environment/history do not automatically load profile credentials. A separate test verifies that an explicitly entered shell command still prints literal output. The shell uses the app UID and is not isolated or read-only; blanket filtering would not make it safe.

These tests exercise known application-generated outputs, not every possible future path. No crash-reporting/telemetry uploader is installed. Browser/Android system logging and user-written shell files are outside the redacted-report contract. Handled failures never stringify network exceptions or subscription intents. Review new output paths and extend the suite when adding one.

Tests: `canary_test.go`, `provider_corpus_test.go`, `CoreVerification.java`, `CanaryPrivacyTest.kt`, `DeepLinkSecurityTest.kt`, and `TerminalTest.kt`.
