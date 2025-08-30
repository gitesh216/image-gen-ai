import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Exclude<Theme, "system">
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({
  children,
  storageKey = "app-theme",
  defaultTheme = "system",
}: {
  children: React.ReactNode
  storageKey?: string
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = useState<Exclude<Theme, "system">>(
    defaultTheme === "system" ? getSystemTheme() : defaultTheme,
  )

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored) {
      setThemeState(stored === "system" ? getSystemTheme() : (stored as any))
    }
  }, [storageKey])

  // apply to document and persist
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const setTheme = (t: Theme) => {
    setThemeState(t === "system" ? getSystemTheme() : (t as any))
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
