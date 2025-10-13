"use client";

import React, { useEffect, useState } from "react";
import { useBack } from "@/hooks/useBack";
import BankTransfer from "./component/bank-transfer";
import WalletTransfer from "./component/wallet-transfer";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Transfer to Bank");
  const [loading, setLoading] = useState(true);
  const handleBack = useBack("/app");

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container flex flex-col">
      {/* HEADER */}
      <div className="bg-[#21A29D] container pt-8 rounded-b-3xl shadow-md w-full fixed h-[170px]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-white ml-2">Reports</h1>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex items-center gap-3 mt-6 bg-[#3FD9D4]/30 p-2 rounded-2xl">
          {["Transfer to Bank", "Transfer to Wallet"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 font-medium text-sm md:text-base px-3 py-2 rounded-xl transition-all duration-300 ${activeTab === tab
                ? "bg-white text-[#21A29D] shadow-md border border-[#21A29D]/30"
                : "text-white/90 hover:bg-white/10"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 mt-[180px] overflow-scroll w-full bg-white rounded-t-3xl p-5 shadow-inner">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-stone-100 p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-200 rounded-full" />
                  <div>
                    <div className="h-3 w-24 bg-stone-200 rounded-md mb-2" />
                    <div className="h-3 w-16 bg-stone-200 rounded-md" />
                  </div>
                </div>
                <div className="h-3 w-10 bg-stone-200 rounded-md" />
              </div>
            ))}
          </div>
        ) : activeTab === "Transfer to Bank" ? (
            <BankTransfer />
        ) : (
          <WalletTransfer />
        )}
      </div>
    </div>
  );
}
