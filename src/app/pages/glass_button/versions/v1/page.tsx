import React from "react";

export default function GlassButton() {
  return (
    <div className="p-4 h-screen w-screen bg-gray-500">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative">
          <div
            className="w-[90%] h-[80%] bg-gradient-to-t from-[#FFFFFF] to-[#FFFFFF0] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 opacity-15 backdrop-blur-[100px]"
            style={{
              maskImage: "linear-gradient(to top, transparent, black)",
              WebkitMaskImage: "linear-gradient(to top, transparent, black)",
            }}
          ></div>
          <button className="bg-white/5 px-4 py-2 rounded-full bg-blend-luminosity">
            <span
              className="relative bg-gradient-to-t to-[#FFFFFF] from-[#EDEDED30] bg-clip-text text-transparent font-medium"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "0 0 3px rgba(255,255,255,0.3), 0 0 3px rgba(255,255,255,0.3) inset",
                filter: "brightness(1.2)",
              }}
            >
              Click me
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
