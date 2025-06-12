"use client";

import {
  Customized,
  Line,
  ComposedChart,
  TooltipProps,
  Area,
  YAxis,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { AnimatePresence, motion } from "framer-motion";
// import { Card, CardHeader } from "@/components/ui/card";
// import { ChartTooltip } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useUser } from "@/lib/api/hooks/use-user";
// import { formatCurrency } from "@/lib/currency/format-currency";
// import { formatDateToHumanLabel } from "@/lib/dates";
// import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { ChartTooltip } from "@/components/Chart";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
// import PercentagePill from "@/components/portfolio/percentage-pill";
// import { usePortfolioBalanceHistory } from "@/lib/api/hooks/use-portfolio-balance-history";
// import {
//   useChainFilter,
//   useDatePeriodFilter,
//   useWalletFilter,
// } from "@/components/portfolio/filters";
// import { SUPPORTED_CHAINS } from "@/lib/constants";
// import { useWindowWidth } from "@/hooks/use-width";

const createMockData = (units: number) => {
  const items = [];
  for (let i = 0; i < units; i++) {
    const data = {
      timestamp: 1716153600 + 86400 * i,
      value: 1010000 + i * 1000,
    };
    items.push(data);
  }
  return items;
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`overflow-hidden *:opacity-100 *:transition-opacity ${className}`}
    >
      {children}
    </div>
  );
};

