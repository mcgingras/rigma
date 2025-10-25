"use client";

import {
  ArrowUpIcon,
  ChartBarIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";
import {
  motion,
  animate,
  useScroll,
  useTransform,
  AnimationPlaybackControls,
} from "framer-motion";

// const DURATION = 0.5;
const BOUNCE = 0.1;

const IconContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      layout
      className={`px-4 py-2 cursor-pointer hover:bg-white/20 bg-white/10 ${className}`}
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
  const [isOpen, setIsOpen] = useState(true);
  const [girlRef, setGirlRef] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const { scrollYProgress } = useScroll();
  const [hasNudge, setHasNudge] = useState(false);

  const icons = [
    <ChartBarIcon className="w-4 h-4" />,
    <ArrowUpIcon className="w-4 h-4" />,
    <ShieldCheckIcon className="w-4 h-4" />,
    <QrCodeIcon className="w-4 h-4" />,
  ];
  const girlIndex = 2;

  const x = useTransform(scrollYProgress, [0, 0.37], [100, 0]);
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
  const yPos = useTransform(x, [100, 0], [80, 0]);
  const height = useTransform(x, [0, 100], [32, !hasNudge ? 300 : 600]);
  const width = useTransform(x, [0, 100], [48, 550]);
  const borderRadius = useTransform(x, [0, 100], [7, 28]);
  const smallWidth = useTransform(x, [0, 100], [48, 0]);

  const toggleOpen = async () => {
    // Cancel any ongoing animation
    if (animationRef.current) {
      animationRef.current.stop();
    }

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
    <div className="min-h-screen w-full p-8 flex flex-col items-center bg-gradient-to-b to-[#DCC4C4] from-[#A0AADA] relative perspective-midrange">
      <div className="w-fit flex flex-col items-center sticky top-8 px-2 py-2 bg-white/20 rounded-xl">
        <motion.div
          className="flex items-center gap-2"
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
          <motion.div
            ref={setGirlRef}
            key="girl-dock-placeholder"
            style={{
              width: smallWidth,
            }}
            className="h-[32px] bg-transparent"
          />
          {icons.slice(girlIndex).map((icon, index) => (
            <IconContainer key={`icon-${index + girlIndex}`}>
              {icon}
            </IconContainer>
          ))}
        </motion.div>
        <motion.div
          layoutId="animated-girl"
          ref={containerRef}
          className="bg-white/20 shadow-[inset_0_0_11.5px_0_rgba(255,255,255,0.1),0_4px_16px_0_rgba(255,255,255,0.1),inset_0_0_35.5px_0_rgba(255,255,255,0.1)] overflow-hidden relative backdrop-blur-2xl z-50"
          onClick={() => {
            const startPosition = window.pageYOffset;
            const targetPosition = 0;
            const distance = targetPosition - startPosition;

            animate(0, 1, {
              type: "spring",
              bounce: 0.2,
              onUpdate: (progress) => {
                window.scrollTo(0, startPosition + distance * progress);
              },
            });
          }}
          style={{
            position: "absolute",
            borderRadius: borderRadius,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            // transformStyle: "preserve-3d",
            // transformOrigin: "center center",
            // scale: scale,
            // translateZ: translateZ,
            // filter: filterBlur,
            y: yPos,
            width: width,
            height: height,
          }}
        >
          <div className="relative w-full h-[300px]">
            <div
              className="absolute w-[90%] h-[80%] top-[5%] left-[5%]"
              style={{
                zIndex: 100,
                background:
                  "radial-gradient(#FF001A 0%, rgba(255, 0, 26, 0.00) 100%)",
                mixBlendMode: "overlay",
                filter: "blur(45px)",
              }}
            ></div>
            <div
              className="absolute w-[90%] h-[80%] top-[5%] left-[5%]"
              style={{
                opacity: "0.5",
                background:
                  "radial-gradient(44.68% 74.38% at 50% 50%, rgba(244, 165, 95, 0.65) 0%, rgba(255, 111, 0, 0.00) 100%)",
                mixBlendMode: "overlay",
                filter: "blur(46.24513244628906px)",
              }}
            ></div>
            <img
              src="/assets/girl-plain.png"
              className="absolute inset-0 w-full h-[300px] object-cover"
              style={{
                filter: "blur(75px)",
              }}
            />

            <img
              src="/assets/girl-plain.png"
              className="absolute inset-0 w-full h-[300px] object-cover"
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
          </div>
          {hasNudge && (
            <div className="w-full px-4 pb-4 h-[300px]">
              <div className="bg-black/15 w-full h-full p-6 rounded-3xl">
                <p className="text-lg font-bold">
                  $BRIDGE: Major Security Breach
                </p>
                <p className="text-sm text-white/50 mt-2">
                  Token dropped 10% in 10 minutes
                </p>
                <p className="text-sm mt-4">
                  $BRIDGE is a new token that is designed to be a secure and
                  reliable bridge between the Ethereum and Polygon networks.
                </p>
                <div className="w-full h-[2px] bg-black/15 mt-6 border-b border-white/20"></div>
                <p className="mt-4">Your impacted positions</p>
                <div className="h-[50px] w-full rounded-lg bg-black/10 mt-4"></div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* <div className="h-[600px] w-[550px] absolute bg-white/10 backdrop-blur-2xl z-50"></div> */}

      <div className="mt-[700px] w-[550px] text-white">
        <h1 className="text-xl font-bold ml-4">What's happening today</h1>
        <div className="bg-black/10 w-full p-6 rounded-3xl mt-4">
          <h2 className="text-center text-lg font-bold">June 5th 2025</h2>
          <p className="mt-4 text-sm">
            Your assets are performing well with a positive trend.
          </p>
          <p className="mt-4 text-sm">Volatility is way up today.</p>
          <p className="mt-4 text-sm">
            There are various reports of increasing tensions in the Middle East.
            You tend to make most of your trades on lower volatility days, so
            proceed with caution today.
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

      <div className="mt-6 w-[550px] text-white">
        <h1 className="text-xl font-bold ml-4">What happened yesterday</h1>
        <div className="bg-black/10 w-full p-6 rounded-3xl mt-4">
          <h2 className="text-center text-lg font-bold">June 4th 2025</h2>
          <p className="mt-4 text-sm">
            Your assets are performing well with a positive trend.
          </p>
          <p className="mt-4 text-sm">Volatility is way up today.</p>
          <p className="mt-4 text-sm">
            There are various reports of increasing tensions in the Middle East.
            You tend to make most of your trades on lower volatility days, so
            proceed with caution today.
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

      <button className="absolute top-8 left-8" onClick={toggleOpen}>
        Toggle
      </button>
      <button
        className="absolute top-8 left-32"
        onClick={() => setHasNudge(!hasNudge)}
      >
        {hasNudge ? "Nudge" : "No nudge"}
      </button>
    </div>
  );
}
