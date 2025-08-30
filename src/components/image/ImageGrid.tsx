import ImageCard from "./ImageCard"

type Item = { id: string; url: string; prompt: string }
type Props = {
  items: Item[]
  onView: (item: Item) => void
}

export default function ImageGrid({ items, onView }: Props) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3" role="list" aria-label="Generated images">
      {items.map((it) => (
        <div key={it.id} role="listitem">
          <ImageCard src={it.url || "/placeholder.svg"} alt={it.prompt} onView={() => onView(it)} />
        </div>
      ))}
    </div>
  )
}
