"use client";

import React, { useState } from "react";
import { User, ArrowRight, AlertCircle, QrCode } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/axios";

interface TagWithdrawalProps {
  balance: number;
}

export default function TagWithdrawal({ balance }: TagWithdrawalProps) {
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !tag) {
      toast.error("Please fill in all fields");
      return;
    }

    const withdrawalAmount = parseFloat(amount);
    if (withdrawalAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawalAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    setLoading(true);
   
    setTimeout(() => {
        toast.success("Sent successfully")
        setTag("")
        setAmount("")
        setLoading(false)
    }, 3000)
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Balance Display */}
      <div className="bg-gradient-to-r from-[#21A29D] to-[#1b8a88] rounded-2xl p-6 text-white mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Available Balance</p>
            <p className="text-2xl font-bold mt-1">₦{balance.toLocaleString()}</p>
          </div>
          <User className="w-8 h-8 opacity-90" />
        </div>
      </div>

      {/* Withdrawal Form */}
      <form onSubmit={handleWithdrawal} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Tag
          </label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter recipient's tag"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !amount || !tag}
          className="w-full bg-gradient-to-r from-[#21A29D] to-[#1b8a88] text-white py-3 px-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              Send to Tag
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}