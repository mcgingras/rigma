"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tokens = [
  {
    name: "Ethereum",
    chain: "Ethereum",
    balance: 0.849,
    usdValue: 2661.43,
    symbol: "ETH",
    willCollapse: false,
  },
  {
    name: "Base",
    chain: "Base",
    balance: 0.29,
    usdValue: 1000.43,
    symbol: "ETH",
    willCollapse: true,
  },
  {
    name: "Ethereum",
    chain: "Optimism",
    balance: 0.19,
    usdValue: 600.43,
    symbol: "ETH",
    willCollapse: true,
  },
  {
    name: "USDC Coin",
    chain: "Ethereum",
    balance: 160.01,
    usdValue: 160.01,
    symbol: "USDC",
    willCollapse: false,
  },
  {
    name: "Tether USD",
    chain: "Ethereum",
    balance: 800.44,
    usdValue: 800.44,
    symbol: "USDT",
    willCollapse: false,
  },
  {
    name: "BNB",
    chain: "BNB Chain",
    balance: 1.01,
    usdValue: 1000.43,
    symbol: "BNB",
    willCollapse: false,
  },
  {
    name: "Optimism",
    chain: "Optimism",
    balance: 42.01,
    usdValue: 54.01,
    symbol: "OP",
    willCollapse: false,
  },
];

const TokenRow = ({
  name,
  balance,
  usdValue,
  symbol,
  chain,
}: {
  name: string;
  balance: number;
  usdValue: number;
  symbol: string;
  chain: string;
}) => {
  return (
    <motion.div
      key={`${name}-${chain}`}
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        position: "absolute",
        opacity: 0,
        scale: 0.9,
        y: -100,
        transition: {
          duration: 0.4,
          ease: [0.32, 0, 0.67, 0],
        },
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      className="w-full"
    >
      <div className="p-2">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">
                {balance} {symbol}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-gray-900">{usdValue}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TokenList() {
  const [collapsed, setCollapsed] = useState(false);

  const visibleTokens = collapsed
    ? tokens.filter((token) => !token.willCollapse)
    : tokens;

  return (
    <main className="bg-white h-screen w-screen flex flex-col items-center">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="bg-gray-100 p-1 rounded-md text-gray-500 m-4"
      >
        {collapsed ? "Expand" : "Collapse"}
      </button>
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className="border p-2 w-[600px] relative"
      >
        <AnimatePresence mode="popLayout">
          {visibleTokens.map((token) => (
            <TokenRow
              key={`${token.name}-${token.chain}`}
              name={token.name}
              balance={token.balance}
              usdValue={token.usdValue}
              symbol={token.symbol}
              chain={token.chain}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
