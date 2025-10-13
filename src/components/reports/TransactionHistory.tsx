"use client";

import React from "react";
import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";

interface Transaction {
    name: string;
    date: string;
    amount: string;
    status: string;
}

interface Props {
    data: Transaction[];
}

export default function TransactionHistory({ data }: Props) {
    return (
        <div className="space-y-4 mt-2">
            {data.map((item, idx) => {
                const isCredit = item.amount.startsWith("+");
                const statusColor =
                    item.status === "Successful"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700";

                return (
                    <div
                        key={idx}
                        className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${isCredit ? "bg-green-50" : "bg-stone-100"
                                    }`}
                            >
                                {isCredit ? (
                                    <ArrowDownLeftIcon className="w-5 h-5 text-green-500" />
                                ) : (
                                    <ArrowUpRightIcon className="w-5 h-5 text-stone-600" />
                                )}
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
                                className={`text-sm md:text-base font-semibold ${isCredit ? "text-green-600" : "text-stone-800"
                                    }`}
                            >
                                {item.amount}
                            </span>
                            <span
                                className={`text-xs px-2 py-0.5 mt-1 rounded-full ${statusColor}`}
                            >
                                {item.status}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
