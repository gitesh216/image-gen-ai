import { useState } from "react"
import PromptInput from "@/components/PromptInput"
import ImageGrid from "@/components/image/ImageGrid"
import ImageModal from "@/components/image/ImageModal"
import { useImageStore } from "../store/use-image-store"

export default function Home() {
  const [active, setActive] = useState<{ id: string; url: string; prompt: string } | null>(null)
  const add = useImageStore((s) => s.add)
  const items = useImageStore((s) => s.items)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="space-y-3">
        <PromptInput />
      </section>

      <section className="min-h-[200px]">
        {items.length === 0 ? (
          <div className="text-muted-foreground text-sm">Generate an image to see results here.</div>
        ) : (
          <ImageGrid items={items} onView={(item) => setActive(item)} />
        )}
      </section>

      <ImageModal
        open={!!active}
        src={active?.url || ""}
        alt={active?.prompt || "Generated image"}
        onClose={() => setActive(null)}
      />
    </div>
  )
}
