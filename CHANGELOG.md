# Changelog

## Unreleased

- Use Mihomo's native `URLTest` through the local bridge without opening a controller port.
- Batch latency state updates every 100 ms and separate graph-backed health checks from leaf-node batches.
- Require explicit acknowledgement of the app-UID terminal permission notice before creating a shell.
- Add CI configuration, Dependabot, a dependency version catalog, issue form and documentation index.
- Start Android string-resource migration with the new terminal notice; full migration remains pending.

## 0.1.0-beta.1

First public beta: Android VPN, supported subscriptions and original policy groups, diagnostics, parallel latency tests, local encrypted storage and a standard sh terminal.
