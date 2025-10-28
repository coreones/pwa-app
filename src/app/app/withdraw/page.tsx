"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import BankWithdrawal from "@/components/dashboard/bankWithdrawal";
import TagWithdrawal from "@/components/dashboard/TagWithdrawal";
import { useWallet } from "@/hooks/useWallet";

export default function WithdrawPage() {
  const [activeTab, setActiveTab] = useState("bank");
  const { hasBalance, wallet, loading } = useWallet();
  
  return (
    <div className="container flex flex-col space-y-4">
      {/* HEADER */}
      <ProfileHeader title="Withdraw" />

      {/* TAB BUTTONS */}
      <div className="flex items-center gap-2 bg-stone-200 p-1 m-4 max-w-lg mx-auto w-full rounded-xl">
        {[
          { id: "bank", title: "Withdraw to Bank" }, 
          { id: "tag", title: "Withdraw to Tag" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`truncate flex-1 font-medium text-sm p-3 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white text-stone-800 shadow-md border border-stone-300"
                : "text-stone-600 hover:bg-stone-300/75"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="w-full px-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#21A29D]"></div>
          </div>
        ) : (
          activeTab === "bank" ? (
            <BankWithdrawal balance={Number(wallet?.balance ?? 0)} />
          ) : (
            <TagWithdrawal balance={Number(wallet?.balance ?? 0)} />
          )
        )}
      </div>
    </div>
  );
}