"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "@/types/api";
import api from "@/lib/axios";
import { setToLocalStorage } from "@/lib/local-storage";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const hasLoggedIn = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/profile");
        if (res.data.error) {
          router.push("/auth/login");
        } else {
          setToLocalStorage("user", JSON.stringify(res.data.data));
          router.push("/app");
        }
      } catch (err) {
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };
    hasLoggedIn();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden text-white">
        {/* Animated background glow */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#21A29D] opacity-20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />

        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center z-10"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              // animate={{ rotate: [0, 360] }}
              // transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              // className="p-3 bg-white/10 rounded-full animate-pulse"
              className="animate-pulse"
            >
              <Image
                src="/icons/icon.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl font-semibold tracking-wide"
          >
            Welcome to <span className="text-[#21A29D]">BillNa</span>
          </motion.h1>

          {/* Animated Dots */}
          <div className="flex items-center justify-center mt-6 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-[#21A29D] rounded-full"
                animate={{ y: ["0%", "-60%", "0%"] }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.p
            className="mt-6 text-gray-200 text-sm tracking-wider"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Loading, please wait...
          </motion.p>
        </motion.div>
      </div>
    );

  return <></>;
}
