"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function ColorDodge() {
  const [isOn, setIsOn] = useState(false);
  const circles = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    const id = setInterval(() => {
      setIsOn((isOn) => !isOn);
    }, 1000);

    return () => clearTimeout(id);
  }, [isOn]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[400px] h-[400px] relative bg-[#090909]">
        {circles.map((c, i) => {
          const scale = (i + 1) * 40;
          return (
            <motion.span
              key={i}
              className={`absolute rounded-full mix-blend-color-dodge bg-blend-color-dodge`}
              initial={{
                backgroundColor: "#925353",
              }}
              animate={{
                backgroundColor: isOn ? "#925353" : "#541212",
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              style={{
                height: `${scale}px`,
                width: `${scale}px`,
                top: `${200 - scale / 2}px`,
                left: `${200 - scale / 2}px`,
              }}
            ></motion.span>
          );
        })}
      </div>
    </div>
  );
}
