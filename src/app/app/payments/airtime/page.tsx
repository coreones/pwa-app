"use client";

import InternationalPurchase from "@/components/modal/payments/airtime-payment/international-purchase";
import LocalPurchase from "@/components/modal/payments/airtime-payment/local-purchase";
import TransactionHistory from "@/components/profile/reports/transaction-history";
import WalletHistory from "@/components/profile/reports/wallet-history";
import React from "react";

export default function page() {
  const [activeTab, setActiveTab] = React.useState<string>(
    "Local"
  );
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div
      className={` grid grid-cols-1 grid-rows-10 w-full min-h-screen bg-[#21A29D] `}
    >
      <div className=" flex flex-col  row-span-2 justify-between-center w-full p-4">
        <div className="mb-8 text-xl relative font-bold rext-white">
          <button
            onClick={handleBack}
            className="hover:bg-alternate/20 p-2 absolute top-2 left-2 rounded-full"
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
          Airtime
        </h1>

        <div className="flex items-center w-full p-3 gap-3 bg-alternate rounded-2xl">
          <button
            onClick={() => setActiveTab("Local")}
            className={`w-full font-semibold transition-colors duration-300 text-primary rounded-lg px-3 py-2 ${
              activeTab === "Local"
                ? "border-2 border-primary bg-white text-primary"
                : "border-2 border-transparent text-white"
            } `}
          >
            Local
          </button>
          <button
            onClick={() => setActiveTab("International")}
            className={`w-full font-semibold transition-colors duration-300 text-primary rounded-lg px-3 py-2 ${
              activeTab === "International"
                ? "border-2 border-primary bg-white text-primary"
                : "border-2 border-transparent text-white"
            } `}
          >
            International
          </button>
        </div>
      </div>

      <div className=" row-span-8 space-y-10 text-black bg-gray-100 rounded-t-[60px] flex items-start w-full p-4">
        {activeTab === "Local" && <LocalPurchase />}
        {activeTab === "International" && <InternationalPurchase />}
      </div>
    </div>
  );
}
