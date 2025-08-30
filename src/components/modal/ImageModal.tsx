import { useEffect, useRef, useState } from "react"
import Modal from "./Modal"

type Props = {
  open: boolean
  src: string
  alt: string
  onClose: () => void
}

export default function ImageModal({ open, src, alt, onClose }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [start, setStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setScale(1)
    setPos({ x: 0, y: 0 })
  }, [src, open])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <img
          ref={imgRef}
          src={src || "/placeholder.svg"}
          alt={alt}
          className="max-h-full max-w-full select-none"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: dragging ? "none" : "transform 120ms ease-out",
          }}
          onWheel={(e) => {
            e.preventDefault()
            const delta = e.deltaY > 0 ? -0.1 : 0.1
            setScale((s) => Math.max(0.5, Math.min(4, s + delta)))
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            setDragging(true)
            setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y })
          }}
          onMouseMove={(e) => {
            if (!dragging) return
            setPos({ x: e.clientX - start.x, y: e.clientY - start.y })
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          draggable={false}
        />
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            className="rounded-md bg-background/80 backdrop-blur border px-2 py-1 text-xs hover:bg-background"
            onClick={() => setScale(1)}
          >
            Reset
          </button>
          <button
            className="rounded-md bg-background/80 backdrop-blur border px-2 py-1 text-xs hover:bg-background"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
