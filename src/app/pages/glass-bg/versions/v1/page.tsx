import React from "react";
import { 
  ChartBarIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

export default function GlassBackground() {
  return (
    <main
      className="h-screen w-full relative bg-gray-900 overflow-hidden p-8"
      style={{
        backgroundImage: "url(/assets/blur-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex gap-8 h-full">
        {/* Left sidebar - separate glass container */}
        <div className="bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 flex flex-col items-center py-6 gap-6 w-16">
          <HomeIcon className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
          <MagnifyingGlassIcon className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
          <ChartBarIcon className="w-6 h-6 text-white cursor-pointer" />
          <BookmarkIcon className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
          <div className="mt-auto">
            <Cog6ToothIcon className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Main glass container */}
        <div className="flex-1 bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden relative">
          {/* Top navigation bar */}
          <div className="flex items-center justify-between p-6 bg-black/10 backdrop-blur-sm border-b border-white/5">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <ArrowLeftIcon className="w-5 h-5 text-white" />
              </button>
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/20 transition-colors">
                Analyze
              </button>
              <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <BookmarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 flex gap-8">
            {/* Left side - Chart area */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-white text-3xl font-bold mb-2">AAPL · Apple Inc</h1>
                <div className="flex items-center gap-2">
                  <span className="text-white text-4xl font-bold">191.40</span>
                  <span className="text-green-400 text-lg">+2.77 (+1.47%)</span>
                </div>
              </div>

              {/* Time period buttons */}
              <div className="flex items-center gap-2 mb-8">
                {['1D', '1W', '1M', '3M', 'YTD', 'All'].map((period) => (
                  <button
                    key={period}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      period === '1D' 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="h-64 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center mb-8">
                <ChartBarIcon className="w-12 h-12 text-white/30" />
              </div>

              {/* Stats section */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="text-white/60 text-sm mb-4">News and statistics</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">Mkt Cap</span>
                      <span className="text-white text-sm">3T</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">EV</span>
                      <span className="text-white text-sm">2.9T</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">Cash</span>
                      <span className="text-white text-sm">29.97B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Debt</span>
                      <span className="text-white text-sm">123.9B</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Beta</span>
                      <span className="text-white text-sm">1.15</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Short Int.</span>
                      <span className="text-white text-sm">0.70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - News card */}
            <div className="w-80">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-sm">5 sources</span>
                  <button className="text-white/60 hover:text-white">
                    <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                  </button>
                </div>
                
                <div className="text-white/60 text-sm mb-2">Today, 11:30 AM</div>
                <h2 className="text-white text-xl font-bold mb-4">
                  Apple Launches Vision Pro Headset with Pre-Orders Open
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Pre-orders for Apple's Vision Pro augmented reality device are now available, marking the tech giant's first major hardware release in nine years. The $3,500 headset will be released in the U.S. on February 2, amid concerns about manufacturing, costs, and market appeal. Joanna Stern of WSJ discusses chip performance and potential use cases.
                </p>
                
                {/* Pagination dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom page indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="w-8 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
