import { memo } from "react"
import { type ImageItem, useImageStore } from "../../store/use-image-store"

type Props = {
  item: ImageItem
  onClick?: () => void
}

function Row({ item, onClick }: Props) {
  const remove = useImageStore((s) => s.remove)

  return (
    <div
      className="group flex items-center gap-3 rounded-md p-2 hover:bg-accent cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={item.url || "/placeholder.svg"}
        alt={item.prompt}
        className="h-10 w-10 rounded object-cover"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{item.prompt}</div>
        <div className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</div>
      </div>
      <button
        className="opacity-0 group-hover:opacity-100 text-xs rounded px-2 py-1 border hover:bg-background transition"
        onClick={(e) => {
          e.stopPropagation()
          remove(item.id)
        }}
        aria-label="Delete"
      >
        Delete
      </button>
    </div>
  )
}

export default memo(Row)
