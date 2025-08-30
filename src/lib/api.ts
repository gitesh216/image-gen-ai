// Dummy API for generation and listing
export type GenerateParams = { prompt: string; count?: number }

export async function generateImages({ prompt, count = 4 }: GenerateParams) {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 700))
  const now = Date.now()
  // Use placeholder images
  const sizes = [
    [512, 640],
    [640, 512],
    [512, 512],
    [480, 600],
    [600, 480],
  ] as const
  return Array.from({ length: count }).map((_, idx) => {
    const [w, h] = sizes[idx % sizes.length]
    const url = `/placeholder.svg?height=${h}&width=${w}&query=${encodeURIComponent(prompt || "generated image")}`
    return {
      id: `${now}-${idx}`,
      url,
      prompt,
      createdAt: now,
      width: w,
      height: h,
    }
  })
}
