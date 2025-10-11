import { Bell, Clock3, Home, icons, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FooterNav() {
  const items = [
    {
      icon: <Home size={30} strokeWidth={4} fillRule="evenodd" fill="white" absoluteStrokeWidth className="text-white/70 hover:text-white" />,
      value: "creator-dashboard",
    },
    {
      icon: <Clock3 size={30} strokeWidth={4} fillRule="evenodd" fill="white" absoluteStrokeWidth className="text-white/70 hover:text-white" />,
      value: "history",
    },
    {
      icon: <Bell size={30} strokeWidth={4} fillRule="evenodd" fill="white" absoluteStrokeWidth className="text-white/70 hover:text-white" />,
      value: "notification",
    },
    {
      icon: <Settings size={30} strokeWidth={4} fillRule="evenodd" fill="white" absoluteStrokeWidth className="text-white/70 hover:text-white" />,
      value: "settings",
    },
  ];
  return <div className=" flex items-center justify-evenly h-20 ">
    {items?.map(item => (
        <Link href={item.value}>
            {item.icon}
        </Link>
    ))}
  </div>;
}
