// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

@Suppress("MagicNumber")
private val settingsGlyphs=mapOf("live" to 2,"diagnosis" to 2,"usage" to 19,"connections" to 20,
    "network" to 22,"dns" to 21,"lan" to 23,"apps" to 27,"profiles" to 7,"rules" to 17,
    "about" to 24,"privacy" to 6,"control" to 0,"appearance" to 18,"groups" to 14,"terminal" to 10)
@Suppress("MagicNumber")
internal fun settingsGlyph(id: String)=settingsGlyphs[id]?:12
