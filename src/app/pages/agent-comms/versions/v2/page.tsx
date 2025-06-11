"use client";

import React, { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

function ModalCard({
  selectedId,
  onClose,
}: {
  selectedId: string | null;
  onClose: () => void;
}) {
  if (!selectedId) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black"
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          layoutId={selectedId}
          className="bg-white w-[600px] h-[400px] rounded-2xl p-6 pointer-events-auto"
        >
          <div className="h-full w-full flex flex-col">
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="font-bold text-gray-700 text-lg">Inbox</h3>
                <span className="text-gray-400 uppercase text-xs block">
                  2 new
                </span>
              </div>
              <ArrowUpRightIcon
                className="w-6 h-6 text-gray-500 mt-1 hover:bg-gray-50 rounded-lg p-1 cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 divide-x divide-gray-200 flex-1 mt-4">
              <div className="flex flex-col p-2 h-full">
                <div className="flex flex-row gap-x-2 items-center hover:bg-gray-50 rounded-lg cursor-pointer p-2">
                  <span className="h-10 w-10 bg-gray-200 rounded-lg"></span>
                  <div className="flex flex-col">
                    <h3 className="text-gray-700 font-semibold">Renew ENS</h3>
                    <span className="text-gray-500 text-sm font-medium">
                      Your ENS name is expiring.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row mt-4 gap-x-2 items-center hover:bg-gray-50 rounded-lg cursor-pointer p-2">
                  <span className="h-10 w-10 bg-gray-200 rounded-lg"></span>
                  <div className="flex flex-col">
                    <h3 className="text-gray-700 font-semibold">SEC Impact</h3>
                    <span className="text-gray-500 text-sm font-medium">
                      SEC did some stuff.
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2 h-full">
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Action
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function AgentComms() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setIsThinking(true);
      setInputValue("");

      setTimeout(() => {
        setIsThinking(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <LayoutGroup>
        <div className="flex flex-col gap-4 items-center h-full w-full">
          <div className="p-4 text-gray-400 rounded-2xl bg-white border border-gray-200  max-w-[400px]">
            Your portfolio is up 4.24% thanks to PEPE spiking last night. Check
            out <span className="font-bold underline">three suggestions</span>{" "}
            for today.
          </div>
          <div className="flex-1 flex flex-row gap-8 items-center h-full w-full px-[200px]">
            <div className="h-[300px] w-full grid grid-cols-5 grid-rows-1 gap-4">
              <motion.div
                layoutId="profit-widget"
                onClick={() => setSelectedWidget("profit-widget")}
                className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl hover:translate-y-[-30px] transition-all duration-300 p-6 cursor-pointer"
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.div
                        layoutId="profit-title"
                        className="text-xl font-bold text-gray-800 mb-1"
                      >
                        $1,200
                      </motion.div>
                      <motion.div
                        layoutId="profit-subtitle"
                        className="text-gray-500 text-sm font-medium uppercase tracking-wide"
                      >
                        Profit
                      </motion.div>
                      <motion.div
                        layoutId="profit-percentage"
                        className="text-green-500 text-sm font-semibold mt-1"
                      >
                        +1.20%
                      </motion.div>
                    </div>
                    <ArrowUpRightIcon className="w-5 h-5 text-gray-400 mt-1" />
                  </div>

                  <div className="flex-1 relative">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      className="absolute inset-0"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="chartGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgb(34, 197, 94)"
                            stopOpacity="0.2"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgb(34, 197, 94)"
                            stopOpacity="0.05"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d="M 0 80 Q 15 70 25 75 T 45 65 T 65 60 T 85 55 T 100 50"
                        stroke="rgb(34, 197, 94)"
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
                        fill="rgb(34, 197, 94)"
                        className="drop-shadow-sm"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    <div className="absolute inset-0 opacity-10">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-px bg-gray-300 absolute w-full"
                          style={{ top: `${20 + i * 15}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                layoutId="news-widget"
                onClick={() => setSelectedWidget("news-widget")}
                className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl hover:translate-y-[-30px] transition-all duration-300 p-6 cursor-pointer"
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.h3
                        layoutId="news-title"
                        className="text-xl font-bold text-gray-800 mb-1"
                      >
                        New Stories
                      </motion.h3>
                      <motion.p
                        layoutId="news-subtitle"
                        className="text-gray-500 text-sm uppercase tracking-wide"
                      >
                        14 MARCH
                      </motion.p>
                    </div>
                    <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-3">
                      <div className="flex gap-3 items-start">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            ₿
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1 leading-tight">
                            Bitcoin Hits New All-Time High
                          </h4>
                          <p className="text-gray-500 text-xs">
                            CoinDesk in Crypto News
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            Ξ
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1 leading-tight">
                            Ethereum 2.0 Staking Rewards Up 15%
                          </h4>
                          <p className="text-gray-500 text-xs">
                            Ethereum Foundation in DeFi Weekly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                layoutId="sentiment-widget"
                onClick={() => setSelectedWidget("sentiment-widget")}
                className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl hover:translate-y-[-30px] transition-all duration-300 p-6 cursor-pointer"
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.h3
                        layoutId="sentiment-title"
                        className="text-lg font-bold text-gray-800 mb-1"
                      >
                        Social Sentiment
                      </motion.h3>
                      <motion.p
                        layoutId="sentiment-subtitle"
                        className="text-gray-500 text-xs uppercase tracking-wide"
                      >
                        LAST 24H
                      </motion.p>
                    </div>
                    <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              ₿
                            </span>
                          </div>
                          <span className="font-medium text-gray-700 text-sm">
                            BTC
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex text-green-500">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                          <span className="text-green-500 text-sm font-semibold">
                            +85%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              Ξ
                            </span>
                          </div>
                          <span className="font-medium text-gray-700 text-sm">
                            ETH
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-500">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                          <span className="text-yellow-600 text-sm font-semibold">
                            +12%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              S
                            </span>
                          </div>
                          <span className="font-medium text-gray-700 text-sm">
                            SOL
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex text-red-500">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                          <span className="text-red-500 text-sm font-semibold">
                            -5%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                layoutId="calendar-widget"
                onClick={() => setSelectedWidget("calendar-widget")}
                className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl hover:translate-y-[-30px] transition-all duration-300 p-6 cursor-pointer"
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.h3
                        layoutId="calendar-title"
                        className="text-lg font-bold text-gray-800 mb-1"
                      >
                        Calendar
                      </motion.h3>
                      <motion.p
                        layoutId="calendar-subtitle"
                        className="text-gray-500 text-xs uppercase tracking-wide"
                      >
                        UPCOMING
                      </motion.p>
                    </div>
                    <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-3">
                      <div className="flex gap-3 items-start">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-500 uppercase">
                            MAR
                          </div>
                          <div className="text-lg font-bold text-gray-800">
                            16
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1 leading-tight">
                            ARB Token Unlock
                          </h4>
                          <p className="text-gray-500 text-xs">
                            1.2B tokens (~$2.1B)
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-500 uppercase">
                            MAR
                          </div>
                          <div className="text-lg font-bold text-gray-800">
                            22
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1 leading-tight">
                            ETH Dencun Upgrade
                          </h4>
                          <p className="text-gray-500 text-xs">
                            Proto-Danksharding
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                layoutId="watchlist-widget"
                onClick={() => setSelectedWidget("watchlist-widget")}
                className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl hover:translate-y-[-30px] transition-all duration-300 p-6 cursor-pointer"
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.h3
                        layoutId="watchlist-title"
                        className="text-lg font-bold text-gray-800 mb-1"
                      >
                        Watchlist
                      </motion.h3>
                      <motion.p
                        layoutId="watchlist-subtitle"
                        className="text-gray-500 text-xs uppercase tracking-wide"
                      >
                        TRACKED
                      </motion.p>
                    </div>
                    <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              A
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-700 text-sm">
                              AVAX
                            </span>
                            <span className="text-gray-500 text-xs">
                              $30.15
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-green-500 text-sm font-semibold">
                            +2.4%
                          </span>
                          <svg
                            width="20"
                            height="12"
                            viewBox="0 0 20 12"
                            className="text-green-500"
                          >
                            <path
                              d="M2 10 Q 6 8 10 9 T 18 7"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              D
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-700 text-sm">
                              DOGE
                            </span>
                            <span className="text-gray-500 text-xs">
                              $0.087
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-red-500 text-sm font-semibold">
                            -1.2%
                          </span>
                          <svg
                            width="20"
                            height="12"
                            viewBox="0 0 20 12"
                            className="text-red-500"
                          >
                            <path
                              d="M2 4 Q 6 6 10 5 T 18 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              M
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-700 text-sm">
                              MATIC
                            </span>
                            <span className="text-gray-500 text-xs">$0.92</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-green-500 text-sm font-semibold">
                            +0.8%
                          </span>
                          <svg
                            width="20"
                            height="12"
                            viewBox="0 0 20 12"
                            className="text-green-500"
                          >
                            <path
                              d="M2 8 Q 6 7 10 6 T 18 5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div
            className={`h-12 w-[300px] block bg-white rounded-2xl p-2 relative ${
              isThinking
                ? "border-2 border-blue-400 shadow-lg shadow-blue-400/50"
                : "border border-gray-200"
            }`}
          >
            {isThinking && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-blue-400"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 20px 5px rgba(59, 130, 246, 0.2)",
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <div className="h-full w-full flex items-center gap-2 z-[100] relative">
              <div
                className="h-8 w-8 aspect-square border rounded-full flex-shrink-0"
                style={{
                  backgroundImage: `url(/assets/girl.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isThinking ? "Thinking..." : "Type a message..."}
                disabled={isThinking}
                className="flex-1 h-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 disabled:placeholder-gray-300"
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedId && (
            <ModalCard
              selectedId={selectedId}
              onClose={() => setSelectedId(null)}
            />
          )}

          {selectedWidget && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedWidget(null)}
                className="fixed inset-0 bg-black z-40"
              />
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                <motion.div
                  layoutId={selectedWidget}
                  className="bg-white w-[800px] h-[600px] rounded-2xl p-8 pointer-events-auto"
                >
                  <div className="h-full w-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        {selectedWidget === "profit-widget" && (
                          <>
                            <motion.div
                              layoutId="profit-title"
                              className="text-2xl font-bold text-gray-800"
                            >
                              $1,200
                            </motion.div>
                            <motion.div
                              layoutId="profit-subtitle"
                              className="text-gray-500 text-sm uppercase tracking-wide"
                            >
                              Profit
                            </motion.div>
                            <motion.div
                              layoutId="profit-percentage"
                              className="text-green-500 text-sm font-semibold mt-1"
                            >
                              +1.20%
                            </motion.div>
                          </>
                        )}
                        {selectedWidget === "news-widget" && (
                          <>
                            <motion.h2
                              layoutId="news-title"
                              className="text-2xl font-bold text-gray-800"
                            >
                              New Stories
                            </motion.h2>
                            <motion.p
                              layoutId="news-subtitle"
                              className="text-gray-500 text-sm uppercase tracking-wide"
                            >
                              14 MARCH
                            </motion.p>
                          </>
                        )}
                        {selectedWidget === "sentiment-widget" && (
                          <>
                            <motion.h2
                              layoutId="sentiment-title"
                              className="text-2xl font-bold text-gray-800"
                            >
                              Social Sentiment
                            </motion.h2>
                            <motion.p
                              layoutId="sentiment-subtitle"
                              className="text-gray-500 text-sm uppercase tracking-wide"
                            >
                              LAST 24H
                            </motion.p>
                          </>
                        )}
                        {selectedWidget === "calendar-widget" && (
                          <>
                            <motion.h2
                              layoutId="calendar-title"
                              className="text-2xl font-bold text-gray-800"
                            >
                              Calendar
                            </motion.h2>
                            <motion.p
                              layoutId="calendar-subtitle"
                              className="text-gray-500 text-sm uppercase tracking-wide"
                            >
                              UPCOMING
                            </motion.p>
                          </>
                        )}
                        {selectedWidget === "watchlist-widget" && (
                          <>
                            <motion.h2
                              layoutId="watchlist-title"
                              className="text-2xl font-bold text-gray-800"
                            >
                              Watchlist
                            </motion.h2>
                            <motion.p
                              layoutId="watchlist-subtitle"
                              className="text-gray-500 text-sm uppercase tracking-wide"
                            >
                              TRACKED
                            </motion.p>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedWidget(null)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-600">
                        This is the expanded view for the{" "}
                        {selectedWidget.replace("-widget", "")} widget. Here you
                        would see more detailed information and controls.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
