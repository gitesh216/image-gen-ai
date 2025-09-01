import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import Modal from '@/components/modal/Modal';

type Props = {
    open: boolean;
    onClose: () => void;
    src: string;
    alt?: string;
};

export default function ImageModal({ open, onClose, src, alt }: Props) {
    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const dragging = useRef(false);
    const last = useRef({ x: 0, y: 0 });

    const onWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const next = Math.min(4, Math.max(1, scale - e.deltaY * 0.0015));
        setScale(next);
    };

    const onPointerDown = (e: React.PointerEvent) => {
        dragging.current = true;
        last.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        (e.target as Element).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        setPos({ x: e.clientX - last.current.x, y: e.clientY - last.current.y });
    };
    const onPointerUp = (e: React.PointerEvent) => {
        dragging.current = false;
        (e.target as Element).releasePointerCapture(e.pointerId);
    };

    const reset = useCallback(() => {
        setScale(1);
        setPos({ x: 0, y: 0 });
    }, []);

    return (
        <Modal
            open={open}
            onClose={() => {
                reset();
                onClose();
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-3 py-2">
                <div className="text-sm font-medium">Preview</div>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded border px-2 py-1 text-xs cursor-pointer hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95"
                        onClick={reset}
                        aria-label="Reset image"
                    >
                        Reset
                    </button>
                    <button
                        className="rounded border px-2 py-1 text-xs cursor-pointer hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95"
                        onClick={onClose}
                        aria-label="Close preview"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Image area */}
            <div
                className="relative grid h-[70dvh] place-items-center bg-black touch-none"
                onWheel={onWheel}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                <img
                    src={src || '/placeholder.svg'}
                    alt={alt || 'preview'}
                    className="max-h-full max-w-full select-none"
                    style={{
                        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                        transformOrigin: 'center center',
                        transition: dragging.current ? 'none' : 'transform 120ms ease-out',
                        cursor: dragging.current ? 'grabbing' : scale > 1 ? 'grab' : 'default',
                    }}
                    draggable={false}
                />
            </div>
        </Modal>
    );
}
