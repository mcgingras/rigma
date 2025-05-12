"use client";

import React, { useState, useRef, useEffect } from "react";

interface SelectionBlurTwoProps {
  children: React.ReactNode;
}

export default function SelectionBlurTwo({ children }: SelectionBlurTwoProps) {
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
  let gradientMaskStyle = {};
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

    // Calculate center and radii for the radial gradient
    const centerX = x1 + selection.width / 2;
    const centerY = y1 + selection.height / 2;
    const radiusX = selection.width / 2 + 60; // 60px soft edge
    const radiusY = selection.height / 2 + 60;
    gradientMaskStyle = {
      WebkitMaskImage: `radial-gradient(ellipse ${radiusX}px ${radiusY}px at ${centerX}px ${centerY}px, transparent 60%, black 100%)`,
      maskImage: `radial-gradient(ellipse ${radiusX}px ${radiusY}px at ${centerX}px ${centerY}px, transparent 60%, black 100%)`,
      background: "rgba(255,255,255,0.5)",
      pointerEvents: "none",
      zIndex: 60,
      position: "fixed",
      inset: 0,
    };
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

      {/* Soft gradient mask to feather the blur edge */}
      {!isSelecting && selection && <div style={gradientMaskStyle} />}

      {/* Selection border - shown during selection and after */}
      {selection && (
        <div
          className={`absolute bg-transparent border-2 rounded-lg ${
            isSelecting ? "border-white/80" : "border-[#BABBFE]"
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
        <div
          className="absolute bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-[300px]"
          style={{
            left: selection.x + selection.width + 10,
            top: selection.y,
            zIndex: 100,
          }}
        >
          <div className="flex flex-row space-x-2 border-b-2 border-gray-200 pb-2">
            <div className="flex items-center gap-2 bg-gray-300 rounded-full p-2 w-fit">
              <img src="/assets/ambush_a.svg" alt="side" className="h-3 w-3" />
            </div>
            <span className="text-lg font-bold text-gray-400">Explanation</span>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-sm text-gray-400">
              The price of the stock increased by 10%, likely because of an
              announcement by Y Corp.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
