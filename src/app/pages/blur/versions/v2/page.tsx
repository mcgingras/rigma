"use client";

import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import React from "react";
import localFont from "next/font/local";

const formulaNeutral = localFont({
  src: [
    {
      path: "../../../../../fonts/formular-neutral-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../../fonts/formular-neutral-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../../fonts/formular-neutral-bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-custom-sans",
});

export default function BlurPage() {
  return (
    <main
      className="h-screen w-screen bg-white flex flex-col items-center justify-center space-y-2"
      style={{ fontFamily: formulaNeutral.style.fontFamily }}
    >
      <div className="relative">
        <ProgressiveBlur
          blurStart={0}
          blurEnd={80}
          direction="to-bottom"
          layers={10}
          className="rounded-2xl"
        >
          <div
            className="h-[400px] w-[400px] rounded-2xl"
            style={{
              backgroundImage: "url(/assets/girl.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </ProgressiveBlur>
        <div className="absolute bottom-0 left-0 p-8">
          <h4 className="text-4xl font-bold mb-2">Agent!</h4>
          <p className="text-base text-white/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    </main>
  );
}
