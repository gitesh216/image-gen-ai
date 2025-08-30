import { useMemo, useState } from "react"
import { useImageStore } from "../../store/use-image-store"
import HistoryItem from "./HistoryItem"

export default function HistoryPanel({ onItemClick }: { onItemClick?: () => void }) {
  const items = useImageStore((s) => s.items)
  const clear = useImageStore((s) => s.clear)
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return items
    return items.filter((i) => i.prompt.toLowerCase().includes(query))
  }, [q, items])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Search prompts..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted" onClick={clear}>
          Clear
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {filtered.map((item) => (
          <HistoryItem key={item.id} item={item} onClick={onItemClick} />
        ))}
        {filtered.length === 0 && <div className="text-sm text-muted-foreground p-2">No items</div>}
      </div>
    </div>
  )
}
