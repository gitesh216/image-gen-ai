import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">
            AI
          </div>
          <span className="font-semibold text-sm md:text-base text-pretty">AI Image Generator</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
