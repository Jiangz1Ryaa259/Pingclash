// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import android.view.Window
import android.view.WindowManager
import java.util.WeakHashMap

/** Main-thread ownership; preserve protection until replacement frames are drawn. */
internal object SecurePage {
    private data class Entry(val previous: Boolean,val owners: MutableSet<Any> = mutableSetOf())
    private val entries=WeakHashMap<Window,Entry>()
    fun acquire(window: Window,owner: Any) {
        val entry=entries.getOrPut(window) {Entry(window.attributes.flags and WindowManager.LayoutParams.FLAG_SECURE!=0)}
        entry.owners.add(owner)
        window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
    }
    fun release(window: Window,owner: Any) {
        val entry=entries[window]?:return
        entry.owners.remove(owner)
        if(entry.owners.isNotEmpty())return
        window.decorView.postOnAnimation {
            window.decorView.postOnAnimation {
                if(entries[window]===entry&&entry.owners.isEmpty()) {
                    if(!entry.previous)window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                    entries.remove(window)
                }
            }
        }
    }
}
