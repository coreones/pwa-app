"use client";

import { LayoutGrid, Home, List, Send } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import DeviceRestriction from "@/components/DeviceRestriction";
import LogoutModal from "@/components/Logout";
import SetPinModal from "@/components/SetPin";
import { usePin } from "@/hooks/usePin";
import { useEffect } from "react";
import { setPinModal } from "@/lib/set-pin-modal";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, authenticated } = useAuth();
  const { hasPin, pinConfirmationLoading } = usePin();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (linkPath: string) => pathname === linkPath;

  const navItems = [
    { icon: Home, name: "Home", link: "/app" },
    { icon: Send, name: "Send", link: "/app/send" },
    { icon: List, name: "History", link: "/app/history" },
    { icon: LayoutGrid, name: "More", link: "/app/profile" },
  ];

  // Bounce animation for loader dots
  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeOut",
    },
  };
  
  useEffect(() => {
    if (!pinConfirmationLoading && !hasPin) {
      setPinModal.open()
    }
  }, [hasPin, pinConfirmationLoading]);

	  if (loading)
	    return (
	      <div className="flex flex-col items-center justify-center h-screen bg-white">
		<div className="flex items-center gap-2">
		  {[0, 1, 2].map((i) => (
		    <motion.div
		      key={i}
		      className="w-4 h-4 bg-[#21A29D] rounded-full"
		      animate={{ y: ["0%", "-50%", "0%"] }}
		      transition={{ ...bounceTransition, delay: i * 0.2 }}
		    />
		  ))}
		</div>
		<motion.p
		  className="mt-4 text-gray-600 font-medium text-lg"
		  animate={{ opacity: [0.3, 1, 0.3] }}
		  transition={{ repeat: Infinity, duration: 1 }}
		>
		  Loading...
		</motion.p>
	      </div>
	    );
  return (
    authenticated ? (
      <DeviceRestriction>
        <div className="container relative w-full mx-auto flex flex-col min-h-screen bg-white">
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto pb-[120px]">{children}</main>

          <SetPinModal />
          <LogoutModal />
          {/* Floating Mobile Nav */}
          <div
            className="max-w-3xl  mx-auto bg-white/95 fixed bottom-0 left-0 right-0
          pb-[env(safe-area-inset-bottom)] flex items-center justify-between w-full
          backdrop-blur-lg border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] p-4
          rounded-t-2xl z-[50]"
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
      </DeviceRestriction>) : (<></>)
  );
}
