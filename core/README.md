# mihomo Android 桥接

current beta 已将此模块编译为 arm64 / x86_64 AAR 并嵌入 APK；本轮兼容 HY2 空带宽与 HTTP 测速目标，增加统一延迟 HEAD 测速并将原生探测槽扩展至 16。固定 mihomo v1.19.32、sing-tun v0.4.27、Go 1.27.3 及 golang.org/x/mobile v0.0.0-20261011034528-197770444867。许可证、上游模块哈希见 [NOTICE.md](NOTICE.md)。

## API

- `Info()`：内核版本与运行平台能力，Android 上提供 VPN，阶段遥测仍为 false。
- `ImportProfile(text)`：离线解析节点 JSON / Clash YAML、Base64 订阅和常见分享链接。返回私有节点数据用于本地加密保存，**包含凭据，不能记入日志或报告**；失败返回静态类别，部分导入返回拒绝计数；fieldIssues 只返回固定协议 / 字段标签的计数，不含任意未知字段名或值。
- `ValidateNode(json)`：构造出站并立即关闭，不验证联网。
- `PrepareProbe(id, budget)` / `DiscardProbe(id)`：在 Java 到 Go 调用前预留可取消令牌；避免辅助检查结束时的取消竞态。
- `Probe(json, targetURL, id, timeoutMillis)`：一次指定节点请求，返回字段白名单 JSON。
- `ProbeDelay(json, targetURL, id, timeoutMillis, unified)`：HTTP / HTTPS HEAD 可达性延迟；统一延迟优先使用第二次响应，复用连接；独立返回 `proxy_delay_measured`，不宣称证书身份验证。自动组初始化在本项预算内、延迟计时之外。默认不限制响应状态，与 Mihomo URLTest 未设置 expected-status 时一致。
- `Cancel(id)`：取消已预留或已执行的请求。
- `SetPlatform(callback)`：Android 网络绑定、socket protect 和系统域名解析回调。
- `StartVPN(json, fd, dns)` / `StopVPN()` / `VPNStatus()`：TUN 会话、重复停止和无地址统计。

HTTP 探测不读取环境 HTTP 代理，不跟随重定向，不回退直连。仅 2xx 输出 `proxy_request_verified`；非 2xx 保留状态码，超时保持 `timeout_stage_unknown`，可识别的代理通道内证书、QUIC 握手超时 / TLS 错误、DNS 和通道失败分别返回白名单代码，HTTPS 目标证书错误单独返回；阶段证据不足时为 `proxy_or_target_failed`。明确的 socket 保护拒绝为本地限制。不返回错误凭据结论或完整协议会话遥测；只依据错误类型与调用边界提供有限定位。

目标要求 HTTPS；仅为受控本地测试允许 IP 字面量回环地址的 HTTP。上述限制针对完整 Probe 诊断；ProbeDelay 接受无凭据 HTTP / HTTPS。原生探测槽最多 16，预算 100–30000 ms。返回诊断结果不包含地址、SNI、节点名、密码、原始错误或响应正文。

## 配置子集

支持 AnyTLS、SOCKS5、SS、Trojan、VMess、VLESS、Hysteria2、TUIC 的常用字段，实际字段白名单见 `mobile/core.go` 和 `mobile/protocols.go`。HTTP CONNECT 节点暂时拒绝，详见 [安全边界](../SECURITY.md)。使用固定版本的 mihomo 构造器，不是完整配置执行器。

未知字段会拒绝该节点。current beta 导入 VLESS 时例外归一化 alterId / cipher：固定 Mihomo 的 VlessOption 不使用这两个 VMess 模板字段，只移除有界整数 / 数字字符串 alterId 和无控制字符的短字符串 cipher；容器、布尔、null、超限值仍拒绝。真实 VLESS encryption、flow、TLS、证书和传输字段原样校验；VMess 规则不受影响。current beta 保留正确类型的 skip-cert-verify 布尔值，包括插件 TLS；缺省为正常验证，true 按 Mihomo 执行节点跳过验证。ValidateNode / Probe / StartVPN 使用同一策略，不设全局自动降级；网站 HTTPS 与订阅下载仍正常校验。verificationEnabled 只兼容读取旧版历史资料，新导入不再生成调整计数。不允许加载证书文件、私钥、外部可执行插件、任意系统路由或接口覆盖。自定义根证书暂不支持。服务器与 SNI 使用 ASCII 域名 / Punycode 或 IP。

YAML 限制 2 MB、500 个候选节点、16 层、50000 个语法节点，并拒绝别名、重复键和多文档。只提取 `proxies` 或单节点 / 节点列表，记录不支持数量与忽略路由设置；不会拉取 provider URL。

