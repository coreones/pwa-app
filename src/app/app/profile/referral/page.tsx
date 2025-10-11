"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ClipboardDocumentIcon,
  ShareIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ReferralPage() {
  const handleBack = () => window.history.back();
  const referralCode = "TALI001";
  const referralLink = `https://billna.app/ref/${referralCode}`;
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied");
  };

  // Example Referral History Data
  const referrals = [
    {
      name: "David Johnson",
      date: "Oct 3, 2025",
      status: "earned",
    },
    {
      name: "Mary Obi",
      date: "Sep 28, 2025",
      status: "pending",
    },
    {
      name: "Tunde Bello",
      date: "Sep 20, 2025",
      status: "earned",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#21A29D] flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="relative flex items-center justify-between px-6 pt-6">
        <button
          onClick={handleBack}
          className="w-10 text-white bg-white/10 hover:bg-white/20 p-2 rounded-2xl transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-white font-semibold text-lg">Referrals</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Banner Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-center items-center px-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-xs rounded-3xl bg-white/10 backdrop-blur-md p-4 shadow-lg flex justify-center items-center"
        >
          <Image
            src="/img/refer.png"
            alt="Referral Illustration"
            width={240}
            height={240}
            className="rounded-2xl object-contain"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-white text-3xl font-bold mt-4 text-center"
        >
          Invite & Earn Instantly 💸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-white/90 text-center mt-2 text-base max-w-sm leading-relaxed"
        >
          Refer your friends to{" "}
          <span className="font-semibold">BillNa</span> and earn{" "}
          <span className="font-bold">₦10</span> when they make their first
          transaction.
        </motion.p>
      </motion.section>

      {/* Bottom Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white rounded-t-[50px] p-6 shadow-inner flex flex-col gap-4"
      >
        <div className="text-center flex flex-col w-full max-w-md items-center justify-start space-y-4 mx-auto">
          <h3 className="text-2xl font-bold text-[#21A29D]">
            Your Referral Code
          </h3>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-between w-full max-w-sm px-4 py-3">
              <span className="text-gray-700 font-semibold">
                {referralCode}
              </span>
              <button
                onClick={handleCopy}
                className="text-[#21A29D] hover:text-[#1b8a88] transition"
              >
                <ClipboardDocumentIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowShareModal(true)}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm mt-4 flex items-center justify-center gap-2 bg-[#21A29D] hover:bg-[#1b8a88] text-white font-semibold py-4 px-6 rounded-xl shadow-md transition"
          >
            <ShareIcon className="w-5 h-5" />
            Share Referral Code
          </motion.button>

          <button
            onClick={() => setShowHistoryModal(true)}
            className="text-[#21A29D] font-bold hover:underline mt-1"
          >
            View Referral History
          </button>
        </div>
      </motion.section>

      {/* === Share Modal === */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 w-full max-w-3xl mx-auto backdrop-blur-sm flex items-end justify-center z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Share your referral link
                </h4>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Referral Link */}
              <div className="bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-between px-4 py-3 mb-4">
                <span className="text-gray-700 text-sm truncate max-w-[70%]">
                  {referralLink}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="text-[#21A29D] hover:text-[#1b8a88] transition"
                >
                  <ClipboardDocumentIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {[
                  {
                    name: "WhatsApp",
                    color: "bg-[#25D366]",
                    url: `https://wa.me/?text=${encodeURIComponent(
                      `Join BillNa and earn rewards! Use my link: ${referralLink}`
                    )}`,
                    icon: ChatBubbleOvalLeftEllipsisIcon,
                  },
                  {
                    name: "Facebook",
                    color: "bg-[#1877F2]",
                    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      referralLink
                    )}`,
                    icon: GlobeAltIcon,
                  },
                  {
                    name: "X",
                    color: "bg-black",
                    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Join BillNa and earn rewards! ${referralLink}`
                    )}`,
                    icon: ChatBubbleBottomCenterTextIcon,
                  },
                  {
                    name: "Telegram",
                    color: "bg-[#0088cc]",
                    url: `https://t.me/share/url?url=${encodeURIComponent(
                      referralLink
                    )}&text=${encodeURIComponent(
                      "Join BillNa and earn rewards!"
                    )}`,
                    icon: PaperAirplaneIcon,
                  },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center gap-1 text-white p-3 rounded-xl ${item.color} hover:opacity-90 transition`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-[11px]">{item.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Referral History Modal === */}
      <AnimatePresence>
        {showHistoryModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHistoryModal(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl mx-auto bg-white rounded-t-3xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Referral History
                </h4>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {referrals.length === 0 ? (
                <p className="text-center text-gray-500 py-6">
                  No referrals yet. Start sharing your link!
                </p>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {referrals.map((ref, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div>
                        <h5 className="font-semibold text-gray-800">
                          {ref.name}
                        </h5>
                        <p className="text-xs text-gray-500">{ref.date}</p>
                      </div>
                      {ref.status === "earned" ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <CheckCircleIcon className="w-4 h-4" />
                          Earned
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
                          <ClockIcon className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
