"use client";

import {
  Eye,
  Plus,
  Send,
  Sun,
  Settings,
  LogOut,
  Banknote,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AddFunds from "@/components/modal/payments/add-funds";
import { useAuth } from "@/hooks/useAuth";
import ComingSoon from "@/components/ComingSoon";
import { useRouter } from "next/navigation";
import { Transaction, Wallet } from "@/types/api";
import api from "@/lib/axios";
import { formatNGN } from "@/utils/amount";
import Link from "next/link";
import { logoutModal } from "@/lib/logout-modal";
import { setPinModal } from "@/lib/set-pin-modal";
import { usePin } from "@/hooks/usePin";
import { features } from "@/utils/string";
import TransactionHistory from "@/components/TransactionHistory";
import TransactionSkeleton from "@/components/TransactionSkeleton";

export default function DashboardPage() {
  const { user, authenticated } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [addFunds, setAddFunds] = useState(false);
  const [isComing, setIsComing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const { hasPin, pinConfirmationLoading } = usePin();
  const [userHasPin, setUserHasPin] = useState<boolean>(true);

  useEffect(() => {
    if (!pinConfirmationLoading) {
      setUserHasPin(hasPin);
    }
  }, [hasPin, pinConfirmationLoading]);

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
      if (!res.data.error) setTransactions(res.data.data);
    };

    getWalletBalance();
    getRecentTransactions();
  }, []);

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
      <div className="flex flex-col w-full mx-auto h-auto pb-12">
        {/* HEADER */}
        <div className="bg-[#21A29D] text-white rounded-b-[50px] px-4 pt-6 pb-4 relative shadow-sm z-1">
          <div className="flex items-center justify-between mb-3">
            <Link href="/app/profile" className="flex items-center gap-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/40">
                <Image
                  src={user?.photo ?? "/default.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-md">
                  {user?.firstname ?? "unknown"} {user?.lastname ?? "user"}
                </h2>
                <p className="text-sm text-white/80">
                  {user?.email ?? "*****@gmail.com"}
                </p>
              </div>
            </Link>
            <div className="flex flex-row gap-2 items-center">
              {/* <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                <Sun size={20} />
              </button> */}
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

          <div className="flex justify-between flex-col sm:flex-row gap-2 items-start sm:items-center mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold tracking-tight">
                {showBalance ? formatNGN(wallet?.balance) : "₦****"}
              </h3>
              <button className="cursor-pointer" onClick={handleShowBalance}>
                <Eye size={20} />
              </button>
            </div>
            <div className="flex w-full justify-end items-center gap-2">
              <button
                onClick={() => setAddFunds(true)}
                className="flex flex-row items-center gap-2 bg-white text-[#21A29D] font-medium p-2.5 text-sm rounded-xl shadow-sm hover:shadow-md transition"
              >
                <Plus size={12} />
                <span className="flex flex-none">Fund</span>
              </button>
              <Link
                href={"/app/tag"}
                className="flex flex-row items-center gap-2 bg-white text-[#21A29D] font-medium p-2.5 text-sm rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <Send size={12} />
                <span>Send</span>
              </Link>
              <Link
                href={"/app/withdraw"}
                className="flex flex-row items-center gap-2 bg-white text-[#21A29D] font-medium p-2.5 text-sm rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <Banknote size={12} />
                <span>Withdraw</span>
              </Link>
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
              <h2 className="text-xl font-semibold">
                {slides[currentIndex].title}
              </h2>
              <p className="text-sm font-normal">{slides[currentIndex].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <div className="flex-1 px-6 mb-4 space-y-4">
          <h3 className="text-base font-semibold text-gray-700">
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
            {features.map((item, idx) => {
              if (item.showInHome) {
                const Icon = item.icon;
                return (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    key={idx}
                    onClick={() => {
                      if (!userHasPin) {
                        setPinModal.open();
                        return;
                      }
                      item.link ? router.push(item.link) : setIsComing(true);
                    }}
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
              }
            })}
          </div>

          {/* Recent Transactions */}
          <div className="mt-8 space-y-4">
            <h3 className="text-base font-semibold text-gray-700">
              Recent Transactions
            </h3>
            <div className="w-full overflow-hidden">
              {!transactions ?
                <div className="space-y-4 animate-pulse">
                  {[...Array(10)].map((_, i) => (
                    <TransactionSkeleton key={i} />
                  ))}
                </div> : (
                  <TransactionHistory
                    data={transactions}
                    minimal={true}
                  />
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
