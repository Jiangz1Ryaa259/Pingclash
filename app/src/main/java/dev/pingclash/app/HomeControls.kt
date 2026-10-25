// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp

@Composable internal fun HomeConfiguration(state: DashboardState,actions: DashboardActions) {
    var menu by remember {mutableStateOf(false)}
    val enabled=!state.busy&&!state.tests.running&&!state.services.running&&!state.diagnosis.running&&
        state.vpn.phase !in listOf("connecting","stopping")
    Surface(shape=UiCorners.Card,color=Panel.copy(alpha=.86f),
        border=BorderStroke(.7.dp,MaterialTheme.colorScheme.outlineVariant),
        modifier=Modifier.fillMaxWidth().testTag("home-configuration")) {
        Column(Modifier.padding(horizontal=12.dp,vertical=6.dp)) {
            Row(Modifier.fillMaxWidth().heightIn(min=40.dp),verticalAlignment=Alignment.CenterVertically) {
                Text(tr(R.string.ui_home_configuration),style=MaterialTheme.typography.labelMedium)
                Spacer(Modifier.width(8.dp))
                Box(Modifier.weight(1f)) {
                    TextButton({if(state.data.profiles.isEmpty())actions.nodes() else menu=true},
                        enabled=enabled&&!state.vpn.active,modifier=Modifier.testTag("home-profile-picker")) {
                        Text(state.data.activeProfile?.name?:tr(R.string.ui_choose_configuration),
                            Modifier.weight(1f,false),maxLines=1,overflow=TextOverflow.Ellipsis,
                            style=MaterialTheme.typography.labelMedium)
                        AppGlyph(25,Modifier.padding(start=4.dp).size(14.dp))
                    }
                    DropdownMenu(menu,{menu=false}) {
                        state.data.profiles.forEach {profile ->DropdownMenuItem(text={Text(profile.name)},
                            onClick={menu=false;actions.selectProfile(profile.id)})}
                    }
                }
            }
            HomeModeChoices(state.data.client.mode,enabled,actions.mode)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable private fun HomeModeChoices(value: String,enabled: Boolean,onChange: (String)->Unit) {
    val options=listOf("rule" to R.string.message_1123245d1b,"global" to R.string.ui_mode_global_short,
        "direct" to R.string.message_b06325c566)
    SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
        options.forEachIndexed {index,(id,label) ->
            SegmentedButton(value==id,{onChange(id)},SegmentedButtonDefaults.itemShape(index,options.size),
                enabled=enabled,modifier=Modifier.heightIn(min=48.dp).testTag("mode-$id"),
                icon={}) {Text(tr(label),maxLines=1,overflow=TextOverflow.Ellipsis,
                    style=MaterialTheme.typography.labelMedium)}
        }
    }
}
