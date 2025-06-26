"use client";

import {
  ArrowUpIcon,
  ChartBarIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";

const DURATION = 1;
const BOUNCE = 0.25;

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
          duration: DURATION,
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
  const icons = [
    <ChartBarIcon className="w-4 h-4" />,
    <ArrowUpIcon className="w-4 h-4" />,
    <ShieldCheckIcon className="w-4 h-4" />,
    <QrCodeIcon className="w-4 h-4" />,
  ];
  const girlIndex = 2; // Girl appears between arrow and shield

  // Calculate the position of the girl in the dock
  const getGirlDockPosition = () => {
    if (!girlRef) return { x: 0, y: 0 };
    const rect = girlRef.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const x = useMotionValue(-100);
  const rotateX = useTransform(x, [-100, 0, 100], [0, 30, 0]);
  const xPos = useTransform(x, [-100, 100], [getGirlDockPosition().x, 0]);
  const yPos = useTransform(x, [-100, 100], [getGirlDockPosition().y, 80]);

  const toggleOpen = async () => {
    const xValue = x.get();
    setIsOpen(!isOpen);
    animate(x, xValue * -1, {
      duration: DURATION,
      ease: "easeInOut",
    });
  };

  return (
    <div className="h-screen w-screen p-8 flex flex-col items-center bg-slate-500 relative perspective-midrange">
      <motion.div
        className="flex items-center gap-4"
        layout
        transition={{
          layout: {
            duration: DURATION,
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
                duration: DURATION,
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
          borderRadius: isOpen ? 7 : 7,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          rotateX: rotateX,
          x: xPos,
          y: yPos,
        }}
        animate={{
          width: isOpen ? 400 : 48,
          height: isOpen ? 222 : 32,

          //   scale: isOpen ? [0.95, 1.02, 1] : [1, 1.02, 0.95],
        }}
        transition={{
          duration: DURATION,
          type: "spring",
          bounce: BOUNCE,
        }}
      >
        <img
          src="/assets/girl-plain.png"
          className="w-full h-full object-cover"
        />
        <img
          src="/assets/subsvg.svg"
          className="absolute top-0 left-0 blur-lg"
        />
      </motion.div>

      <button className="absolute bottom-8 left-8" onClick={toggleOpen}>
        Toggle
      </button>
    </div>
  );
}
