"use client";

import React from "react";
import {
    BanknotesIcon,
    ArrowUpRightIcon,
    ArrowDownLeftIcon,
    GiftIcon,
} from "@heroicons/react/24/outline";

interface WalletItem {
    type: string;
    date: string;
    amount: string;
}

interface Props {
    data: WalletItem[];
}

export default function WalletHistory({ data }: Props) {
    const getIcon = (type: string) => {
        switch (type) {
            case "Deposit":
                return <ArrowDownLeftIcon className="w-5 h-5 text-green-500" />;
            case "Transfer":
                return <ArrowUpRightIcon className="w-5 h-5 text-stone-600" />;
            case "Cashback":
                return <GiftIcon className="w-5 h-5 text-yellow-500" />;
            default:
                return <BanknotesIcon className="w-5 h-5 text-stone-500" />;
        }
    };

    return (
        <div className="space-y-4 mt-2">
            {data.map((item, idx) => {
                const isCredit = item.amount.startsWith("+");

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
                                {getIcon(item.type)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-stone-800 text-sm md:text-base">
                                    {item.type}
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
