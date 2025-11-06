"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import TransactionHistory from "@/components/TransactionHistory";
import api from "@/lib/axios";
import { Transaction } from "@/types/api";
import TransactionSkeleton from "@/components/TransactionSkeleton";

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  useEffect(() => {
    const getTransactions = async () => {
      const res = await api.get("/transactions/history");
      if (!res.data.error) setTransactions(res.data.data.data);
    };

    getTransactions();
  }, []);

  return (
    <div className="container">
      {/* Header */}

      <ProfileHeader title="Transaction History" />

      <div className="w-full p-4">
        {/* Content Card */}
        {!transactions ?
          <div className="space-y-4 animate-pulse">
            {[...Array(10)].map((_, i) => (
              <TransactionSkeleton key={i} />
            ))}
          </div> :
          <TransactionHistory
            data={transactions}
            minimal={false}
          />
        }
      </div>
    </div>
  );
}
