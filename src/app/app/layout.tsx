"use client";

import {
  Headset,
  HomeIcon,
  Send,
  Settings,
  UserCircle,
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
    { icon: Send, name: "Referral", link: "/app/profile/referal" },
    { icon: Headset, name: "Help", link: "/app/profile/helpAndSupport" },
    { icon: Settings, name: "Settings", link: "/app/profile" },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col min-h-screen bg-gray-50">
      {/* Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* Mobile Nav */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md rounded-3xl bg-white/90 backdrop-blur-lg border border-gray-200 shadow-md px-4 py-3 flex items-center justify-between">
        {navItems.map((item, id) => {
          const Icon = item.icon;
          const active = isActive(item.link);
          return (
            <Link
              key={id}
              href={item.link}
              className="flex-1 flex flex-col items-center justify-center gap-1 text-xs font-medium"
            >
              <motion.div
                animate={{
                  scale: active ? 1.2 : 1,
                  y: active ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`flex flex-col items-center justify-center ${
                  active ? "text-[#21A29D]" : "text-gray-400"
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