current beta：单个 YAML mapping 最多 100 个键，预先阻止重复键检查的二次开销。Base64 最多解包一层；分享链接每条最多 96 KiB、最多 500 条，支持标准 / URL-safe 编码。URI 转换拒绝重复参数、别名冲突和未知字段；合法 insecure / allowInsecure 值转换为节点对应的布尔策略，其他安全限制继续执行，随后仍通过同一节点校验器。兼容受限 AnyTLS 空闲会话参数与带引号端口；关闭的性能提示可归一化，开启的未知能力不会忽略。

## TUN 与资源

Kotlin 始终拥有 `VpnService.Builder.establish()` 返回的原始 FD；Go 通过 `dup` 获得独立 FD，只关闭该副本。参数失败、初始化失败、正常停止及重复关闭均有清理路径。会话 close 使用 once 保护；取消关闭已追踪的连接。

用户态 mips 栈处理 IPv4 / IPv6 TCP 与 UDP，缺省交给选中主代理；显式规则 / 直连模式及内网策略可改变出站。不存在失败后直连兜底，ICMP 始终丢弃。DNS 通过主代理进行 TCP / HTTPS 查询，HTTPS 正常校验证书。UDP 会话和排队、DNS 并发及总连接数均设上限。上游日志输出关闭，只暴露结构化代码与计数。

## 测试

从工程根目录运行 `tools/verify-native-core.ps1`。46 组测试包含真实本地 AnyTLS / Hysteria2 QUIC、TLS 信任和名称、错误凭据、取消与超时、HTTP 状态 / 重定向 / 响应限额、保护拒绝、配置注入与解析限制、DNS 问题匹配、TCP / UDP / DNS 转发，以及向内存 TUN 注入真实 IP 包并取得经 AnyTLS 的 DNS 响应。`tools/verify-security.ps1 -Fuzz` 检查固定模块的校验和、Android arm64 漏洞与有界订阅模糊测试。

Android 35 测试经真实 JNI 和 VpnService，使用独立 UID 及本地 SOCKS5 / 自签 Hysteria2 服务验证实际 DNS + TCP VPN 路径。测试临时 CA 只在桌面测试进程中注入；生产桥接不会修改系统信任库；节点原配置可能显式跳过节点证书验证，目标 HTTPS 不受影响。其余协议的在线服务端与物理手机仍需后续验证。

current beta 导入会返回私有 groups / definition（含节点凭据），与 nodes 一样只能加密存储，不能记日志。DIRECT、同一资料的节点和受限 select 组可解析为有界 dialer-chain，运行时通过 Mihomo WithDialerForAPI 与 proxydialer.New 注入父代理；父节点也执行同一字段与协议校验。组选择变化重新构造快照，不能将缺失 / 循环 / 不支持的依赖改为直连。current beta 已支持 select、url-test、fallback、load-balance 的独立 profile-target 运行图，作为主代理或拨号依赖，groups 返回 reason 固定分类；远程 provider 仍明确不支持；不通过 Controller 或全局代理表共享状态。


`profile-target` 包裹只接受 type / target / definition 三个不重复的字符串字段。共享定义沿用 2 MiB、AST、层数和节点数约束，最多 64 个组，图中 8 个自动组 / 2000 个探测成员引用；导入总适配器构造上限 10000。`requiresProfile` 节点必须用共享 definition 和节点名构造运行包裹，不能单独执行原始 dialer-proxy。导入与验证不发起健康请求，实际 Dial / ListenPacket 激活自动组；Close 取消探测、关闭提供者和节点。空组隐式 fallback 阻断，显式 DIRECT 保留。

Android JSON 的斜杠和 UTF-16 转义在进入 YAML 前逐字符串规范化，保留重复键位置，不做整对象 map 去重；对应 234 节点、特殊凭据和重复键回归已覆盖。

## current beta 运行配置

新增 ValidateRuntimeOptions / StartVPNWithOptions / VPNConnections / CloseVPNConnection；本地有界规则、显式直连和内网策略共用受保护 socket，失败不直连回退。DNS 支持 TCP / HTTPS，DoH 校验证书并禁止重定向；仅关联查询所有者 / CNAME 链内的 A / AAAA，拒绝无关回答污染。全局模式且目标显示关闭时不保留 DNS 关联，域名规则 / 目标显示需要时才建立有界内存表。TCP / UDP 写入即计数，连接关闭包括两端及建立中的竞态；状态只返回固定字段。规则和资源边界见 ../docs/development.md。
