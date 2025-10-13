"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeftIcon,
  PhoneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import ProfileHeader from "@/components/ProfileHeader";

export default function HelpAndSupportPage() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setSubmitted(false);
      setIssue("");
      alert("Your issue has been submitted ✅");
    }, 1200);
  };

  return (
    <div className="container flex flex-col">
      {/* Header */}
      <ProfileHeader title="Help & Support" />

      {/* Content */}
      <div className="w-full px-4 pt-4">
        {/* Contact Section */}
        <section className="bg-stone-50 w-full mb-4 border border-stone-100 rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="text-stone-800 font-semibold text-lg">
            Contact Support
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "WhatsApp", icon: ChatBubbleOvalLeftEllipsisIcon },
              { label: "Facebook", icon: ChatBubbleOvalLeftEllipsisIcon },
              { label: "Instagram", icon: ChatBubbleOvalLeftEllipsisIcon },
              { label: "X (Twitter)", icon: ChatBubbleOvalLeftEllipsisIcon },
              { label: "Phone", icon: PhoneIcon },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 transition"
              >
                <item.icon className="w-5 h-5 text-[#21A29D]" />
                <span className="font-medium text-stone-700 text-sm">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Report Section */}
        <section className="bg-stone-50 w-full mb-4 border border-stone-100 rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="text-stone-800 font-semibold text-lg">
            Report an Issue
          </h2>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center justify-center gap-2 w-full bg-[#21A29D] hover:bg-[#1c8c87] text-white font-semibold py-3 rounded-xl transition"
          >
            <ExclamationTriangleIcon className="w-5 h-5" />
            Report Problem
          </button>
        </section>

        {/* Social Links */}
        <section className="bg-stone-50 w-full mb-4 border border-stone-100 rounded-2xl shadow-sm p-5">
          <h2 className="text-stone-800 font-semibold text-lg mb-3 text-center">
            Follow Us
          </h2>
          <div className="flex items-center justify-center gap-6">
            <Link href="#">
              <Image
                src="/svg/telegram.svg"
                alt="Telegram"
                width={30}
                height={30}
                className="hover:opacity-80 transition"
              />
            </Link>
            <Link href="#">
              <Image
                src="/svg/instagram.svg"
                alt="Instagram"
                width={30}
                height={30}
                className="hover:opacity-80 transition"
              />
            </Link>
            <Link href="#">
              <Image
                src="/svg/x.svg"
                alt="X"
                width={30}
                height={30}
                className="hover:opacity-80 transition"
              />
            </Link>
          </div>
        </section>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            className="fixed container inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-stone-800">
                  Report an Issue
                </h4>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-stone-500 hover:text-stone-700 transition"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the issue or feedback..."
                    className="w-full h-32 border border-stone-300 rounded-xl p-3 text-stone-700 text-sm resize-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!issue.trim()}
                    className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition ${issue.trim()
                      ? "bg-[#21A29D] hover:bg-[#1c8c87] text-white"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                      }`}
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Submit
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-16 h-16 rounded-full bg-[#21A29D]/10 flex items-center justify-center mb-4"
                  >
                    <PaperAirplaneIcon className="w-8 h-8 text-[#21A29D]" />
                  </motion.div>
                  <h3 className="font-semibold text-stone-800 text-lg">
                    Submitting your report...
                  </h3>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
