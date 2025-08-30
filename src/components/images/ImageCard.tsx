import { useState } from "react"

type Props = {
  src: string
  alt: string
  onView?: () => void
  onDownloaded?: () => void
  onCopied?: () => void
}

export default function ImageCard({ src, alt, onView, onCopied, onDownloaded }: Props) {
  const [loaded, setLoaded] = useState(false)

  async function handleDownload() {
    try {
      const res = await fetch(src, { mode: "cors" })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "image.png"
      a.click()
      URL.revokeObjectURL(url)
      onDownloaded?.()
    } catch {
      // Fallback: open in new tab
      window.open(src, "_blank")
    }
  }

  async function handleCopy() {
    try {
      const data = await fetch(src)
      const blob = await data.blob()
      // @ts-ignore - ClipboardItem may not be typed
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
      onCopied?.()
    } catch {
      // no-op
    }
  }

  return (
    <div className="break-inside-avoid mb-4 group relative">
      {!loaded && (
        <div className="absolute inset-0">
          <div className="w-full h-full bg-muted animate-pulse rounded-md" />
        </div>
      )}
      <img
        className="w-full rounded-md object-cover transition-opacity duration-300"
        src={src || "/placeholder.svg"}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 justify-end">
          <button
            className="rounded-md bg-background/80 backdrop-blur border px-2 py-1 text-xs hover:bg-background"
            onClick={onView}
          >
            View
          </button>
          <button
            className="rounded-md bg-background/80 backdrop-blur border px-2 py-1 text-xs hover:bg-background"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className="rounded-md bg-background/80 backdrop-blur border px-2 py-1 text-xs hover:bg-background"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}
