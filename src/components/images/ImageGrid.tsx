import ImageCard from "./ImageCard"

type Item = {
  id: string
  url: string
  prompt: string
}

type Props = {
  items: Item[]
  onView: (item: Item) => void
}

export default function ImageGrid({ items, onView }: Props) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {items.map((item) => (
        <ImageCard key={item.id} src={item.url || "/placeholder.svg"} alt={item.prompt} onView={() => onView(item)} />
      ))}
    </div>
  )
}
