# PingClash

[![Build and verify](https://github.com/Jiangz1Ryaa259/Pingclash/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Jiangz1Ryaa259/Pingclash/actions/workflows/ci.yml)

A privacy-focused Android proxy client powered by Mihomo, with connection diagnostics and a built-in terminal.

**Version: 0.1.0-beta.1 · Android 10+ · arm64-v8a / x86_64 · GPL-3.0-only**

## Features

- Subscription management with per-profile User-Agent, quota/expiry display and a bounded HTTP provider subset; preserves supported original policy groups and nested selections.
- Rootless Android VPN powered by Mihomo.
- Connection diagnostics, separate direct TCP and native Mihomo URL latency metrics, cancellable parallel testing and redacted reports.
- DNS over TCP / HTTPS, application routing, local outbound rules and live traffic information.
- Standard Android `sh` terminal with PTY, keyboard input, pipes, redirection and Ctrl+C.
- Configurations encrypted locally with Android Keystore and AES-GCM. No telemetry or advertisements.
- English / Simplified Chinese resources, Android 13+ system app-language settings, and automatic network reconnection with TUN retained during outages.
- Custom light/dark sea theme, optional dynamic color, reduced effects, native latency readout and an evidence-based diagnostic path.

## 状态与边界

这是首个公开 Beta，功能仍在完善。支持的配置是受限子集，HTTP providers 已实现受限首版；file/inline/MRS、部分规则和复杂筛选尚未支持；请勿视为完整 Mihomo 配置兼容保证。模拟器验证不能替代真实设备和网络测试。

终端使用本应用的 UID 和权限，可按用户输入读写应用文件及访问网络。系统命令的网络请求不等于经过所选节点。设备缺少的 curl、dig 等工具目前不额外打包。

不包含内置订阅、账号或节点凭据。使用你自己的服务和配置。

## Build and documentation

- [Build instructions](docs/development.md)
- [Terminal](docs/terminal.md)
- [Diagnostics](docs/diagnostics.md)
- [Privacy](PRIVACY.md) · [Security](SECURITY.md) · [Validation](docs/security-testing.md)
- [Licenses and attribution](NOTICE.md)

This repository contains the current source, tests and build scripts. Local toolchains, signing keys, user configurations, APKs and historical source archives are excluded. Release signing creates a new private local identity; upstream project signing keys are never distributed.

## Screenshots

Synthetic emulator data only; no personal subscription or credentials are shown. The sample passing path and 84 ms value illustrate layout, not a real network measurement. See [UI design and accessibility](docs/ui-design.md).

| Dashboard | Dark theme | Proxies | Settings |
| --- | --- | --- | --- |
| ![Dashboard](docs/images/dashboard.png) | ![Dark theme](docs/images/dashboard-dark.png) | ![Proxies](docs/images/proxies.png) | ![Settings](docs/images/settings.png) |

## Development status

See the [checklist review](docs/hardening-review.md), [documentation index](docs/README.md) and [changelog](CHANGELOG.md). HTTP providers, separate TCP latency metrics and subscription quotas/custom User-Agent now have an initial implementation; see the [supported subscription/provider subset](docs/subscriptions.md). QR and image import remain deferred. The implemented feature subset and automated checks do not constitute a security certification.

## 已测试环境

| 环境 | 系统 | 已有证据 |
| --- | --- | --- |
| 本地 AOSP x86_64 模拟器 | Android 15 / API 35 | 开关动画签名候选 41 项回归通过，无跳过；含路径证据、对比度、减少动效、VPN 转发与原有隐私回归 |
| GitHub CI AOSP 矩阵 | Android 12–15 / API 31、33、34、35 | 前一轮源码提交的 40 项回归各版本通过，不能代替本次界面变更的 CI 结果 |

新界面的本地构建和签名候选结果见[验证记录](docs/security-testing.md)。前一轮 CI 完整记录：[Actions 40088332873](https://github.com/Jiangz1Ryaa259/Pingclash/actions/runs/40088332873)。当前没有开发者直接完成的国产 OEM 物理机测试，未将未知机型列为已验证。

仪表盘会显示在最近任务中；Android 13+ 禁用该卡片的页面快照，终端和敏感页面继续保护截屏。最近任务卡片与前台 VPN 通知是两项独立功能，移除卡片不会自动断开 VPN。网络切换会重建出站连接；若希望系统杀进程期间也阻断直连，请参考[后台、始终开启 VPN 与锁定模式](docs/background-vpn.md)。

本轮 HTTP providers、UA/配额及 TCP 指标的源码与验证见 [PR #14](https://github.com/Jiangz1Ryaa259/Pingclash/pull/14) 和[验证记录](docs/security-testing.md)。既有 Release APK 尚未更新。

HTTPS `clash://install-config` imports now require host confirmation and remain inactive until a separate profile selection. See the [provider compatibility corpus](docs/provider-compatibility.md), [output privacy boundaries](docs/output-privacy.md) and [next-beta notes draft](docs/next-beta-notes.md). These source additions do not replace the published beta.1 APK.
