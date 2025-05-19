"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tokens = [
  {
    name: "Ethereum",
    chain: "Ethereum",
    logoUrl:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1746070011",
    balance: 0.849,
    usdValue: 2661.43,
    symbol: "ETH",
    willCollapse: false,
    diff: {
      type: "positive",
      value: "0.20",
    },
    children: [
      {
        name: "Ethereum (Base)",
        chain: "Base",
        logoUrl:
          "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1746070011",
        balance: 0.29,
        usdValue: 1000.43,
        symbol: "ETH",
        willCollapse: true,
        diff: {
          type: "positive",
          value: "0.20",
        },
      },
      {
        name: "Ethereum (Optimism)",
        chain: "Optimism",
        logoUrl:
          "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1746070011",
        balance: 0.19,
        usdValue: 600.43,
        symbol: "ETH",
        willCollapse: true,
        diff: {
          type: "positive",
          value: "0.20",
        },
      },
      {
        name: "Ethereum (Polygon)",
        logoUrl:
          "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1746070011",
        chain: "Polygon",
        balance: 0.19,
        usdValue: 600.43,
        symbol: "ETH",
        willCollapse: true,
        diff: {
          type: "positive",
          value: "0.20",
        },
      },
    ],
  },
  {
    name: "USDC",
    chain: "Ethereum",
    logoUrl:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    balance: 160.01,
    usdValue: 160.01,
    symbol: "USDC",
    willCollapse: false,
    diff: {
      type: "neutral",
      value: "0.00",
    },
    children: [
      {
        name: "USDT",
        chain: "Ethereum",
        logoUrl:
          "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
        balance: 800.44,
        usdValue: 800.44,
        symbol: "USDT",
        willCollapse: false,
        children: [],
        diff: {
          type: "neutral",
          value: "0.00",
        },
      },
      {
        name: "USDC (Base)",
        chain: "Base",
        logoUrl:
          "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
        balance: 800.44,
        usdValue: 800.44,
        symbol: "USDT",
        willCollapse: false,
        children: [],
        diff: {
          type: "neutral",
          value: "0.00",
        },
      },
    ],
  },

  {
    name: "BNB",
    chain: "BNB Chain",
    logoUrl:
      "https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970",
    balance: 1.01,
    usdValue: 1000.43,
    symbol: "BNB",
    willCollapse: false,
    children: [],
    diff: {
      type: "negative",
      value: "4.20",
    },
  },
  {
    name: "Optimism",
    chain: "Optimism",
    logoUrl:
      "https://assets.coingecko.com/coins/images/25244/standard/Optimism.png?1696524385",
    balance: 42.01,
    usdValue: 54.01,
    symbol: "OP",
    willCollapse: false,
    children: [],
    diff: {
      type: "positive",
      value: "3.76",
    },
  },
];

const springTransition = {
  type: "spring",
  stiffness: 132,
  damping: 25,
  mass: 1.6,
};

