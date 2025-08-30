import type React from "react"

import { useTheme } from "../providers/theme-provider"

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 4a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-4a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1ZM5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm13.657-6.657a1 1 0 0 1 0 1.414L17.5 7.914a1 1 0 1 1-1.414-1.414l1.157-1.157a1 1 0 0 1 1.414 0ZM7.914 17.5a1 1 0 0 1-1.414 0L5.343 16.34A1 1 0 1 1 6.757 14.93l1.157 1.157a1 1 0 0 1 0 1.414Zm12.157 2.243a1 1 0 0 1-1.414 0l-1.157-1.157A1 1 0 0 1 18.914 17.17l1.157 1.157a1 1 0 0 1 0 1.414ZM7.5 6.5A1 1 0 0 1 6.086 5.086L4.93 3.93A1 1 0 1 1 6.343 2.515l1.157 1.157A1 1 0 0 1 7.5 6.5Z"
      />
    </svg>
  )
}
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3c.2 0 .4.01.59.03A7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  )
}
