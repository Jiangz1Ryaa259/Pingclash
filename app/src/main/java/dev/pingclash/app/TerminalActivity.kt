// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.app.Application
import android.content.ClipData
import android.content.ClipboardManager
import android.os.Bundle
import android.view.WindowManager
import android.view.inputmethod.InputMethodManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.background
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModelProvider
import com.termux.terminal.TerminalSession
import com.termux.view.TerminalView
import java.io.File

internal class TerminalModel(application:Application):AndroidViewModel(application) {
    val sessions=mutableStateListOf<TerminalSession>()
    var selected by mutableStateOf(0)
    var revision by mutableIntStateOf(0)
    private var viewRef=java.lang.ref.WeakReference<TerminalView>(null)
    var view:TerminalView?
        get()=viewRef.get()
        set(value) {viewRef=java.lang.ref.WeakReference(value)}
    var paste by mutableStateOf<String?>(null)
    private val app=application
    private val callbacks=object:TerminalCallbacks() {
        override fun onTextChanged(s:TerminalSession) {if(sessions.getOrNull(selected)===s)view?.onScreenUpdated()}
        override fun onSessionFinished(s:TerminalSession) {revision++;onTextChanged(s)}
        override fun onColorsChanged(s:TerminalSession) {onTextChanged(s)}
        override fun onCopyTextToClipboard(s:TerminalSession,text:String) {
            app.getSystemService(ClipboardManager::class.java).setPrimaryClip(ClipData.newPlainText("Terminal",text.take(65536)))
        }
        override fun onPasteTextFromClipboard(s:TerminalSession) {requestPaste()}
    }
    fun requestPaste() {
        val clip=app.getSystemService(ClipboardManager::class.java).primaryClip
        paste=clip?.takeIf {it.itemCount>0}?.getItemAt(0)?.text?.toString()?.take(16384)
    }
    fun create() {
        if(sessions.size>=3)return
        val cwd=File(app.cacheDir,"terminal").apply {mkdirs()}
        val env=arrayOf("HOME=${cwd.absolutePath}","TMPDIR=${cwd.absolutePath}","PATH=/system/bin:/system/xbin","TERM=xterm-256color","LANG=C.UTF-8","ENV=/dev/null","HISTFILE=/dev/null","PS1=\$ ")
        sessions.add(TerminalSession("/system/bin/sh",cwd.absolutePath,arrayOf("sh","-i"),env,2000,callbacks))
        selected=sessions.lastIndex
    }
    fun closeCurrent() {
        sessions.getOrNull(selected)?.finishIfRunning()
        if(sessions.isNotEmpty())sessions.removeAt(selected)
        selected=selected.coerceAtMost((sessions.size-1).coerceAtLeast(0))
    }
    fun stopAll() {sessions.forEach {it.finishIfRunning()};sessions.clear();selected=0;paste=null;view=null}
    fun send(text:String) {sessions.getOrNull(selected)?.write(text)}
    fun attach(v:TerminalView) {
        view=v
        v.setTerminalViewClient(object:TerminalCallbacks() {
            override fun onSingleTapUp(e:android.view.MotionEvent) {v.requestFocus();app.getSystemService(InputMethodManager::class.java).showSoftInput(v,InputMethodManager.SHOW_IMPLICIT)}
        })
        v.setTextSize((14*app.resources.displayMetrics.scaledDensity).toInt().coerceIn(12,40))
    }
    override fun onCleared() {stopAll()}
}

class TerminalActivity:ComponentActivity() {
    internal lateinit var terminal:TerminalModel
    override fun onCreate(savedInstanceState:Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
        terminal=ViewModelProvider(this)[TerminalModel::class.java]
        setContent {PingClashTheme("dark") {TerminalPage(terminal) {finish()}}}
    }
    override fun onStop() {super.onStop();if(!isChangingConfigurations)terminal.stopAll()}
}

@Composable private fun TerminalPage(model:TerminalModel,back:()->Unit) {
    val revision=model.revision
    Column(Modifier.fillMaxSize().background(Color(0xff0c0e12)).safeDrawingPadding().imePadding()) {
        Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.SpaceBetween) {
            TextButton(back) {Text("返回")}
            TextButton(model::create,enabled=model.sessions.size<3,modifier=Modifier.testTag("terminal-new")) {Text("新建终端")}
            TextButton(model::closeCurrent,enabled=model.sessions.isNotEmpty()) {Text("关闭会话")}
        }
        Text("标准 sh · 本应用权限 · 普通命令走系统网络",Modifier.padding(horizontal=16.dp),style=MaterialTheme.typography.labelSmall,color=Color.Gray)
        if(model.sessions.isEmpty()) {
            Column(Modifier.weight(1f).padding(24.dp),verticalArrangement=Arrangement.Center) {
                Text("手机终端",style=MaterialTheme.typography.headlineMedium,color=Color.White)
                Spacer(Modifier.height(16.dp))
                Text("手动运行 Android 系统命令，支持管道、重定向和交互输入。输入 help 查看 shell 帮助，toybox 查看设备已有工具。\n\n命令与本应用具有相同权限，可能读写应用文件和访问网络。仅运行你理解的命令。历史与屏幕输出只在会话内存；退到后台会关闭会话。",color=Color.LightGray)
            }
        } else {
            LazyRow {items(model.sessions.size) {i->FilterChip(model.selected==i,{model.selected=i},label={Text("sh ${i+1}"+(if(model.sessions[i].isRunning)"" else " · 已退出"))})}}
            val session=model.sessions.getOrNull(model.selected)
            key(session) {
                AndroidView(factory={context->TerminalView(context,null).apply {model.attach(this);session?.let {attachSession(it)};requestFocus()}},
                    update={v->model.view=v;if(revision>=0)v.onScreenUpdated()},modifier=Modifier.weight(1f).fillMaxWidth().testTag("terminal-view"))
            }
            LazyRow(Modifier.fillMaxWidth()) {
                items(8) {i->val key=listOf("Ctrl+C","Tab","Esc","↑","↓","←","→","粘贴")[i]
                    TextButton({if(i==7)model.requestPaste() else model.send(listOf("\u0003","\t","\u001b","\u001b[A","\u001b[B","\u001b[D","\u001b[C")[i])},Modifier.testTag("terminal-key-$i")){Text(key)}
                }
            }
        }
    }
    model.paste?.let {text->AlertDialog(onDismissRequest={model.paste=null},title={Text("粘贴到终端")},text={Text("包含换行的文本可能立即执行命令。确认后原样粘贴 ${text.length} 个字符。")},confirmButton={TextButton({model.sessions.getOrNull(model.selected)?.emulator?.paste(text);model.paste=null}){Text("粘贴")}},dismissButton={TextButton({model.paste=null}){Text("取消")}})}
}
