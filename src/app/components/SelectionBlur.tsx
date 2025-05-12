"use client";

import { motion } from "motion/react";
import React, { useState, useRef, useEffect } from "react";

interface SelectionBlurProps {
  children: React.ReactNode;
}

export default function SelectionBlur({ children }: SelectionBlurProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsSelecting(true);
    setSelection({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting || !selection || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelection({
      x: Math.min(selection.x, x),
      y: Math.min(selection.y, y),
      width: Math.abs(x - selection.x),
      height: Math.abs(y - selection.y),
    });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    // Only keep selection if it meets minimum size
    setSelection((sel) => {
      if (!sel) return null;
      if (sel.width < 100 || sel.height < 100) return null;
      return sel;
    });
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Calculate the clipPath for the blur overlay (inverse: blur everywhere except selection)
  let blurClipPath = undefined;
  if (!isSelecting && selection && containerRef.current) {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const x1 = selection.x;
    const y1 = selection.y;
    const x2 = selection.x + selection.width;
    const y2 = selection.y + selection.height;
    blurClipPath = `polygon(
      0px 0px,
      ${width}px 0px,
      ${width}px ${height}px,
      0px ${height}px,
      0px 0px,
      0px ${y1}px,
      ${x1}px ${y1}px,
      ${x1}px ${y2}px,
      ${x2}px ${y2}px,
      ${x2}px ${y1}px,
      0px ${y1}px
    )`;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      style={{ minHeight: "100vh" }}
    >
      {/* Base content: always fully visible */}
      {children}

      {/* Blur overlay with a hole for the selection */}
      {!isSelecting && selection && (
        <div
          className="pointer-events-none fixed inset-0 z-50 backdrop-blur-sm bg-black/5 transition-all duration-200"
          style={{
            clipPath: blurClipPath,
          }}
        />
      )}

      {/* Selection border - shown during selection and after */}
      {selection && (
        <div
          className={`absolute bg-transparent border-2 rounded-lg ${
            isSelecting ? "border-white/80" : "border-white/50"
          }`}
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Info box - shown after selection is complete */}
      {!isSelecting && selection && (
        <motion.div
          className="absolute bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-[300px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          style={{
            left: selection.x + selection.width + 10,
            top: selection.y,
            zIndex: 100,
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src="/assets/side.png" alt="side" className="h-6 w-6" />
              <p className="text-sm text-white bg-black/40 rounded-full px-2 py-1">
                How can I help?
              </p>
            </div>
            <input
              type="text"
              placeholder="Ask anything"
              className="w-full bg-black/10 outline-none border-none rounded-full px-2 py-1 mt-4 placeholder:text-black/50 text-sm self-end"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
