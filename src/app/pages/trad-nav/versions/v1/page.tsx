import React from "react";
import {
  PlusIcon,
  RadioIcon,
  ShoppingCartIcon,
  SunIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

export default function TradNav() {
  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <div className="flex flex-col gap-8 items-center h-full w-full">
        <div className="p-4 w-[200px] h-[50px] bg-white border border-gray-200 rounded-2xl"></div>
        <div className="flex-1 flex flex-row gap-8 items-center h-full w-full">
          <div className="flex flex-col space-y-4 text-black bg-white border border-gray-200 p-4 self-center justify-center rounded-2xl">
            <PlusIcon className="w-4 h-4 text-gray-500" />
            <RadioIcon className="w-4 h-4 text-gray-500" />
            <ShoppingCartIcon className="w-4 h-4 text-gray-500" />
            <SunIcon className="w-4 h-4 text-gray-500" />
            <TrophyIcon className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1 w-full h-full bg-white rounded-4xl border border-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
