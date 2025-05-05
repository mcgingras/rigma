import { motion } from "motion/react";
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Generate more data points for a smoother line
const data = Array.from({ length: 40 }, (_, i) => {
  // Simulate a generally upward trend with some noise
  const base = 10000 + i * 100 + Math.sin(i / 2) * 300 + Math.random() * 200;
  return { idx: i, value: base };
});

export default function PortfolioChart() {
  return (
    <motion.div
      layoutId="portfolio-chart-container"
      className="w-full h-full p-4 bg-gradient-to-br from-yellow-50 via-green-50 to-white rounded-lg"
    >
      <div className="mb-2">
        <motion.div
          layoutId="portfolio-chart-date"
          layout="position"
          className="text-xs text-gray-400"
        >
          Monday, April 14
        </motion.div>
        <motion.div
          layoutId="portfolio-chart-title"
          layout="position"
          className="text-xl font-normal text-zinc-700"
        >
          Your portfolio is{" "}
          <span className="text-green-600 font-bold">up 14.18%</span>
        </motion.div>
      </div>
      <motion.div layout="position" className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
