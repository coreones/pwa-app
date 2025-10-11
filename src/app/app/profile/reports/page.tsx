"use client";

import TransactionHistory from "@/components/profile/reports/transaction-history";
import WalletHistory from "@/components/profile/reports/wallet-history";
import React from "react";

export default function page() {
  const [activeTab, setActiveTab] = React.useState<string>(
    "Transaction History"
  );
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div
      className={` grid grid-cols-1 grid-rows-4 w-full min-h-screen bg-[#21A29D] `}
    >
      <div className=" flex flex-col  row-span-1 justify-between-center w-full p-4">
        <div className="mb-8 text-xl font-bold rext-white">
          <button
            onClick={handleBack}
            className="hover:bg-alternate/20 p-2 rounded-full"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        {/* Header */}
        <h1 className="text-center text-2xl font-semibold w-full text-white mb-6">
          Reports
        </h1>

        <div className="flex items-center w-full p-3 gap-3 bg-alternate rounded-2xl">
          <button
            onClick={() => setActiveTab("Transaction History")}
            className={`w-full font-semibold transition-colors duration-300 text-primary rounded-lg px-3 py-2 ${
              activeTab === "Transaction History"
                ? "border-2 border-primary bg-white text-primary"
                : "border-2 border-transparent text-white"
            } `}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab("Wallet History")}
            className={`w-full font-semibold transition-colors duration-300 text-primary rounded-lg px-3 py-2 ${
              activeTab === "Wallet History"
                ? "border-2 border-primary bg-white text-primary"
                : "border-2 border-transparent text-white"
            } `}
          >
            Wallet History
          </button>
        </div>
      </div>

      <div className=" row-span-3 space-y-10 bg-white rounded-t-[60px] flex items-start w-full p-4">
        {activeTab === "Transaction History" && <TransactionHistory />}
        {activeTab === "Wallet History" && <WalletHistory />}
      </div>
    </div>
  );
}
