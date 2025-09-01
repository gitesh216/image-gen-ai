import { useState } from "react"
import ImagePlaceholder from "./ImagePlaceholder"

type Props = {
  src: string
  alt?: string
  onView?: () => void
}

export default function ImageCard({ src, alt, onView }: Props) {
  const [loaded, setLoaded] = useState(false)

  const download = async () => {
    const res = await fetch(src, { mode: "cors" })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "image.jpg"
    a.click()
    URL.revokeObjectURL(url)
  }

  const copy = async () => {
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      await (navigator as any).clipboard.write([new window.ClipboardItem({ [blob.type]: blob })])
      alert("Copied to clipboard!")
    } catch {
      alert("Copy not supported in this browser.")
    }
  }

  return (
    <div className="group relative mb-4 break-inside-avoid rounded-lg border bg-card p-2">
      {!loaded && <ImagePlaceholder />}
      <img
        src={src || "/placeholder.svg"}
        alt={alt || "generated"}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full rounded-md ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />
      <div className="absolute inset-x-2 bottom-2 hidden items-center justify-end gap-2 rounded-md bg-background/60 p-1 backdrop-blur group-hover:flex">
        <button className="rounded px-2 py-1 text-xs hover:bg-muted cursor-pointer transition-colors duration-200 hover:scale-105" onClick={onView}>
          View
        </button>
        <button className="rounded px-2 py-1 text-xs hover:bg-muted cursor-pointer transition-colors duration-200 hover:scale-105" onClick={download}>
          Download
        </button>
        <button className="rounded px-2 py-1 text-xs hover:bg-muted cursor-pointer transition-colors duration-200 hover:scale-105" onClick={copy}>
          Copy
        </button>
      </div>
    </div>
  )
}
