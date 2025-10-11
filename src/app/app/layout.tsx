"use client";

import {
  Headset,
  HomeIcon,
  Send,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (linkPath: string) => pathname === linkPath;

  const navItems = [
    { icon: HomeIcon, name: "Home", link: "/app" },
    { icon: Send, name: "Referral", link: "/app/profile/referral" },
    { icon: Headset, name: "Help", link: "/app/profile/help-and-support" },
    { icon: Settings, name: "Settings", link: "/app/profile" },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col min-h-screen bg-white">
      {/* Main content area */}
      <main
        className="flex-1 overflow-y-auto pb-[120px]">
        {children}
      </main>

      {/* Floating Mobile Nav */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          pb-[env(safe-area-inset-bottom)]  /* Respect iPhone/Android nav bars */
          flex items-center justify-between
          w-full max-w-3xl mx-auto
          bg-white/95 backdrop-blur-lg border-t border-gray-200
          shadow-[0_-2px_10px_rgba(0,0,0,0.08)]
          px-4 py-4 rounded-t-2xl                  
          z-50
        "
      >
        {navItems.map((item, id) => {
          const Icon = item.icon;
          const active = isActive(item.link);
          return (
            <Link
              key={id}
              href={item.link}
              className="flex-1 flex flex-col items-center justify-center gap-1 pb-2 text-sm font-medium"
            >
              <motion.div
                animate={{
                  scale: active ? 1.2 : 1,
                  y: active ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`flex flex-col items-center justify-center ${active ? "text-[#21A29D]" : "text-gray-400"
                  }`}
              >
                <Icon size={22} strokeWidth={2} />
                <span className="text-[11px]">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
