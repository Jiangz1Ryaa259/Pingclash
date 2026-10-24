# Android 客户端公开源码核查

本文保留 2026-10-21 的立项核查记录。后续 Android 内核、VPN 与测试进度见 [开发说明](development.md)。

核查日期：2026-10-21。范围为三个公开仓库的元数据、许可证、列明的源码文件及内核依赖声明。本轮没有复制上游实现、执行上游构建或进行真机测试。本文区分已读源码事实与本项目的设计选择，不等同于完整安全审计或法律意见。

## 1. 参考版本与许可

| 项目 | 已核查提交 | 已读取的许可信息 | 在 PingClash 中的用途 |
| --- | --- | --- | --- |
| [FlClash](https://github.com/chen08209/FlClash) | `8d4f9744948751f1273fe871e1d05276fac09b0e` | README 声明 GPL-3.0，LICENSE 为 GPL v3 文本 | Android TUN、Go 移动端桥接、指定代理探测和路由版本机制的主要参考 |
| [Clash Meta for Android](https://github.com/MetaCubeX/ClashMetaForAndroid) | `3cc102aab3f251ef460a3b6e2835b6c1eb581e73` | LICENSE 为 GPL v3 文本 | Kotlin 服务生命周期、JNI 桥接与 TUN 保护回调的交叉参考 |
| [Hiddify](https://github.com/hiddify/hiddify-app) | `f26aadb351fb23c222e06fcf4f5350d0ba596bb9` | LICENSE.md 自称 Extended GPL v3，并列出非商业、fork、发行方式、命名与界面等附加条件 | 只记录其 libbox 架构与许可差异，当前不引入实现或资源 |

许可判断不能只看 GitHub 标签或“open-source”宣传语。Hiddify 文件中的附加限制与普通 GPL 的关系需要专门核对，本文不判断其法律有效性，也不据此认定可按标准 GPL 任意复用。更不能由三个公开仓库推出所有第三方客户端都已开源。

FlClash / CMFA 如后续导入代码，需保留原声明、变更记录，并为实际发行版本提供符合许可要求的源码和构建资料；当前未导入代码，因此没有伪造一份“已经集成”的第三方声明。界面、图标及其他资源还要按各自许可核查。

许可来源：[FlClash LICENSE](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/LICENSE)、[CMFA LICENSE](https://github.com/MetaCubeX/ClashMetaForAndroid/blob/3cc102aab3f251ef460a3b6e2835b6c1eb581e73/LICENSE)、[Hiddify LICENSE.md](https://github.com/hiddify/hiddify-app/blob/f26aadb351fb23c222e06fcf4f5350d0ba596bb9/LICENSE.md)。

## 2. FlClash：已有能力比单纯测速更多

主要文件：

- [VpnService.kt](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/android/service/src/main/java/com/follow/clash/service/VpnService.kt)：已读建立 TUN、向 Core 传 FD 与 protect 回调、启动失败回滚、撤销及停止的代码。
- [mobile.go](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/core/mobile/mobile.go)：Android Go 导出接口，含 `StartTun`、`TunHandler`、`SetEventListener`、`InvokeMethod`，回调通过 error 返回异常。
- [tun.go](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/core/tun/tun.go)：接管 FD、复制给 TUN listener、关闭原 FD 的责任，以及 `AutoRoute: false` 等 Android 集成参数。
- [probe.go](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/core/probe.go)：通过指定代理拨号或交给 tunnel 路由，收集最终路由、HTTP 响应和失败信息。
- [protocol.go](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/core/protocol.go)：已读方法名及 ProbeParams / ProbeResult 等接口定义，前 250 行。
- [delay.go](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/core/delay.go)：区分 delay 的超时与失败，排队未获资源可返回无结果，避免把未执行当作代理失败。
- [NetworkObserveModule.kt](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/android/service/src/main/java/com/follow/clash/service/modules/NetworkObserveModule.kt)：观察非 VPN 网络、更新 DNS，网络变更时通知 Core 重置连接。

观察结论：

1. 已存在主动诊断请求的基础，不能把该项目描述为只能输出一个延迟数字。
2. `probe` 可带指定代理名称，但名称若代表策略组，仍需确认实际节点；有 chains 不等于证明入口、出口物理位置。
3. `ProbeResult` 含 status-code、delay、chains、rule、error、message、CoreEpoch、PicksVersion 等字段。所读接口没有节点各握手阶段的独立事件，故 PingClash 的分层诊断仍需要新增观测或明确未知。
4. 此处 HTTP transport 的 TLS 面向测试目标，不能直接当成代理节点外层 TLS 的诊断。
5. 排队、配置变化、策略选择变化与实际网络请求失败是不同状态。新项目应从一开始保留这些区别。
6. Java/Go 桥接和 TUN 资源所有权已有可参考的处理，但要在本项目选定的内核与构建工具上验证，不能仅据读码宣称真机可靠。

## 3. CMFA：原生 Android 生命周期与桥接

主要文件：

- [TunService.kt](https://github.com/MetaCubeX/ClashMetaForAndroid/blob/3cc102aab3f251ef460a3b6e2835b6c1eb581e73/service/src/main/java/com/github/kr328/clash/service/TunService.kt)：`VpnService.Builder` 设置地址、路由、DNS、应用列表；协程运行时在退出时清理 TUN 并停止服务。
- [TunModule.kt](https://github.com/MetaCubeX/ClashMetaForAndroid/blob/3cc102aab3f251ef460a3b6e2835b6c1eb581e73/service/src/main/java/com/github/kr328/clash/service/clash/module/TunModule.kt)：将 FD 与 `vpn::protect` 交给 `Clash.startTun`，停止 HTTP 和 TUN。
- [Bridge.kt](https://github.com/MetaCubeX/ClashMetaForAndroid/blob/3cc102aab3f251ef460a3b6e2835b6c1eb581e73/core/src/main/java/com/github/kr328/clash/core/bridge/Bridge.kt)：`nativeStartTun`、`nativeStopTun`、配置加载、日志订阅等 JNI 接口。

观察结论：Kotlin 界面与嵌入的 Go 内核可以通过原生桥接配合，并不要求 UI 使用 Flutter，也不要求所有操作都绕本地 REST。CMFA 的 JNI/C 桥接与 FlClash 的移动端 Go 接口是两种具体实现，不能直接拼接为一个通用 SDK。

## 4. Hiddify：格式兼容不等于相同内核

已读 [README](https://github.com/hiddify/hiddify-app/blob/f26aadb351fb23c222e06fcf4f5350d0ba596bb9/README.md) 的项目说明与 [VPNService.kt](https://github.com/hiddify/hiddify-app/blob/f26aadb351fb23c222e06fcf4f5350d0ba596bb9/android/app/src/main/kotlin/com/hiddify/hiddify/bg/VPNService.kt)。

README 描述以 sing-box 为基础，并可接收多种配置格式。Android 服务通过 libbox 类型和平台接口接收 TUN 选项，提供 `openTun` 和 `autoDetectInterfaceControl` 等回调。它的配置转换与移动端 ABI 不能直接套到 mihomo 上。

由于许可证文件存在上文所列的附加要求，当前不把这份实现作为 PingClash 的复制来源，也不复刻其 UI。

## 5. 内核依赖需要双重固定

| 客户端参考提交 | 实际依赖声明 | 该快照的内核子模块提交 |
| --- | --- | --- |
| FlClash `8d4f974…` | `.gitmodules` 指向 `chen08209/Clash.Meta` 的 FlClash 分支；`core/go.mod` 用本地 `./Clash.Meta` replace mihomo | `8380d0e7462f061a964323e9bf3129a236fcc5d5` |
| CMFA `3cc102a…` | `.gitmodules` 指向 `MetaCubeX/mihomo` 的 Alpha 分支；主 Go 模块 replace 到 `../../foss/golang/clash` | `88dcbf7f1614a67c3b36b848ee3592dfa92ada36` |

来源：[FlClash .gitmodules](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/.gitmodules)、[FlClash go.mod](https://github.com/chen08209/FlClash/blob/8d4f9744948751f1273fe871e1d05276fac09b0e/core/go.mod)、[CMFA .gitmodules](https://github.com/MetaCubeX/ClashMetaForAndroid/blob/3cc102aab3f251ef460a3b6e2835b6c1eb581e73/.gitmodules)、[CMFA 主 go.mod](https://github.com/MetaCubeX/ClashMetaForAndroid/blob/3cc102aab3f251ef460a3b6e2835b6c1eb581e73/core/src/main/golang/go.mod)。子模块提交来自对应客户端快照的 Git tree 条目。

CMFA README 中的历史分支说明与实际 `.gitmodules` 不完全一致，因此以选定快照的依赖文件、gitlink 和构建结果为准。Go 模块中的占位版本或历史 require 版本也不能替代实际 replace 后的内核版本。

上述都是源码参考快照，不是已经引入 PingClash 的依赖。正式选用前还要读取该内核提交本身、比较所需补丁和协议支持，并完成构建与真机回归。

## 6. 对 PingClash 的修正

- 保留 Android 原生 Kotlin + Compose，底层优先验证薄 Go 移动端桥接；FlClash 的移动端接口与 CMFA 的生命周期是参考，UI 单独设计。
- 主路径不默认开放 Controller；后续需要桌面或外部工具时通过独立 REST Adapter 扩展。
- M0 增加 FD 交接、保护失败、JNI/回调异常、重复停止及权限撤销测试。
- 诊断区分内核未就绪、请求排队未执行、配置或网络变化失效和实际节点请求失败。
- 新增观测围绕同一实际连接输出关联 ID；已有 HTTP probe 不足以证明的 DNS / TCP / 节点 TLS / AnyTLS 阶段显示未知。
- 产品差异聚焦可解释证据和复现报告；是否有足够用户需求仍需原型验证，不宣称行业唯一。

本轮验证限于公开源码与文档一致性检查。尚未验证 Android 构建、设备兼容性、实际代理连接或故障注入。

## 7. 2026-10-22 参考范围修订

按用户明确要求，FlClash 仅作为 UI 与交互参考，上文保留为早期源码调研记录，不作为完整实现规范。当前协议选项和证书行为以固定的 Mihomo v1.19.32 源码及 [Mihomo TLS 配置说明](https://wiki.metacubex.one/config/proxies/tls/) 为准；Android 生命周期同时参考上述 CMFA 实现。实际集成仍须在本项目构建及 VPN 转发测试中验证。

0.4.0 纠正强制改写节点证书策略的兼容性问题：保留订阅中的显式 `skip-cert-verify`，通过 Mihomo 选项构造节点。节点设置不影响订阅下载及目标 HTTPS 校验，也不引入系统证书安装或遥测。旧版已改写的数据需要用户手动更新订阅或重新导入，不能从保存的 false 猜回原始值。

## 8. 2026-10-22 证书策略和连通性显示

用户确认 0.4.0 已可连接，所说的“验证失败”实际是列表静态标签“节点证书未验证”。已读取 Clash Mi 提交 `1029cd8d33e3853cfa1118f5660af5648d29739b` 的 [clash_http_api.dart](https://github.com/KaringX/clashmi/blob/1029cd8d33e3853cfa1118f5660af5648d29739b/lib/app/clash/clash_http_api.dart) 和 [proxy_board_screen_widgets.dart](https://github.com/KaringX/clashmi/blob/1029cd8d33e3853cfa1118f5660af5648d29739b/lib/screens/proxy_board_screen_widgets.dart)：getDelay 请求 Mihomo 的指定代理 delay 接口，UI 使用 delay / delayErr 显示本次测试结果。这是目标访问测试，不能据此声称节点证书身份校验通过。也不能仅凭界面没有告警，推断其他客户端为某张证书自动建立了信任。

0.4.1 借鉴这一区分：证书策略作为配置标签；所选节点的连通性以实际代理请求为证据，单独显示未测试、测试中、本次成功或未成功。切换节点不复用其他节点的结果，取消 / 环境失效 / 本地限制优先于旧成功。本项目仍使用进程内 Go 桥接，不为此开放 Controller；没有复制 Clash Mi 代码或界面资源。FlClash 保持仅 UI 参考。

同时修复导入拒绝分类中的遗留判断：允许的 skip-cert-verify: true 不再遮盖实际字段问题。截图中 15 个节点的真实不兼容字段尚未提供，不由旧分类直接认定它们的证书无效。

## 9. 2026-10-22 拨号依赖与本地手选组

后续截图确认 9 个 Hysteria2 和 6 个 Trojan 的 dialer-proxy 被拒绝。用户说明包括 DIRECT 和策略组。依据 [Mihomo 通用字段](https://wiki.metacubex.one/config/proxies/) 与 [dialer-proxy 说明](https://wiki.metacubex.one/config/proxies/dialer-proxy/)，该字段是拨号路径，不能随意删除实际引用。固定 v1.19.32 adapter/parser.go 提供 WithDialerForAPI，component/proxydialer/proxydialer.go 提供基于指定代理的 Dialer；两者允许在本项目内隔离构造依赖，无需加载全局规则或开放 Controller。

0.5.0 支持同一资料中的独立节点、DIRECT 和受限 select 组，默认遵循 default-selected 或首个成员，用户选择随资料加密保存。其他自动策略组不假装支持。真实 QUIC 通过父代理 UDP 与错误父密码拒绝验证记录见测试说明。FlClash 继续仅作为 UI 参考。
