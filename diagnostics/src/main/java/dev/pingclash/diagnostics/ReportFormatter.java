package dev.pingclash.diagnostics;

import dev.pingclash.diagnostics.Models.Report;
import dev.pingclash.diagnostics.Models.Step;

public final class ReportFormatter {
    private ReportFormatter() {}

    public static String markdown(Report report) {
        StringBuilder out = new StringBuilder("# PingClash 诊断报告\n\n");
        boolean proxyRequested = false;
        for (Step step : report.steps) if (step.stage == dev.pingclash.diagnostics.Models.Stage.PROXY &&
            step.code != dev.pingclash.diagnostics.Models.Code.CORE_UNAVAILABLE &&
            step.code != dev.pingclash.diagnostics.Models.Code.PROXY_NOT_REQUESTED &&
            step.code != dev.pingclash.diagnostics.Models.Code.DNS_ONLY &&
            step.code != dev.pingclash.diagnostics.Models.Code.DEPENDENCY_FAILED) proxyRequested = true;
        out.append("- 版本：0.8.0-preview\n- 运行编号：").append(report.runId)
            .append("\n- 时间：").append(report.timestamp)
            .append("\n- 测试对象：节点-01（域名、IP、SNI 和端口默认省略）")
            .append("\n- 网络类型：").append(safeNetwork(report.networkType))
            .append("\n- 路径：").append(proxyRequested ? "直连辅助探测 + 指定节点代理访问" : "直连辅助探测")
            .append("\n- 总耗时：").append(report.elapsedMs).append(" ms\n\n")
            .append(report.conclusion()).append("\n\n")
            .append("| 步骤 | 状态 | 地址族 / 尝试 | 耗时 | 证据 |\n")
            .append("| --- | --- | --- | --- | --- |\n");
        for (Step step : report.steps) {
            String family = "IPv4".equals(step.addressFamily) || "IPv6".equals(step.addressFamily)
                ? step.addressFamily : "—";
            out.append("| ").append(step.stage.title).append(" | ").append(step.state.title)
                .append(" | ").append(family).append(" / ").append(step.attempt)
                .append(" | ").append(step.elapsedMs).append(" ms | ").append(step.code.message);
            if (step.httpStatus > 0) out.append(" HTTP ").append(step.httpStatus).append("。");
            out.append(" |\n");
        }
        return out.append("\n本报告未包含凭据、订阅地址、原始异常或连接内容。")
            .append("辅助 TLS 使用系统 TLS 实现，不能代替 mihomo / AnyTLS 的实际连接验证。\n").toString();
    }

    private static String safeNetwork(String value) {
        if ("Wi-Fi".equals(value) || "蜂窝网络".equals(value) || "以太网".equals(value) || "其他网络".equals(value)) return value;
        return "未知";
    }
}
