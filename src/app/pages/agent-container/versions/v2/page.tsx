"use client";

import {
  ArrowUpIcon,
  ChartBarIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.span
      layout
      className="px-4 py-2 cursor-pointer hover:bg-white/20 bg-white/10 transition-colors duration-300"
      style={{
        borderRadius: "7px",
        backdropFilter: "blur(7px)",
      }}
      transition={{
        layout: {
          duration: 0.5,
          ease: "easeInOut",
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

  return (
    <div className="h-screen w-screen p-8 flex flex-col items-center bg-slate-500 relative">
      <motion.div
        className="flex items-center gap-4"
        layout
        transition={{
          layout: {
            duration: 0.5,
            ease: "easeInOut",
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
                duration: 0.3,
                ease: "easeInOut",
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

      {/* Animated girl that transitions between positions */}
      <motion.div
        layoutId="animated-girl"
        className="bg-white/10 shadow-[inset_0_0_11.5px_0_rgba(255,255,255,0.1),0_4px_16px_0_rgba(14,14,255,0.1),inset_0_0_35.5px_0_rgba(255,255,255,0.1)] backdrop-blur-lg overflow-hidden"
        style={{
          position: "absolute",
          borderRadius: isOpen ? 7 : 7,
        }}
        animate={{
          width: isOpen ? 400 : 48,
          height: isOpen ? 320 : 32,
          x: isOpen ? 0 : getGirlDockPosition().x,
          y: isOpen ? 80 : getGirlDockPosition().y,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <img
          src="/assets/girl-plain.png"
          className="w-full h-full object-cover"
          //   style={{ maxHeight: isOpen ? "320px" : "32px" }}
        />
        {isOpen && (
          <div className="h-1/2 w-1/2 bg-white/10 rounded-[45px]"></div>
        )}
      </motion.div>

      <button
        className="absolute bottom-8 left-8"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Toggle
      </button>
    </div>
  );
}
