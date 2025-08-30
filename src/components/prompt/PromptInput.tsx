import type React from "react"

import { useEffect, useMemo, useState } from "react"

type Props = {
  onSubmit: (prompt: string) => Promise<void> | void
  maxLength?: number
  loading?: boolean
}

export default function PromptInput({ onSubmit, maxLength = 300, loading }: Props) {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const remaining = useMemo(() => maxLength - value.length, [value.length, maxLength])

  useEffect(() => {
    if (value.length <= maxLength && error) setError(null)
  }, [value, maxLength, error])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) {
      setError("Please enter a prompt.")
      return
    }
    if (value.length > maxLength) {
      setError(`Prompt must be under ${maxLength} characters.`)
      return
    }
    await onSubmit(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <textarea
        className="min-h-[96px] w-full rounded-md border bg-background px-3 py-2 text-sm"
        placeholder="Describe the image you want to generate..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength + 50}
        aria-invalid={!!error}
        aria-describedby={error ? "prompt-error" : undefined}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div id="prompt-error" role={error ? "alert" : undefined} className="text-red-500">
          {error}
        </div>
        <div className={remaining < 0 ? "text-red-500" : ""}>{Math.max(remaining, 0)} characters remaining</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md border px-4 py-2 text-sm bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
          onClick={() => {
            const ideas = [
              "Macro shot of a dewdrop on a leaf, bokeh background",
              "Surreal landscape of floating islands, cinematic lighting",
              "Isometric illustration of a cozy coffee shop",
              "A watercolor painting of a mountain at sunrise",
            ]
            const pick = ideas[Math.floor(Math.random() * ideas.length)]
            setValue(pick)
          }}
        >
          Surprise me
        </button>
      </div>
    </form>
  )
}
