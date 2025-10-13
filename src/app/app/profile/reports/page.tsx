"use client";

import React, { useEffect, useState } from "react";
import TransactionHistory from "./components/TransactionHistory";
import WalletHistory from "./components/WalletHistory";
import ProfileHeader from "@/components/ProfileHeader";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Transaction & Wallet History" />

      {/* Content */}
      <div className="w-full p-4 relative">
        <div className="flex items-center gap-2 bg-stone-200 p-1 mx-4 rounded-xl">
          {[{ id: 1, name: "Transaction History" }, { id: 2, name: "Wallet History" }].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`truncate flex-1 font-medium text-sm p-3 rounded-lg transition-all duration-300 ${activeTab === tab.id
                ? "bg-white text-stone-800 shadow-md border border-stone-300"
                : "text-stone-600 hover:bg-stone-300/75"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-scroll w-full p-4">
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
          ) : activeTab === 1 ? (
            <TransactionHistory
              data={[
                { name: "Airtime Purchase", date: "Oct 10, 2025", amount: "-₦500", status: "Successful" },
                { name: "Electricity Bill", date: "Oct 8, 2025", amount: "-₦8,200", status: "Successful" },
                { name: "Bet9ja Top-up", date: "Oct 6, 2025", amount: "-₦2,000", status: "Failed" },
                { name: "Wallet Funding", date: "Oct 3, 2025", amount: "+₦50,000", status: "Successful" },
              ]}
            />
          ) : (
            <WalletHistory
              data={[
                { type: "Deposit", date: "Oct 10, 2025", amount: "+₦20,000" },
                { type: "Transfer", date: "Oct 8, 2025", amount: "-₦5,000" },
                { type: "Cashback", date: "Oct 7, 2025", amount: "+₦1,200" },
                { type: "POS Withdrawal", date: "Oct 5, 2025", amount: "-₦10,000" },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
