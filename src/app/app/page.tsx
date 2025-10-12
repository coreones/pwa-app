"use client";

import {
  Bus,
  CardSim,
  ChartNoAxesColumn,
  Eye,
  Gift,
  LayoutDashboard,
  Lightbulb,
  Plane,
  Smartphone,
  Sun,
  Trophy,
  Tv,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function WelcomePage() {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const handleShowBalance = () => {
    setShowBalance(!showBalance)
  }

  const items = [
    { name: "Airtime", icon: Smartphone, link: "/app/payments/airtime" },
    { name: "Data", icon: Wifi, link: "/app/payments/data" },
    { name: "Electricity", icon: Lightbulb, link: "/app/payments/electricity" },
    { name: "Flight", icon: Plane, tag: "5% off", link: "/app/payments/" },
    { name: "Cable/TV", icon: Tv, link: "/app/payments/tv" },
    { name: "Bet Topup", icon: Trophy, link: "/app/payments/betting" },
    { name: "Gift Card", icon: Gift, tag: "Best rate", link: "/app/payments/" },
    { name: "Transport", icon: Bus, link: "/app/payments/" },
    { name: "More", icon: LayoutDashboard, link: "#" },
  ];

  const slides = [
    {
      bg: "bg-gradient-to-r from-[#21A29D] to-teal-600",
      textColor: "text-white",
      title: "Welcome back, Tali 👋",
      desc: "Earn 5% cashback on your first flight booking.",
    },
    {
      bg: "bg-gradient-to-r from-amber-600 to-orange-500",
      textColor: "text-white",
      title: "Exclusive Deal ✈️",
      desc: "Get flight discounts every Friday — limited time!",
    },
    {
      bg: "bg-gradient-to-r from-indigo-700 to-blue-600",
      textColor: "text-white",
      title: "Stay Connected 🌍",
      desc: "Buy data or airtime instantly, 24/7 — no delays.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen container">
      <div className="flex flex-col w-full mx-auto h-screen overflow-y-auto pb-28">
        {/* HEADER */}
        <div className="bg-[#21A29D] text-white rounded-b-[50px] px-6 pt-10 pb-8 relative shadow-sm">
          {/* Profile Row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/40">
                <Image src="/img/user.png" alt="Profile" fill className="object-cover" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Tali Nanzing</h2>
                <p className="text-sm text-white/80">talinanzing111@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                <ChartNoAxesColumn size={20} />
              </button>
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                <Sun size={20} />
              </button>
            </div>
          </div>

          {/* Balance */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold tracking-tight">{showBalance ? "₦0.00" : "₦****"}</h3>
              <button className="cursor-pointer" onClick={handleShowBalance}>
                <Eye size={22} />
              </button>
            </div>
            <button className="bg-white text-[#21A29D] font-medium py-2 px-5 rounded-2xl hover:bg-gray-50 transition">
              History
            </button>
          </div>

          {/* CTA */}
          <div className="w-full text-center">
            <button onClick={() => {}} className="bg-white text-[#21A29D] font-semibold py-3 px-8 rounded-2xl shadow-sm hover:shadow-md transition">
              + Add Money
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-6 py-8 space-y-8">
          {/* Services Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.link}
                    key={idx}
                    className="relative flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="bg-[#21A29D]/10 p-3 rounded-full mb-2">
                      <Icon className="text-[#21A29D]" size={22} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    {item.tag && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Promo Slider */}
          <div className="overflow-hidden rounded-2xl shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`p-6 ${slides[currentIndex].bg} ${slides[currentIndex].textColor}`}
              >
                <h2 className="text-2xl font-bold mb-2">
                  {slides[currentIndex].title}
                </h2>
                <p className="text-sm opacity-90">
                  {slides[currentIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
