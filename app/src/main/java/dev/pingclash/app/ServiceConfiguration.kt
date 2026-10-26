// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import androidx.compose.runtime.Composable

@Composable internal fun ServiceConfiguration(vpn: VpnUiState, data: AppData?) {
    StatLine(tr(R.string.message_03d39aa1b9), tr(when (vpn.phase) {
        "established" -> R.string.message_1f0eb99b7e
        "connecting" -> R.string.message_694186911a
        "stopping" -> R.string.message_b8d23e6673
        "error" -> R.string.ui_connection_failed
        else -> R.string.message_f006455e3b
    }))
    StatLine(tr(R.string.message_daae3125b8), tr(when (data?.client?.mode) {
        "rule" -> R.string.message_1123245d1b
        "direct" -> R.string.message_b06325c566
        else -> R.string.message_f1880deaae
    }))
    StatLine(tr(R.string.message_47d56387f5), (data?.activeProfile?.groups?.size ?: 0).toString())
}
