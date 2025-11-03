"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import BankWithdrawal from "@/components/dashboard/bankWithdrawal";
import TagWithdrawal from "@/components/dashboard/TagWithdrawal";
import { useWallet } from "@/hooks/useWallet";
import BankTransfer from "@/components/transfer/BankTransfer";

export default function WithdrawPage() {
  const [activeTab, setActiveTab] = useState("bank");
  const { hasBalance, wallet, loading } = useWallet();

  return (
    <div className="container flex flex-col space-y-4">
      {/* HEADER */}
      <ProfileHeader title="Withdraw" />

      {/* CONTENT */}
      <div className="w-full my-10 px-4">
        <BankTransfer balance={Number(wallet?.balance ?? 0)} />
      </div>
    </div>
  );
}