const TokenChild = ({
  name,
  balance,
  usdValue,
  symbol,
  chain,
  logoUrl,
  index,
  diff,
}: {
  name: string;
  balance: number;
  usdValue: number;
  symbol: string;
  chain: string;
  logoUrl: string | undefined;
  index: number;
  diff: {
    type: string;
    value: string;
  };
}) => {
  return (
    <motion.div
      key={`${name}-${chain}`}
      initial={{ opacity: 1, scale: 1, translateY: (index + 1) * 56, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.8,
        y: -56 * (index + 1),
        transition: springTransition,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      className="w-full absolute z-[10]"
    >
      <div className="p-2">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            {logoUrl ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full">
                <img src={logoUrl} alt={name} className="w-full h-full" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            )}
            <div className="flex flex-col">
              <p className="font-semibold text-gray-700">{name}</p>
              <p className="text-sm text-gray-400">
                {balance} {symbol}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-base font-semibold text-gray-700">{usdValue}</p>
            <p
              className={`text-sm ${
                diff.type === "positive"
                  ? "text-green-500"
                  : diff.type === "negative"
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {diff.type === "positive"
                ? "+"
                : diff.type === "negative"
                ? "-"
                : ""}
              {diff.value}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TokenRow = ({
  name,
  logoUrl,
  balance,
  usdValue,
  symbol,
  chain,
  isCollapsed,
  tokenChildren,
  diff,
}: {
  name: string;
  logoUrl: string | undefined;
  balance: number;
  usdValue: number;
  symbol: string;
  chain: string;
  isCollapsed: boolean;
  tokenChildren: any[];
  diff: {
    type: string;
    value: string;
  };
}) => {
  const totalUsdValue = tokenChildren.reduce(
    (sum, child) => sum + child.usdValue,
    usdValue
  );
  const totalBalance = tokenChildren.reduce(
    (sum, child) => sum + child.balance,
    balance
  );
  const hasChildren = tokenChildren.length > 0;

  return (
    <motion.div
      key={`${name}-${chain}`}
      initial={{ height: 56 + tokenChildren.length * 56 }}
      animate={{
        height: isCollapsed ? 56 : 56 + tokenChildren.length * 56,
      }}
      transition={springTransition}
      className="w-full relative bg-white z-[20]"
    >
      <AnimatePresence>
        {!isCollapsed && (
          <>
            {tokenChildren?.map((child, index) => (
              <TokenChild
                key={`${child.name}-${child.chain}`}
                name={child.name}
                balance={child.balance}
                usdValue={child.usdValue}
                symbol={child.symbol}
                logoUrl={child.logoUrl}
                chain={child.chain}
                index={index}
                diff={child.diff}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      <div className="p-2">
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex flex-row items-center gap-2">
            {logoUrl ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full">
                <img src={logoUrl} alt={name} className="w-full h-full" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            )}
            <div className="flex flex-col">
              <p className="font-semibold text-gray-700">{name}</p>
              <div className="relative h-[20px] overflow-hidden w-[200px]">
                <AnimatePresence mode="popLayout">
                  {!isCollapsed || !hasChildren ? (
                    <motion.p
                      key="individual-balance"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      exit={{ y: -20 }}
                      transition={springTransition}
                      className="text-sm text-gray-400 absolute left-0 w-[200px]"
                    >
                      {balance.toFixed(2)} {symbol}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="total-balance"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      exit={{ y: 20 }}
                      transition={springTransition}
                      className="text-sm text-gray-400 absolute left-0 w-[200px]"
                    >
                      {totalBalance.toFixed(2)} {symbol}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="relative h-[24px] overflow-hidden w-full">
              <AnimatePresence mode="popLayout">
                {!isCollapsed || !hasChildren ? (
                  <motion.p
                    key="individual"
                    initial={{ y: -24 }}
                    animate={{ y: 0 }}
                    exit={{ y: -24 }}
                    transition={springTransition}
                    className="text-base font-semibold text-gray-700 absolute right-0 whitespace-nowrap"
                  >
                    ${usdValue.toFixed(2)}
                  </motion.p>
                ) : (
                  <motion.p
                    key="total"
                    initial={{ y: 24 }}
                    animate={{ y: 0 }}
                    exit={{ y: 24 }}
                    transition={springTransition}
                    className="text-base font-semibold text-gray-700 absolute right-0 whitespace-nowrap"
                  >
                    ${totalUsdValue.toFixed(2)}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <p
              className={`text-sm ${
                diff.type === "positive"
                  ? "text-green-500"
                  : diff.type === "negative"
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {diff.type === "positive"
                ? "+"
                : diff.type === "negative"
                ? "-"
                : ""}
              {diff.value}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TokenList() {
  const [collapsed, setCollapsed] = useState(false);
  const totalTokens = tokens.length;
  const totalTokensIncludingChildren = tokens.reduce(
    (sum, token) => sum + token.children.length + 1,
    0
  );

  return (
    <main className="bg-white h-screen w-screen flex flex-col items-center">
      <motion.div layout className="w-[600px] mt-24">
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {!collapsed && (
              <motion.div
                key={collapsed ? "collapsed" : "expanded"}
                initial={{ opacity: 0, y: -15 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  position: "relative",
                  transition: springTransition,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  position: "absolute",
                  width: "100%",
                  transition: {
                    ...springTransition,
                    position: { duration: 0 },
                  },
                }}
                className="w-full flex flex-row gap-1 h-[15px] mb-4"
              >
                <div className="rounded-l-full w-[45%] bg-blue-500 h-full"></div>
                <div className="w-[25%] bg-red-500 h-full"></div>
                <div className="w-[20%] bg-green-500 h-full"></div>
                <div className="rounded-r-full w-[10%] bg-yellow-500 h-full"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div layout transition={springTransition}>
          <motion.div
            layout
            className="flex flex-row items-center justify-between w-full mb-4"
          >
            <div className="relative h-[20px] overflow-hidden w-[200px]">
              <AnimatePresence mode="popLayout">
                {collapsed ? (
                  <motion.p
                    key="individual-balance"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    transition={springTransition}
                    className="text-gray-400 absolute left-0 w-[200px]"
                  >
                    {totalTokens} tokens
                  </motion.p>
                ) : (
                  <motion.p
                    key="total-balance"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={springTransition}
                    className="text-gray-400 absolute left-0 w-[200px]"
                  >
                    {totalTokensIncludingChildren} tokens | 3 chains
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              layout
              initial={{ x: 108 }}
              animate={{ x: collapsed ? 108 : 0 }}
              transition={springTransition}
              className="flex flex-row gap-2 text-sm"
            >
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="bg-gray-100 p-1 rounded-full text-gray-500"
              >
                {collapsed ? "Expand" : "Collapse"}
              </button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: collapsed ? 0 : 1 }}
                transition={springTransition}
                className="w-[100px] bg-gray-100 text-gray-500 p-1 rounded-full"
              >
                chain filter
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            layout
            transition={springTransition}
            className="border p-2 relative rounded-lg"
          >
            <AnimatePresence mode="popLayout">
              {tokens.map((token) => (
                <TokenRow
                  key={`${token.name}-${token.chain}`}
                  name={token.name}
                  logoUrl={token.logoUrl}
                  balance={token.balance}
                  usdValue={token.usdValue}
                  symbol={token.symbol}
                  chain={token.chain}
                  isCollapsed={collapsed}
                  tokenChildren={token.children}
                  diff={token.diff}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
