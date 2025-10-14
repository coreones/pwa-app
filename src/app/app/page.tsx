"use client";

import {
  Bus,
  Eye,
  Gift,
  Lightbulb,
  List,
  Plane,
  Plus,
  Receipt,
  Send,
  Smartphone,
  Sun,
  Star,
  Tv,
  Wifi,
  Settings,
  LogOut,
  PhoneCall,
  Volleyball,
  ArrowRightLeft,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AddFunds from "@/components/modal/payments/add-funds";
import { useAuth } from "@/hooks/useAuth";
import ComingSoon from "@/components/ComingSoon";
import { useRouter } from "next/navigation";
import { Wallet } from "@/types/api";
import api from "@/lib/axios";
import { formatNGN } from "@/utils/amount";
import Link from "next/link";
import { logoutModal } from "@/lib/logout-modal";
import { setPinModal } from "@/lib/set-pin-modal";
import { usePin } from "@/hooks/usePin";

export default function DashboardPage() {
  const { user, authenticated } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [addFunds, setAddFunds] = useState(false);
  const [isComing, setIsComing] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const { hasPin, pinConfirmationLoading } = usePin();
  const [userHasPin, setUserHasPin] = useState<boolean>(true);

  useEffect(() => {
    if (!pinConfirmationLoading) {
      setUserHasPin(hasPin)
    }
  }, [hasPin, pinConfirmationLoading])

  const router = useRouter();

  const handleShowBalance = () => setShowBalance(!showBalance);

  useEffect(() => {
    if (pinConfirmationLoading) return;

    const storedPin = localStorage.getItem("userSetPin");
    if (storedPin === "true" || hasPin) {
      setUserHasPin(true);
    } else {
      setUserHasPin(false);
    }
  }, [hasPin, pinConfirmationLoading]);

  useEffect(() => {
    const getWalletBalance = async () => {
      const res = await api.get("/user/wallet");
      if (!res.data.error) setWallet(res.data.data);
    };

    const getRecentTransactions = async () => {
      const res = await api.get("/transactions/recent");
      console.log(res.data.data)
      if (!res.data.error) setTransactions(res.data.data);
    };

    getWalletBalance();
    getRecentTransactions();
  }, []);
  const items = [
    { name: "Receive", icon: Plus, link: "/app/receive" },
    { name: "Send", icon: Send, link: "/app/transfer" },
    { name: "Airtime", icon: PhoneCall, link: "/app/payments/airtime" },
    { name: "Data", icon: Wifi, link: "/app/payments/data" },
    { name: "Electricity", icon: Lightbulb, link: "/app/payments/electricity" },
    { name: "Cable/TV", icon: Tv, link: "/app/payments/tv" },
    { name: "Beting", icon: Volleyball, link: "/app/payments/betting" },
    { name: "Transactions", icon: ArrowRightLeft, link: "app/history" },
    { name: "Flight", icon: Plane, link: "" },
    // { name: "Gift Card", icon: Gift, link: "" },
    // { name: "Transport", icon: Bus, link: "" },
  ];

  const slides = [
    {
      bg: "bg-gradient-to-r from-sky-600 to-cyan-600",
      textColor: "text-white",
      title: `Welcome back, ${user?.username ?? "User"} 👋`,
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
      <div className="flex flex-col w-full mx-auto h-auto pb-16">
        {/* HEADER */}
        <div className="bg-[#21A29D] text-white rounded-b-[50px] px-6 pt-6 pb-4 relative shadow-sm z-1">
          <div className="flex items-center justify-between mb-4">
            <Link href="/app/profile" className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/40">
                <Image
                  src={user?.photo ?? "/default.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-lg">
                  {user?.firstname ?? "unknown"} {user?.lastname ?? "user"}
                </h2>
                <p className="text-sm text-white/80">
                  {user?.email ?? "*****@gmail.com"}
                </p>
              </div>
            </Link>
            <div className="flex flex-row gap-3 items-center">
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                <Sun size={20} />
              </button>
              <Link
                href="/app/profile/edit"
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
              >
                <Settings size={20} />
              </Link>
              <button
                onClick={() => logoutModal.open()}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold tracking-tight">
                {showBalance ? formatNGN(wallet?.balance) : "₦****"}
              </h3>
              <button className="cursor-pointer" onClick={handleShowBalance}>
                <Eye size={20} />
              </button>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Link
                href={"/app/transfer"}
                className="flex flex-row items-center gap-2 bg-white text-[#21A29D] font-medium py-3 px-4 text-sm rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <Send size={12} />
                <span>Send</span>
              </Link>
              <button
                onClick={() => setAddFunds(true)}
                className="flex flex-row items-center gap-2 bg-white text-[#21A29D] font-medium py-3 px-4 text-sm rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <Plus size={12} />
                <span>Receive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Promo Slider */}
        <div className="overflow-hidden bg-transparent -mt-16 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`p-6 rounded-b-[50px] pt-20 -z-0 ${slides[currentIndex].bg} ${slides[currentIndex].textColor}`}
            >
              <h2 className="text-xl font-semibold mb-2">
                {slides[currentIndex].title}
              </h2>
              <p className="text-sm font-normal">{slides[currentIndex].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <div className="flex-1 px-6 py-6 space-y-6">
          <h3 className="text-base font-semibold text-gray-700">
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  key={idx}
                  onClick={() => {
                    if (!userHasPin) {
                      setPinModal.open()
                      return;
                    }
                    item.link ? router.push(item.link) : setIsComing(true)
                  }
                  }
                  className="relative flex flex-col items-center justify-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="bg-[#1FBFAE]/10 p-3 rounded-full mb-2">
                    <Icon className="text-[#1FBFAE]" size={22} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                    {item.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* 🧾 Recent Transactions */}
          <div className="mt-8 space-y-4">
            <h3 className="text-base font-semibold text-gray-700">
              Recent Transactions
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {transactions.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  No recent transactions
                </div>
              ) : (
                <ul>
                  {transactions.map((txn, i) => {
                     const isCredit = txn.amount.startsWith("+");
                const statusColor =
                    txn.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "Failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700";
                  return  (<div
                        key={i}
                        className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${isCredit ? "bg-green-50" : "bg-stone-100"
                                    }`}
                            >
                                {isCredit ? (
                                    <ArrowDownLeftIcon className="w-5 h-5 text-green-500" />
                                ) : (
                                    <ArrowUpRightIcon className="w-5 h-5 text-stone-600" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-stone-800 text-sm md:text-base">
                                    {txn.action}
                                </h4>
                                <p className="text-stone-500 text-xs md:text-sm">{txn.created_at}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <span
                                className={`text-sm md:text-base font-semibold ${isCredit ? "text-green-600" : "text-stone-800"
                                    }`}
                            >
                                {txn.amount}
                            </span>
                            <span
                                className={`text-xs px-2 py-0.5 mt-1 rounded-full ${statusColor}`}
                            >
                                {txn.status}
                            </span>
                        </div>
                    </div>
)})}
                </ul>
              )}
            </div>
          </div>
        </div>
        {addFunds && <AddFunds close={setAddFunds} />}
        {isComing && <ComingSoon close={setIsComing} />}
      </div>
    </div>
  );
}
