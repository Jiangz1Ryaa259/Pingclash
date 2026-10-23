package dev.pingclash.diagnostics;

import java.net.IDN;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class Models {
    private Models() {}

    public enum Stage {
        NETWORK("网络环境"), DNS("入口 DNS"), TCP("入口 TCP"),
        TLS("辅助 TLS"), POLICY("节点证书策略"), ROUTE("拨号路径"), PROXY("代理通路");
        public final String title;
        Stage(String title) { this.title = title; }
    }

    public enum State {
        PASSED("通过"), FAILED("失败"), SKIPPED("跳过"), UNKNOWN("未知"),
        CANCELLED("已取消"), STALE("已失效"), BLOCKED("受限");
        public final String title;
        State(String title) { this.title = title; }
    }

    public enum Family { AUTO, IPV4, IPV6 }

    // Messages are a whitelist. Raw exceptions, hosts, SNI and credentials never enter a report.
    public enum Code {
        GROUP_ROUTE("本次通过所选策略组访问测试目标；自动组由内核选择成员，不对某个固定入口执行直连辅助探测。"),
        NETWORK_READY("使用系统当前的非 VPN 网络进行辅助探测。"),
        NETWORK_UNAVAILABLE("没有可用的非 VPN 默认网络。"),
        VPN_ACTIVE("默认网络由其他 VPN 接管；本原型暂停直连诊断，请断开该 VPN 后重试。"),
        NETWORK_CHANGED("网络已变化，本次结果不能继续代表当前连接。"),
        CONFIG_CHANGED("节点选择或诊断配置已变化，本次结果已失效，请重新诊断。"),
        DNS_OK("已取得符合所选地址族的入口地址。"),
        LITERAL_ADDRESS("输入为 IP 地址，无需域名解析。"),
        DNS_FAILED("入口域名未能解析；无法据此判断服务器状态。"),
        DNS_TIMEOUT("入口解析未在时限内完成。"),
        NO_MATCHING_ADDRESS("没有符合所选 IPv4 / IPv6 条件的地址。"),
        TCP_OK("入口端口已建立 TCP 连接，尚不代表代理服务可用。"),
        TCP_REFUSED("入口连接被拒绝；请核对端口与服务端监听。"),
        TCP_TIMEOUT("未在时限内建立 TCP 连接；具体丢包位置未知。"),
        TCP_FAILED("入口连接失败；可能涉及路由、本地网络或服务端状态。"),
        TLS_OK("辅助 TLS 握手及主机名校验通过；不等于 mihomo 的实际握手已验证。"),
        TLS_CERTIFICATE("TLS 证书校验失败；请核对 SNI、证书与设备时间。"),
        TLS_TIMEOUT("辅助 TLS 握手超时；无法单独确认网络干预或服务端故障。"),
        TLS_FAILED("辅助 TLS 未完成；服务可能并非标准 TLS，或参数不兼容。"),
        TLS_DISABLED("本次仅检查 DNS 与 TCP，未请求 TLS 探测。"),
        DEPENDENCY_FAILED("前置步骤未成功，此步骤未执行。"),
        CORE_UNAVAILABLE("mihomo 尚未接入，未进行 AnyTLS 认证或代理访问验证。"),
        PROXY_NOT_REQUESTED("本次辅助探测未请求代理访问，可在节点诊断中执行。"),
        NODE_CERTIFICATE_UNVERIFIED("此节点或其父代理按配置跳过服务器证书验证，相应服务器身份未通过证书确认；HTTPS 测试目标的证书验证保持开启。"),
        PROXY_CHAIN_ACTIVE("实际请求按所选策略组通过父代理拨号；入口辅助探测仍是直连，未逐跳检查代理链，不能据此定位链内哪一跳失败。"),
        PROXY_OK("已通过指定节点取得目标的成功响应；该次代理访问已验证。"),
        PROXY_HTTP_STATUS("已收到目标响应，但 HTTP 状态未达到本次测试的成功条件。"),
        PROXY_TIMEOUT("实际代理请求超时；目前无法定位到外层 TLS、协议会话或目标访问中的具体阶段。"),
        PROXY_FAILED("实际代理请求未完成；需结合辅助探测复测，不能据此确认密码错误或网络拦截。"),
        PROXY_CERTIFICATE("建立代理通道时证书校验失败。请核对节点 SNI、证书信任和设备时间；应用按节点原配置执行。"),
        TARGET_CERTIFICATE("HTTPS 测试目标的证书校验失败；可更换测试目标。此结果不表示节点证书有问题。"),
        PROXY_QUIC_TIMEOUT("节点 QUIC 握手超时。尚不能区分 UDP 链路、服务端响应和参数问题；TCP 跳过不是故障原因。"),
        PROXY_QUIC_TLS("节点 QUIC/TLS 返回握手错误，未建立可用通道；尚不能仅凭此确认是证书还是协议参数问题。"),
        PROXY_DNS("内核建立代理通道时域名解析失败；辅助 DNS 的成功结果不等同于内核这次解析成功。"),
        PROXY_CHANNEL_TIMEOUT("建立代理通道超时，尚未得到 HTTPS 测试目标响应；无法仅凭超时确认网络拦截。"),
        PROXY_CHANNEL_FAILED("建立代理通道失败，尚未得到 HTTPS 测试目标响应；请核对节点参数和服务端状态，不能据此确认密码错误。"),
        PROXY_CONFIG_INVALID("内核未接受该节点配置，本次代理请求未执行。"),
        CORE_BUSY("内核当前没有执行资源，本次请求未执行，不能判为节点故障。"),
        DNS_ONLY("本次为仅 DNS 检查，此步骤未执行。"),
        UDP_PROTOCOL("该节点使用 UDP 传输，不执行直连 TCP / 标准 TLS 辅助探测。"),
        CANCELLED("用户已取消，后续探测已停止。"),
        DEADLINE("本次诊断的总时间预算已耗尽。"),
        LOCAL_RESTRICTION("系统限制了探测，不能将其判为节点故障。"),
        INTERNAL_ERROR("本地诊断模块出现错误，本次结果不完整。");

        public final String message;
        Code(String message) { this.message = message; }
    }

    public static final class Request {
        public final String host;
        public final int port;
        public final boolean useTls;
        public final String serverName;
        public final Family family;
        public final boolean dnsOnly;

        public Request(String host, int port, boolean useTls, String serverName, Family family) {
            this(host, port, useTls, serverName, family, false);
        }
        public Request(String host, int port, boolean useTls, String serverName, Family family, boolean dnsOnly) {
            this.host = normalizeHost(host);
            if (port < 1 || port > 65535) throw new IllegalArgumentException("端口应在 1–65535 之间");
            this.port = port;
            this.useTls = useTls;
            this.serverName = serverName == null || serverName.trim().isEmpty()
                ? this.host : normalizeHost(serverName);
            this.family = family == null ? Family.AUTO : family;
            this.dnsOnly = dnsOnly;
        }
    }

    public static String normalizeHost(String raw) {
        if (raw == null) throw new IllegalArgumentException("请输入服务器域名或 IP");
        String host = raw.trim();
        if (host.startsWith("[") && host.endsWith("]")) host = host.substring(1, host.length() - 1);
        if (host.isEmpty() || host.length() > 253 || host.matches(".*[\\s/@?#%\\\\].*"))
            throw new IllegalArgumentException("请仅输入域名或 IP，不要粘贴订阅链接或凭据");
        if (host.contains(":")) {
            try {
                if (InetAddress.getByName(host).getAddress().length != 16) throw new Exception();
                return host;
            } catch (Exception e) {
                throw new IllegalArgumentException("IPv6 地址格式不正确，请将端口填在单独输入框");
            }
        }
        if (host.matches("[0-9.]+")) {
            String[] pieces = host.split("\\.", -1);
            if (pieces.length != 4) throw new IllegalArgumentException("IPv4 地址格式不正确");
            for (String piece : pieces) {
                if (piece.isEmpty() || piece.length() > 3 || Integer.parseInt(piece) > 255)
                    throw new IllegalArgumentException("IPv4 地址格式不正确");
            }
            return host;
        }
        try {
            String ascii = IDN.toASCII(host, IDN.USE_STD3_ASCII_RULES);
            String withoutDot = ascii.endsWith(".") ? ascii.substring(0, ascii.length() - 1) : ascii;
            if (withoutDot.isEmpty() || withoutDot.length() > 253) throw new Exception();
            for (String label : withoutDot.split("\\.", -1)) {
                if (label.isEmpty() || label.length() > 63) throw new Exception();
            }
            return withoutDot;
        } catch (Exception e) {
            throw new IllegalArgumentException("域名格式不正确");
        }
    }

    public static boolean isLiteral(String host) {
        return host.contains(":") || host.matches("[0-9.]+");
    }

    public static final class Step {
        public final Stage stage;
        public final State state;
        public final Code code;
        public final long elapsedMs;
        public final String addressFamily;
        public final int attempt;
        public final int httpStatus;

        public Step(Stage stage, State state, Code code, long elapsedMs, String addressFamily, int attempt) {
            this(stage, state, code, elapsedMs, addressFamily, attempt, 0);
        }
        public Step(Stage stage, State state, Code code, long elapsedMs, String addressFamily, int attempt, int httpStatus) {
            this.stage = stage;
            this.state = state;
            this.code = code;
            this.elapsedMs = Math.max(0, elapsedMs);
            this.addressFamily = addressFamily;
            this.attempt = attempt;
            this.httpStatus = httpStatus >= 100 && httpStatus <= 599 ? httpStatus : 0;
        }
    }

    public static final class Report {
        public final String runId;
        public final String timestamp;
        public final String networkType;
        public final List<Step> steps;
        public final long elapsedMs;

        public Report(String runId, String timestamp, String networkType, List<Step> steps, long elapsedMs) {
            this.runId = runId;
            this.timestamp = timestamp;
            this.networkType = networkType;
            this.steps = Collections.unmodifiableList(new ArrayList<>(steps));
            this.elapsedMs = elapsedMs;
        }

        public String conclusion() {
            for (Step step : steps) {
                if (step.state == State.STALE) return step.code.message;
            }
            for (Step step : steps) if (step.state == State.CANCELLED) return step.code.message;
            for (Step step : steps) {
                if (step.state == State.BLOCKED) return step.code.message;
            }
            for (Step step : steps) {
                if (step.stage == Stage.PROXY && step.state == State.PASSED) {
                    boolean auxiliaryFailure = false;
                    for (Step auxiliary : steps) if (auxiliary.stage != Stage.PROXY && auxiliary.state == State.FAILED) auxiliaryFailure = true;
                    String result = auxiliaryFailure ? "实际代理访问已验证；辅助探测存在差异，请展开查看两条路径的观测。" : Code.PROXY_OK.message;
                    return result;
                }
            }
            for (Step step : steps) if (step.stage == Stage.PROXY && step.code == Code.PROXY_HTTP_STATUS) {
                return "代理路径已取得 HTTP " + (step.httpStatus > 0 ? step.httpStatus : "未知状态") + " 响应，但未达到测试成功条件。可更换 HTTPS 目标复测，不能据此判定节点整体故障。";
            }
            for (Step step : steps) if (step.stage == Stage.PROXY && step.state == State.FAILED &&
                (step.code == Code.PROXY_CERTIFICATE || step.code == Code.TARGET_CERTIFICATE ||
                 step.code == Code.PROXY_QUIC_TIMEOUT || step.code == Code.PROXY_QUIC_TLS ||
                 step.code == Code.PROXY_DNS || step.code == Code.PROXY_CHANNEL_TIMEOUT || step.code == Code.PROXY_CHANNEL_FAILED)) return step.code.message;
            // A failed candidate address must not hide a later successful TCP attempt.
            boolean tcpPassed = false;
            for (Step step : steps) if (step.stage == Stage.TCP && step.state == State.PASSED) tcpPassed = true;
            boolean tlsPassed = false;
            boolean auxiliaryFailure = false;
            Step proxyFailure = null;
            for (Step step : steps) {
                if (step.stage == Stage.TLS && step.state == State.PASSED) tlsPassed = true;
                if (step.state == State.FAILED && step.stage != Stage.PROXY && !(step.stage == Stage.TCP && tcpPassed)) auxiliaryFailure = true;
                if (step.stage == Stage.PROXY && (step.code == Code.PROXY_FAILED || step.code == Code.PROXY_TIMEOUT)) proxyFailure = step;
            }
            if (tcpPassed && !auxiliaryFailure && proxyFailure != null) {
                return (tlsPassed ? "入口 TCP 与辅助 TLS 已通过，" : "入口 TCP 已连接，") +
                    (proxyFailure.code == Code.PROXY_TIMEOUT ? "实际代理访问超时。" : "实际代理访问未完成。") +
                    "可更换 HTTPS 目标复测，并核对节点参数与服务端日志；具体失败阶段仍未知。";
            }
            for (Step step : steps) {
                if (step.state == State.FAILED && !(step.stage == Stage.TCP && tcpPassed)) return step.code.message;
            }
            for (Step step : steps) if (step.code == Code.DNS_ONLY) return "DNS 检查已完成；未执行 TCP、TLS 或代理访问。";
            return "辅助探测已完成；代理通路仍未验证。";
        }
    }
}

