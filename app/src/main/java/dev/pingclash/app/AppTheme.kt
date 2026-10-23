// SPDX-License-Identifier: GPL-3.0-only
package dev.pingclash.app

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.luminance
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

internal val Ink: Color @Composable get() = MaterialTheme.colorScheme.background
internal val Panel: Color @Composable get() = MaterialTheme.colorScheme.surface
internal val Mint: Color @Composable get() = MaterialTheme.colorScheme.primary
internal val Muted: Color @Composable get() = MaterialTheme.colorScheme.onSurfaceVariant
internal val Success: Color @Composable get() = if (MaterialTheme.colorScheme.background.luminance()<.5f) Color(0xFF81C995) else Color(0xFF188038)
internal val Warning: Color @Composable get() = if (MaterialTheme.colorScheme.background.luminance()<.5f) Color(0xFFFDD663) else Color(0xFF805600)

@Composable internal fun PingClashTheme(mode: String="system",content: @Composable () -> Unit) {
    val colors = if (mode=="dark"||mode=="system"&&isSystemInDarkTheme()) darkColorScheme(
        primary = Color(0xFF91B5FF), onPrimary = Color(0xFF082759), primaryContainer = Color(0xFF1C304F), onPrimaryContainer = Color(0xFFD9E5FF),
        background = Color(0xFF0C0E12), surface = Color(0xFF171A20), surfaceVariant = Color(0xFF22262E),
        onBackground = Color(0xFFF2F3F5), onSurface = Color(0xFFF2F3F5), onSurfaceVariant = Color(0xFFA7AEBB),
        outline = Color(0xFF626A78), outlineVariant = Color(0xFF30353F), error = Color(0xFFFFB4AB), errorContainer = Color(0xFF442722), onErrorContainer = Color(0xFFFFDAD6),
        inversePrimary = Color(0xFF2563EB),
        secondary = Color(0xFFBCC6D8), secondaryContainer = Color(0xFF292F39), onSecondaryContainer = Color(0xFFE1E6EF), surfaceTint = Color(0xFF91B5FF),
    ) else lightColorScheme(
        primary = Color(0xFF2563EB), onPrimary = Color.White, primaryContainer = Color(0xFFE8EFFD), onPrimaryContainer = Color(0xFF153C83),
        background = Color(0xFFF7F8FA), surface = Color.White, surfaceVariant = Color(0xFFF0F2F5),
        onBackground = Color(0xFF111318), onSurface = Color(0xFF111318), onSurfaceVariant = Color(0xFF626A78),
        outline = Color(0xFF818895), outlineVariant = Color(0xFFE5E8EE), error = Color(0xFFB3261E), errorContainer = Color(0xFFFCE8E6), onErrorContainer = Color(0xFF8C1D18),
        inversePrimary = Color(0xFF91B5FF),
        secondary = Color(0xFF4D5B71), secondaryContainer = Color(0xFFF0F2F5), onSecondaryContainer = Color(0xFF242D3C), surfaceTint = Color(0xFF2563EB),
    )
    val typography = Typography(
        headlineLarge = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Bold, fontSize = 34.sp, lineHeight = 42.sp),
        headlineMedium = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.SemiBold, fontSize = 28.sp, lineHeight = 36.sp),
        titleLarge = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.SemiBold, fontSize = 22.sp, lineHeight = 30.sp),
        titleMedium = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Medium, fontSize = 16.sp, lineHeight = 24.sp),
        bodyLarge = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 25.sp),
        bodyMedium = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Normal, fontSize = 14.sp, lineHeight = 22.sp),
        bodySmall = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Normal, fontSize = 12.sp, lineHeight = 19.sp),
        labelLarge = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Medium, fontSize = 14.sp, lineHeight = 20.sp),
    )
    MaterialTheme(colorScheme = colors, typography = typography, content = content)
}
