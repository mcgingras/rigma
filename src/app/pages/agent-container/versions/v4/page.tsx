"use client";

import React, { useState } from "react";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

const Slider = ({ label, value, onChange, min, max, step = 1, unit = "" }: SliderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-white/70">
        <span>{label}</span>
        <span>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) 100%)`
        }}
      />
    </div>
  );
};

export default function Transform3DExplorer() {
  // Transform values
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [rotateZ, setRotateZ] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [scaleZ, setScaleZ] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  
  // 3D settings
  const [perspective, setPerspective] = useState(1000);
  const [perspectiveOriginX, setPerspectiveOriginX] = useState(50);
  const [perspectiveOriginY, setPerspectiveOriginY] = useState(50);
  const [transformStyle, setTransformStyle] = useState<"flat" | "preserve-3d">("preserve-3d");
  const [backfaceVisibility, setBackfaceVisibility] = useState<"visible" | "hidden">("visible");

  const resetAll = () => {
    setRotateX(0);
    setRotateY(0);
    setRotateZ(0);
    setTranslateX(0);
    setTranslateY(0);
    setTranslateZ(0);
    setScaleX(1);
    setScaleY(1);
    setScaleZ(1);
    setSkewX(0);
    setSkewY(0);
    setPerspective(1000);
    setPerspectiveOriginX(50);
    setPerspectiveOriginY(50);
  };

  const transform = `
    translateX(${translateX}px)
    translateY(${translateY}px)
    translateZ(${translateZ}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    rotateZ(${rotateZ}deg)
    scaleX(${scaleX})
    scaleY(${scaleY})
    scaleZ(${scaleZ})
    skewX(${skewX}deg)
    skewY(${skewY}deg)
  `;

  return (
    <div className="h-screen w-screen bg-slate-900 flex">
      {/* 3D Viewport */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div 
          className="relative"
          style={{
            perspective: `${perspective}px`,
            perspectiveOrigin: `${perspectiveOriginX}% ${perspectiveOriginY}%`,
          }}
        >
          {/* Container for reference */}
          <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-lg pointer-events-none" />
          
          {/* Transformed element */}
          <div
            className="relative w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center"
            style={{
              transform,
              transformStyle,
              backfaceVisibility,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mb-2">3D Transform</h3>
              <p className="text-sm opacity-75">Front Face</p>
            </div>
            
            {/* Back face */}
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility,
              }}
            >
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Back Face</h3>
                <p className="text-sm opacity-75">Visible when rotated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-96 bg-slate-800 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">3D Transform Controls</h2>
          <button
            onClick={resetAll}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            Reset All
          </button>
        </div>

        <div className="space-y-6">
          {/* Rotation */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Rotation</h3>
            <Slider label="Rotate X" value={rotateX} onChange={setRotateX} min={-180} max={180} unit="°" />
            <Slider label="Rotate Y" value={rotateY} onChange={setRotateY} min={-180} max={180} unit="°" />
            <Slider label="Rotate Z" value={rotateZ} onChange={setRotateZ} min={-180} max={180} unit="°" />
          </div>

          {/* Translation */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Translation</h3>
            <Slider label="Translate X" value={translateX} onChange={setTranslateX} min={-200} max={200} unit="px" />
            <Slider label="Translate Y" value={translateY} onChange={setTranslateY} min={-200} max={200} unit="px" />
            <Slider label="Translate Z" value={translateZ} onChange={setTranslateZ} min={-500} max={500} unit="px" />
          </div>

          {/* Scale */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Scale</h3>
            <Slider label="Scale X" value={scaleX} onChange={setScaleX} min={0} max={3} step={0.1} />
            <Slider label="Scale Y" value={scaleY} onChange={setScaleY} min={0} max={3} step={0.1} />
            <Slider label="Scale Z" value={scaleZ} onChange={setScaleZ} min={0} max={3} step={0.1} />
          </div>

          {/* Skew */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Skew</h3>
            <Slider label="Skew X" value={skewX} onChange={setSkewX} min={-45} max={45} unit="°" />
            <Slider label="Skew Y" value={skewY} onChange={setSkewY} min={-45} max={45} unit="°" />
          </div>

          {/* Perspective */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Perspective</h3>
            <Slider label="Perspective" value={perspective} onChange={setPerspective} min={100} max={2000} step={50} unit="px" />
            <Slider label="Origin X" value={perspectiveOriginX} onChange={setPerspectiveOriginX} min={0} max={100} unit="%" />
            <Slider label="Origin Y" value={perspectiveOriginY} onChange={setPerspectiveOriginY} min={0} max={100} unit="%" />
          </div>

          {/* 3D Settings */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">3D Settings</h3>
            
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Transform Style</span>
              <select
                value={transformStyle}
                onChange={(e) => setTransformStyle(e.target.value as "flat" | "preserve-3d")}
                className="bg-white/10 text-white px-3 py-1 rounded border border-white/20"
              >
                <option value="preserve-3d">preserve-3d</option>
                <option value="flat">flat</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Backface Visibility</span>
              <select
                value={backfaceVisibility}
                onChange={(e) => setBackfaceVisibility(e.target.value as "visible" | "hidden")}
                className="bg-white/10 text-white px-3 py-1 rounded border border-white/20"
              >
                <option value="visible">visible</option>
                <option value="hidden">hidden</option>
              </select>
            </div>
          </div>

          {/* CSS Output */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">CSS Output</h3>
            <div className="bg-black/30 p-3 rounded-lg">
              <code className="text-xs text-green-400 whitespace-pre-wrap break-all">
                transform: {transform.trim()};
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}