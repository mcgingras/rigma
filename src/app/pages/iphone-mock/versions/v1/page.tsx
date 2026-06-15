"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { BorderBeam } from "border-beam";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "sheet" | "video" | "toast" | "complete";

const VIDEO_DURATION = 1270; // ms (1900ms at 1.5x speed)
const PILL_LEAD_TIME = 200; // show pill this many ms before video ends
const PILL_EXPAND_DELAY = 1500; // ms after pill appears before expanding

export default function IPhoneMockPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showPill, setShowPill] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pillTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const expandTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSheetAction = useCallback(() => {
    setPhase("video");
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.playbackRate = 1.5;
      vid.play();
    }
    // Show pill early
    pillTimerRef.current = setTimeout(() => {
      setShowPill(true);
    }, VIDEO_DURATION - PILL_LEAD_TIME);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setPhase("toast");
    // Expand pill into card after delay
    expandTimerRef.current = setTimeout(() => {
      setExpanded(true);
      setPhase("complete");
    }, PILL_EXPAND_DELAY);
  }, []);

  const handleRowClick = useCallback(() => {
    setShowPill(false);
    setExpanded(false);
    if (pillTimerRef.current) clearTimeout(pillTimerRef.current);
    if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
    setPhase("sheet");
  }, []);

  useEffect(() => {
    return () => {
      if (pillTimerRef.current) clearTimeout(pillTimerRef.current);
      if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
    };
  }, []);

  return (
    <main className="h-screen w-screen bg-black flex items-center justify-center">
      {/* iPhone frame */}
      <div
        className="relative bg-zinc-950 border border-zinc-800 overflow-hidden"
        style={{ width: 375, height: 812, borderRadius: 48 }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-black rounded-b-3xl z-30" />

        {/* App content */}
        <div className="absolute inset-0 z-10 flex flex-col px-5 pt-14 pb-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h1 className="text-[32px] font-bold text-white leading-tight">
                $42,180
              </h1>
              <p className="text-sm text-green-400 mt-0.5">
                <span className="text-green-400">▲</span> $10.39 · 3.4%{" "}
                <span className="text-zinc-500">today</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden mt-1">
              <div className="w-full h-full bg-gradient-to-br from-zinc-500 to-zinc-700" />
            </div>
          </div>

          {/* Chart area */}
          <div className="flex-1 flex items-center justify-center my-2">
            <svg
              viewBox="0 0 300 120"
              className="w-full h-[140px]"
              fill="none"
            >
              <polyline
                points="10,95 30,90 50,85 70,88 90,80 110,75 130,70 150,68 170,60 190,55 210,45 230,40 250,35 260,30 270,38 280,32 290,35"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Time range tabs */}
          <div className="flex items-center gap-5 mb-6">
            {["1D", "1W", "1M", "6M", "1Y", "All"].map((t, i) => (
              <span
                key={t}
                className={`text-sm ${
                  i === 0 ? "text-white font-medium" : "text-zinc-500"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Section tabs */}
          <div className="flex items-center gap-2 mb-4">
            {["Holdings", "Tasks", "Activity"].map((t, i) => (
              <span
                key={t}
                className={`text-sm px-4 py-1.5 rounded-full ${
                  i === 0
                    ? "bg-zinc-800 text-white border border-zinc-700"
                    : "text-zinc-500"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Perps label */}
          <p className="text-xs text-zinc-500 mb-3">Perps</p>

          {/* Holdings list */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleRowClick}
              className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white">
                  W
                </div>
                <span className="text-sm text-white">
                  WLD · <span className="text-zinc-400">Long 3x</span>
                </span>
              </div>
              <span className="text-sm text-green-400">▲ $876.55 · 2.2%</span>
            </button>

            <button
              onClick={handleRowClick}
              className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-xs font-bold text-purple-300">
                  H
                </div>
                <span className="text-sm text-white">
                  HYPE · <span className="text-zinc-400">Short 5x</span>
                </span>
              </div>
              <span className="text-sm text-red-400">▼ $204.22 · 1.9%</span>
            </button>

            <button
              onClick={handleRowClick}
              className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-xs font-bold text-blue-300">
                  E
                </div>
                <span className="text-sm text-white">
                  ETH · <span className="text-zinc-400">Long 10x</span>
                </span>
              </div>
              <span className="text-sm text-green-400">
                ▲ $100,376.98 · 7.4%
              </span>
            </button>
          </div>
        </div>

        {/* Video overlay */}
        <video
          ref={videoRef}
          src="/assets/gradient_0.mp4"
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: phase === "video" ? 1 : 0,
            mixBlendMode: "screen",
          }}
        />

        {/* Bottom sheet */}
        <AnimatePresence>
          {phase === "sheet" && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-950 rounded-t-3xl flex flex-col"
              style={{ height: "90%" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <div className="flex items-center gap-3">
                  <button className="text-white text-lg">✕</button>
                  <span className="text-white text-sm font-medium">
                    Gavin Newsom · Buy Yes
                  </span>
                </div>
                <span className="text-zinc-500 text-lg">↗</span>
              </div>

              {/* Amount display */}
              <div className="flex-1 flex flex-col items-center pt-10">
                <div className="flex items-start">
                  <span className="text-zinc-400 text-lg mt-2 mr-1">$</span>
                  <span className="text-white text-7xl font-light">0</span>
                </div>
                <p className="text-zinc-500 text-sm mt-3">
                  2.95x payout · Avg 33¢
                </p>
              </div>

              {/* Wallet + order type */}
              <div className="flex items-center justify-center gap-4 mb-4 px-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    A
                  </div>
                  <span className="text-white text-sm">$204.98</span>
                  <span className="text-zinc-500 text-xs">⌄</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm">Market order</span>
                  <span className="text-zinc-500 text-xs">⌄</span>
                </div>
              </div>

              {/* Quick amount buttons */}
              <div className="grid grid-cols-3 gap-2 px-5 mb-3">
                {["$10", "$50", "Max"].map((label) => (
                  <button
                    key={label}
                    onClick={label === "$50" ? handleSheetAction : undefined}
                    className="flex items-center justify-center py-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer"
                  >
                    <span className="text-white text-sm font-medium">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Number pad */}
              <div className="grid grid-cols-3 px-5 pb-6">
                {[
                  "1", "2", "3",
                  "4", "5", "6",
                  "7", "8", "9",
                  ".", "0", "←",
                ].map((key) => (
                  <button
                    key={key}
                    className="flex items-center justify-center py-4 text-white text-xl font-light cursor-pointer"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic island pill / card */}
        <AnimatePresence>
          {showPill && (
            <motion.div
              initial={{
                y: -60,
                opacity: 0,
                scale: 0.4,
                filter: "blur(12px)",
                top: 48,
                left: 108,
                right: 108,
                height: 36,
                borderRadius: 18,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                top: expanded ? 56 : 48,
                left: expanded ? 20 : 108,
                right: expanded ? 20 : 108,
                height: expanded ? 230 : 36,
                borderRadius: expanded ? 16 : 18,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                filter: "blur(8px)",
              }}
              transition={{
                // enter
                y: { type: "spring", stiffness: 400, damping: 22, mass: 0.8 },
                opacity: { duration: 0.12 },
                filter: { duration: 0.25, delay: 0.1 },
                scale: { duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                // morph
                top: { duration: 0.5, ease: [0.4, 0, 0, 1] },
                left: { duration: 0.5, ease: [0.4, 0, 0, 1] },
                right: { duration: 0.5, ease: [0.4, 0, 0, 1] },
                height: { duration: 0.5, ease: [0.4, 0, 0, 1] },
                borderRadius: { duration: 0.5, ease: [0.4, 0, 0, 1] },
                exit: { duration: 0.3 },
              }}
              className="absolute z-30"
            >
              {/* Background — clips content, inherits animated border-radius */}
              <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 overflow-hidden" style={{
                borderRadius: "inherit",
              }} />

              {/* Pill content */}
              <AnimatePresence initial={false}>
                {!expanded && (
                  <motion.div
                    key="pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex items-center justify-center gap-2 px-5 z-10"
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shrink-0" />
                    <span className="text-sm text-zinc-200 font-medium whitespace-nowrap">
                      Swapping tokens...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card content */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute inset-0 p-5 z-10"
                  >
                    {/* Success header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-lg">✓</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          Swap complete
                        </p>
                        <p className="text-zinc-500 text-xs">Just now</p>
                      </div>
                    </div>

                    {/* Swap details */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-900/50 flex items-center justify-center text-xs font-bold text-blue-300">
                          E
                        </div>
                        <div>
                          <p className="text-white text-sm">50.00 USDC</p>
                          <p className="text-zinc-500 text-xs">Ethereum</p>
                        </div>
                      </div>
                      <span className="text-zinc-500 text-sm">→</span>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-white text-sm text-right">
                            0.0142 ETH
                          </p>
                          <p className="text-zinc-500 text-xs text-right">
                            Ethereum
                          </p>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-purple-900/50 flex items-center justify-center text-xs font-bold text-purple-300">
                          Ξ
                        </div>
                      </div>
                    </div>

                    {/* Details rows */}
                    <div className="border-t border-zinc-800 pt-3 flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 text-xs">Rate</span>
                        <span className="text-zinc-300 text-xs">
                          1 ETH = $3,521.12
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 text-xs">
                          Network fee
                        </span>
                        <span className="text-zinc-300 text-xs">$0.42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 text-xs">
                          Transaction
                        </span>
                        <span className="text-zinc-400 text-xs font-mono">
                          0x8f2a...c4d1
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Border beam glow — only in pill state */}
              <AnimatePresence>
                {!expanded && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ borderRadius: "inherit" }}
                  >
                    <BorderBeam
                      size="sm"
                      colorVariant="colorful"
                      theme="dark"
                      borderRadius={18}
                    >
                      <div style={{ width: "100%", height: 36 }} />
                    </BorderBeam>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
