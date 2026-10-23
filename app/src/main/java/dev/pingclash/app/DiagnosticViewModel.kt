package dev.pingclash.app

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import dev.pingclash.diagnostics.DiagnosticEngine
import dev.pingclash.diagnostics.Models
import dev.pingclash.diagnostics.RunControl
import dev.pingclash.diagnostics.CoreAdapter
import dev.pingclash.diagnostics.SocketProbe
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class DiagnosticUiState(
    val running: Boolean = false,
    val steps: List<Models.Step> = emptyList(),
    val report: Models.Report? = null,
    val nodeId: String? = null,
)

internal fun nodeConnectivitySummary(state: DiagnosticUiState, selectedId: String?): String {
    if (selectedId == null || state.nodeId != selectedId) return "连通性：尚未测试"
    if (state.running) return "连通性：测试中…"
    val report = state.report ?: return "连通性：尚未测试"
    if (report.steps.any { it.state == Models.State.STALE }) return "连通性：本次测试已失效"
    if (report.steps.any { it.state in listOf(Models.State.CANCELLED, Models.State.BLOCKED) }) return "连通性：本次测试未完成"
    val proxy = report.steps.lastOrNull { it.stage == Models.Stage.PROXY }
    return when {
        proxy?.state == Models.State.PASSED && proxy.code == Models.Code.PROXY_OK -> "连通性：本次访问成功 · ${proxy.elapsedMs} ms"
        proxy?.state == Models.State.FAILED -> "连通性：本次访问未成功"
        else -> "连通性：本次测试未完成"
    }
}

class DiagnosticViewModel(application: Application) : AndroidViewModel(application) {
    private val mutableState = MutableStateFlow(DiagnosticUiState())
    val state = mutableState.asStateFlow()
    @Volatile private var control: RunControl? = null

    fun start(request: Models.Request) {
        if (mutableState.value.running) return
        val run = RunControl(25_000)
        control = run
        mutableState.value = DiagnosticUiState(running = true)
        viewModelScope.launch(Dispatchers.IO) {
            val report = DiagnosticEngine(SocketProbe(), CoreAdapter.NotRequested()).run(
                request,
                { AndroidNetworkBinding.open(getApplication<Application>()) },
                run,
            ) { steps -> mutableState.update { it.copy(steps = steps) } }
            control = null
            mutableState.value = DiagnosticUiState(steps = report.steps, report = report)
        }
    }

    fun cancel() {
        val current = control
        viewModelScope.launch(Dispatchers.IO) { current?.cancel() }
    }

    override fun onCleared() {
        control?.cancel()
        super.onCleared()
    }
}

