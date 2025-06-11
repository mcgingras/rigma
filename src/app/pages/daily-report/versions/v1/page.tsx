"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  NewspaperIcon,
  PlusIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";

const MOCK_USER = { name: "Alex", portfolioChange: 8.4, portfolioValue: 45892.13 };

const MOCK_TRANSACTIONS = [
  { id: 1, type: "buy", asset: "ETH", amount: 2.5, value: 4250, time: "2h ago", status: "completed" },
  { id: 2, type: "sell", asset: "BTC", amount: 0.1, value: 4300, time: "4h ago", status: "completed" },
  { id: 3, type: "swap", asset: "USDC → ETH", amount: 1000, value: 1000, time: "6h ago", status: "pending" },
];

const MOCK_COINS = [
  { symbol: "BTC", name: "Bitcoin", price: 43000, change: 5.2, holding: 1.2, value: 51600 },
  { symbol: "ETH", name: "Ethereum", price: 2600, change: -2.1, holding: 8.5, value: 22100 },
  { symbol: "SOL", name: "Solana", price: 95, change: 12.8, holding: 45, value: 4275 },
  { symbol: "AVAX", name: "Avalanche", price: 35, change: -4.3, holding: 120, value: 4200 },
];

const MOCK_NEWS = [
  { id: 1, title: "Bitcoin ETF approval drives market rally", impact: "positive", relevance: "BTC +5.2%" },
  { id: 2, title: "Ethereum upgrade delayed to Q2", impact: "negative", relevance: "ETH -2.1%" },
  { id: 3, title: "Solana ecosystem shows strong growth", impact: "positive", relevance: "SOL +12.8%" },
];

export default function DailyReport() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Greeting Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Hello {MOCK_USER.name}, your portfolio was 
                  <span className={`ml-2 ${MOCK_USER.portfolioChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {MOCK_USER.portfolioChange > 0 ? '↗' : '↘'} {Math.abs(MOCK_USER.portfolioChange)}%
                  </span> today
                </h1>
                <p className="text-gray-600">
                  Current value: <span className="font-semibold text-xl">${MOCK_USER.portfolioValue.toLocaleString()}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Today's Performance</div>
                <div className={`text-2xl font-bold ${MOCK_USER.portfolioChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {MOCK_USER.portfolioChange > 0 ? '+' : ''}${(MOCK_USER.portfolioValue * MOCK_USER.portfolioChange / 100).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transactions Widget */}
          <TransactionWidget transactions={MOCK_TRANSACTIONS} />
          
          {/* Coin Performance Widget */}
          <CoinPerformanceWidget coins={MOCK_COINS} />
          
          {/* News Widget */}
          <NewsWidget news={MOCK_NEWS} />
          
          {/* Market Overview Widget */}
          <MarketOverviewWidget />
        </div>

        {/* Additional Action Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard
            title="Quick Trade"
            description="Execute trades with one click"
            icon={<CurrencyDollarIcon className="w-6 h-6" />}
            onClick={() => alert("Quick trade feature")}
          />
          <ActionCard
            title="DeFi Opportunities"
            description="Discover high-yield farming"
            icon={<BanknotesIcon className="w-6 h-6" />}
            onClick={() => alert("DeFi opportunities")}
          />
          <ActionCard
            title="Portfolio Analysis"
            description="Deep dive into your holdings"
            icon={<ChartBarIcon className="w-6 h-6" />}
            onClick={() => alert("Portfolio analysis")}
          />
        </div>
      </div>
    </div>
  );
}

function TransactionWidget({ transactions }: { transactions: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Today's Activity</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            whileHover={{ backgroundColor: "#f8fafc" }}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                tx.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <div>
                <div className="font-medium text-gray-900 capitalize">
                  {tx.type} {tx.asset}
                </div>
                <div className="text-sm text-gray-500">{tx.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${tx.value.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{tx.amount} {tx.asset.split(' →')[0]}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium">
        Execute New Trade
      </button>
    </motion.div>
  );
}

function CoinPerformanceWidget({ coins }: { coins: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Holdings</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Rebalance
        </button>
      </div>
      
      <div className="space-y-3">
        {coins.map((coin) => (
          <motion.div
            key={coin.symbol}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-sm">
                {coin.symbol}
              </div>
              <div>
                <div className="font-medium text-gray-900">{coin.name}</div>
                <div className="text-sm text-gray-500">{coin.holding} {coin.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${coin.value.toLocaleString()}</div>
              <div className={`text-sm flex items-center gap-1 ${
                coin.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {coin.change > 0 ? 
                  <ArrowTrendingUpIcon className="w-3 h-3" /> : 
                  <ArrowTrendingDownIcon className="w-3 h-3" />
                }
                {Math.abs(coin.change)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function NewsWidget({ news }: { news: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Market Impact News</h2>
        <NewspaperIcon className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        {news.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ backgroundColor: "#f8fafc" }}
            className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.impact === 'positive' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.impact}
                  </span>
                  <span className="text-xs text-gray-500">{item.relevance}</span>
                </div>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-gray-400 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
        Read Full Market Analysis
      </button>
    </motion.div>
  );
}

function MarketOverviewWidget() {
  const marketData = [
    { metric: "Total Market Cap", value: "$2.1T", change: "+3.2%" },
    { metric: "24h Volume", value: "$85.2B", change: "+12.8%" },
    { metric: "DeFi TVL", value: "$47.3B", change: "-1.4%" },
    { metric: "Active Addresses", value: "1.2M", change: "+8.7%" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Market Overview</h2>
        <ChartBarIcon className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {marketData.map((data, index) => (
          <motion.div
            key={data.metric}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-center p-3 bg-gray-50 rounded-lg"
          >
            <div className="text-lg font-bold text-gray-900">{data.value}</div>
            <div className="text-xs text-gray-600 mb-1">{data.metric}</div>
            <div className={`text-xs font-medium ${
              data.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {data.change}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ActionCard({ title, description, icon, onClick }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
