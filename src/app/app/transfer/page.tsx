"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import BankTransfer from "@/components/transfer/BankTransfer";
import TagTransfer from "@/components/transfer/TagTransfer";
import { useWallet } from "@/hooks/useWallet";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("bank");
  const { hasBalance, wallet, loading } = useWallet();
  return (
    <div className="container flex flex-col">
      {/* HEADER */}
      <ProfileHeader title="Transfer" />

      {/* TAB BUTTONS */}
      <div className="flex items-center gap-2 bg-stone-200 p-1 m-4 rounded-xl">
        {[{ id: "bank", title: "Transfer to Bank" }, { id: "tag", title: "Transfer to Tag" }].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`truncate flex-1 font-medium text-sm p-3 rounded-lg transition-all duration-300 ${activeTab === tab.id
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
        {loading ? <></> :
          (activeTab === "bank" ? (
            <BankTransfer balance={Number(wallet?.balance ?? 0)} />
          ) : (
            <TagTransfer balance={Number(wallet?.balance ?? 0)} />
          ))
        }
      </div>
    </div>
  );
}
