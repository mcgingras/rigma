"use client";
import React, { useState, useRef, useCallback } from "react";

interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

export default function FourFinger() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [gestureProgress, setGestureProgress] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const touchesRef = useRef<TouchPoint[]>([]);
  const gestureStartRef = useRef<{ centerX: number; centerY: number; avgDistance: number } | null>(null);

  const addDebug = (message: string) => {
    setDebugInfo(prev => [...prev.slice(-5), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const calculateCenter = (touches: TouchPoint[]) => {
    const centerX = touches.reduce((sum, touch) => sum + touch.x, 0) / touches.length;
    const centerY = touches.reduce((sum, touch) => sum + touch.y, 0) / touches.length;
    return { centerX, centerY };
  };

  const calculateAverageDistance = (touches: TouchPoint[], center: { centerX: number; centerY: number }) => {
    return touches.reduce((sum, touch) => {
      const distance = Math.sqrt(Math.pow(touch.x - center.centerX, 2) + Math.pow(touch.y - center.centerY, 2));
      return sum + distance;
    }, 0) / touches.length;
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touches = Array.from(e.touches).map((touch, index) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));

    touchesRef.current = touches;
    addDebug(`Touch Start: ${touches.length} touches`);

    if (touches.length === 3) {
      const center = calculateCenter(touches);
      const avgDistance = calculateAverageDistance(touches, center);
      gestureStartRef.current = { ...center, avgDistance };
      addDebug(`3-finger gesture started. Avg distance: ${avgDistance.toFixed(1)}`);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    addDebug(`Touch Move: ${e.touches.length} touches`);
    
    if (e.touches.length === 3 && gestureStartRef.current) {
      const touches = Array.from(e.touches).map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }));

      const center = calculateCenter(touches);
      const avgDistance = calculateAverageDistance(touches, center);
      const initialDistance = gestureStartRef.current.avgDistance;
      
      const convergenceRatio = Math.max(0, 1 - (avgDistance / initialDistance));
      const progress = Math.min(1, convergenceRatio * 2);
      
      setGestureProgress(progress);
      addDebug(`Convergence: ${(convergenceRatio * 100).toFixed(1)}%, Progress: ${(progress * 100).toFixed(1)}%`);

      if (progress > 0.7) {
        setOverlayVisible(true);
        addDebug(`Overlay triggered! Progress: ${(progress * 100).toFixed(1)}%`);
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    addDebug(`Touch End: ${e.touches.length} touches remaining`);
    
    if (e.touches.length < 3) {
      gestureStartRef.current = null;
      setGestureProgress(0);
      addDebug(`Gesture ended, resetting`);
      
      setTimeout(() => {
        setOverlayVisible(false);
      }, 100);
    }
  }, []);

  return (
    <div 
      className="relative w-full h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onPointerDown={(e) => addDebug(`Pointer Down: ${e.pointerType}`)}
      onPointerMove={(e) => addDebug(`Pointer Move: ${e.pointerType}`)}
      onPointerUp={(e) => addDebug(`Pointer Up: ${e.pointerType}`)}
    >
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Three Finger Gesture</h1>
        <p className="text-lg text-gray-600 mb-4">
          Use three fingers and converge them to a point to trigger the overlay
        </p>
        <div className="text-sm text-gray-500 mb-4">
          Gesture Progress: {Math.round(gestureProgress * 100)}%
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg max-h-48 overflow-y-auto">
          <h3 className="font-bold text-sm mb-2">Debug Log:</h3>
          <p className="text-xs text-blue-600 mb-2">Touch support: {typeof window !== 'undefined' && 'ontouchstart' in window ? 'Yes' : 'No'}</p>
          {debugInfo.length === 0 ? (
            <p className="text-xs text-gray-400">No touch events yet... Try using trackpad with 3 fingers</p>
          ) : (
            <div className="space-y-1">
              {debugInfo.map((info, index) => (
                <p key={index} className="text-xs font-mono text-gray-600">{info}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {overlayVisible && (
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            opacity: gestureProgress,
            transform: `scale(${0.8 + gestureProgress * 0.2})`,
          }}
        >
          <div className="text-center text-white">
            <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="text-4xl">✨</div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Gesture Activated!</h2>
            <p className="text-lg opacity-80">Three finger convergence detected</p>
          </div>
        </div>
      )}
    </div>
  );
}
