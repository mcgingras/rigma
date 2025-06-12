"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowsRightLeftIcon,
  ChartBarIcon,
  EyeIcon,
  ClockIcon,
  CogIcon,
  BellIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import DynamicIsland from "@/app/components/DynamicIsland";
import PortfolioChartV2 from "@/app/components/PortfolioChartV2";

const mockTradeHistory = [
  {
    id: 1,
    symbol: "AAPL",
    type: "BUY",
    quantity: 50,
    price: 175.32,
    total: 8766.0,
    date: "2024-01-15",
    time: "09:30:45",
    status: "completed",
  },
  {
    id: 2,
    symbol: "TSLA",
    type: "SELL",
    quantity: 25,
    price: 248.5,
    total: 6212.5,
    date: "2024-01-14",
    time: "14:22:15",
    status: "completed",
  },
  {
    id: 3,
    symbol: "MSFT",
    type: "BUY",
    quantity: 30,
    price: 412.85,
    total: 12385.5,
    date: "2024-01-12",
    time: "11:15:30",
    status: "completed",
  },
  {
    id: 4,
    symbol: "GOOGL",
    type: "BUY",
    quantity: 15,
    price: 142.2,
    total: 2133.0,
    date: "2024-01-10",
    time: "16:45:12",
    status: "pending",
  },
  {
    id: 5,
    symbol: "NVDA",
    type: "SELL",
    quantity: 20,
    price: 695.75,
    total: 13915.0,
    date: "2024-01-08",
    time: "10:30:22",
    status: "completed",
  },
];

const mockWatchlist = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.45,
    change: +3.13,
    changePercent: +1.78,
    volume: "45.2M",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 251.3,
    change: -2.8,
    changePercent: -1.1,
    volume: "32.8M",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 418.92,
    change: +6.07,
    changePercent: +1.47,
    volume: "28.1M",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 145.85,
    change: +3.65,
    changePercent: +2.57,
    volume: "19.4M",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 702.15,
    change: +6.4,
    changePercent: +0.92,
    volume: "41.7M",
  },
];

const mockResearchReport = {
  token: {
    symbol: "ZENO",
    name: "Zenith Protocol",
    price: 42.85,
    change: +5.12,
    changePercent: +13.57,
    marketCap: "2.4B",
    volume24h: "156.8M",
    logo: "🚀",
  },
  rating: "Strong Buy",
  targetPrice: 65.0,
  timeHorizon: "12 months",
  analyst: "Dr. Sarah Chen",
  firm: "BlockChain Analytics Corp",
  publishDate: "2024-01-16",
  summary:
    "Zenith Protocol represents a paradigm shift in decentralized finance infrastructure, with revolutionary cross-chain interoperability and unprecedented scalability solutions.",
  keyPoints: [
    "Revolutionary Layer-2 scaling solution achieving 50,000+ TPS",
    "Strategic partnerships with 15+ major DeFi protocols",
    "Innovative staking mechanism with 12-18% APY",
    "Strong development team with proven track record",
    "Growing ecosystem with 200+ integrated dApps",
  ],
  risks: [
    "Regulatory uncertainty in key markets",
    "Competition from established L1 blockchains",
    "Smart contract security risks",
    "Market volatility and adoption challenges",
  ],
  technicals: {
    support: 38.5,
    resistance: 48.2,
    rsi: 67,
    macd: "Bullish",
    volumeProfile: "Above Average",
  },
};

