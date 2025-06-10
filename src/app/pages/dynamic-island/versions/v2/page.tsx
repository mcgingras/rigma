"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ANIMATION_VARIANTS = {
  "ring-idle": {
    scale: 1.1,
    bounce: 0.5,
  },
  "swap-ring": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  "ring-swap": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "swap-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
  "idle-swap": {
    scale: 1.4,
    y: 7,
    bounce: 0.3,
  },
  "idle-ring": {
    scale: 0.9,
    bounce: 0.5,
  },
};

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "ring-idle": 0.5,
  "timer-ring": 0.35,
  "ring-timer": 0.35,
  "timer-idle": 0.3,
  "idle-timer": 0.3,
  "idle-ring": 0.5,
};

const variants = {
  exit: (transition: any) => {
    console.log(transition);
    return {
      ...transition,
      opacity: [1, 0],
      filter: "blur(5px)",
    };
  },
};

function Swap() {
  return (
    <div className="flex h-[150px] w-[284px] items-center gap-2 py-3 pl-3.5 pr-3">
      <div className="h-full w-full bg-gray-100 rounded-[20px] p-4">
        <h2 className="text-lg font-bold text-gray-500">Swap</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-6 w-6 bg-gray-300 rounded-full block"></span>
          <span className="text-sm text-gray-500">Token A</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-6 w-6 bg-gray-300 rounded-full block"></span>
          <span className="text-sm text-gray-500">Token B</span>
        </div>
      </div>
    </div>
  );
}

const AgentWithText = () => {
  return (
    <div className="h-12 w-[300px] block">
      <div className="h-full w-full flex items-center">
        <div
          className="h-10 w-10 ml-2 aspect-square border rounded-full"
          style={{
            backgroundImage: `url(/assets/girl.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
};

const Idle = () => {
  const [expanded, setExpanded] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "k") {
      setExpanded((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      setExpanded(false);
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="relative h-10 block"
      animate={{ width: expanded ? 200 : 40 }}
      transition={{ type: "spring", bounce: expanded ? 0.5 : 0.2 }}
    >
      <div className="h-full w-full flex items-center">
        <div
          className="h-8 w-8 ml-1 aspect-square rounded-full"
          style={{
            backgroundImage: `url(/assets/girl.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {expanded && (
          <input
            className="h-[90%] w-full bg-white/10 border-none outline-none text-black text-xs ml-2"
            placeholder="Ask me anything..."
          />
        )}
      </div>
    </motion.div>
  );
};

export default function DynamicIsland() {
  const [variantKey, setVariantKey] = useState<string>("idle");
  const [view, setView] = useState<"idle" | "swap" | "agent-with-text">("idle");

  const content = useMemo(() => {
    switch (view) {
      case "swap":
        return <Swap />;
      case "agent-with-text":
        return <AgentWithText />;
      case "idle":
        return <Idle />;
    }
  }, [view]);

  return (
    <div className="h-screen w-screen bg-gray-200 p-4">
      <div className="relative flex h-full w-full flex-col justify-between">
        <motion.div
          layout
          transition={{
            type: "spring",
            bounce: BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
          }}
          style={{ borderRadius: 32 }}
          className="mx-auto w-fit overflow-hidden rounded-full bg-white"
        >
          <motion.div
            transition={{
              type: "spring",
              bounce:
                BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
            }}
            initial={{
              scale: 0.9,
              opacity: 0,
              filter: "blur(5px)",
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              originX: 0.5,
              originY: 0.5,
              transition: {
                delay: 0.05,
              },
            }}
            key={view}
          >
            {content}
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-0 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
          <AnimatePresence
            mode="popLayout"
            custom={
              ANIMATION_VARIANTS[variantKey as keyof typeof ANIMATION_VARIANTS]
            }
          >
            <motion.div
              initial={{ opacity: 0 }}
              exit="exit"
              variants={variants}
              key={view}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex w-full justify-center gap-4">
          {["idle", "swap", "agent-with-text"].map((v) => (
            <button
              type="button"
              className="rounded-full capitalize w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 hover:bg-gray-50"
              onClick={() => {
                setView(v as "idle" | "swap" | "agent-with-text");
                setVariantKey(`${view}-${v}`);
              }}
              key={v}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
