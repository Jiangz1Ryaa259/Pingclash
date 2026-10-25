// SPDX-License-Identifier: GPL-3.0-only
@file:Suppress("MagicNumber")
package dev.pingclash.app

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.os.PersistableBundle
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.IconButton
import androidx.compose.material3.FilterChip
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.Stable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.withFrameNanos
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.disabled
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import java.util.UUID

internal enum class ProfileCommand {REFRESH,DETAILS,RENAME,EXPORT,DELETE,UA,REPARSE,PROVIDERS,PROXIES}
internal data class ProfileActions(val select: (LocalProfile)->Unit,
    val command: (ProfileCommand,LocalProfile)->Unit,val add: ()->Unit,val file: ()->Unit)

@Composable internal fun ProfilesOverview(data: AppData,locked: Boolean,ui: AppUiState,actions: ProfileActions) {
    val scroll=rememberLazyListState()
    val compact by remember {derivedStateOf {scroll.firstVisibleItemIndex>0||scroll.firstVisibleItemScrollOffset>32}}
    val bottom=LocalNavigationClearance.current
    Box(Modifier.fillMaxSize()) {
        LazyColumn(state=scroll,modifier=Modifier.fillMaxSize().testTag("profiles-list"),
            contentPadding=PaddingValues(start=20.dp,end=20.dp,top=16.dp,bottom=bottom+100.dp),
            verticalArrangement=Arrangement.spacedBy(14.dp)) {
            item(key="header") {
                Row(Modifier.fillMaxWidth(),verticalAlignment=Alignment.CenterVertically) {
                    Text(tr(R.string.message_148d195e21),Modifier.weight(1f),
                        style=MaterialTheme.typography.headlineLarge)
                    TextButton(actions.file,enabled=!locked) {Text(tr(R.string.message_fa3ecfb797))}
                }
            }
            ui.importIssue?.let {issue ->item(key="issue") {InputIssue(issue)}}
            if(data.profiles.isEmpty())item(key="empty") {
                Surface(shape=UiCorners.Sheet,color=Panel.copy(alpha=.88f)) {
                    Column(Modifier.fillMaxWidth().padding(28.dp),verticalArrangement=Arrangement.spacedBy(12.dp)) {
                        Text(tr(R.string.message_58acd3db15),style=MaterialTheme.typography.titleLarge)
                        Text(tr(R.string.message_a03eefe8ff),color=Muted)
                    }
                }
            }
            items(data.profiles,key={it.id}) {profile ->
                ProfileSummary(profile,data.activeProfile?.id==profile.id,locked,actions)
            }
        }
        ExtendedFloatingActionButton(onClick={if(!locked)actions.add()},expanded=!compact,
            icon={AppGlyph(4)},text={Text(tr(R.string.message_fa9d1a2012))},
            modifier=Modifier.align(Alignment.BottomEnd).padding(end=24.dp,bottom=bottom+12.dp)
                .testTag("profile-add").semantics {
                    contentDescription=tr(R.string.message_fa9d1a2012)
                    if(locked)disabled()
                },
            containerColor=MaterialTheme.colorScheme.primaryContainer)
    }
}

@Composable private fun ProfileSummary(profile: LocalProfile,selected: Boolean,locked: Boolean,
    actions: ProfileActions) {
    Surface(shape=UiCorners.Sheet,color=if(selected)MaterialTheme.colorScheme.primaryContainer.copy(alpha=.86f)
        else Panel.copy(alpha=.86f),border=BorderStroke(if(selected)1.2.dp else .7.dp,
            if(selected)Mint else MaterialTheme.colorScheme.outlineVariant),
        modifier=Modifier.fillMaxWidth().testTag("profile-${profile.id}")) {
        Column(Modifier.clickable(enabled=!locked) {actions.select(profile)}.padding(20.dp),
            verticalArrangement=Arrangement.spacedBy(10.dp)) {
            Row(verticalAlignment=Alignment.CenterVertically) {
                Text(profile.name,Modifier.weight(1f),style=MaterialTheme.typography.titleLarge,maxLines=2)
                ProfileMenu(profile,locked,actions)
            }
            ProfileQuota(profile)
            if(profile.activationRequired)Text(tr(R.string.deep_link_inactive),color=Muted,
                style=MaterialTheme.typography.bodySmall)
            if(selected)Text(tr(R.string.message_1f4f69f770),color=Mint,style=MaterialTheme.typography.labelMedium)
        }
    }
}


