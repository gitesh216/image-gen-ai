type Props = { onPick: (s: string) => void }

const SUGGESTIONS = [
  "A serene lake at sunrise, ultra-realistic, 8k",
  "Retro-futuristic cityscape in neon colors, isometric",
  "Studio portrait of a golden retriever wearing sunglasses",
  "Concept art: floating islands with waterfalls, cinematic",
]

export default function PromptSuggestions({ onPick }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          className="rounded-full border px-3 py-1 text-xs hover:bg-muted"
          onClick={() => onPick(s)}
          title={s}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
