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
      <ProfileHeader title="Send to Tag" />

      {/* CONTENT */}
      <div className="w-full my-10 px-4 max-w-lg mx-auto">
      
            <TagTransfer balance={Number(wallet?.balance ?? 0)} />
        
      </div>
    </div>
  );
}
