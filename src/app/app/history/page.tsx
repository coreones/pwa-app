"use client";

import React from "react";
import ProfileHeader from "@/components/ProfileHeader";
import TransactionHistory from "@/components/TransactionHistory";

export default function History() {
  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Transaction History" />

      <div className="w-full">
        {/* Content Card */}
        <TransactionHistory
          data={[
            {
              id: 1,
              action: "airtime",
              date: "Oct 10, 2025",
              amount: "-₦500",
              status: "pending",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " School fee Payment",
            },
            {
              id: 2,
              action: "electricity",
              date: "Oct 8, 2025",
              amount: "-₦8,200",
              status: "completed",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " School fee Payment",
            },
            {
              id: 3,
              action: "betting",
              date: "Oct 6, 2025",
              amount: "-₦2,000",
              status: "failed",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " Bet 9ja Topup",
            },
            {
              id: 4,
              action: "wallet_topup",
              date: "Oct 3, 2025",
              amount: "+₦50,000",
              status: "completed",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " Received Funds",
            },
            {
              id: 5,
              action: "tv",
              date: "Oct 8, 2025",
              amount: "-₦8,200",
              status: "completed",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " GOTV Subscription",
            },
            {
              id: 6,
              action: "flight_booking",
              date: "Oct 6, 2025",
              amount: "-₦2,000",
              status: "failed",
              creditedTo: "09123456789",
              transactionNo: "o09r93nc90jf9ufcf9f9339d93",
              transactionDate: "Oct 12th, 2025 02:12:15",
              remark: " Abuja to Lagos. Ezenwata",
            },
            {
              id: 7,
              action: "data",
              date: "Oct 3, 2025",
              amount: "+₦50,000",
              status: "completed",
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
