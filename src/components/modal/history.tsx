"use client";

import React, { useState } from "react";
import {
  Bus,
  Check,
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

export default function TransactionHistory({ data }: Props) {

    const [selectedTransaction, setSelectedTransaction] = useState<number| string| null>(null)
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
  const singleTransaction = data?.map(tx => tx.id === selectedTransaction )
console.log(typeof(singleTransaction))
  const status = "Successful";
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

      <AnimatePresence>
        {true && (
          <motion.div
            className="fixed inset-0 bg-black/40 w-full container backdrop-blur-sm flex items-end justify-center z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            //   onClick={() => setShowShareModal(false)}
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
                <h1 className="text-xl font-semibold">Airtime Puschase</h1>
                <h1 className="text-3xl font-black text-alternate">N100000</h1>
                {status === "Successful" && (
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-white rounded-full bg-alternate p-1 flex flex-none ">
                      <Check size={20} />
                    </span>
                    <span className="text-teal-800">Successful</span>
                  </div>
                )}
              </div>

              <div className="w-full max-w-lg mx-auto my-10 rounded-2xl bg-alternate/10 flex flex-col items-center justify-center gap-2 p-5">
                <h1 className="text-xl text-start w-full font-black text-alternate">
                  Transaction Details
                </h1>

                <div className=" flex flex-col gap-2 w-full ">
                   <div className="w-full flex justify-between items-center">
                        <div className="text-stone-700 w-ful">
                            Credited To
                        </div>
                        <div className="text-alternate">
                            
                        </div>

                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
