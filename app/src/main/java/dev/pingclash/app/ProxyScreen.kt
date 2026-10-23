// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import androidx.compose.foundation.background
import androidx.compose.foundation.BorderStroke
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.core.snap
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch
import org.json.JSONObject

internal fun proxyTypeLabel(type: String) = when(type) {
    "select" -> "Selector"; "url-test" -> "URLTest"; "fallback" -> "Fallback"; "load-balance" -> "LoadBalance"
    "hysteria2" -> "Hysteria2";"vmess" -> "VMess";"vless" -> "VLESS";"trojan" -> "Trojan";"anytls" -> "AnyTLS"
    "ss" -> "Shadowsocks";"tuic" -> "TUIC";"socks5" -> "SOCKS5";else -> type
}

// A tab's members come only from that tab. Never append the profile's node pool
// or flatten nested groups into their parent. A groupless profile gets one pool.
internal fun LocalProfile.displayGroups(): List<LocalGroup> {
    if(groups.isEmpty()) {
        if(hasSubscriptionGroups) return emptyList()
        return listOf(LocalGroup("全部节点","nodes",nodes.map {it.name},"",true))
    }
    val hidden=runCatching {
        val raw=JSONObject(definition).optJSONArray("proxy-groups")
        if(raw==null) emptySet() else (0 until raw.length()).mapNotNull {raw.optJSONObject(it)?.takeIf {it.optBoolean("hidden")}?.optString("name")}.toSet()
    }.getOrDefault(emptySet())
    return groups.filter {it.name !in hidden}
}
internal fun LocalProfile.proxyDescription(name: String): String {
    nodes.firstOrNull {it.name==name}?.let {return proxyTypeLabel(it.type)}
    val g=groups.firstOrNull {it.name==name} ?: return if(name in listOf("DIRECT","REJECT","COMPATIBLE")) name else "成员不可用"
    return proxyTypeLabel(g.type)+when {g.type=="load-balance" -> " · 自动分配";g.selected.isEmpty() -> " · 自动选择";else -> "(${g.selected})"}
}
private fun groupProblem(reason: String)=when(reason) {
    "resource_limit" -> "组依赖展开超过本地资源限制"
    "remote_provider" -> "此组依赖尚未加载的远程节点提供者"
    "group_filter" -> "此组的筛选表达式暂未兼容"
    "group_url" -> "此组的测速地址格式无效"
    "group_dependency" -> "此组存在缺失、重复或循环的成员依赖"
    "group_node_unavailable" -> "当前选择的节点未通过配置校验，可改选可用成员"
    "group_missing" -> "当前路径引用了不存在的成员，可在手动组改选其他可用成员"
    "group_cycle" -> "当前路径存在循环依赖，可在手动组改选其他可用成员"
    "group_duplicate" -> "当前路径的名称重复或与内置出站冲突"
    "group_depth" -> "组依赖层级超过本地限制"
    else -> "此组的类型或字段暂未兼容"
}

