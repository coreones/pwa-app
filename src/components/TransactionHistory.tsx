"use client";

import React, { useState } from "react";
import {
  Banknote,
  ChevronRight,
  Lightbulb,
  Plane,
  PlusCircle,
  Reply,
  Send,
  Smartphone,
  Star,
  Tv,
  Wallet,
  Wifi,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { formatTransactionLabel, TransactionAction, TransactionStatus } from "@/types/api";

interface Transaction {
  id: number | string;
  action: TransactionAction;
  date: string;
  amount: string;
  status: TransactionStatus;
  creditedTo: string;
  transactionDate: string;
  transactionNo: string;
  remark: string;
}

interface Props {
  data: Transaction[];
}

export default function TransactionHistory({ data }: Props) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const getIcon = (action: TransactionAction) => {
    switch (action) {
      case "airtime":
        return <Smartphone size={22} />;
      case "data":
        return <Wifi size={22} />;
      case "electricity":
        return <Lightbulb size={22} />;
      case "betting":
        return <Star size={22} />;
      case "fund_sent":
        return <Send size={22} />;
      case "fund_eceived":
        return <Reply size={22} />;
      case "wallet_topup":
        return <PlusCircle size={22} />;
      case "bank_transfer":
        return <Banknote size={22} />;
      case "tv":
        return <Tv size={22} />;
      // case "Transportation":
      //   return <Bus size={22} />;
      case "flight_booking":
        return <Plane size={22} />;
      default:
        return <Wallet size={22} />;
    }
  };

  const getStatusStyle = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border border-green-100";
      case "failed":
        return "bg-red-50 text-red-600 border border-red-100";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border border-yellow-100";
      case "reversed":
        return "bg-stone-50 text-stone-700 border border-stone-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const isCredit = item.amount.startsWith("+");

        return (
          <motion.div
            key={item.id}
            onClick={() => setSelectedTransaction(item)}
            className="flex justify-between items-center bg-white hover:bg-gray-50 p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusStyle(
                  item.status
                )}`}
              >
                {getIcon(item.action)}
              </div>

              <div>
                <h4 className="font-medium text-gray-800 text-sm md:text-base">
                  {formatTransactionLabel(item.action)}
                </h4>
                <p className="text-gray-500 text-xs">{item.date}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span
                className={`text-sm md:text-base font-semibold ${isCredit ? "text-green-600" : "text-gray-800"
                  }`}
              >
                {item.amount}
              </span>
              <span
                className={`text-xs mt-1 px-2 py-0.5 rounded-full font-medium ${getStatusStyle(
                  item.status
                )}`}
              >
                {formatTransactionLabel(item.status)}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* 🔹 Transaction Detail Popup */}
      <AnimatePresence>
        {selectedTransaction && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTransaction(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl shadow-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Transaction Details</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Amount and Status */}
              <div className="flex flex-col items-center mb-6">
                <div className="text-3xl font-bold text-gray-800">
                  {selectedTransaction.amount}
                </div>
                <div
                  className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    selectedTransaction.status
                  )}`}
                >
                  {selectedTransaction.status}
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-3 text-sm text-gray-700">
                <InfoRow label="Credited To" value={selectedTransaction.creditedTo} />
                <InfoRow label="Transaction No" value={selectedTransaction.transactionNo} />
                <InfoRow label="Transaction Date" value={selectedTransaction.transactionDate} />
                <InfoRow label="Remark" value={selectedTransaction.remark} />
              </div>

              {/* Action */}
              {/* <div className="mt-8">
                <button className="w-full flex justify-between items-center text-gray-700 font-medium border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-all">
                  <span>View Interest Details</span>
                  <ChevronRight size={20} />
                </button>
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 🔹 Clean Row Subcomponent
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value || "-"}</span>
  </div>
);
