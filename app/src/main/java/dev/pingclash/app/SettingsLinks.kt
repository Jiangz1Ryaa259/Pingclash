// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp

private val settingGroups=listOf(
    listOf("appearance","profiles","groups"),
    listOf("dns","network","apps","rules","lan"),
    listOf("live","connections","usage"),
    listOf("diagnosis","terminal","control"),
    listOf("privacy","about"),
)
private val settingTitles=mapOf(
    "appearance" to R.string.message_f3d6b6c03b,"profiles" to R.string.message_148d195e21,
    "groups" to R.string.message_47d56387f5,"network" to R.string.message_03fae6b449,
    "apps" to R.string.message_d8618b5e19,"rules" to R.string.message_beae79496b,
    "lan" to R.string.message_4f8389a45d,"live" to R.string.message_caaf859d56,
    "connections" to R.string.message_fc16aec85d,"usage" to R.string.message_e7370f8097,
    "diagnosis" to R.string.message_75793291b7,"terminal" to R.string.message_e2a76ef1f1,
    "control" to R.string.message_4f51d0285e,"privacy" to R.string.message_58e6ce61a6,
    "about" to R.string.message_495dc9e725,
)
internal fun settingsTitle(id: String)=if(id=="dns")"DNS" else
    tr(settingTitles[id]?:R.string.message_df3d58c7d8)

@Composable internal fun SettingsMenu(onOpen: (String)->Unit) {
    settingGroups.forEach {group ->SettingsCard {
        group.forEachIndexed {index,id ->
            SettingLink(id,settingsTitle(id)) {onOpen(id)}
            if(index<group.lastIndex)HorizontalDivider(Modifier.padding(start=33.dp),
                color=MaterialTheme.colorScheme.outlineVariant)
        }
    }}
}

@Composable private fun SettingLink(id: String,title: String,onClick: ()->Unit) {
    Row(Modifier.fillMaxWidth().heightIn(min=52.dp)
        .testTag(if(id in listOf("diagnosis","terminal"))"tool-$id" else "settings-$id")
        .clickable(role=Role.Button,onClick=onClick).padding(vertical=7.dp),
        verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.spacedBy(12.dp)) {
        AppGlyph(settingsGlyph(id),Modifier.size(21.dp),Muted)
        Text(title,Modifier.weight(1f),style=MaterialTheme.typography.bodyLarge)
        AppGlyph(5,Modifier.size(18.dp),Muted)
    }
}
