"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import TransactionHistory from "@/components/TransactionHistory";
import api from "@/lib/axios";
import { Transaction } from "@/types/api";


export default function History() {
  const [transactions, setTransactions] = useState<any[]>([]);
  useEffect(() => {
   
    const getRecentTransactions = async () => {
      const res = await api.get("/transactions/history");
      // console.log(res.data.data);
      if (!res.data.error) setTransactions(res.data.data.data);
    };

    getRecentTransactions();
  }, []);

  return (
    <div className="container">
      {/* Header */}
     
      <ProfileHeader title="Transaction History" />

      <div className="w-full">
        {/* Content Card */}
        <TransactionHistory
          data={transactions}
        />
      </div>
    </div>
  );
}
