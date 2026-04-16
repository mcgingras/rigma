"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";

const genIntervals = () => {
  const intervals = new Array(50).fill(0).reduce((acc: any, _, index: any) => {
    // Start with a base value if it's the first item
    if (index === 0) {
      const height = 100 + Math.random() * 200; // Random height between 100-300
      const offset = 50 + Math.random() * 50; // Random offset between 50-100

      // Ensure offset + height is > 20 and <= 400
      const totalHeight = Math.min(400, Math.max(21, offset + height));
      const adjustedHeight = totalHeight - offset;

      acc.push({
        height: adjustedHeight,
        offset: offset,
      });
      return acc;
    }

    // Get the previous candle
    const prevCandle = acc[index - 1];
    const prevTop = prevCandle.offset;
    const prevBottom = prevCandle.offset + prevCandle.height;

    // Generate a new candle that overlaps with the previous one
    // First, determine the range where overlap can occur
    const overlapMin = Math.max(0, prevTop - 300); // Ensure we don't go below 0
    const overlapMax = prevBottom;

    // Generate random offset that might overlap
    let newOffset = overlapMin + Math.random() * (overlapMax - overlapMin);

    // Calculate height constraints
    const minHeight = Math.max(20, 21 - newOffset); // Ensure total height > 20
    const maxHeight = 400 - newOffset; // Ensure total height <= 400

    // Generate random height within constraints
    let newHeight = minHeight + Math.random() * (maxHeight - minHeight);

    // Ensure there's actual overlap with previous candle
    const newBottom = newOffset + newHeight;
    if (newBottom < prevTop || newOffset > prevBottom) {
      // No overlap - adjust to force overlap
      if (Math.random() > 0.5) {
        // Adjust offset to create overlap at top
        const adjustedOffset = prevBottom - (20 + Math.random() * 80);
        newOffset = Math.max(0, adjustedOffset);
        newHeight = minHeight + Math.random() * (maxHeight - minHeight);
      } else {
        // Adjust height to create overlap at bottom
        newHeight = prevTop - newOffset + (20 + Math.random() * 80);
        // Ensure we don't exceed max height
        newHeight = Math.min(newHeight, maxHeight);
      }
    }

    // Final validation
    if (newOffset + newHeight <= 20) {
      newHeight = 21 - newOffset; // Force minimum total height
    }
    if (newOffset + newHeight > 400) {
      newHeight = 400 - newOffset; // Force maximum total height
    }

    acc.push({
      height: newHeight,
      offset: newOffset,
    });

    return acc;
  }, []);
  return intervals;
};

const PADDING = 8;

const PortfolioCustomChart = () => {
  const params = useSearchParams();
  const queryString = params.toString();
  const [queryChanging, setQueryChanging] = useState(false);
  const [intervals, setIntervals] = useState<any>(genIntervals());

  useEffect(() => {
    setQueryChanging(true);

    setTimeout(() => {
      setIntervals(genIntervals());
      setQueryChanging(false);
    }, 500);
  }, [queryString]);

  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    top: number;
    height: number;
    offset: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    // Set initial render to false after a short delay
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef]);

  // Calculate bar width based on container width, number of bars, and padding
  const barWidth = Math.max(
    1,
    (containerWidth - PADDING * (intervals.length + 1)) / intervals.length,
  );

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsLoading(false);
      },
      0.005 * intervals.length + 1000,
    );

    return () => clearTimeout(timer);
  }, []);

  // Update tooltip position when hoveredBar changes
  useEffect(() => {
    if (hoveredBar !== null) {
      const interval = intervals[hoveredBar];
      const leftPosition = PADDING + hoveredBar * (barWidth + PADDING);

      setTooltipInfo({
        top: interval.offset,
        height: interval.height,
        offset: interval.offset,
        left: leftPosition + barWidth + 8,
      });
    } else {
      setTooltipInfo(null);
    }
  }, [hoveredBar, barWidth]);

  return (
    <>
      <div className="relative h-[400px] w-full" ref={containerRef}>
        {intervals.map((interval: any, index: any) => {
          // Calculate the left position with proper padding
          const leftPosition = PADDING + index * (barWidth + PADDING);

          return (
            <motion.div
              initial={{
                width: 0,
                x: isInitialRender ? -containerWidth : 0,
              }}
              animate={{
                width: isLoading || queryChanging ? 1 : barWidth,
                x: leftPosition,
              }}
              transition={{
                x: {
                  duration: 0.5,
                  delay: index * 0.005, // Stagger the animations
                },
                width: {
                  duration: 0.3,
                },
              }}
              key={index}
              className="absolute left-0 top-0 block h-full bg-gray-300"
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
              style={{ zIndex: hoveredBar === index ? 20 : 10 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: isLoading || queryChanging ? 0 : barWidth,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="absolute left-0 bg-gray-500"
                style={{
                  height: interval.height,
                  top: interval.offset,
                }}
              ></motion.div>
            </motion.div>
          );
        })}

        {/* Global tooltip that follows the hovered bar */}
        <AnimatePresence>
          {tooltipInfo && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute z-30 rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white shadow-lg"
              style={{
                left: tooltipInfo.left,
                top: tooltipInfo.top,
                transform: "translateY(-50%)",
              }}
            >
              <div className="flex flex-col">
                <span>Price: {tooltipInfo.height.toFixed(2)}</span>
              </div>
              {/* Tooltip arrow pointing left */}
              <div
                className="border-r-gray-900 absolute h-0 w-0 border-b-4 border-r-4 border-t-4 border-transparent"
                style={{
                  left: "-4px",
                  top: "50%",
                  transform: "translateY(-50%) rotate(180deg)",
                }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-24">
      <div className="w-full">
        <Suspense>
          <PortfolioCustomChart />
        </Suspense>
      </div>
    </div>
  );
}
