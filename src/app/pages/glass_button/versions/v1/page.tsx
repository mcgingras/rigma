import React from "react";
import {
  BellIcon,
  BookmarkIcon,
  CameraIcon,
  ChatBubbleLeftIcon,
  CloudIcon,
  CogIcon,
  DocumentIcon,
  EnvelopeIcon,
  HeartIcon,
  HomeIcon,
  LightBulbIcon,
  MoonIcon,
  MusicalNoteIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const GlassButton = ({ icon: Icon, label }: { icon: any; label: string }) => {
  return (
    <div className="relative">
      <div
        className="w-[90%] h-[80%] bg-gradient-to-t from-[#FFFFFF] to-[#FFFFFF0] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 opacity-15 backdrop-blur-[100px]"
        style={{
          maskImage: "linear-gradient(to top, transparent, black)",
          WebkitMaskImage: "linear-gradient(to top, transparent, black)",
        }}
      ></div>
      <button className="bg-white/5 px-4 py-2 rounded-full bg-blend-luminosity w-full h-full flex flex-col items-center justify-center gap-2">
        <Icon className="w-6 h-6 text-white" />
        <span
          className="relative bg-gradient-to-t to-[#FFFFFF] from-[#EDEDED30] bg-clip-text text-transparent font-medium text-sm"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 3px rgba(255,255,255,0.3), 0 0 3px rgba(255,255,255,0.3) inset",
            filter: "brightness(1.2)",
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

const buttons = [
  { icon: HomeIcon, label: "Home" },
  { icon: BellIcon, label: "Notifications" },
  { icon: ChatBubbleLeftIcon, label: "Chat" },
  { icon: UserIcon, label: "Profile" },
  { icon: CogIcon, label: "Settings" },
  { icon: HeartIcon, label: "Favorites" },
  { icon: BookmarkIcon, label: "Bookmarks" },
  { icon: DocumentIcon, label: "Documents" },
  { icon: CloudIcon, label: "Cloud" },
  { icon: CameraIcon, label: "Camera" },
  { icon: StarIcon, label: "Star" },
  { icon: EnvelopeIcon, label: "Mail" },
  { icon: LightBulbIcon, label: "Ideas" },
  { icon: MoonIcon, label: "Dark Mode" },
  { icon: MusicalNoteIcon, label: "Music" },
];

export default function GlassButtonGrid() {
  return (
    <div className="p-4 h-screen w-screen bg-gray-500">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="grid grid-cols-5 gap-4 w-full max-w-5xl">
          {buttons.map((button, index) => (
            <GlassButton key={index} icon={button.icon} label={button.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
