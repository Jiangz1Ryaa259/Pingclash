# UI interaction validation (0.1.0-beta.7 / build 25)

- Final signed candidate: 131085789 bytes, SHA256 `e748333771872dd543e734eda036cdbbe79a7021685c1589c80152473694a972`. Existing signing identity, v2/v3, non-debuggable and release `run-as` denial verified. Six native libraries / 20 LOAD segments satisfy 16 KiB alignment; private signing/user/test marker matches: zero.
- API 35/AOSP x86_64: the same signed APK passes **55/55 tests, zero skipped, 278.860 seconds**. Controlled server counters: **DNS 1, separate-UID HTTP 1**. Coverage includes encryption, listener boundaries, screenshot protection, imports, native VPN relay/recovery, real WebGL isolation/pause-resume, terminal restrictions and the new UI interactions. No real subscription or personal phone was used.
- API 31/AOSP x86_64: the same signed APK passes **20/20 focused UI/WebGL/privacy checks, 61.831 seconds**. A small-screen test was corrected to scroll its physical tap above the floating bar, retaining the click and callback assertions rather than substituting a direct callback. This is not the full VPN suite on API 31.
- API 29/AOSP x86_64: the same signed APK passes **18/18 native UI/fallback/gesture checks, 34.300 seconds**, including import review, sensitive copy and transient theme reveal. The two real Three.js tests are deliberately not included on its old WebView; this result does not assert WebGL support.
- Renderer fidelity/integrity: **20/20**; clean curated rebuild matches the reviewed outputs. Pinned npm audit currently reports zero known vulnerabilities. The existing detekt baseline is unchanged and passes. Release Lint: **0 errors, 62 warnings, 2 informational findings**; warnings are 27 dependency updates, 6 AGP updates, 19 unused resources, 7 KTX suggestions, 2 typography suggestions and 1 older-API attribute. MissingTranslation/HardcodedText and security error checks remain enabled. **616** English/Chinese resource pairs and format signatures pass.
- Real blur is measured, not inferred from a translucent tint: stripe mean **200.557**, standard deviation **1.710**, versus opaque fallback mean **253**, on API 35. Protected-page and foreground detachment checks pass. This establishes real sampling/diffusion and safe fallback, not identical optical refraction across GPUs.
- The theme-reveal test verifies transient capture release and refusal on protected windows. Profile-copy checks verify sensitive clip metadata and feedback without the URL; import review cannot write/download until the final explicit action. The three website probes are not automatically requested by these fixtures.
- Early UI tests retained old selectors after the profile/menu redesign; these were updated to the real new flow. A custom frame loop initially blocked Compose idleness and was replaced by its native infinite animation. A refraction-only background did not provide stable sampling on the software renderer; a stable sibling-source Haze underlay now preserves blur and readability. No failed pixel, privacy or disabled-action assertion was removed.
- One intermediate emulator host exited, and an earlier 55/55 run outlasted the desktop fixture's five-minute lifetime before counters could be retrieved. The controlled fixture now lives at most 12 minutes, longer than the bounded ten-minute CI test command, and still stops via its explicit marker. This does not change app network timeouts. The final run above includes both test output and server counters.
- Previous public CI [40171611051](https://github.com/Jiangz1Ryaa259/Pingclash/actions/runs/40171611051), revision `59539d2`, built successfully but all emulator hosts exited near the first test. The workflow now pins emulator build 13610412 / 35.6.11. New-head public CI remains independent; its actual status must be read from PR #16 rather than inherited from an older green run.
- No preview video was created. Screenshots are synthetic UI fixtures, not evidence of public website/account access. Physical OEM/GPU, long-running Doze and real-subscription validation remain unverified. API 33+ procedural scenery differs from the photographic fallback on older Android.

Older records follow for comparison.

---

# 离线 Three.js 材质验证（0.1.0-beta.6 / build 24）

- 最终签名候选 `PingClash-0.1.0-beta.6.apk`：130962909 字节，SHA256 `94925c46b1d2168b85bebd39eeb1ec328f16d868c8d5d6364c46d5239d888032`。原签名身份、v2/v3、非 debug、6 个原生库共 20 个 LOAD 段的 16 KiB 对齐通过；指定私钥/个人标记/测试凭据扫描命中 0。
- API 35/AOSP x86_64：同一签名 APK 完整 **51 项通过、0 跳过**（253.342 秒）。受控夹具 `dnsQueries=1`、`peerRequests=1`；独立 UID 的 DNS/TCP 经选中节点转发，`run-as` 被拒绝。两项新增检查实际 WebGL 画布、材质参数、原生正反状态、减少动效、固定资源白名单、远程请求阻断、文件/content 访问限制与停止渲染。
- API 31/AOSP x86_64：同一签名 APK **16 项界面专项通过**（52.755 秒），包含真实 Three.js 场景及隔离检查；系统 WebView 91.0.4472.114。API 29 同一 APK **14 项原生界面专项通过**（28.847 秒），不将原生回退测试当作完整三维测试。
- 源组件保真/产物完整性 **20 项通过**：原始导出 LF 校验值、卡片/环扣/织带几何、完整材质构造、环境、法线纹理、物理求解与着色器均保留。宿主适配范围见 [renderer README](../ui/lanyard/README.md)。锁定 npm 依赖审计当前 0 项已知漏洞；detekt 原基线通过，未重置基线；release Lint 0 错误、44 警告、2 信息项；591 组翻译与格式占位符检查通过。
- 初轮同时运行两个软件渲染模拟器时，49 项既有检查通过，2 项新增渲染检查在冷启动着色器编译期间触发 5 秒 JS 回调超时。随后改为有挂绳时才创建 WebView、限制在途状态查询，并将测试回调等待调整到有界 30 秒；最终按上述分开运行并通过。早期一次 AVD 宿主退出未完成测试，重启后复测，不据此断言应用崩溃或物理机表现。
- 首页预览是最终 APK 清空配置后的真实录屏（20 秒，359 个编码帧）；编码帧率不是物理机 UI 帧率。README 背面图来自 API 31 合成渲染夹具，文字“已建立”不是实际公网连通证明。代理/设置截图保留之前候选的未改动布局。
- 旧/无 WebGL 的系统 WebView 使用原生材质回退。物理 GPU、国产 OEM、长期后台及真实订阅仍需真机测试；不宣称所有设备均有相同性能或三维能力。新提交公共 CI 以 PR #16 的当前提交结果为准，不沿用旧提交绿色状态。没有发布新 Release/tag。

以下保留历史构建证据。

---

# 顶部挂绳、长按与翻牌验证（0.1.0-beta.5 / build 23）

- Android 15 / API 35：最终签名包 **49 项通过、0 跳过，252.605 秒**；受控 DNS 和独立 UID HTTP 各 1 次，非 debug 包拒绝 run-as。
- Android 12 / API 31 与 Android 10 / API 29：同一签名包各 **14 项界面专项通过**，分别 35.232 秒、26.944 秒；包含原生缎面回退、顶部锚点、长按/点按区分、翻面、大字体/RTL、真实玻璃采样或不透明回退。不是这两个系统的全套 VPN 回归。
- 四项控件检查验证：普通滑动不触发开关，静止长按后才能拖动，长按不移动及取消也不执行点按；松手回弹、窗口 y=0 锚点、挂绳端点跟随、开启/关闭/失败翻面时序、大字体、RTL 与实际 AGSL 绘制路径。完整 VPN 夹具通过实际点按关闭，额外确认连接期间拖动不导致断开。
- 首轮长按实现曾允许没有滚动父级接手的横滑变成点击，现改为明确区分短点、超出触摸阈值的移动和静止长按；无障碍按钮与键盘动作单独保留。修正后的四项检查通过，15.313 秒，完整回归另行通过。
- 原 detekt 基线门禁、正式包/测试包构建和严格 release Lint 通过；591 组中英资源校验通过。Lint 为 0 错误、44 警告、2 信息项，无安全/本地化错误；未重置基线。
- 候选 `PingClash-0.1.0-beta.5.apk`：130696048 字节，SHA256 `281e92658f1406a084b243355b759d7352e98367cbd424a24183b468aaee2bb5`。沿用原签名，v2/v3、非 debug、6 个原生库的 20 个 LOAD 段 16 KiB 对齐及指定私人/测试凭据标记扫描通过。
- 窗口根层挂绳、AGSL 材质和兼容回退只使用本地姿态/状态参数；无新依赖、权限、遥测、运行时下载或逐帧位图创建。实现范围见 [lanyard-ui.md](lanyard-ui.md)。公共 CI 以当前提交为准；未将模拟器结果替代 OEM 真机、真实订阅或长期后台测试。

---

# 悬挂卡片控件验证（0.1.0-beta.4 / build 22）

本节对应去除默认矩形波纹后的最终签名候选；尚未替换已发布的 beta.1。

- Android 15 / API 35：同一正式签名 APK **48 项通过、0 跳过，185.325 秒**；受控服务观察到 DNS 与独立 UID HTTP 各 1 次，非 debug 包拒绝 run-as。
- Android 12 / API 31：同一签名包 **13 项界面专项通过、27.276 秒**，包括真实玻璃采样及保护窗口回退、挂卡手势、减少动效、大字体和 RTL；不将专项称为全套 VPN 回归。
- Android 10 / API 29：同一签名包 **13 项界面专项通过、26.349 秒**，包含不透明导航回退及相同挂卡操作检查。
- 新增三项挂卡回归：真实拖动与取消不触发 VPN、释放后回弹且点按只提交一次；减少动效及禁用/停止状态；大字体、RTL 和连接后卡面仍可操作。首轮拖动夹具只推进一帧未观测到位移，调整为推进重组和动画所需的 80 ms 后通过，保留位移及回弹断言。实际空配置录屏另验证了首页拖动效果。
- detekt 保持原基线，正式包、测试包和严格 release Lint 构建通过；591 组中英资源校验通过。Lint 为 0 错误、43 警告、2 信息项；未将现有依赖与样式建议宣称为已清零。
- 最终候选 `PingClash-0.1.0-beta.4.apk`：130679664 字节，SHA256 `636b293349df1646e9fa089fcdb3bfcd1a60de9c1c1fe17656ff506ffdcf2c42`。原签名身份、v2/v3、非 debug、6 个原生库的 20 个 LOAD 段 16 KiB 对齐及指定私人/测试凭据标记扫描通过。
- 控件为原生 Compose 材质及透视实现，未加入 React/Three.js、WebView、权限、遥测或运行时下载；场景与连接逻辑不变。实现边界见 [lanyard-ui.md](lanyard-ui.md)。OEM 真机、真实订阅和长期后台行为仍需实测；公共 CI 必须以本次提交为准。

---

# 写实全屏场景验证（0.1.0-beta.3 / build 21）

本节对应本地正式签名候选；尚未替换 GitHub 已发布的 beta.1。

- Android 15 / API 35：同一正式签名 APK **45 项通过、0 跳过，222.028 秒**；受控 DNS 查询与独立 UID HTTP 请求各 1 次，非 debug 包拒绝 run-as。
- Android 12 / API 31：**10 项界面专项通过，52.194 秒**；Android 10 / API 29：**10 项通过，28.419 秒**。包括真实玻璃像素采样/实色回退、照片网格动效、减少动效后的静止帧、大字体和滚动实际驱动下潜；未将专项当作全套 VPN 回归。
- 补充 Android 12 / API 31 完整回归：同一签名 APK **45 项通过、0 跳过，174.262 秒**；受控 DNS 与独立 UID HTTP 各 1 次，run-as 被拒绝。首跑曾在分组测试中发生一次 `performMeasureAndLayout called during measure layout` 崩溃；应用代码未变的完整重跑通过，原因尚未稳定复现，保留为待调查问题，不能宣称已修复。
- 修正短屏测试定位：主题/语言选项和报告预览先滚动到浮动导航栏上方，再验证边界并执行实际点击；原保存、弹窗、导出和脱敏断言保持不变。API 35 的 1080×1920 短屏设置专项 3 项通过、10.957 秒。旧公开 CI 的四组失败分别在这两处点击；构建、原生测试及扫描已通过，新提交仍需重新运行完整矩阵。
- 正式包和 CI 所用 Debug/测试 APK 构建通过；detekt 原基线、严格 release Lint、29 项 Java 检查与 590 组中英资源检查通过。Lint 0 错误、43 警告、2 信息项；未重置基线，也未将依赖/样式建议宣称为全部清零。
- 本地生成的海面、水下与云景 PNG 原样打包；提示词及来源记录见 [scene-assets.md](scene-assets.md)。原生网格与滚动交叉淡入不等于实时 3D 海洋或视频逐帧驱动。未复制参考视频素材，未新增背景下载、权限或遥测。
- 候选 `PingClash-0.1.0-beta.3.apk`：130630512 字节，SHA256 `88a636111f5dfc4172ceaafc9c5a09cb820b2d922d89d408de634529c9ff3774`。沿用原签名，v2/v3、非 debug 标记、6 个原生库的 20 个 LOAD 段 16 KiB 对齐及指定私人/测试凭据扫描通过。
- 16 秒视频来自已清空的项目专用模拟器和真实应用空配置；截图里的合成代理资料另作标注。当前提交的公共 CI 需独立验证，不沿用 beta.2 的结果。OEM 真机、真实订阅和长期后台行为仍需实测。

以下保留历史构建的证据。

---

# 海浪、云景与真实玻璃验证（0.1.0-beta.2 / build 20）

本节对应本地正式签名候选，尚未替换已有 GitHub Release。

- Android 15 / API 35：同一正式签名 APK **44 项通过、0 跳过，168.865 秒**；包含界面、导入、providers、终端、深度链接及 VPN 隐私回归。受控服务实际观察到 DNS 查询与独立 UID HTTP 请求各 1 次，非 debug 包禁止 run-as。
- Android 12 / API 31：**9 项界面专项通过，16.049 秒**；Android 10 / API 29：**9 项通过，17.013 秒**。这两次是界面专项，不能当作对应系统全套 VPN 回归。
- 条纹源经过真实导航栏后的像素采样：API 31 平均亮度 202.70、标准差 0.42；API 35 也通过相同的“亮度 <235、标准差 <9”断言。开启减弱透明度后平均亮度 253。API 29 为不透明回退，平均亮度 253、标准差 0；没有把纯色回退宣称为模糊。
- Haze 1.5.4 在 API 31 默认关闭模糊，本次使用 1.6.8 及 Compose BOM 2025.06.01。API 31 的兼容重绘使 Espresso 无法等待全局空闲，真实玻璃检查改用有 5 秒上限的逐帧采样；保留源采样、重复开关及 FLAG_SECURE 期间暂停采样的断言。其他 API 31 Espresso 功能夹具使用减弱透明度；不以这些夹具代替真实玻璃验证。
- 大字体末项滚动与点击、静止首页波浪帧差、减少动效后帧像素不变、深浅色、导航拖动/取消及开关 RTL 检查均通过。截图使用合成资料；8 秒视频使用清空的测试模拟器与空配置，没有模拟真实连接成功。
- detekt 原基线门禁、严格 release Lint 和 **590 组中英资源**检查通过。Lint 0 错误、42 警告、2 信息项；保留依赖/AGP、KTX、排印和未使用资源建议，无安全或本地化错误。未重置基线。
- 新增 144 个构建依赖校验项均与 Google Maven / Maven Central 官方发布文件及校验值核对；原有 878 个 SHA256 保持不变。这包含构建元数据，并非 144 个新增运行时库。
- 候选 `PingClash-0.1.0-beta.2.apk`：125432520 字节，SHA256 `5721573ef65fead6945204dabb9a0e17522ed72cf858b759286146d76de1b2be`。沿用原有签名，v2/v3、非 debug 标记及 16 KiB 对齐通过；6 个原生库的 20 个 LOAD 段满足对齐，指定私人/测试凭据标记扫描无命中。
- 本轮公共 CI 以 PR #16 当前提交的 Actions 为准，旧提交的绿色状态不能作为本次依赖和布局变更的验证。OEM 物理设备、长期后台行为及真实订阅仍未由开发者直接验证。

以下保留历史构建证据，各项结果只适用于对应构建。

---

# 开关与 VPN 图标动画验证

本轮签名候选仍为 0.1.0-beta.1，不替换已有 Release。

- Android 15 / API 35，正式签名候选 41 项通过、0 跳过，160.626 秒。含新增取消按压、快速反向切换、禁用状态、RTL/减少动效视觉夹具，以及完整 VPN、导入和隐私回归；受控 DNS 与独立 UID HTTP 转发均有实际记录，run-as 被拒绝。
- 针对性交互检查另有 6 项通过。按钮中间色采样保持文字对比度至少 4.5:1。官方 graphics-shapes 1.0.1 的新增 6 个校验项均与 Google Maven / Maven Central 发布方文件和校验值核对，原有 872 个摘要保持不变。
- detekt 基线门禁、严格 release lint 和 583 组中英资源检查通过。包含 release instrumentation 的 lint 报告为 0 错误、42 警告、3 信息项；主要是依赖/AGP、KTX 与排印建议，未发现安全或本地化错误。未重新生成 detekt 基线。
- 候选包 PingClash-0.1.0-beta.1-switch.apk：125194702 字节，SHA256 5af3546bc2e9e6b5be532827eb2d65d0386f5c63d6818b5b1398a23f3a002768。原有签名身份、v2/v3 签名、非 debug 标记及 16 KiB 原生对齐通过；指定私人/测试凭据标记扫描未发现命中。
- 此候选的本地全套设备验证只覆盖 API 35 模拟器。上一版界面的 API 31/33/34/35 公共矩阵已通过：[Actions 40088332873](https://github.com/Jiangz1Ryaa259/Pingclash/actions/runs/40088332873)，不能当作本次动画变更的矩阵结果。国产 OEM 真机和长时间后台行为仍需验证。

---

# 海色界面与诊断路径验证

本轮只更新界面、加密外观偏好和测试证据，不替换现有 GitHub Release。

- Android 15 / API 35 debug：40 项通过、0 跳过，209.349 秒。包含新增的默认配色对比度、诊断证据映射、动效设置持久化、系统动画禁用、深浅色和大字体检查，以及既有导入、providers、终端、深度链接与 VPN 隐私回归。
- 受控服务端观察到 DNS 查询和独立 UID HTTP 请求各 1 次。截图是独立的合成视觉夹具，不能作为真实节点可用的证据。
- detekt 基线门禁、release 构建、29 项 Java 诊断检查和严格 release lint 通过。Lint 为 0 错误、29 警告、2 信息项；现有依赖/样式建议仍保留，不宣称全部清零。583 组中英资源及格式占位符一致。
- 新候选 `PingClash-0.1.0-beta.1-ocean.apk`：125096302 字节，SHA256 `d77514feecf98a01caae96b0a56c49e1b2ff8cc5a695fe086f83f3de41d24e4e`。v2/v3 签名与非 debug 标记通过，6 个原生库的 20 个 LOAD 段均满足 16 KiB 对齐；签名材料、个人路径及指定测试凭据标记扫描无发现。
- 默认配色使用实际 Canvas 色值和透明度检查文字至少 4.5:1、开关关闭态与导航选中轮廓至少 3:1。墙纸动态配色不包含在这项默认色板保证内。
- 国产 OEM 物理设备和长时间后台行为仍未验证。未使用真实订阅，未新增权限、图片下载、页面捕获或遥测。

以下保留之前构建的历史证据，各项测试结果仅适用于对应构建。

---

# 深度链接与输出隐私加固验证

本节对应新增深度链接、detekt、兼容性语料和 canary 测试的源码；下方订阅功能记录为之前一轮构建，不混作本轮证据。既有 GitHub Release 未覆盖。

- Android 15 / API 35 debug：**36 项通过、0 跳过，169.348 秒**，含深度链接确认前零请求、确认后不激活、活动重建、首次导入/持久化/删除回退、UDP 指标和终端输出边界；受控 DNS 和独立 UID HTTP 转发均有实际请求。
- 75 个原生测试函数及 29 项 Java 诊断检查通过；provider 语料的 14 个案例中 5 个预期接受、9 个预期拒绝，不将拒绝案例宣称为支持。
- detekt 1.23.8 基线门禁通过，新增代码的发现会阻止构建；并未通过重新生成基线掩盖新增问题。564 组应用中英资源及格式占位符通过一致性检查。
- Release 构建与 Lint 通过：0 错误、29 警告和 1 信息项。现存依赖/样式警告仍需处理，不将其描述为全部清零。
- 新增 detekt 的 86 个构建依赖校验项均与 Maven Central 发布方 SHA-256 或 SHA-1 核对，旧校验值集合未改动。detekt 依赖不打入应用运行时。
- 审查的 344 个源码路径约 2.24 MB，个人路径/令牌标记扫描及 Gitleaks 均无发现；工具、签名身份、APK、真实订阅和本机文件未纳入源码。
- 独立签名候选包：`PingClash-0.1.0-beta.1-hardening.apk`，125022574 字节，SHA256 `baa286b8c9bcf3045df6b62622bc1e0cf9d0bda631dc058401c6338aedcc82e8`。APK 签名验证通过；各系统的运行结果应以该候选包的实际测试及本次 PR CI 为准，不沿用旧提交结果。
- 下一版发布说明草稿见 [next-beta-notes.md](next-beta-notes.md)；真实 OEM 后台行为、完整 provider 兼容、二维码和可选功能仍按文档列为限制。

## 前一轮订阅功能候选验证


当前源码的签名候选 APK 与既有 GitHub Release 是不同构建；没有覆盖 Release 资产。

- Android 12 / API 31：同一签名 APK **29 项通过、0 跳过，148.212 秒**。
- Android 15 / API 35：同一签名 APK **29 项通过、0 跳过，144.883 秒**。
- 两次均验证受控 DNS 与独立 UID HTTP 真实转发、Doze 进入/退出、断网保留 TUN、重新连接、通知、安全窗口及 Release 禁止 run-as。
- 新增用受控 HTTPS 服务验证的 UA、配额、加密持久化、provider 缓存、失败保留旧配置、VPN 运行期间下载缓存和重连后应用；TCP 测量验证不发送代理握手。
- 73 项原生测试、28 项 Java 诊断检查通过；553 组应用中英文资源键及占位符匹配，终端组件另补 3 项中文菜单资源。
- 三类各 30 秒的模糊测试通过，包含新增 remote provider 解析目标。最小化预算设为每项 1 秒，避免消耗整个执行窗口。
- Android arm64 govulncheck：0 可达、0 已导入包漏洞；保留 1 项未使用 OpenPGP 模块告警 GO-2026-5932，不将其描述为依赖告警全部消失。
- Release Lint：0 错误、29 警告及 1 信息项。警告为依赖/AGP 版本 20 项、UseKtx 5 项、排版 2 项、未使用资源 1 项及旧系统 localeConfig 属性 1 项；无安全或本地化错误。
- 对源码提交 `2d290743f42349c89e81a584a5c9a937d89b9040`，获取远端分支和标签后检查 23 个可达提交、389 个历史文件对象：签名/本地配置敏感文件名 0、当前签名密钥及密码原文匹配 0、Gitleaks 命中 0。CI 增加全历史签名材料防护。本轮源码发布共 314 个受控路径，秘密及个人路径扫描无命中。

候选 APK：`PingClash-0.1.0-beta.1-subscriptions.apk`，124997998 字节，SHA256：

```text
29091d63657d5456be20d14258bb682feb03b6cde8546e696a612e454f3d3ed0
```

APK 包内未发现签名材料、个人用户名或合成测试凭据标记；6 个原生库的 20 个 LOAD 段均满足 16 KiB 对齐。未连接真实手机，未把 OEM 后台强杀、长时间 Doze 或仍残留的旧 Wi-Fi 连接宣称为真机验证通过。

公共 CI 与源码评审：[PR #14](https://github.com/Jiangz1Ryaa259/Pingclash/pull/14)。该轮公共运行状态须以 Actions 的实际结果为准；下面保留此前版本的历史证据。

---

# 安全测试与当前证据

2026-10-23，本记录对应本地未发布候选，不替换 GitHub 已发布的 `0.1.0-beta.1` 资产。逐项审查见[发布前排查](hardening-review.md)。

## 可复核的远端记录

首个完整干净环境验证：[Actions 39995451294](https://github.com/Jiangz1Ryaa259/Pingclash/actions/runs/39995451294)，提交 `5f2470ee48a85be53f5437faf189ce0b04d4a469`。APK 构建、lint、28 项 Java 检查、70 个 Go 测试函数、两类模糊测试及 Android arm64 漏洞扫描通过。

首次失败不是未触发：一轮缺少三份 Maven 元数据摘要，核对发布方 SHA512 后补入；另一轮暴露异步计数断言时序。回环自动组夹具另需避开上游把 0ms 视作未知延迟的哨兵行为。修复测试条件，没有关闭依赖校验、删除断言或在 CI 失败时跳过执行。

本地化、后台及安全窗口回归的完整远端验证：[Actions 40009562806](https://github.com/Jiangz1Ryaa259/Pingclash/actions/runs/40009562806)，代码提交 `daa738faf3de72548e59a6d3ad61acf0ba72e0b4`。构建、严格本地化 lint、28 项 Java 检查、70 个 Go 测试函数、两类模糊测试及漏洞扫描均通过。

| AOSP x86_64 环境 | 结果 | 设备测试耗时 |
| --- | --- | --- |
| Android 12 / API 31 | 26 项通过，无跳过 | 142.808 秒 |
| Android 13 / API 33 | 26 项通过，无跳过 | 140.436 秒 |
| Android 14 / API 34 | 26 项通过，无跳过 | 149.327 秒 |
| Android 15 / API 35 | 26 项通过，无跳过 | 141.881 秒 |

四个版本均确认受控服务端收到 VPN DNS 查询及另一 UID 的 HTTP 请求。没有使用真实订阅。旧系统的截图拒绝行为、虚拟化网格滚动和 VPN 路由发布时序均保留断言后修正测试；没有跳过失败用例。仅取消同一提交的重复 push 运行，完整 PR 矩阵保留。

本次应用与测试代码在上述提交完成验证，随后补记本文档及 README；主分支推送会再次自动触发工作流。

## 当前本地候选

| 检查 | 结果 |
| --- | --- |
| 签名 release APK | 26 项 Android 35 测试通过，141.064 秒，无跳过 |
| Android 12 debug APK | 26 项通过，148.359 秒，无跳过 |
| Android 15 debug APK | 26 项通过，145.305 秒，无跳过 |
| 网络恢复新增用例 | 关闭 Wi-Fi/蜂窝后 TUN 保持打开、前台通知仍在；恢复网络后重新建立内核并通过代理访问，不需新 VPN 授权 |
| 真实 VPN 跨 UID 转发 | 受控服务端 DNS 查询 1 次、另一 UID HTTP 请求 1 次 |
| 监听器回归 | 禁止移动桥接启动全局配置/监听器；导入的全局端口字段不进入运行定义；VPN 启动前后应用 UID 的 TCP 接收端口集合不增加 |
| 最近任务与通知 | 仪表盘不再排除最近任务；前台通知存在且持续显示；Android 13+ 禁用任务卡片快照 |
| Java 诊断 | 28 项通过，仅回环 TCP/TLS；标签与报告文案由 Android 资源提供，报告采用实际版本号 |
| Go 原生核心 | 70 个测试函数连续三轮通过，7.774 秒；时序相关的两个用例另连续 20 轮通过 |
| 本地化资源 | 527 项默认/简体中文资源，键名、占位符及硬编码文本守卫通过；含复数资源 |
| 严格 release lint | 0 错误、29 条警告；MissingTranslation / HardcodedText 已设为错误 |
| 打包检查 | v2/v3 签名及不可调试标记通过，run-as 被拒绝；6 个 ELF 的 20 个 LOAD 段至少 16 KiB |

候选 APK SHA256：`2be538dee02fae88dc7c250f65422d91f8b741442d9f7f2dd66b5205ab7ad634`。签名与测试 APK 不随源码上传。发布版本原资产及原校验值保持不变。

## lint 分类

| 类别 | 警告数 | 说明 |
| --- | --- | --- |
| 依赖 / AGP 更新位置 | 20 | 同一版本在多个引用处会重复提示；Dependabot 不代表已升级 |
| UseKtx | 5 | SharedPreferences 写法建议 |
| TypographyDashes | 2 | 文本排印建议 |
| UnusedResources | 1 | 未使用的后台设置标题资源 |
| UnusedAttribute | 1 | localeConfig 在 API 33 以下被系统忽略；旧系统使用资源上下文回退 |

另有一项 AutoboxingStateCreation 信息级建议，不计入警告。没有安全、缺失翻译或硬编码文本错误。语言包拆分已关闭，切换语言不依赖 Play 服务下载；应用自有文案与诊断文案使用资源，用户节点名和 shell 输出不被翻译。

## 安全边界与剩余工作

没有控制器 HTTP 服务，因此不存在返回 401 的接口。当前回归断言该服务不被启动；未来若引入控制器，必须先增加随机密钥及未授权请求测试。回归守卫不代替代码审查，也不把出站 UDP 套接字误判为控制服务。

终端以应用 UID 运行，首次确认前不能创建 shell。默认不保存历史不等于阻止用户主动写文件。系统强行结束进程时的持续断网保证需要 Android 的始终开启 VPN / 锁定模式；普通模式不宣称永久 kill switch。

远程 providers、独立 TCP 延迟卡片、订阅配额/自定义 UA、二维码与图片导入、ktlint/detekt 及长期模糊/压力测试仍待完成。OEM 物理机未验证；模拟器矩阵不能代替国产 ROM 的后台行为测试。以后二维码组件应采用无需 Play 服务的实现，并保留普通文本/剪贴板及图片导入路径。

短时模糊测试、依赖扫描和秘密扫描不能证明不存在漏洞。最近一次 govulncheck 发现可达调用及导入包中 0 项已知漏洞，保留未被导入的 OpenPGP 模块告警 [GO-2026-5932](https://pkg.go.dev/vuln/GO-2026-5932)。

## 升级与设备测试说明

较早预览版覆盖安装到当前候选后，主界面的最近任务排除标志从设置状态变为清除，系统最近任务界面实际显示 PingClash 卡片。测试仅在专用 AOSP 模拟器执行；没有操作真实手机或使用个人配置。

Android 12 的安全窗口可能使截图接口直接返回空值，其他版本可能返回遮蔽后的图像。回归同时断言真实窗口 FLAG_SECURE，并要求普通页和遮罩输入状态能返回有效图像；受保护状态必须被拒绝或在凭据区域遮蔽，不通过忽略安全断言解决系统差异。

CI 失败时可保留合成测试场景的截图用于排查，7 天后过期。该证据由独立测试 APK 在已清空的专用 AVD 生成；正式 APK 没有新增截图、日志采集或上传逻辑。