function ResearchReport() {
  const report = mockResearchReport;

  return (
    <div className="h-full flex flex-col overflow-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Research Report
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{report.token.logo}</span>
              <div>
                <div className="font-bold text-lg">{report.token.symbol}</div>
                <div className="text-sm text-gray-600">{report.token.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${report.token.price}</div>
              <div
                className={`text-sm font-medium ${
                  report.token.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                +${report.token.change} ({report.token.changePercent}%)
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
              report.rating === "Strong Buy"
                ? "bg-green-100 text-green-800"
                : report.rating === "Buy"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {report.rating}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Target: ${report.targetPrice}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Market Data</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Market Cap:</span>
              <span className="font-medium">${report.token.marketCap}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">24h Volume:</span>
              <span className="font-medium">${report.token.volume24h}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Support:</span>
              <span className="font-medium">${report.technicals.support}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resistance:</span>
              <span className="font-medium">
                ${report.technicals.resistance}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            Technical Indicators
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">RSI:</span>
              <span
                className={`font-medium ${
                  report.technicals.rsi > 70
                    ? "text-red-600"
                    : report.technicals.rsi < 30
                    ? "text-green-600"
                    : "text-gray-800"
                }`}
              >
                {report.technicals.rsi}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MACD:</span>
              <span
                className={`font-medium ${
                  report.technicals.macd === "Bullish"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {report.technicals.macd}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Volume:</span>
              <span className="font-medium">
                {report.technicals.volumeProfile}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Report Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Analyst:</span>
              <span className="font-medium">{report.analyst}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Firm:</span>
              <span className="font-medium text-xs">{report.firm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Published:</span>
              <span className="font-medium">{report.publishDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Horizon:</span>
              <span className="font-medium">{report.timeHorizon}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Executive Summary
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {report.summary}
          </p>

          <h4 className="font-semibold text-gray-800 mb-3">
            Key Investment Highlights
          </h4>
          <ul className="space-y-2">
            {report.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-green-500 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Risk Factors</h3>
          <ul className="space-y-3">
            {report.risks.map((risk, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-orange-500 mt-1">⚠</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Price Target</h4>
            <div className="text-sm text-blue-700">
              <div className="flex justify-between mb-1">
                <span>Current Price:</span>
                <span className="font-medium">${report.token.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Target Price:</span>
                <span className="font-medium">${report.targetPrice}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Upside Potential:</span>
                <span className="text-green-600">
                  {(
                    ((report.targetPrice - report.token.price) /
                      report.token.price) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradingHistory() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Trade History</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
            All
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">
            Completed
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">
            Pending
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
            <div>Symbol</div>
            <div>Type</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Total</div>
            <div>Date/Time</div>
            <div>Status</div>
          </div>

          {mockTradeHistory.map((trade) => (
            <div
              key={trade.id}
              className="grid grid-cols-7 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-900">{trade.symbol}</div>
              <div
                className={`font-medium ${
                  trade.type === "BUY" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trade.type}
              </div>
              <div className="text-gray-700">{trade.quantity}</div>
              <div className="text-gray-700">${trade.price.toFixed(2)}</div>
              <div className="font-medium text-gray-900">
                ${trade.total.toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">
                <div>{trade.date}</div>
                <div className="text-xs text-gray-500">{trade.time}</div>
              </div>
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trade.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {trade.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Watchlist({ showNewToken = false }: { showNewToken?: boolean }) {
  const newToken = {
    symbol: "ZENO",
    name: "Zenith Protocol",
    price: 42.85,
    change: +5.12,
    changePercent: +13.57,
    volume: "156.8M",
  };

  const watchlistData = showNewToken
    ? [newToken, ...mockWatchlist]
    : mockWatchlist;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Watchlist</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
          + Add Symbol
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
            <div>Symbol</div>
            <div>Name</div>
            <div>Price</div>
            <div>Change</div>
            <div>Change %</div>
            <div>Volume</div>
          </div>

          {watchlistData.map((stock, index) => (
            <div
              key={stock.symbol}
              className={`grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                showNewToken && index === 0 ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div
                className={`font-bold ${
                  showNewToken && index === 0
                    ? "text-blue-900"
                    : "text-gray-900"
                }`}
              >
                {stock.symbol}
                {showNewToken && index === 0 && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                    NEW
                  </span>
                )}
              </div>
              <div className="text-gray-700 truncate">{stock.name}</div>
              <div className="font-medium text-gray-900">
                ${stock.price.toFixed(2)}
              </div>
              <div
                className={`font-medium ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}
              </div>
              <div
                className={`font-medium ${
                  stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </div>
              <div className="text-gray-600">{stock.volume}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TradNav() {
  const [page, setPage] = useState<
    "portfolio" | "trading" | "watchlist" | "researcher"
  >("portfolio");
  const [isThinking, setIsThinking] = useState(false);
  const [showNewToken, setShowNewToken] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [agentContext, setAgentContext] = useState("");
  const [agentExpanded, setAgentExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger on researcher tab
      if (page === "researcher") {
        if (event.metaKey && event.key === "k") {
          event.preventDefault();
          setAgentExpanded(prev => !prev);
        }

        if (event.key === "Enter") {
          event.preventDefault();
          setIsThinking(true);

          // After 5 seconds, switch to watchlist and show new token
          setTimeout(() => {
            setIsThinking(false);
            setPage("watchlist");
            setShowNewToken(true);
          }, 5000);
        }
      }
    };

    const handleMouseUp = () => {
      if (page === "researcher") {
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        
        if (text && text.length > 0) {
          const range = selection?.getRangeAt(0);
          const rect = range?.getBoundingClientRect();
          
          if (rect) {
            setSelectedText(text);
            setTooltipPosition({
              x: rect.left + rect.width / 2,
              y: rect.top - 10
            });
            setShowTooltip(true);
          }
        } else {
          setShowTooltip(false);
        }
      }
    };

    const handleMouseDown = () => {
      setShowTooltip(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [page]);

  const sendToAgent = () => {
    setShowTooltip(false);
    // Store the sent text for the agent context
    setAgentContext(selectedText);
    console.log("Sending to agent:", selectedText);
    
    // Clear selection
    window.getSelection()?.removeAllRanges();
    
    // Expand the DynamicIsland
    setAgentExpanded(true);
  };

  return (
    <div
      className="w-screen h-screen p-8"
      style={{
        background: "url('/assets/grad.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full w-full">
        <div className="flex flex-row gap-8 items-center h-full w-full">
          <div className="flex flex-col gap-4 justify-between h-full">
            <div className="fixed top-8 left-8 z-[50]">
              <DynamicIsland 
                showButton={false} 
                context={agentContext} 
                isExpanded={agentExpanded}
              />
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="bg-white/5 shadow-lg backdrop-blur-lg rounded-4xl p-2 border border-white/30">
                <div className="flex flex-col space-y-6 text-black bg-white/70 p-4 self-center justify-center rounded-3xl">
                  <div className="relative flex flex-col items-center">
                    <ArrowsRightLeftIcon
                      className={`w-4 h-4 cursor-pointer transition-colors ${
                        page === "trading"
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setPage("trading")}
                      title="Trading"
                    />
                    {page === "trading" && (
                      <div className="absolute -bottom-3 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                    )}
                  </div>

                  <div className="relative flex flex-col items-center">
                    <ChartBarIcon
                      className={`w-4 h-4 cursor-pointer transition-colors ${
                        page === "portfolio"
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setPage("portfolio")}
                      title="Portfolio"
                    />
                    {page === "portfolio" && (
                      <div className="absolute -bottom-3 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                    )}
                  </div>

                  <div className="relative flex flex-col items-center">
                    <EyeIcon
                      className={`w-4 h-4 cursor-pointer transition-colors ${
                        page === "watchlist"
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setPage("watchlist")}
                      title="Watchlist"
                    />
                    {(page === "watchlist" || isThinking) && (
                      <div
                        className={`absolute -bottom-3 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 ${
                          isThinking ? "animate-ping" : ""
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className="relative flex flex-col items-center">
                    <DocumentTextIcon
                      className={`w-4 h-4 cursor-pointer transition-colors ${
                        page === "researcher"
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setPage("researcher")}
                      title="Research"
                    />
                    {page === "researcher" && (
                      <div className="absolute -bottom-3 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                    )}
                  </div>

                  <div className="relative flex flex-col items-center">
                    <ClockIcon
                      className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                      title="History"
                    />
                  </div>

                  <div className="relative flex flex-col items-center">
                    <CogIcon
                      className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                      title="Settings"
                    />
                  </div>

                  <div className="relative flex flex-col items-center">
                    <BellIcon
                      className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                      title="Alerts"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full h-full bg-white/5 shadow-lg backdrop-blur-lg rounded-4xl p-4 border border-white/30">
            <div
              className={`h-[calc(100%)] w-full bg-white/70 shadow-lg backdrop-blur-lg rounded-3xl p-8 relative ${
                isThinking ? "overflow-hidden" : ""
              }`}
            >
              <div
                className={`transition-all duration-300 ${
                  isThinking ? "blur-sm opacity-50" : ""
                }`}
              >
                {page === "portfolio" && <PortfolioChartV2 />}
                {page === "trading" && <TradingHistory />}
                {page === "watchlist" && (
                  <Watchlist showNewToken={showNewToken} />
                )}
                {page === "researcher" && <ResearchReport />}
              </div>

              {isThinking && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-3xl">
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-700 mb-2">
                      Agent is thinking...
                    </div>
                    <div className="text-sm text-gray-500">
                      Adding token to watchlist
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Send to Agent Tooltip */}
      {showTooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 pointer-events-auto">
            <button
              onClick={sendToAgent}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send to Agent
            </button>
            <div className="text-xs text-gray-500 mt-1 max-w-40 truncate">
              "{selectedText}"
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
}
