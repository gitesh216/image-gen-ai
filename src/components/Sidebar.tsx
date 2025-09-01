import { useState } from "react"
import HistoryPanel from "./history/HistoryPanel"

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop rail */}
      <aside className="hidden md:block w-72 border-r bg-card/40">
        <div className="h-14 border-b flex items-center px-4 font-medium">Prompt History</div>
        <div className="p-2">
          <HistoryPanel />
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-40 rounded-full bg-primary text-primary-foreground shadow-lg px-4 py-2"
        onClick={() => setOpen(true)}
        aria-label="Open history"
      >
        History
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background border-l shadow-xl p-3">
            <div className="h-12 flex items-center justify-between border-b px-1">
              <span className="font-medium">Prompt History</span>
              <button
                className="rounded px-2 py-1 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <div className="pt-2">
              <HistoryPanel onItemClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
