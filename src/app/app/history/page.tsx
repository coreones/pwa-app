"use client";

import TransactionHistory from "@/components/modal/history";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";

export default function History() {
  //   const handleBack = () => window.history.back();

  return (
    <div className="container">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#21A29D] px-6 py-5 flex items-center justify-between shadow-sm">
        <button
          //   onClick={handleBack}
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">History</h1>
        <div className="w-8" /> {/* Spacer */}
      </header>

      <div className="">
        {/* Content Card */}

        <TransactionHistory
          data ={[
            {
              id: 1,
              name: "Airtime Purchase",
              date: "Oct 10, 2025",
              amount: "-₦500",
              status: "Pending",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " School fee Payment",
            },
            {
              id: 2,
              name: "Electricity Bill",
              date: "Oct 8, 2025",
              amount: "-₦8,200",
              status: "Successful",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " School fee Payment",
            },
            {
              id: 3,
              name: "Bet9ja Top-up",
              date: "Oct 6, 2025",
              amount: "-₦2,000",
              status: "Failed",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " Bet 9ja Topup",
            },
            {
              id: 4,
              name: "Wallet Funding",
              date: "Oct 3, 2025",
              amount: "+₦50,000",
              status: "Successful",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " Received Funds",
            },
            {
              id: 5,
              name: "TV Subscription",
              date: "Oct 8, 2025",
              amount: "-₦8,200",
              status: "Successful",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " GOTV Subscription",
            },
            {
              id: 6,
              name: "Transportation",
              date: "Oct 6, 2025",
              amount: "-₦2,000",
              status: "Failed",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " Abuja to Lagos. Ezenwata",
            },
            {
              id: 7,
              name: "Data Purchase",
              date: "Oct 3, 2025",
              amount: "+₦50,000",
              status: "Successful",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " Purchase of 50GB, 30days Data Subscription ",
            },
          ]}
        />
      </div>
    </div>
  );
}
