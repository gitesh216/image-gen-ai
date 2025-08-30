// Home page wiring the input + grid + modal preview
import { useState } from "react"
import PromptInput from "@/components/PromptInput"
import ImageGrid from "@/components/image/ImageGrid"
import ImageModal from "@/components/image/ImageModal"
import { useImageStore } from "@/store/use-image-store"

export default function HomePage() {
  const images = useImageStore((s) => s.images)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<{ id: string; url: string; prompt: string } | null>(null)

  return (
    <div className="space-y-4">
      <PromptInput />
      <ImageGrid
        items={images}
        onView={(it) => {
          setActive(it)
          setOpen(true)
        }}
      />
      <ImageModal open={open} onClose={() => setOpen(false)} src={active?.url || ""} alt={active?.prompt} />
    </div>
  )
}