@Composable internal fun ProxyScreen(data: AppData,locked: Boolean,model: AppViewModel,tests: ProxyTestState,onProfiles: () -> Unit,onDiagnosis: () -> Unit) {
    val profile=data.activeProfile
    var searching by rememberSaveable {mutableStateOf(false)}
    var query by remember {mutableStateOf("")}
    var menu by remember {mutableStateOf(false)}
    var chooser by remember {mutableStateOf(false)}
    val groups=remember(profile?.id,profile?.definition,profile?.groups,profile?.nodes) {profile?.displayGroups().orEmpty()}
    key(profile?.id) {
        val pager=rememberPagerState(pageCount={groups.size})
        val scope=rememberCoroutineScope()
        val tabs=rememberLazyListState()
        val current=groups.getOrNull(pager.currentPage)
        LaunchedEffect(pager.currentPage,groups.map {it.name}) {if(groups.isNotEmpty()) tabs.animateScrollToItem(pager.currentPage)}
        Column(Modifier.fillMaxSize().testTag("proxy-page")) {
            Row(Modifier.fillMaxWidth().padding(start=18.dp,end=12.dp,top=10.dp,bottom=12.dp),verticalAlignment=Alignment.CenterVertically) {
                Text(localize("代理"),style=MaterialTheme.typography.headlineMedium,fontWeight=FontWeight.Bold,modifier=Modifier.weight(1f))
                Surface(shape=CircleShape,color=Panel.copy(alpha=.72f)) {
                    Row {
                        IconButton({searching=!searching;if(!searching)query=""},Modifier.semantics {contentDescription="搜索代理"}) {AppGlyph(8,Modifier.size(23.dp))}
                        IconButton({if(tests.running)model.cancelProxyTests() else if(profile!=null&&current!=null)model.testProxies(profile,current.proxies,current.name)},enabled=tests.running || profile!=null&&current?.proxies?.any {name ->profile.nodes.any {it.name==name}||profile.groups.any {it.name==name&&it.supported}}==true,modifier=Modifier.testTag("proxy-test-group").semantics {contentDescription=if(tests.running) "取消测速" else "测速当前组"}) {
                            if(tests.running) CircularProgressIndicator(Modifier.size(20.dp),strokeWidth=2.dp) else ProxySymbol("bolt")
                        }
                    }
                }
                Box {
                    IconButton({menu=true},Modifier.semantics {contentDescription="代理选项"}) {ProxySymbol("menu")}
                    DropdownMenu(menu,{menu=false}) {
                        DropdownMenuItem({Text(localize("管理配置"))},{menu=false;onProfiles()})
                        DropdownMenuItem({Text(if(current!=null&&data.selectedId==profile?.groupId(current.name)) "当前组已是主代理" else "设当前组为主代理")},{menu=false;if(profile!=null&&current!=null)model.selectMainGroup(profile,current)},enabled=!locked&&current?.supported==true&&current.type!="nodes",modifier=Modifier.testTag("group-main-${current?.name}"))
                        if(current?.type in listOf("url-test","fallback")) DropdownMenuItem({Text(localize("恢复自动选择"))},{menu=false;model.selectGroup(requireNotNull(profile),requireNotNull(current),"")},enabled=!locked)
                        DropdownMenuItem({Text(localize("诊断主代理"))},{menu=false;onDiagnosis()},enabled=data.selected!=null&&!tests.running)
                    }
                }
            }
            if(searching) OutlinedTextField(query,{if(it.length<=100)query=it},Modifier.fillMaxWidth().padding(horizontal=16.dp).padding(bottom=10.dp).testTag("proxy-search"),singleLine=true,shape=CircleShape,placeholder={Text(localize("搜索当前组"))},trailingIcon={TextButton({searching=false;query=""}){Text(localize("关闭"))}})
            if(profile==null || groups.isEmpty()) {
                Column(Modifier.weight(1f).fillMaxWidth(),verticalArrangement=Arrangement.Center,horizontalAlignment=Alignment.CenterHorizontally) {
                    AppGlyph(1,Modifier.size(44.dp),Mint);Spacer(Modifier.height(20.dp));Text(if(profile==null) "还没有代理配置" else "原配置的策略组不可用或已隐藏",style=MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(12.dp));FilledTonalButton(onProfiles) {Text(localize("添加或管理配置"))}
                }
            } else {
                Row(Modifier.fillMaxWidth().padding(bottom=8.dp),verticalAlignment=Alignment.CenterVertically) {
                    LazyRow(state=tabs,modifier=Modifier.weight(1f),contentPadding=PaddingValues(start=16.dp,end=6.dp),horizontalArrangement=Arrangement.spacedBy(8.dp)) {
                        items(groups.size,key={groups[it].name}) {i -> val g=groups[i]
                            val tabColor by animateColorAsState(if(pager.currentPage==i) MaterialTheme.colorScheme.primaryContainer else Panel,
                                if(LocalMotionAllowed.current)tween(180) else snap(),label="group-selection")
                            Surface(shape=CircleShape,color=tabColor,contentColor=if(pager.currentPage==i) Mint else Muted,
                                border=BorderStroke(.7.dp,if(pager.currentPage==i) Mint.copy(alpha=.2f) else MaterialTheme.colorScheme.outlineVariant),
                                modifier=Modifier.testTag("group-tab-${g.name}").semantics {selected=pager.currentPage==i}.clickable {scope.launch {pager.animateScrollToPage(i)}}) {
                                Text(g.name,Modifier.padding(horizontal=16.dp,vertical=11.dp),maxLines=1,fontWeight=FontWeight.SemiBold,style=MaterialTheme.typography.bodyMedium)
                            }
                        }
                    }
                    IconButton({chooser=true},Modifier.padding(end=8.dp).background(Panel,CircleShape).semantics {contentDescription="全部策略组"}) {ProxySymbol("down")}
                }
                if(tests.running) {
                    LinearProgressIndicator(progress={if(tests.total>0)tests.completed.toFloat()/tests.total else 0f},modifier=Modifier.fillMaxWidth().padding(horizontal=18.dp))
                    Text("测速 ${tests.completed} / ${tests.total} · ${data.client.probeConcurrency} 路并发",Modifier.padding(horizontal=18.dp,vertical=4.dp),style=MaterialTheme.typography.labelSmall,color=Muted)
                }
                HorizontalPager(pager,Modifier.weight(1f).fillMaxWidth().testTag("strategy-pager"),key={groups[it].name},beyondViewportPageCount=0) {i ->
                    val group=groups[i]
                    val members=group.proxies.filter {query.isBlank()||it.contains(query,true)||profile.proxyDescription(it).contains(query,true)}
                    Column(Modifier.fillMaxSize()) {
                        if(!group.supported) Text(groupProblem(group.reason),Modifier.padding(horizontal=18.dp,vertical=8.dp),color=Warning,style=MaterialTheme.typography.bodySmall)
                        if(group.unavailable>0) Text("${group.unavailable} 个成员配置不可用，已隔离；不会替换为直连。其余成员可正常选择。",Modifier.padding(horizontal=18.dp,vertical=8.dp),color=Warning,style=MaterialTheme.typography.bodySmall)
                        if(members.isEmpty()) Box(Modifier.fillMaxSize(),contentAlignment=Alignment.Center){Text(localize("当前组没有匹配的成员"),color=Muted)}
                        else {
                            val columns=if(LocalDensity.current.fontScale>=1.6f) 1 else 2
                            LazyVerticalGrid(GridCells.Fixed(columns),modifier=Modifier.fillMaxSize().testTag("group-members-${group.name}"),contentPadding=PaddingValues(start=16.dp,end=16.dp,top=4.dp,bottom=18.dp),horizontalArrangement=Arrangement.spacedBy(8.dp),verticalArrangement=Arrangement.spacedBy(8.dp)) {
                                items(members,key={it}) {name ->
                                    val node=profile.nodes.firstOrNull {it.name==name}
                                    val nested=profile.groups.firstOrNull {it.name==name}
                                    val available=name in listOf("DIRECT","REJECT","COMPATIBLE") || node!=null || nested?.supported==true
                                    val chosen=if(group.type=="nodes") node?.id==data.selectedId else group.selected==name
                                    ProxyCard(name,profile.proxyDescription(name),chosen,!locked&&group.selectionEditable&&available,
                                        tests.values[delayKey(profile.id,name,group.name)],Modifier.testTag("group-choice-${group.name}-$name"),
                                        onClick={when(group.type) {
                                            "nodes" -> node?.let {model.select(it.id)}
                                            "load-balance" -> model.message("负载均衡组由内核分配连接，无需手动选择成员")
                                            else -> model.selectGroup(profile,group,if(group.type!="select"&&group.selected==name) "" else name)
                                        }},
                                        onTest=if((node!=null||nested?.supported==true)&&!tests.running) {{model.testProxies(profile,listOf(name),group.name)}} else null,
                                        onOpen=if(nested!=null) {{val index=groups.indexOfFirst {it.name==name};if(index>=0)scope.launch {pager.animateScrollToPage(index)}}} else null)
                                }
                            }
                        }
                    }
                }
            }
        }
        if(chooser) AlertDialog(onDismissRequest={chooser=false},title={Text(localize("策略组"))},text={LazyColumn(Modifier.heightIn(max=420.dp)) {
            items(groups.size) {i -> TextButton({chooser=false;scope.launch {pager.animateScrollToPage(i)}},Modifier.fillMaxWidth()) {Text(groups[i].name,Modifier.weight(1f),maxLines=2,overflow=TextOverflow.Ellipsis);if(i==pager.currentPage)Text("✓")}}
        }},confirmButton={TextButton({chooser=false}){Text(localize("关闭"))}})
    }
}

