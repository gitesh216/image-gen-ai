import type { ImageItem } from "@/store/use-image-store"

export async function generateImages(prompt: string, count = 6): Promise<ImageItem[]> {
  await new Promise((r) => setTimeout(r, 800))
  const time = Date.now()
  return Array.from({ length: count }).map((_, idx) => ({
    id: `${time}-${idx}`,
    url: `https://picsum.photos/seed/${encodeURIComponent(prompt)}-${idx}/800/1000`,
    prompt,
    createdAt: time,
  }))
}