export default function PortfolioChartV2() {
  return (
    <div className="w-[1200px] mx-auto">
      <div className="flex flex-col rounded-lg border">
        <div className="flex flex-row justify-between p-4">
          <div className="flex flex-col">
            <h2 className="text-gray-500 font-medium mb-2">Portfolio Value</h2>
            <div className="flex items-baseline">
              <span className="text-gray-500 text-xl font-medium">$</span>
              <h1 className="text-gray-800 text-3xl font-semibold">100,044</h1>
              <span className="text-gray-500 text-xl font-medium">.44</span>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="border border-gray-200 text-sm rounded-lg p-2 self-start text-gray-600 bg-white flex flex-row items-center gap-1">
              <span className="text-gray-700 text-sm font-medium">Monthly</span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
        <PortfolioLineChart />
        <div className="border-t p-4">
          <div className="flex flex-col">
            <h2 className="text-gray-500 font-medium mb-2">Asset Allocation</h2>
            <div className="flex flex-row gap-1">
              <div className="w-[40%] h-[14px] bg-[#BABBFE] rounded-l-full"></div>
              <div className="w-[25%] h-[14px] bg-[#12130F]"></div>
              <div className="w-[15%] h-[14px] bg-[#5B9279]"></div>
              <div className="w-[10%] h-[14px] bg-[#8FCB9B]"></div>
              <div className="w-[10%] h-[14px] bg-[#8F8073] rounded-r-full"></div>
            </div>
            {/* <div className="flex items-baseline">
                <span className="text-gray-500 text-xl font-medium">$</span>
                <h1 className="text-gray-800 text-3xl font-medium">100,044</h1>
                <span className="text-gray-500 text-xl font-medium">.44</span>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioLineChart() {
  const MOCK_DATA = createMockData(100);

  const chartData = useMemo(
    () =>
      (MOCK_DATA ?? [])?.map((interval) => ({
        timestamp: interval.timestamp,
        value: interval.value,
        formattedDate: new Date(interval.timestamp * 1000).toLocaleDateString(),
      })),
    [MOCK_DATA]
  );

  const [hoveredPoint, setHoveredPoint] = useState<{
    value: number;
    timestamp: number;
  } | null>(null);

  // Calculate values based on either hovered point or latest point
  const currentValue = hoveredPoint?.value ?? chartData.at(-1)?.value;
  const startValue = chartData.at(0)?.value ?? 0;
  const delta = (currentValue ?? 0) - startValue;
  const deltaPercentage = startValue !== 0 ? delta / startValue : 0;
  const direction = delta > 0 ? "up" : "down";

  const minValue = Math.min(...chartData.map((d) => d.value));
  const maxValue = Math.max(...chartData.map((d) => d.value));
  const [isHovered, setIsHovered] = useState(false);

  // Calculate yDomain directly without useState
  const yValues = chartData.map((item) => item.value);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const buffer = (maxY - minY) * 0.1;
  const yDomain = [Math.max(0, minY - buffer), maxY + buffer];

  return (
    <Card className={"overflow-hidden *:opacity-100 *:transition-opacity"}>
      {/* <CardHeader className="translate-y-[-2px] flex-row items-baseline gap-1 pt-5">
          <NumberFlowGroup>
            <div className="flex items-center gap-2 font-semibold">
              <NumberFlow
                value={currentValue || 0}
                locales="en-US"
                format={{ style: "currency", currency: "USD" }}
                className="text-3xl"
                animated={currentValue === chartData.at(-1)?.value}
              />
              <PercentagePill
                value={deltaPercentage}
                shouldAnimate={currentValue === chartData.at(-1)?.value}
              />
            </div>
          </NumberFlowGroup>

      </CardHeader> */}

      <div
        className="h-[300px] w-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute bottom-0 flex flex-row justify-between w-full p-4 text-gray-500 text-sm">
          <span>01 Jan 2024</span>
          <span>01 Feb 2024</span>
        </div>
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="rounded-b-lg"
        >
          <ComposedChart
            className="rounded-b-lg"
            accessibilityLayer
            data={chartData}
            margin={{ left: 0 }}
            onMouseMove={(state) => {
              if (state?.activePayload?.[0]) {
                setHoveredPoint(state.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => {
              setHoveredPoint(null);
            }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BABBFE" />
                <stop offset="60%" stopColor="#FFF" />
              </linearGradient>
              <linearGradient id="lineGradient">
                <stop offset="0%" stopColor="#BABBFE" />
                <stop offset="100%" stopColor="#BABBFE" />
              </linearGradient>
            </defs>

            {/* <YAxis
                dataKey="value"
                // hide={windowWidth < 768}
                domain={yDomain}
                ticks={
                  minValue === maxValue
                    ? [minValue]
                    : [Math.max(minValue, 0), maxValue]
                }
                orientation="right"
                width={100}
                tick={{ fontSize: 12 }}
                scale="linear"
                tickFormatter={(value) =>
                  `$${Math.round(value).toLocaleString()}`
                }
              /> */}

            <Area
              dataKey="value"
              type="monotone"
              fill="url(#areaGradient)"
              fillOpacity={0.2}
              stroke="none"
              isAnimationActive={true}
              animationDuration={300}
              animationEasing="ease-out"
            />
            <Line
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
              className="z-40"
              isAnimationActive={true}
              animationDuration={300}
              animationEasing="ease-out"
            />
            <ChartTooltip
              position={{ y: 24 }}
              offset={20}
              content={<CustomTooltip isActive={isHovered} />}
              cursor={
                <CustomCursor
                  yMin={minValue}
                  yMax={maxValue}
                  direction={direction}
                  isActive={isHovered}
                  className="z-30"
                />
              }
              active={true}
            />
            <Customized
              component={(props: any) => {
                if (!hoveredPoint) return null;
                const point =
                  props.formattedGraphicalItems?.[0]?.props.points?.find(
                    (p: any) => p.payload.timestamp === hoveredPoint.timestamp
                  );
                if (!point) return null;

                return (
                  <g className="z-50">
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={4}
                      fill={direction === "up" ? "#BABBFE" : "#ccc"}
                      stroke="white"
                      strokeWidth={2}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={4}
                      fill={direction === "up" ? "#BABBFE" : "#ccc"}
                      opacity={0.5}
                    >
                      <animate
                        attributeName="r"
                        from="4"
                        to="18"
                        dur="1.5s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="1.5s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function CustomTooltip({
  active,
  payload,
  isActive,
}: TooltipProps<number, string> & { isActive: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {active && payload && payload.length && isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-1 px-2 py-1 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          <p className="text-gray-500 text-sm">
            {new Date(payload[0].payload.timestamp * 1000).toLocaleDateString()}
          </p>
          <div className="flex flex-row gap-1 items-center">
            <span className="h-[14px] w-2 rounded-full bg-[#8FCB9B]"></span>
            <p className="text-gray-800 text-sm font-medium tabular-nums">
              {payload[0].value || 0}
            </p>
            <span className="ml-4 text-gray-500 text-sm font-medium">
              +23.44%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CustomCursor({
  points,
  width,
  height,
  payload,
  yMin,
  yMax,
  direction,
  isActive,
  className,
}: any) {
  if (!points?.[0]) return null;

  const { x } = points[1];
  const value = payload?.[1]?.value;

  // Calculate normalized y position
  const normalizedY = height - ((value - yMin) / (yMax - yMin)) * height + 4;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`z-30 ${className}`}
        >
          {/* Semi-transparent overlay */}
          <rect
            x={x + 5}
            y={0}
            width={width - x}
            height={height - 50}
            fill="white"
            opacity={0.7}
          />

          {/* Vertical line */}
          <line
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke="#ccc"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />

          {/* Horizontal line */}
          {/* <motion.line
            x1={0}
            x2={width}
            animate={{
              y1: normalizedY,
              y2: normalizedY,
            }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.3,
            }}
            stroke={direction === "up" ? "var(--accent-10)" : "var(--gray-10)"}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            opacity={0.5}
          /> */}
        </motion.g>
      )}
    </AnimatePresence>
  );
}
