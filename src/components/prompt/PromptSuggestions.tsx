type Props = {
  onSelect: (value: string) => void
}

const SUGGESTIONS = [
  "A cozy cabin in the woods during snowfall",
  "Futuristic cityscape at golden hour, ultra-detailed",
  "Studio portrait of a corgi in a tuxedo, soft lighting",
  "Minimalist abstract shapes with muted tones",
]

export default function PromptSuggestions({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          className="rounded-full border px-3 py-1.5 text-xs md:text-sm hover:bg-accent"
          onClick={() => onSelect(s)}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
