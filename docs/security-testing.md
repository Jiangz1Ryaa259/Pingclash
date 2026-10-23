# 安全测试与当前证据

## 0.1.0-beta.1 validation baseline

2026-10-23，公开版本码 19。新增独立的标准 sh / PTY 终端，使用 Termux v0.118.3 的终端模拟器和视图，不新增专用命令语法。组件、权限和本地修改见 [终端说明](terminal.md)。

- 终端 Activity 不导出；只通过用户点“新建终端”启动系统 sh。最多三个会话、每会话 2000 行回滚，环境不含订阅参数，默认 shell 历史不落盘。终端与应用同 UID，能够读写应用文件，不能宣称只读隔离或防止用户输入的恶意命令；用户显式写文件仍会保留。
- 全页 FLAG_SECURE；OSC 52 禁用，手动纯文本粘贴确认。中键粘贴也走同一路径；无自动 URL 打开、外部命令 Intent 或遥测。进入后台关闭会话及 shell / 前台进程组，JNI 子进程设 no_new_privs。弱引用终端 View 避免 ViewModel 保留旧 Activity。自建守护进程或脱离会话的恶意命令不在进程组清理保证内。
- 最终准确签名、不可调试发行包在专用 Android 35 模拟器 `OK (24 tests)`，137.104 秒。新增真实 PTY、标准 shell 变量保持、管道 / 排序、交互 read、Ctrl+C、屏幕保护、OSC 剪贴板禁止、会话上限和后台 shell 退出；既有订阅、设置、代理组、加密、跨 UID 和真实 VPN 转发继续通过。受控服务端 dnsQueries=1、peerRequests=1；run-as 被拒绝。
- release lint 0 错误、8 个原有依赖更新提示；沿用发行证书。签名与 ZIP 16 KiB 对齐通过，6 个原生库的 20 个 LOAD 段均至少 16 KiB。主 APK 未发现列出的测试类、合成凭据或私钥标记。终端本地库由固定 NDK 编译，完整对应源与许可随源码包提供。
- Go / Mihomo 核心未改动，AAR SHA256 仍为 `21424aa255234ba916880311865bc758ced2d93e29ab00526ad75c5104f7786e`；68 项 Go、模糊测试与 govulncheck 证据沿用既有核心验证基线，没有将它们标成终端组件的新增扫描。Android 原生 C 终端新增面仍需要长期审计和物理手机测试，不能宣称绝对安全。



The public version label changes packaging metadata only. The terminal-enabled functional baseline passed 24 Android integration tests. The renamed public APK has not been newly built or independently audited.
