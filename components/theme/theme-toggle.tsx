'use client'

import { Moon, Sun } from 'lucide-react'
import { useHomeTheme } from '@/components/theme/home-theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useHomeTheme()
  const isDark = theme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${nextTheme} theme`}
      // A pressed toggle represents the alternate (light) visual state.
      aria-pressed={!isDark}
      title={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span className="hidden sm:inline">{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  )
}
