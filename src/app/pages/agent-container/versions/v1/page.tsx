"use client";

import {
  ArrowUpIcon,
  ChartBarIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { motion } from "framer-motion";

const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      className="px-4 py-2 cursor-pointer hover:bg-white/20 bg-white/10 transition-all duration-300"
      style={{
        borderRadius: "7px",
        // boxShadow:
        //   "0px 0px 2.8px 0.14px rgba(0, 0, 0, 0.50), 0px 0px 28px 14px rgba(0, 0, 0, 0.50), 0px 0px 28px 2.8px rgba(0, 0, 0, 0.50), 0px 0px 1.824px 0px rgba(255, 255, 255, 0.10) inset, 0px 0px 5.473px 0px rgba(255, 255, 255, 0.10) inset",
        backdropFilter: "blur(7px)",
      }}
    >
      {children}
    </span>
  );
};

export default function AgentContainer() {
  return (
    <div className="h-screen w-screen p-8 flex flex-col gap-12 items-center bg-slate-500 relative">
      <div className="flex items-center gap-4 relative">
        <IconContainer>
          <ChartBarIcon className="w-4 h-4" />
        </IconContainer>
        <IconContainer>
          <ArrowUpIcon className="w-4 h-4" />
        </IconContainer>
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{
            scale: 10,
            y: 200,
          }}
          animate={{
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <div className="bg-white/10 w-[48px] h-[48px] shadow-[inset_0_0_11.5px_0_rgba(255,255,255,0.1),0_4px_16px_0_rgba(14,14,255,0.1),inset_0_0_35.5px_0_rgba(255,255,255,0.1)] backdrop-blur-lg rounded-lg overflow-hidden">
            <img
              src="/assets/girl-plain.png"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        <IconContainer>
          <ShieldCheckIcon className="w-4 h-4" />
        </IconContainer>
        <IconContainer>
          <QrCodeIcon className="w-4 h-4" />
        </IconContainer>
      </div>
    </div>
  );
}
