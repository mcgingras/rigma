"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

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
    y: 0,
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
  "swap-ring": 0.35,
  "ring-swap": 0.35,
  "swap-idle": 0.2,
  "idle-swap": 0.3,
  "idle-ring": 0.5,
};

const variants = {
  exit: (transition: any) => {
    return {
      ...transition,
      opacity: [1, 0],
      filter: "blur(5px)",
    };
  },
};

const Pill = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <motion.span
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, x: 20, y: 10 },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          },
        },
      }}
      className="rounded-full text-black/80 bg-black/10 hover:bg-black/15 text-xs px-2 py-1 cursor-pointer"
    >
      {children}
    </motion.span>
  );
};

const PortfolioWidget = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="flex justify-between items-start mb-4"
        layoutId="portfolio-header"
      >
        <motion.div layoutId="portfolio-text-content">
          <motion.div
            layoutId="profit-title"
            className="text-xl font-bold text-black/70 mb-1"
          >
            $1,200
          </motion.div>
          <motion.div
            layoutId="profit-subtitle"
            className="text-black/30 text-sm font-medium uppercase tracking-wide"
          >
            Profit
          </motion.div>
          <motion.div
            layoutId="profit-percentage"
            className="text-[#009429] text-sm font-semibold mt-1"
          >
            +1.20%
          </motion.div>
        </motion.div>
        {onClick && (
          <motion.div layoutId="portfolio-plus-icon">
            <PlusCircleIcon
              onClick={onClick}
              className="w-6 h-6 text-black/60 mt-1 cursor-pointer"
            />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="flex-1 relative"
        layoutId="portfolio-chart-container"
      >
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0"
          preserveAspectRatio="none"
          layoutId="portfolio-chart-svg"
        >
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgb(0, 148, 41)" stopOpacity="0.2" />
              <stop
                offset="100%"
                stopColor="rgb(0, 148, 41)"
                stopOpacity="0.05"
              />
            </linearGradient>
          </defs>

          <path
            d="M 0 80 Q 15 70 25 75 T 45 65 T 65 60 T 85 55 T 100 50"
            stroke="rgb(0, 148, 41)"
            strokeWidth="2"
            fill="none"
            className="drop-shadow-sm"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M 0 80 Q 15 70 25 75 T 45 65 T 65 60 T 85 55 T 100 50 L 100 100 L 0 100 Z"
            fill="url(#chartGradient)"
          />

          <circle
            cx="100"
            cy="50"
            r="2"
            fill="rgb(0, 148, 41)"
            className="drop-shadow-sm"
            vectorEffect="non-scaling-stroke"
          />
        </motion.svg>

        <motion.div
          className="absolute inset-0 opacity-10"
          layoutId="portfolio-grid-lines"
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-px bg-gray-300 absolute w-full"
              style={{ top: `${20 + i * 15}px` }}
            ></div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const StreamingText = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, onComplete]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className="h-[90%] w-full ml-2 flex items-center text-xs text-black/70 font-medium">
      {displayedText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

const Idle = ({ onWidgetTransfer }: { onWidgetTransfer?: () => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingComplete, setStreamingComplete] = useState(false);

  useEffect(() => {
    if (expanded) {
      setTimeout(() => {
        setIsStreaming(true);
      }, 300);
    } else {
      setIsStreaming(false);
      setStreamingComplete(false);
    }
  }, [expanded]);

  const handleStreamingComplete = () => {
    setIsStreaming(false);
    setStreamingComplete(true);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "k") {
      const newExpanded = !expanded;
      setExpanded(newExpanded);
      setShowOptions(false);
      setShowWidget(false);

      if (newExpanded) {
        setIsStreaming(false);
        setStreamingComplete(false);
        setTimeout(() => {
          setIsStreaming(true);
        }, 300);
      } else {
        setIsStreaming(false);
        setStreamingComplete(false);
      }
    }

    if (event.key === "Enter") {
      setShowWidget(true);
    }

    if (event.metaKey && event.key === "i") {
      setShowOptions((prev) => !prev);
    }

    if (event.key === "Escape") {
      setShowWidget(false);
      setExpanded(false);
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
      className="relative block"
      animate={{
        width: expanded ? 400 : 50,
        height: expanded ? (showWidget ? 296 : showOptions ? 80 : 50) : 40,
        marginTop: expanded ? 10 : 0,
      }}
      transition={{ type: "spring", bounce: expanded ? 0.3 : 0.2 }}
    >
      <div className="h-full w-full p-1">
        <div className="flex items-center">
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
            <>
              {isStreaming ? (
                <StreamingText
                  text="Hi, I'm agent. Select a widget to get started."
                  onComplete={handleStreamingComplete}
                />
              ) : streamingComplete ? (
                <>
                  {showWidget ? (
                    <p className="h-[90%] w-full ml-2 flex items-center text-xs text-black/70 font-medium">
                      Click the plus to add the widget to your homepage.
                    </p>
                  ) : (
                    <p className="h-[90%] w-full ml-2 flex items-center text-xs text-black/70 font-medium">
                      Hi, I'm agent. Select a widget to get started.
                    </p>
                  )}
                </>
              ) : null}
            </>
          )}
        </div>
        {showOptions && (
          <AnimatePresence mode="popLayout">
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="mt-4 flex-row flex items-center gap-2 w-full"
            >
              <Pill onClick={() => setShowWidget(!showWidget)}>
                Check portfolio
              </Pill>
              <Pill onClick={() => setShowWidget(!showWidget)}>
                See transactions
              </Pill>
              <Pill onClick={() => setShowWidget(!showWidget)}>
                Research tokens
              </Pill>
            </motion.div>
          </AnimatePresence>
        )}
        {showWidget && (
          <AnimatePresence mode="popLayout">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 26.7,
                damping: 4.1,
                mass: 0.2,
                // delay: 0.05,
              }}
              className="w-full h-[200px] mt-4 rounded-lg overflow-hidden"
              layoutId="portfolio-container"
            >
              <PortfolioWidget
                onClick={() => {
                  setShowWidget(false);
                  onWidgetTransfer?.();
                }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default function DynamicIsland() {
  const [variantKey, setVariantKey] = useState<string>("idle");
  const [view, setView] = useState<"idle" | "swap" | "agent-with-text">("idle");
  const [showDashboardWidget, setShowDashboardWidget] = useState(false);

  const handleWidgetTransfer = () => {
    setShowDashboardWidget(true);
  };

  const content = useMemo(() => {
    switch (view) {
      case "idle":
        return <Idle onWidgetTransfer={handleWidgetTransfer} />;
    }
  }, [view]);

  return (
    <div className="h-screen w-screen bg-[url('/assets/grad.png')] p-8 flex flex-col justify-between">
      <motion.div
        layout
        transition={{
          type: "spring",
          bounce: BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
        }}
        style={{ borderRadius: 32 }}
        className="mx-auto w-fit overflow-hidden rounded-full bg-white/10 backdrop-blur-lg shadow-2xl p-2 border border-white/30"
      >
        <motion.div
          transition={{
            type: "spring",
            bounce: BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
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
          <div
            className="h-full w-full bg-white/70 backdrop-blur-lg shadow p-2 border border-black/5"
            style={{
              borderRadius: 24,
            }}
          >
            {content}
          </div>
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
      <div className="flex-1 grid grid-cols-8 gap-4">
        <div className="col-span-1">
          <AnimatePresence>
            {showDashboardWidget && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -100 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.6,
                }}
                className="w-full bg-white/70 backdrop-blur-lg shadow p-2 border border-black/5 aspect-square self-start"
                style={{
                  borderRadius: 24,
                }}
                layoutId="portfolio-container"
              >
                <div className="h-full w-full overflow-hidden rounded-2xl">
                  <PortfolioWidget />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
