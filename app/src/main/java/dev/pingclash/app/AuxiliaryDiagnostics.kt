// SPDX-License-Identifier: GPL-3.0-only
// Minimum targets and panel spacing are shared interface design values.
@file:Suppress("MagicNumber")
package dev.pingclash.app

import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import dev.pingclash.diagnostics.Models
import dev.pingclash.diagnostics.ReportFormatter

@Composable internal fun AuxiliaryDiagnosticScreen(model: DiagnosticViewModel,onBack: ()->Unit) {
    BackHandler(onBack=onBack)
    val state by model.state.collectAsStateWithLifecycle()
    var preview by rememberSaveable {mutableStateOf(false)}
    var pending by rememberSaveable {mutableStateOf("")}
    val context=LocalContext.current
    val save=rememberLauncherForActivityResult(ActivityResultContracts.CreateDocument("text/markdown")) {uri ->
        if(uri!=null)ReportExporter.save(context,uri,pending)
    }
    Column(Modifier.fillMaxSize().imePadding().verticalScroll(rememberScrollState())
        .padding(horizontal=20.dp,vertical=12.dp).padding(bottom=LocalNavigationClearance.current),
        verticalArrangement=Arrangement.spacedBy(16.dp)) {
        Row(verticalAlignment=Alignment.CenterVertically) {
            IconButton(onBack,Modifier.testTag("auxiliary-back").semantics {
                contentDescription=tr(R.string.message_572cf45ba4)
            }) {AppGlyph(BACK_GLYPH)}
            PageHeading(tr(R.string.message_b089c998f6),tag="auxiliary-title")
        }
        AuxiliaryProbeForm(state.running,model::start,model::cancel)
        if(state.steps.isNotEmpty()) {
            Text(tr(R.string.message_73cf02b62d),style=MaterialTheme.typography.titleMedium)
            state.steps.forEach {StepCard(it)}
        }
        state.report?.let {report ->SettingsCard {
            Text(tr(R.string.message_98369d4ab0),style=MaterialTheme.typography.titleMedium)
            Text(report.conclusion())
            Text("${report.networkType} · ${report.elapsedMs} ms",color=Muted)
            OutlinedButton({preview=true}) {Text(tr(R.string.message_e89513334b))}
        }}
    }
    if(preview)state.report?.let {report ->ReportPreview(report,onSave={
        pending=ReportFormatter.markdown(it);save.launch("PingClash-${it.runId.take(8)}.md")
    }) {preview=false}}
}

private data class AuxiliaryInput(val host: String="",val port: String="443",val sni: String="",
    val tls: Boolean=true,val family: Models.Family=Models.Family.AUTO)

@Composable private fun AuxiliaryProbeForm(running: Boolean,onStart: (Models.Request)->Unit,onCancel: ()->Unit) {
    var host by remember {mutableStateOf("")}
    var portText by remember {mutableStateOf("443")}
    var sni by remember {mutableStateOf("")}
    var tls by rememberSaveable {mutableStateOf(true)}
    var family by rememberSaveable {mutableStateOf(Models.Family.AUTO)}
    val input=AuxiliaryInput(host,portText,sni,tls,family)
    var error by remember {mutableStateOf<String?>(null)}
    SettingsCard {
        AuxiliaryAddressFields(input,!running) {
            host=it.host;portText=it.port;sni=it.sni;tls=it.tls;error=null
        }
        Row(horizontalArrangement=Arrangement.spacedBy(8.dp)) {
            listOf(Models.Family.AUTO to tr(R.string.message_7eb336e42c),
                Models.Family.IPV4 to "IPv4",Models.Family.IPV6 to "IPv6").forEach {(option,label) ->
                FilterChip(input.family==option,{family=option},
                    label={Text(label)},enabled=!running)
            }
        }
        error?.let {InputIssue(it)}
        Button({try {
            val port=input.port.toIntOrNull()?:throw IllegalArgumentException(tr(R.string.message_0ff53da1e7))
            val request=Models.Request(input.host,port,input.tls,input.sni,input.family)
            error=null;onStart(request)
        } catch(invalid: IllegalArgumentException) {error=invalid.message}},
            enabled=!running,modifier=Modifier.fillMaxWidth().height(52.dp)) {
            Text(tr(if(running)R.string.message_113a2e4325 else R.string.message_5ce51775a0))
        }
        if(running) {
            LinearProgressIndicator(Modifier.fillMaxWidth())
            TextButton(onCancel) {Text(tr(R.string.message_e831d49866))}
        }
    }
}

@Composable private fun AuxiliaryAddressFields(input: AuxiliaryInput,enabled: Boolean,
    onChange: (AuxiliaryInput)->Unit) {
    OutlinedTextField(input.host,{onChange(input.copy(host=it))},
        Modifier.fillMaxWidth().testTag("auxiliary-host"),enabled=enabled,singleLine=true,
        label={Text(tr(R.string.message_9e5175a63b))})
    Row(horizontalArrangement=Arrangement.spacedBy(12.dp),verticalAlignment=Alignment.CenterVertically) {
        OutlinedTextField(input.port,{if(it.length<=5&&it.all(Char::isDigit))onChange(input.copy(port=it))},
            Modifier.width(110.dp),enabled=enabled,singleLine=true,
            label={Text(tr(R.string.message_e71ac32b54))},
            keyboardOptions=KeyboardOptions(keyboardType=KeyboardType.Number))
        Column(Modifier.weight(1f)) {
            SettingSwitch(tr(R.string.message_2159b45cbe),input.tls,enabled) {onChange(input.copy(tls=it))}
        }
    }
    if(input.tls)OutlinedTextField(input.sni,{onChange(input.copy(sni=it))},Modifier.fillMaxWidth(),
        enabled=enabled,singleLine=true,label={Text(tr(R.string.message_2bd95a750b))},
        placeholder={Text(tr(R.string.message_b85a766c4c))})
}
