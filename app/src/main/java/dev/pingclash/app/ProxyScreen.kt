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
        return listOf(LocalGroup(tr(R.string.message_e8f9f94b38),"nodes",nodes.map {it.name},"",true))
    }
    val hidden=runCatching {
        val raw=JSONObject(definition).optJSONArray("proxy-groups")
        if(raw==null) emptySet() else (0 until raw.length()).mapNotNull {raw.optJSONObject(it)?.takeIf {it.optBoolean("hidden")}?.optString("name")}.toSet()
    }.getOrDefault(emptySet())
    return groups.filter {it.name !in hidden}
}
internal fun LocalProfile.proxyDescription(name: String): String {
    nodes.firstOrNull {it.name==name}?.let {return proxyTypeLabel(it.type)}
    val g=groups.firstOrNull {it.name==name} ?: return if(name in listOf("DIRECT","REJECT","COMPATIBLE")) name else tr(R.string.message_454a00d476)
    return proxyTypeLabel(g.type)+when {g.type=="load-balance" -> tr(R.string.message_4682046b69);g.selected.isEmpty() -> tr(R.string.message_d3d5aa4a3b);else -> "(${g.selected})"}
}
private fun groupProblem(reason: String)=when(reason) {
    "resource_limit" -> tr(R.string.message_7f2e62ade8)
    "remote_provider" -> tr(R.string.message_a4779d13c8)
    "group_filter" -> tr(R.string.message_5ad0c892f4)
    "group_url" -> tr(R.string.message_a7382629fe)
    "group_dependency" -> tr(R.string.message_f5a0352ad8)
    "group_node_unavailable" -> tr(R.string.message_8cb2ffe5a1)
    "group_missing" -> tr(R.string.message_75c311d5d8)
    "group_cycle" -> tr(R.string.message_426d30a04f)
    "group_duplicate" -> tr(R.string.message_ea433ce167)
    "group_depth" -> tr(R.string.message_2eb0e44e97)
    else -> tr(R.string.message_6cb7de92ea)
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
                Text((tr(R.string.message_5e84ea61e8)),style=MaterialTheme.typography.headlineMedium,fontWeight=FontWeight.Bold,modifier=Modifier.weight(1f))
                Surface(shape=CircleShape,color=Panel.copy(alpha=.72f)) {
                    Row {
                        IconButton({searching=!searching;if(!searching)query=""},Modifier.semantics {contentDescription=tr(R.string.message_760585442e)}) {AppGlyph(8,Modifier.size(23.dp))}
                        IconButton({if(tests.running)model.cancelProxyTests() else if(profile!=null&&current!=null)model.testProxies(profile,current.proxies,current.name)},enabled=tests.running || profile!=null&&current?.proxies?.any {name ->profile.nodes.any {it.name==name}||profile.groups.any {it.name==name&&it.supported}}==true,modifier=Modifier.testTag("proxy-test-group").semantics {contentDescription=if(tests.running) tr(R.string.message_916406aa08) else tr(R.string.message_58bf04c85f)}) {
                            if(tests.running) CircularProgressIndicator(Modifier.size(20.dp),strokeWidth=2.dp) else ProxySymbol("bolt")
                        }
                    }
                }
                Box {
                    IconButton({menu=true},Modifier.semantics {contentDescription=tr(R.string.message_ab43f25026)}) {ProxySymbol("menu")}
                    DropdownMenu(menu,{menu=false}) {
                        DropdownMenuItem({Text((tr(R.string.message_498958cf3d)))},{menu=false;onProfiles()})
                        DropdownMenuItem({Text(if(current!=null&&data.selectedId==profile?.groupId(current.name)) tr(R.string.message_c63fdbd771) else tr(R.string.message_b718063f31))},{menu=false;if(profile!=null&&current!=null)model.selectMainGroup(profile,current)},enabled=!locked&&current?.supported==true&&current.type!="nodes",modifier=Modifier.testTag("group-main-${current?.name}"))
                        if(current?.type in listOf("url-test","fallback")) DropdownMenuItem({Text((tr(R.string.message_5edc4aac67)))},{menu=false;model.selectGroup(requireNotNull(profile),requireNotNull(current),"")},enabled=!locked)
                        DropdownMenuItem({Text((tr(R.string.message_33ff6d18e1)))},{menu=false;onDiagnosis()},enabled=data.selected!=null&&!tests.running)
                    }
                }
            }
            if(searching) OutlinedTextField(query,{if(it.length<=100)query=it},Modifier.fillMaxWidth().padding(horizontal=16.dp).padding(bottom=10.dp).testTag("proxy-search"),singleLine=true,shape=CircleShape,placeholder={Text((tr(R.string.message_9c9e5273fe)))},trailingIcon={TextButton({searching=false;query=""}){Text((tr(R.string.message_3fd47edce4)))}})
            if(profile==null || groups.isEmpty()) {
                Column(Modifier.weight(1f).fillMaxWidth(),verticalArrangement=Arrangement.Center,horizontalAlignment=Alignment.CenterHorizontally) {
                    AppGlyph(1,Modifier.size(44.dp),Mint);Spacer(Modifier.height(20.dp));Text(if(profile==null) tr(R.string.message_7799f870a9) else tr(R.string.message_7896373370),style=MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(12.dp));FilledTonalButton(onProfiles) {Text((tr(R.string.message_e6cb787107)))}
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
                    IconButton({chooser=true},Modifier.padding(end=8.dp).background(Panel,CircleShape).semantics {contentDescription=tr(R.string.message_64a4fcdeb6)}) {ProxySymbol("down")}
                }
                if(tests.running) {
                    LinearProgressIndicator(progress={if(tests.total>0)tests.completed.toFloat()/tests.total else 0f},modifier=Modifier.fillMaxWidth().padding(horizontal=18.dp))
                    Text(tr(R.string.message_3538e7b1a7, tests.completed, tests.total, data.client.probeConcurrency),Modifier.padding(horizontal=18.dp,vertical=4.dp),style=MaterialTheme.typography.labelSmall,color=Muted)
                }
                HorizontalPager(pager,Modifier.weight(1f).fillMaxWidth().testTag("strategy-pager"),key={groups[it].name},beyondViewportPageCount=0) {i ->
                    val group=groups[i]
                    val members=group.proxies.filter {query.isBlank()||it.contains(query,true)||profile.proxyDescription(it).contains(query,true)}
                    Column(Modifier.fillMaxSize()) {
                        if(!group.supported) Text(groupProblem(group.reason),Modifier.padding(horizontal=18.dp,vertical=8.dp),color=Warning,style=MaterialTheme.typography.bodySmall)
                        if(group.unavailable>0) Text(trPlural(R.plurals.message_9854876d3b, (group.unavailable).toInt(), group.unavailable),Modifier.padding(horizontal=18.dp,vertical=8.dp),color=Warning,style=MaterialTheme.typography.bodySmall)
                        if(members.isEmpty()) Box(Modifier.fillMaxSize(),contentAlignment=Alignment.Center){Text((tr(R.string.message_7f3c2f9e96)),color=Muted)}
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
                                            "load-balance" -> model.message(tr(R.string.message_42f6bdedaa))
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
        if(chooser) AlertDialog(onDismissRequest={chooser=false},title={Text((tr(R.string.message_47d56387f5)))},text={LazyColumn(Modifier.heightIn(max=420.dp)) {
            items(groups.size) {i -> TextButton({chooser=false;scope.launch {pager.animateScrollToPage(i)}},Modifier.fillMaxWidth()) {Text(groups[i].name,Modifier.weight(1f),maxLines=2,overflow=TextOverflow.Ellipsis);if(i==pager.currentPage)Text("✓")}}
        }},confirmButton={TextButton({chooser=false}){Text((tr(R.string.message_3fd47edce4)))}})
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
                if(onOpen!=null) Box(Modifier.size(26.dp).clickable(onClick=onOpen).semantics {contentDescription=tr(R.string.message_73396c3856, name)},contentAlignment=Alignment.Center) {ProxySymbol("right",Modifier.size(16.dp))}
            }
            Box(Modifier.heightIn(min=24.dp).clickable(enabled=onTest!=null){onTest?.invoke()}.semantics {contentDescription=tr(R.string.message_e5cc5f1229, name)},contentAlignment=Alignment.CenterStart) {
                when(delay?.state) {
                    "running" -> CircularProgressIndicator(Modifier.size(14.dp),strokeWidth=1.5.dp)
                    "passed" -> Text("${delay.elapsedMs.coerceAtLeast(1)} ms",fontSize=12.sp,color=Success)
                    "timeout" -> Text((tr(R.string.message_e512cf016f)),fontSize=12.sp,color=MaterialTheme.colorScheme.error)
                    "failed" -> Text((tr(R.string.message_28384d7afd)),fontSize=12.sp,color=MaterialTheme.colorScheme.error)
                    "busy" -> Text(tr(R.string.message_7b0fe85cc2),fontSize=12.sp,color=Muted)
                    else -> if(onTest!=null) ProxySymbol("bolt",Modifier.size(16.dp),Mint) else Text("—",fontSize=12.sp,color=Muted)
                }
            }
        }
    }
}

@Composable internal fun ProxySymbol(kind: String,modifier: Modifier=Modifier.size(24.dp),color: Color=LocalContentColor.current) {
    AppGlyph(when(kind) {"check"->15;"menu"->26;"down"->25;"right"->5;else->16},modifier,color)
}
