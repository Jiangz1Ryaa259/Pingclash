# 标准手机终端

设置页顶部“终端”打开独立全屏页面，点击“新建终端”才启动 Android `/system/bin/sh -i`。没有 PingClash 专用语法，没有自动执行订阅文本的入口。支持标准 shell 变量、管道、重定向、交互读取、ANSI 显示、长按文本选择、软硬键盘、Tab、方向键和 Ctrl+C；最多三个会话，各保留 2000 行回滚。可输入 `help` 和 `toybox` 查询当前设备已有命令。没有附带完整 Termux Linux 软件仓库；curl、dig 等是否存在取决于设备，当前没有自动下载软件包。

应用本身排除在自己的 VPN 之外，因此普通 shell 请求通常使用系统底层网络；它们不等于已验证所选代理路径。Android / SELinux 权限可能限制 ping、路由、接口或其他信息，不申请 root、ADB 或系统签名权限。通过图形界面继续使用现有节点和策略组诊断。

## 权限与数据

真实 shell 与本应用使用同一 UID，可访问本应用文件及网络权限；它不是隔离的只读诊断环境。页面在启动前告知此事实，用户自行输入的文件读写和网络请求按命令执行。UI 不向 shell 注入订阅、节点凭据、代理环境变量或用户历史。HOME/TMPDIR 是私有缓存目录，ENV/HISTFILE 指向 `/dev/null`；shell 屏幕与历史默认不落盘、不进日志。用户命令显式写文件仍会保留文件，不宣称禁止用户保存。

终端 Activity 不导出，不接收 URL 或外部命令 Intent。全页使用 FLAG_SECURE；复制由用户选中文字触发。OSC 52 剪贴板控制已禁用，程序输出无法自动读取 / 替换剪贴板；菜单和中键粘贴都经确认，仅读取纯文本，最多 16 Ki 字符。进入后台关闭会话并杀死 shell / 前台进程组，不提供后台服务。人为脱离会话的守护进程或恶意自定义命令无法据此宣称完全被隔离。

## 组件来源

复用 [Termux v0.118.3](https://github.com/termux/termux-app/tree/v0.118.3) 的 terminal-emulator / terminal-view。源码包 SHA256：`debd53a911c30f578c5b3600e5609a22b576491b20ce632e155457596ee1d291`。保留原文件版权声明及 GPL-3.0-only / Apache-2.0 例外说明，源码随本项目分发。

本地修订：Gradle 命名空间与 Android 35 构建；JNI 两个错误分支释放 PTY、修复 cwd JNI 字符串释放参数；子进程 no_new_privs；退出时关闭前台与 shell 进程组；禁止 OSC 52；中键粘贴复用显式确认入口。构建脚本固定 NDK 27.2.12479018，两个 ABI，16 KiB ELF 对齐、栈保护、RELRO/NOW。新增 Gradle library 插件沿用已有 AGP 8.9.2，依赖摘要加入 verification-metadata。

终端视图采用弱引用，避免 ViewModel 跨 Activity 生命周期保留旧视图。应用回调不记录终端内容、命令或原始失败到 Android 日志。主 APK 包含终端组件的许可证说明及现有完整 GPL / Apache 许可证；发布源码包含两库全部使用源文件和本地修改。
