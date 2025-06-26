"use client";

import {
  ArrowUpIcon,
  ChartBarIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useTransform,
  AnimationPlaybackControls,
} from "framer-motion";

// const DURATION = 0.5;
const BOUNCE = 0.1;

const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.span
      layout
      className="px-4 py-2 cursor-pointer hover:bg-white/20 bg-white/10"
      style={{
        borderRadius: "7px",
        backdropFilter: "blur(7px)",
      }}
      transition={{
        layout: {
          type: "spring",
          //   duration: DURATION,
          bounce: BOUNCE,
        },
      }}
    >
      {children}
    </motion.span>
  );
};

export default function AgentContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [girlRef, setGirlRef] = useState<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const icons = [
    <ChartBarIcon className="w-4 h-4" />,
    <ArrowUpIcon className="w-4 h-4" />,
    <ShieldCheckIcon className="w-4 h-4" />,
    <QrCodeIcon className="w-4 h-4" />,
  ];
  const girlIndex = 2;

  const getGirlDockPosition = () => {
    if (!girlRef) return { y: 0 };
    const rect = girlRef.getBoundingClientRect();
    return {
      y: rect.top + rect.height / 2,
    };
  };

  const x = useMotionValue(0);
  const scale = useTransform(x, (value) => {
    if (value < 30) {
      return 1 - 0.1 * (value / 30);
    } else if (value < 70) {
      return 0.9;
    } else {
      return 0.9 + 0.1 * ((value - 70) / 30);
    }
  });

  const translateZ = useTransform(x, [0, 50, 100], [0, -100, 0]);
  const blur = useTransform(x, [0, 50, 100], [0, 2, 0]);
  const filterBlur = useTransform(blur, (value) =>
    value > 0 ? `blur(${value}px)` : "none"
  );
  const yPos = useTransform(x, [100, 0], [80, getGirlDockPosition().y]);
  const height = useTransform(x, [0, 100], [32, 300]);
  const width = useTransform(x, [0, 100], [48, 550]);
  const borderRadius = useTransform(x, [0, 100], [7, 28]);

  const toggleOpen = async () => {
    // Cancel any ongoing animation
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const currentValue = x.get();
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // Determine target based on new state
    const target = newIsOpen ? 100 : 0;

    // Start new animation and store reference
    animationRef.current = animate(x, target, {
      //   duration: DURATION,
      type: "spring",
      bounce: BOUNCE,
      onComplete: () => {
        animationRef.current = null;
      },
    });
  };

  return (
    <div className="min-h-screen w-full p-8 flex flex-col items-center bg-slate-500 relative perspective-midrange">
      <motion.div
        className="flex items-center gap-4"
        layout
        transition={{
          layout: {
            // duration: DURATION,
            type: "spring",
            bounce: BOUNCE,
          },
        }}
      >
        {icons.slice(0, girlIndex).map((icon, index) => (
          <IconContainer key={`icon-${index}`}>{icon}</IconContainer>
        ))}

        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.div
              ref={setGirlRef}
              key="girl-dock-placeholder"
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                // duration: DURATION,
                type: "spring",
                bounce: BOUNCE,
              }}
              className="w-[48px] h-[32px] bg-transparent"
            />
          )}
        </AnimatePresence>

        {icons.slice(girlIndex).map((icon, index) => (
          <IconContainer key={`icon-${index + girlIndex}`}>
            {icon}
          </IconContainer>
        ))}
      </motion.div>

      <motion.div
        layoutId="animated-girl"
        className="bg-white/10 shadow-[inset_0_0_11.5px_0_rgba(255,255,255,0.1),0_4px_16px_0_rgba(14,14,255,0.1),inset_0_0_35.5px_0_rgba(255,255,255,0.1)] backdrop-blur-lg overflow-hidden relative"
        style={{
          position: "absolute",
          borderRadius: borderRadius,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          scale: scale,
          translateZ: translateZ,
          filter: filterBlur,
          y: yPos,
          width: width,
          height: height,
        }}
      >
        {/* Blurred background layer */}
        <img
          src="/assets/girl-plain.png"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "blur(75px)",
          }}
        />

        {/* Sharp foreground layer with radial mask */}
        <img
          src="/assets/girl-plain.png"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            maskImage: `radial-gradient(
              ellipse at center,
              black 0%,
              black 40%,
              rgba(0, 0, 0, 0.8) 50%,
              rgba(0, 0, 0, 0.5) 60%,
              rgba(0, 0, 0, 0.2) 70%,
              transparent 80%
            )`,
            WebkitMaskImage: `radial-gradient(
              ellipse at center,
              black 0%,
              black 40%,
              rgba(0, 0, 0, 0.8) 50%,
              rgba(0, 0, 0, 0.5) 60%,
              rgba(0, 0, 0, 0.2) 70%,
              transparent 80%
            )`,
          }}
        />
      </motion.div>

      <div className="mt-[400px] w-[550px] text-white">
        <h1 className="text-xl font-bold ml-4">What's happening today</h1>
        <div className="bg-black/10 w-full p-6 rounded-3xl mt-4">
          <h2 className="text-center text-lg font-bold">June 5th 2025</h2>
          <p className="mt-4 text-sm">
            Your assets are performing well with a positive trend.
          </p>
          <p className="mt-4 text-sm">
            Volatility is way up today. There are various reports of increasing
            tensions in the Middle East. You tend to make most of your trades on
            lower volatility days, so proceed with caution today.
          </p>
          <div className="w-full h-[2px] bg-black/15 mt-6 border-b border-white/20"></div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-black/5 p-4 rounded-xl border border-black/10 shadow-[inset_0_0_10px_0_rgba(0,0,0,0.055),0_1px_0.5px_0_rgba(255,255,255,0.12),inset_0_1px_1.5px_0_rgba(0,0,0,0.12)]">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-white/50">Volitility</span>
                <span className="font-bold">1.2%</span>
              </div>
            </div>
            <div className="bg-black/5 p-4 rounded-xl border border-black/10 shadow-[inset_0_0_10px_0_rgba(0,0,0,0.055),0_1px_0.5px_0_rgba(255,255,255,0.12),inset_0_1px_1.5px_0_rgba(0,0,0,0.12)]">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-white/50">Volitility</span>
                <span className="font-bold">1.2%</span>
              </div>
            </div>
            <div className="bg-black/5 p-4 rounded-xl border border-black/10 shadow-[inset_0_0_10px_0_rgba(0,0,0,0.055),0_1px_0.5px_0_rgba(255,255,255,0.12),inset_0_1px_1.5px_0_rgba(0,0,0,0.12)]">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-white/50">Volitility</span>
                <span className="font-bold">1.2%</span>
              </div>
            </div>
          </div>
          <div className="w-full h-[2px] bg-black/15 mt-6 border-b border-white/20"></div>
          <div className="mt-6">
            <p className="text-sm">
              I noticed you have 3.2 ETH that has been sitting idle for a while.
              With current yield rates at 4.2%, you could be putting these
              assets to use.
            </p>
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm">Want me to stake for you?</p>
              <div className="flex flex-row items-center gap-2">
                <button className="bg-black/5 p-2 rounded-xl border border-black/10 shadow-[inset_0_0_10px_0_rgba(0,0,0,0.055),0_1px_0.5px_0_rgba(255,255,255,0.12),inset_0_1px_1.5px_0_rgba(0,0,0,0.12)]">
                  <span className="text-sm text-white/50">No thanks</span>
                </button>
                <button className="bg-black/5 p-2 rounded-xl border border-black/10 shadow-[inset_0_0_10px_0_rgba(0,0,0,0.055),0_1px_0.5px_0_rgba(255,255,255,0.12),inset_0_1px_1.5px_0_rgba(0,0,0,0.12)]">
                  <span className="text-sm text-white">Deposit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-[550px]">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 p-4 bg-black/10 rounded-xl border border-white/20 ring-1 ring-black/20">
            <h2 className="text-white/80">Portfolio</h2>
            <div className="flex flex-col mt-8">
              <span className="text-white">100,434.32</span>
              <span className="text-white">+434.32</span>
            </div>
          </div>
          <div className="col-span-1 p-4 bg-black/10 rounded-xl border border-white/20 ring-1 ring-black/20">
            <h2 className="text-white/80">Security</h2>
            <div className="flex flex-col mt-8">
              <span className="text-white">0 threats</span>
              <span className="text-white text-sm">Agent protect: on</span>
            </div>
          </div>
        </div>
      </div>

      <button className="absolute bottom-8 left-8" onClick={toggleOpen}>
        Toggle
      </button>
    </div>
  );
}
