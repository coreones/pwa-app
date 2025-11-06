"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import TransactionSkeleton from "@/components/TransactionSkeleton";
import api from "@/lib/axios";
import { Transaction } from "@/types/api";
import TransactionHistory from "@/components/TransactionHistory";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [walletTransactions, setWalletTransactions] = useState<Transaction[] | null>(null);
  const [purchaseTransactions, setPurchaseTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    const getWalletTransactions = async () => {
      setLoading(true)
      try {
        const res = await api.get("/transactions/wallet-history");
        if (!res.data.error) setWalletTransactions(res.data.data.data);
      } catch (err) {

      } finally {
        setLoading(false)
      }
    };
    const getPurchaseTransactions = async () => {
      setLoading(true)
      try {
        const res = await api.get("/transactions/purchase-history");
        if (!res.data.error) setPurchaseTransactions(res.data.data.data);
      } catch (err) {

      } finally {
        setLoading(false)
      }
    };

    getPurchaseTransactions();
    getWalletTransactions();
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="My Reports" />

      {/* Content */}
      <div className="w-full p-4 relative">
        <div className="flex items-center gap-2 bg-stone-200 p-1 mx-4 rounded-xl">
          {[{ id: 1, title: "Purchase History" }, { id: 2, title: "Wallet History" }].map((tab) => (
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
        <div className="flex-1 overflow-scroll w-full p-4">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(10)].map((_, i) => (
                <TransactionSkeleton key={i} />
              ))}
            </div>
          ) : activeTab === 1 ? (!purchaseTransactions ?
            <div className="space-y-4 animate-pulse">
              {[...Array(10)].map((_, i) => (
                <TransactionSkeleton key={i} />
              ))}
            </div> :
            <TransactionHistory
              data={purchaseTransactions}
              minimal={false}
            />)
            : (!walletTransactions ?
              <div className="space-y-4 animate-pulse">
                {[...Array(10)].map((_, i) => (
                  <TransactionSkeleton key={i} />
                ))}
              </div> :
              <TransactionHistory
                data={walletTransactions}
                minimal={false}
              />)
          }
        </div>
      </div>
    </div>
  );
}
