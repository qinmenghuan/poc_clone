'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

type Theme = 'light' | 'dark'

type HomeThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

/** Persists the visitor's homepage-only preference without affecting other routes. */
const STORAGE_KEY = 'blockestate:home-theme'

const HomeThemeContext = createContext<HomeThemeContextValue | null>(null)

/**
 * Exposes the active homepage theme to global CSS so the shared header and footer can react.
 * This function runs only in effects or user events, never during server rendering.
 */
function applyTheme(theme: Theme) {
  document.documentElement.dataset.homeTheme = theme
}

export function HomeThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    let initialTheme: Theme = 'dark'

    try {
      // A stored explicit preference wins over the operating-system colour preference.
      const savedTheme = window.localStorage.getItem(STORAGE_KEY)
      if (savedTheme === 'light' || savedTheme === 'dark') {
        initialTheme = savedTheme
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        initialTheme = 'light'
      }
    } catch {
      // Privacy settings can make localStorage unavailable; retain the default theme.
    }

    setThemeState(initialTheme)

    return () => {
      // Remove the global selector if the application shell unmounts.
      delete document.documentElement.dataset.homeTheme
    }
  }, [])

  useEffect(() => {
    // Global chrome receives a theme attribute only while the homepage is active.
    if (isHomePage) {
      applyTheme(theme)
    } else {
      delete document.documentElement.dataset.homeTheme
    }
  }, [isHomePage, theme])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)

    // The toggle is rendered on the homepage, but this guard prevents cross-route styling
    // if the context action is reused elsewhere in the future.
    if (isHomePage) {
      applyTheme(nextTheme)
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // The selected theme still works for the current session.
    }
  }, [isHomePage])

  const value = useMemo(() => ({ theme, setTheme }), [setTheme, theme])

  return (
    <HomeThemeContext.Provider value={value}>
      {/* Homepage-only data scope prevents theme rules from leaking to other routes. */}
      <div className="home-theme" data-theme={isHomePage ? theme : undefined}>
        {children}
      </div>
    </HomeThemeContext.Provider>
  )
}

export function useHomeTheme() {
  const context = useContext(HomeThemeContext)

  if (!context) {
    throw new Error('useHomeTheme must be used within HomeThemeProvider')
  }

  return context
}
