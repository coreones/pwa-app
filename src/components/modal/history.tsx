"use client";

import React, { useState } from "react";
import {
  Bus,
  Check,
  ChevronRight,
  Lightbulb,
  Plane,
  Smartphone,
  Tv,
  Volleyball,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Transaction {
  name: string;
  date: string;
  amount: string;
  status: string;
  creditedTo: string;
  transactionDate: string;
  transactionNo: string;
  remark: string;
  id: number | string;
}

interface Props {
  data: Transaction[];
}

export default function     TransactionHistory({ data }: Props) {
  const [selectedTransaction, setSelectedTransaction] = useState<
    number | string | null
  >(null);

  const handleSelectedtransaction = (id: number | string) => {
    setSelectedTransaction(id);
  };
  const statusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return " bg-stone-100";
      case "Failed":
        return "bg-red-100";
      case "Successful":
        return "bg-alternate/10";
      default:
        return "bg-white";
    }
  };
  const singleTransaction = data?.find((tx) => tx.id === selectedTransaction);
  return (
    <div className="">
      {data.map((item, idx) => {
        const isCredit = item.amount.startsWith("+");
        const statusColorClass =
          item.status === "Successful"
            ? "bg-green-100 text-green-700"
            : item.status === "Failed"
            ? "bg-red-100 text-red-600"
            : "bg-yellow-100 text-yellow-700";

        return (
          <div
            key={idx}
            onClick={() => handleSelectedtransaction(item.id)}
            className="flex justify-between items-center bg-white  p-4 shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColor(
                  item.status
                )} `}
              >
                <>
                  {item.name === "Airtime Purchase" && <Smartphone size={24} />}
                  {item.name === "Data Purchase" && <Smartphone size={24} />}
                  {item.name === "Electricity Bill" && <Lightbulb size={24} />}
                  {item.name === "Bet9ja Top-up" && <Volleyball size={24} />}
                  {item.name === "Wallet Funding" && <Wallet size={24} />}
                  {item.name === "TV Subscription" && <Tv size={24} />}
                  {item.name === "Transportation" && <Bus size={24} />}
                  {item.name === "Flight Ticket" && <Plane size={24} />}
                </>
              </div>
              <div>
                <h4 className="font-semibold text-stone-800 text-sm md:text-base">
                  {item.name}
                </h4>
                <p className="text-stone-500 text-xs md:text-sm">{item.date}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span
                className={`text-sm md:text-base font-semibold ${
                  isCredit ? "text-green-600" : "text-stone-800"
                }`}
              >
                {item.amount}
              </span>
              <span
                className={`text-xs px-2 py-0.5 mt-1 rounded-full ${statusColorClass}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        );
      })}

      {selectedTransaction && (
        <AnimatePresence>
          {true && (
            <motion.div
              className="fixed inset-0 bg-black/40 w-full container backdrop-blur-sm flex items-end justify-center z-[99]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTransaction(null)}
            >
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-white rounded-t-3xl p-6 shadow-lg"
              >
                <div className="w-full max-w-lg mx-auto rounded-2xl bg-alternate/10 flex flex-col items-center justify-center gap-2 p-5">
                  <h1 className="text-xl font-semibold">
                    {singleTransaction?.name}
                  </h1>
                  <h1
                    className={` text-3xl font-black  ${
                      singleTransaction?.status === "Successful"
                        ? "text-alternate"
                        : singleTransaction?.status === "Failed"
                        ? "text-red-500"
                        : "text-stont-800"
                    }`}
                  >
                    {singleTransaction?.amount}
                  </h1>
                  {singleTransaction?.status === "Successful" && (
                    <div className="p-2 flex items-center gap-2">
                      <span className="text-white rounded-full bg-alternate p-1 flex flex-none ">
                        <Check size={20} />
                      </span>
                      <span className="text-teal-800">Successful</span>
                    </div>
                  )}
                  {singleTransaction?.status === "Failed" && (
                    <div className="p-2 flex items-center gap-2">
                      <span className="text-red-500 rounded-full bg-red-100 p-1 flex flex-none ">
                        <Check size={20} />
                      </span>
                      <span className="text-red-500">Failed</span>
                    </div>
                  )}
                  {singleTransaction?.status === "Pending" && (
                    <div className="p-2 flex items-center gap-2">
                      <span className="text-stone-800 w-4 h-4 border-stone-800 border-b-3 animate-spin rounded-full p-1 flex flex-none "></span>
                      <span className="text-stone-800">Pending</span>
                    </div>
                  )}
                </div>

                <div className="w-full max-w-lg mx-auto my-10 rounded-2xl bg-alternate/10 flex flex-col items-center justify-center gap-2 p-5">
                  <h1 className="text-xl text-start w-full font-black text-alternate">
                    Transaction Details
                  </h1>

                  <div className=" flex flex-col gap-2 w-full ">
                    <div className="w-full flex justify-between items-center">
                      <div className="text-stone-700 w-ful">Credited To</div>
                      <div className="text-alternate">
                        {singleTransaction?.creditedTo}
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-stone-700 w-ful">Transaction No</div>
                      <div className="text-alternate">
                        {singleTransaction?.transactionNo}
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-stone-700 w-ful">
                        Transaction Date
                      </div>
                      <div className="text-alternate">
                        {singleTransaction?.date}
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-stone-700 w-ful">Remark</div>
                      <div className="text-alternate">
                        {singleTransaction?.remark}
                      </div>
                    </div>
                     <div className="w-full flex justify-between items-center">
                      <div className="text-stone-700 w-ful">Status</div>
                      <div className={` ${
                      singleTransaction?.status === "Successful"
                        ? "text-alternate"
                        : singleTransaction?.status === "Failed"
                        ? "text-red-500"
                        : "text-stont-800"
                    }`}>
                        {singleTransaction?.status}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-lg mx-auto my-10 rounded-2xl bg-alternate/10 flex  items-center justify-between gap-2 p-5">
                  <button className="w-full flex justify-between cursor-pointer items-center">
                    <div className="text-stone-700 w-ful">
                      View Interest Details
                    </div>
                    <ChevronRight size={24} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
