"use client";

import React, { useState } from "react";
import {
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Transaction,
} from "@/types/api";
import { formatNGN } from "@/utils/amount";
import { getFeatureData, statusLabel } from "@/utils/string";
import { timeAgo } from "@/utils/date";

interface Props {
  data: Transaction[];
  minimal: boolean;
}

export default function TransactionHistory({ data, minimal }: Props) {
  const [transaction, setTransaction] =
    useState<Transaction | null>(null);

  const formattedDate = (txn: string) => {
    return new Date(txn).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div className="space-y-3">
      {data.length == 0 ?
        <p className="w-full p-4 text-center font-normal text-stone-800">No transactions yet</p>
        :
        data.map((item) => {
          const feature = getFeatureData(item.action);
          if (item && feature) {
            const Icon = feature.icon;
            return (
              <motion.div
                key={item.id}
                onClick={() => setTransaction(item)}
                className="flex justify-between items-center bg-white hover:bg-gray-50 p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${item.type == "credit" ? "bg-lime-50" : "bg-rose-50"
                      }`}
                  >
                    <Icon className={`w-6 h-6 ${item.type == "credit" ? "text-lime-400" : "text-rose-400"
                      }`} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-stone-800 text-sm sm:text-md md:text-lg">
                      {feature.title}
                    </h2>
                    {!minimal && <p className="w-[75%] hidden sm:flex text-stone-500 text-xs truncate">
                      {item.description}
                    </p>}
                    {item.created_at && <p className="text-stone-300 text-xs">
                      {timeAgo(item.created_at)}
                    </p>}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`text-sm md:text-base font-semibold ${item.type === "credit" ? "text-green-600" : "text-gray-800"
                      }`}
                  >
                    {formatNGN(item.amount)}
                  </span>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: statusLabel(item.status) }}
                  />
                </div>
              </motion.div>
            );
          }
        })
      }

      {/* 🔹 Transaction Detail Popup */}
      <AnimatePresence>
        {transaction && (

          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTransaction(null)}
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
                <h2 className="text-lg font-semibold text-gray-800">
                  Transaction Details
                </h2>
                <button
                  onClick={() => setTransaction(null)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Amount and Status */}
              <div className="flex flex-col items-center mb-6">
                <div className="text-4xl font-bold text-gray-800">
                  {formatNGN(transaction.amount)}
                </div>

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: statusLabel(transaction.status) }}
                />
              </div>

              {/* Info Rows */}
              <div className="space-y-3 text-sm text-gray-700">
                <InfoRow
                  label="Service"
                  value={transaction.action}
                />
                <InfoRow
                  label="Provider"
                  value={transaction.extra?.service_id}
                />
                <InfoRow
                  label="Recipient"
                  value={transaction.extra?.customer_id ?? transaction.extra?.phone ?? "-"}
                />
                <InfoRow
                  label="Reference"
                  value={transaction.reference}
                />
                <InfoRow
                  label="Session ID"
                  value={transaction.session_id ?? "--"}
                />
                <InfoRow
                  label="Amount"
                  value={formatNGN(transaction.amount)}
                />
                <InfoRow
                  label="Fee"
                  value={formatNGN(transaction.fee)}
                />
                <InfoRow
                  label="Date"
                  value={transaction.created_at ? formattedDate(transaction.created_at) : "--"}
                />
                <InfoRow
                  label="Description"
                  value={transaction.description ?? ""}
                />
              </div>
            </motion.div>
          </motion.div>
        )

        }
      </AnimatePresence>
    </div>
  );
}

// 🔹 Clean Row Subcomponent
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between items-center border-b w-full border-gray-100 pb-2">
    <span className="text-gray-500 w-full">{label}</span>
    <span className="font-medium text-gray-800 w-full text-end">
      {value || "-"}
    </span>
  </div>
);
