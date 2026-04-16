"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Inline SVG icons to avoid external dependencies

const ChevronDown = ({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const BaseLogo = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 111 111"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF" />
    <path
      d="M55.3909 93.2691C76.1977 93.2691 93.0591 76.4077 93.0591 55.6009C93.0591 34.7941 76.1977 17.9327 55.3909 17.9327C35.6007 17.9327 19.3849 33.1747 17.8125 52.5536H68.9855V58.6482H17.8125C19.3849 78.0271 35.6007 93.2691 55.3909 93.2691Z"
      fill="white"
    />
  </svg>
);

const EthereumLogo = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 417"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#343434" d="m127.962 0-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" />
    <path fill="#8C8C8C" d="M127.962 0 0 212.32l127.962 75.639V154.158z" />
    <path
      fill="#3C3C3B"
      d="m127.962 312.187-1.575 1.92v98.199l1.575 4.6L256 236.587z"
    />
    <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" />
    <path fill="#141414" d="m127.962 287.958 127.962-75.638-127.962-58.162z" />
    <path fill="#393939" d="m0 212.32 127.962 75.638V154.158z" />
  </svg>
);

interface TokenRowVariant {
  name: string;
  image: string;
  value: string;
  chains: {
    name: string;
    percentageOfToken: number;
    value: string;
  }[];
}

interface TokenRowData {
  symbol: string;
  color: string;
  percentOfPortfolio: number;
  value: string;
  variants: TokenRowVariant[];
}

const TokenRow = ({ name, image, value, chains }: TokenRowVariant) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div layout>
      <motion.div
        layout
        className="flex cursor-pointer items-center justify-between px-3 py-2"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <motion.div layout className="flex items-center gap-2">
          <img
            className="block h-6 w-6 rounded-full bg-gray-800"
            src={image}
            alt={name}
          />
          <h2>{name}</h2>
        </motion.div>
        <motion.div layout className="flex items-center gap-1">
          <span className="text-gray-400">{value}</span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </motion.div>
      </motion.div>
      {isExpanded && (
        <motion.div layout className="flex flex-col gap-2 px-4 pb-4 pt-2">
          {chains.map((chain) => (
            <motion.div layout key={chain.name}>
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-2">
                  {chain.name === "Base" && <BaseLogo size={16} />}
                  {chain.name === "Ethereum" && <EthereumLogo size={16} />}
                  <span className="text-gray-300">{chain.name}</span>
                  <span className="text-sm text-gray-500">
                    ({chain.percentageOfToken * 100}%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">{chain.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const PortfolioTokenBar = () => {
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  }, [hideTimeout]);

  const startHideTimeout = useCallback(() => {
    clearHideTimeout();
    const timeout = setTimeout(() => {
      setHoveredToken(null);
    }, 200);
    setHideTimeout(timeout);
  }, [clearHideTimeout]);

  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const tokens: TokenRowData[] = [
    {
      symbol: "ETH",
      color: "#627EEA",
      percentOfPortfolio: 0.571,
      value: "$1,500.00",
      variants: [
        {
          name: "ETH",
          image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
          value: "$1,500.00",
          chains: [
            {
              name: "Base",
              value: "$750.00",
              percentageOfToken: 0.5,
            },
            {
              name: "Ethereum",
              value: "$750.00",
              percentageOfToken: 0.5,
            },
          ],
        },
        {
          name: "WETH",
          image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
          value: "$1,500.00",
          chains: [
            {
              name: "Base",
              value: "$1,500.00",
              percentageOfToken: 1,
            },
          ],
        },
      ],
    },
    {
      symbol: "USDC",
      color: "#13398A",
      percentOfPortfolio: 0.28,
      value: "$1500.00",
      variants: [
        {
          name: "USDC",
          image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
          value: "$750.00",
          chains: [
            {
              name: "Base",
              value: "$750.00",
              percentageOfToken: 1,
            },
          ],
        },
        {
          name: "USDT",
          value: "$750.00",
          image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
          chains: [
            {
              name: "Base",
              value: "$750.00",
              percentageOfToken: 1,
            },
          ],
        },
      ],
    },
    {
      symbol: "UNI",
      color: "#FF0000",
      percentOfPortfolio: 0.14,
      value: "$750.00",
      variants: [
        {
          name: "UNI",
          value: "$750.00",
          image: "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png",
          chains: [
            {
              name: "Ethereum",
              value: "$750.00",
              percentageOfToken: 1,
            },
          ],
        },
      ],
    },
  ];

  const activeToken = tokens.find((token) => token.symbol === hoveredToken);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-3 w-full gap-[2px] rounded-full bg-gray-900">
        {tokens.map((token) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                hoveredToken === token.symbol || hoveredToken === null
                  ? 1
                  : 0.3,
            }}
            key={token.symbol}
            className="h-3 first:rounded-l-full last:rounded-r-full"
            style={{
              backgroundColor: token.color,
              width: `${token.percentOfPortfolio * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>
      <div className="relative flex gap-4">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center gap-1"
            onMouseEnter={() => {
              clearHideTimeout();
              setHoveredToken(token.symbol);
            }}
            onMouseLeave={startHideTimeout}
          >
            <div
              className="block h-4 w-4 rounded"
              style={{
                backgroundColor:
                  hoveredToken === token.symbol || hoveredToken === null
                    ? token.color
                    : "#222",
              }}
            ></div>
            <span>{token.symbol}</span>
          </div>
        ))}
        <AnimatePresence>
          {hoveredToken && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              layout
              className="absolute top-8 z-50 min-w-[250px] rounded-lg border border-gray-700 bg-gray-800 shadow-lg"
              style={{
                left: `${tokens.findIndex((t) => t.symbol === hoveredToken) * 5}%`,
              }}
              onMouseEnter={clearHideTimeout}
              onMouseLeave={startHideTimeout}
            >
              <div className="divide-y divide-gray-700 whitespace-nowrap text-sm">
                {activeToken?.variants.map((variant) => (
                  <TokenRow
                    key={variant.name}
                    name={variant.name}
                    image={variant.image}
                    value={variant.value}
                    chains={variant.chains}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-24">
      <div className="w-full max-w-xl">
        <PortfolioTokenBar />
      </div>
    </div>
  );
}
