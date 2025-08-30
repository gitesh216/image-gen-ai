import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type ImageItem = {
  id: string
  url: string
  prompt: string
  createdAt: number
  width?: number
  height?: number
}

type State = {
  items: ImageItem[]
  selectedId: string | null
}

type Actions = {
  add: (item: ImageItem) => void
  remove: (id: string) => void
  clear: () => void
  select: (id: string | null) => void
}

export const useImageStore = create<State & Actions>()(
  persist(
    (set) => ({
      items: [],
      selectedId: null,
      add: (item) => set((s) => ({ items: [item, ...s.items] })),
      remove: (id) =>
        set((s) => ({
          items: s.items.filter((i) => i.id !== id),
          selectedId: s.selectedId === id ? null : s.selectedId,
        })),
      clear: () => set({ items: [], selectedId: null }),
      select: (id) => set({ selectedId: id }),
    }),
    {
      name: "ai-image-history",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (s) => ({ items: s.items, selectedId: s.selectedId }),
    },
  ),
)