@Composable private fun ProxyCard(name: String,description: String,chosen: Boolean,enabled: Boolean,delay: ProxyDelay?,modifier: Modifier,onClick: () -> Unit,onTest: (() -> Unit)?,onOpen: (() -> Unit)?) {
    val background by animateColorAsState(if(chosen) MaterialTheme.colorScheme.primaryContainer.copy(alpha=.65f) else Panel,
        if(LocalMotionAllowed.current)tween(180) else snap(),label="proxy-selection")
    Surface(shape=RoundedCornerShape(22.dp),color=background,border=BorderStroke(if(chosen)1.dp else .7.dp,if(chosen)Mint.copy(alpha=.5f) else MaterialTheme.colorScheme.outlineVariant),modifier=modifier.fillMaxWidth().semantics {selected=chosen}.clickable(enabled=enabled,onClick=onClick)) {
        Column(Modifier.padding(horizontal=14.dp,vertical=13.dp),verticalArrangement=Arrangement.spacedBy(6.dp)) {
            Row(verticalAlignment=Alignment.Top,horizontalArrangement=Arrangement.spacedBy(4.dp)) {
                Text(name,Modifier.weight(1f).heightIn(min=48.dp),fontSize=16.sp,lineHeight=23.sp,maxLines=2,overflow=TextOverflow.Ellipsis,color=if(enabled)MaterialTheme.colorScheme.onSurface else Muted)
                if(chosen) Box(Modifier.size(22.dp).background(Mint,CircleShape),contentAlignment=Alignment.Center) {ProxySymbol("check",Modifier.size(15.dp),MaterialTheme.colorScheme.onPrimary)}
            }
            Row(Modifier.heightIn(min=26.dp),verticalAlignment=Alignment.CenterVertically) {
                Text(description,Modifier.weight(1f),style=MaterialTheme.typography.bodySmall,color=Muted,maxLines=1,overflow=TextOverflow.Ellipsis)
                if(onOpen!=null) Box(Modifier.size(26.dp).clickable(onClick=onOpen).semantics {contentDescription="打开 $name 策略组"},contentAlignment=Alignment.Center) {ProxySymbol("right",Modifier.size(16.dp))}
            }
            Box(Modifier.heightIn(min=24.dp).clickable(enabled=onTest!=null){onTest?.invoke()}.semantics {contentDescription="测试 $name"},contentAlignment=Alignment.CenterStart) {
                when(delay?.state) {
                    "running" -> CircularProgressIndicator(Modifier.size(14.dp),strokeWidth=1.5.dp)
                    "passed" -> Text("${delay.elapsedMs.coerceAtLeast(1)} ms",fontSize=12.sp,color=Success)
                    "timeout" -> Text(localize("超时"),fontSize=12.sp,color=MaterialTheme.colorScheme.error)
                    "failed" -> Text(localize("失败"),fontSize=12.sp,color=MaterialTheme.colorScheme.error)
                    "busy" -> Text("稍后重试",fontSize=12.sp,color=Muted)
                    else -> if(onTest!=null) ProxySymbol("bolt",Modifier.size(16.dp),Mint) else Text("—",fontSize=12.sp,color=Muted)
                }
            }
        }
    }
}

@Composable internal fun ProxySymbol(kind: String,modifier: Modifier=Modifier.size(24.dp),color: Color=LocalContentColor.current) {
    AppGlyph(when(kind) {"check"->15;"menu"->26;"down"->25;"right"->5;else->16},modifier,color)
}
