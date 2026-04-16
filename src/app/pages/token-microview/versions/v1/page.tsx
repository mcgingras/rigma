"use client";

import { Area, ComposedChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

// Inline ArrowRightIcon to avoid @radix-ui/react-icons dependency
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    className={className}
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const data = [
  { timestamp: 1, value: 1000 },
  { timestamp: 2, value: 1100 },
  { timestamp: 3, value: 800 },
  { timestamp: 4, value: 900 },
  { timestamp: 5, value: 950 },
  { timestamp: 6, value: 1000 },
  { timestamp: 7, value: 1300 },
  { timestamp: 8, value: 1250 },
  { timestamp: 9, value: 1200 },
  { timestamp: 10, value: 1100 },
];

const TokenMicroview = ({
  token,
}: {
  token: { thumbnail_url?: string; symbol: string };
}) => {
  const minValue = Math.min(...data.map((d) => d.value));
  const maxValue = Math.max(...data.map((d) => d.value));
  const yRange = (maxValue - minValue) * 0.2;
  const yMin = minValue - yRange;
  const [isDetailsHovered, setIsDetailsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative z-50 h-[200px] w-[400px] overflow-hidden rounded-lg border border-gray-700 bg-gray-900"
    >
      <div className="absolute left-6 top-4 z-50 flex h-[calc(100%-32px)] flex-col justify-between">
        <div className="flex flex-col">
          <div className="text-2xl text-white">
            $60,552<span className="text-gray-500">.24</span>
          </div>
          <div className="flex flex-row items-center gap-2 text-green-400">
            <div className="text-base">$11,017.42</div>
            <div className="text-sm">+22.24%</div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          {token.thumbnail_url ? (
            <img
              src={token.thumbnail_url}
              className="h-6 w-6 rounded-full"
              alt={token.symbol}
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-sm font-medium text-white/50">
              {token.symbol.toUpperCase().slice(0, 1)}
            </div>
          )}
          <span className="text-sm font-medium text-white/50">
            {token.symbol.toUpperCase()}
          </span>
        </div>
      </div>
      <div
        className="absolute bottom-4 right-5 z-[100] flex cursor-pointer flex-row items-center rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/15"
        onMouseEnter={() => setIsDetailsHovered(true)}
        onMouseLeave={() => setIsDetailsHovered(false)}
        onClick={() => setIsDetailsHovered(!isDetailsHovered)}
      >
        <motion.span className="block">Details</motion.span>
        <motion.div
          animate={{
            marginLeft: isDetailsHovered ? "0.35rem" : "0.25rem",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ArrowRightIcon className="block h-4 w-4" />
        </motion.div>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              left: 75,
              right: 0,
              bottom: 0,
              top: 0,
            }}
          >
            <defs>
              <linearGradient
                id="gradientColor"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="10%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient
                id="areaGradientColor"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="10%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#areaGradientColor)"
              fillOpacity={0.2}
              stroke="none"
              baseValue={yMin}
              isAnimationActive={false}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="url(#gradientColor)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#3b82f6",
                stroke: "white",
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default function Page() {
  const mockToken = {
    symbol: "ETH",
    thumbnail_url:
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-950 p-24">
      <TokenMicroview token={mockToken} />
    </div>
  );
}