@Composable private fun ProfileMenu(profile: LocalProfile,locked: Boolean,actions: ProfileActions) {
    var menu by remember(profile.id) {mutableStateOf(false)}
    var copied by remember {mutableStateOf(false)}
    val context=LocalContext.current
    LaunchedEffect(copied) {if(copied) {delay(1300);copied=false;menu=false}}
    Box {
        IconButton({menu=true},Modifier.testTag("profile-menu-${profile.id}")
            .semantics {contentDescription=tr(R.string.ui_more_actions)}) {AppGlyph(26)}
        DropdownMenu(menu,{menu=false}) {
            DropdownMenuItem(text={Text(tr(R.string.message_1f4f69f770))},
                onClick={menu=false;actions.command(ProfileCommand.PROXIES,profile)},enabled=!locked)
            DropdownMenuItem(text={Text(tr(if(copied)R.string.ui_copied else R.string.ui_subscription_copy))},
                leadingIcon={AnimatedContent(copied,label="copy-feedback") {AppGlyph(if(it)15 else 28)}},
                enabled=profile.source!=null,onClick={
                    profile.source?.let {copied=copySubscription(context,it)}
                })
            listOf(ProfileCommand.REFRESH to R.string.message_3055a035f0,
                ProfileCommand.DETAILS to R.string.ui_profile_details,
                ProfileCommand.RENAME to R.string.message_0d0cbac2ee,
                ProfileCommand.EXPORT to R.string.message_429ea3af44,
                ProfileCommand.DELETE to R.string.message_2f9daa8289).forEach {(command,title) ->
                if(command!=ProfileCommand.REFRESH||profile.source!=null)DropdownMenuItem(
                    text={Text(tr(title))},enabled=command==ProfileCommand.DETAILS||!locked,
                    onClick={menu=false;actions.command(command,profile)})
            }
        }
    }
}

@Composable private fun ProfileQuota(profile: LocalProfile) {
    val quota=profile.quota
    Row(Modifier.fillMaxWidth(),horizontalArrangement=Arrangement.SpaceBetween) {
        Text(if(quota==null)trPlural(R.plurals.message_36f0a655c4,profile.nodes.size,
            profile.nodes.size,tr(if(profile.source==null)R.string.message_a74010990f else R.string.message_cf8efc450f))
            else tr(R.string.ui_profile_quota,quota.used?.let(::formatBytes)?:"—",quota.total?.let(::formatBytes)?:"—"),
            style=MaterialTheme.typography.titleSmall)
        quota?.expire?.let {Text(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE
            .withZone(java.time.ZoneId.systemDefault())
                .format(java.time.Instant.ofEpochSecond(it)),style=MaterialTheme.typography.bodySmall)}
    }
    val amount=quota?.let {q ->q.total?.takeIf {it>0}?.let {(q.used?:0).toFloat()/it}}?:0f
    LinearProgressIndicator(progress={amount.coerceIn(0f,1f)},modifier=Modifier.fillMaxWidth().height(4.dp),
        color=Mint,trackColor=MaterialTheme.colorScheme.outlineVariant)
}

/** Explicit user copy only. Never logs, previews, persists or exports the URL. */
internal fun copySubscription(context: Context,url: String): Boolean = runCatching {
    val clipboard=context.applicationContext.getSystemService(ClipboardManager::class.java)
    val id=UUID.randomUUID().toString()
    val clip=ClipData.newPlainText("PingClash subscription",url)
    clip.description.extras=PersistableBundle().apply {
        putBoolean("android.content.extra.IS_SENSITIVE",true);putString("pingclash.copy",id)
    }
    clipboard.setPrimaryClip(clip)
    Handler(Looper.getMainLooper()).postDelayed({
        runCatching {
            if(clipboard.primaryClipDescription?.extras?.getString("pingclash.copy")==id)clipboard.clearPrimaryClip()
        }
    },60_000)
    true
}.getOrDefault(false)

@OptIn(ExperimentalMaterial3Api::class)
@Composable internal fun ProfileDetailsSheet(profile: LocalProfile,locked: Boolean,
    onDismiss: ()->Unit,onCommand: (ProfileCommand,LocalProfile)->Unit) {
    ModalBottomSheet(onDismissRequest=onDismiss,containerColor=Panel) {
        Column(Modifier.fillMaxWidth().verticalScroll(androidx.compose.foundation.rememberScrollState())
            .padding(20.dp).padding(bottom=24.dp),verticalArrangement=Arrangement.spacedBy(12.dp)) {
            Text(profile.name,style=MaterialTheme.typography.titleLarge)
            SubscriptionDetails(profile)
            if(profile.groupsUnsupported>0)Text(trPlural(R.plurals.message_39ce491af1,profile.groupsUnsupported,
                profile.groupsUnsupported),color=Warning)
            if(profile.unsupported>0)Text(rejectionSummary(profile.rejections),color=Warning)
            if(profile.fieldIssues.isNotEmpty()) {
                var expanded by remember {mutableStateOf(false)}
                TextButton({expanded=!expanded}) {
                    Text(tr(if(expanded)R.string.message_815769985a else R.string.message_2774441c8b))
                }
                androidx.compose.animation.AnimatedVisibility(expanded) {Text(importFieldSummary(profile.fieldIssues))}
            }
            if(profile.source!=null)TextButton({onDismiss();onCommand(ProfileCommand.UA,profile)},enabled=!locked) {
                Text(tr(R.string.subscription_ua))
            }
            if(profile.remote!=null)TextButton({onCommand(ProfileCommand.PROVIDERS,profile)},enabled=!locked) {
                Text(tr(R.string.provider_refresh))
            }
            if(profile.definition.isNotBlank()&&(profile.unsupported>0||profile.groupsUnsupported>0)) {
                TextButton({onCommand(ProfileCommand.REPARSE,profile)},enabled=!locked,
                    modifier=Modifier.testTag("profile-reparse-${profile.id}")) {Text(tr(R.string.message_64c2833618))}
            }
        }
    }
}
