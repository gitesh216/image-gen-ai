import type React from "react"

import { useState } from "react"
import { useImageStore } from "@/store/use-image-store"
import { generateImages } from "@/services/generator"
import PromptSuggestions from "./PromptSuggestions"

const MAX = 300

export default function PromptInput() {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const add = useImageStore((s) => s.add)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) {
      setError("Please enter a prompt")
      return
    }
    if (value.length > MAX) {
      setError(`Prompt must be ${MAX} characters or fewer`)
      return
    }
    setError(null)
    setLoading(true)
    try {
      const imgs = await generateImages(value)
      imgs.forEach(add)
      setValue("")
    } catch (err) {
      setError("Failed to generate images. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm font-medium">Describe your image</label>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="e.g., A cozy cabin in the woods, cinematic lighting"
          className="w-full rounded-md border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          aria-invalid={!!error}
        />
        <div className="flex items-center justify-between">
          <span
            className={`text-xs ${value.length > MAX ? "text-red-600" : "text-muted-foreground"}`}
            aria-live="polite"
          >
            {value.length}/{MAX}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
              onClick={() => setValue("A serene lake at sunrise, ultra-realistic, 8k")}
            >
              Surprise me
            </button>
            <button
              disabled={loading}
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>
      <div className="mt-4">
        <p className="mb-2 text-xs text-muted-foreground">Suggestions</p>
        <PromptSuggestions onPick={(s) => setValue(s)} />
      </div>
    </div>
  )
}
