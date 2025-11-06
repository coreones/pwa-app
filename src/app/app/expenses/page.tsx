"use client";

import { MenuItem } from "@/components/ui/buttons";
import ProfileHeader from "@/components/ProfileHeader";
import { features } from "@/utils/string";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { formatNGN } from "@/utils/amount";

export default function ExpensesPage() {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<any | null>(null);


  useEffect(() => {
    setLoading(true)
    const getExpenses = async () => {
      const res = await api.get("/transactions/expenses")
      if (!res.data.error) {
        setExpenses(res.data.data)
      }
      setLoading(false);
    }
    getExpenses();
  }, []);

  const Skeleton = () => (
    <div className="animate-pulse flex flex-row w-full bg-stone-100 rounded-xl items-center justify-between gap-2 p-2 mb-2">
      <div className="w-[80%] flex flex-row gap-4 items-center justify-start">
        <div className="w-16 h-16 flex-none flex rounded-full bg-stone-300" />
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-4 bg-stone-300 rounded" />
          <div className="w-[20%] h-4 bg-stone-300 rounded" />
        </div>
      </div>
      <div className="w-[20%] flex items-end justify-end px-2">
        <div className="w-[75%] h-4 bg-stone-300 rounded" />
      </div>
    </div>
  );

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Expenses" />

      {/* Content */}
      <div className="w-full p-4">
        <div className="w-full p-4 text-stone-400 text-sm">
          Track all payment services summary
        </div>

        <div className="flex flex-col divide-y divide-stone-200">
          {loading ? [...Array(6)].map((_, i) => (
            <Skeleton key={i} />
          )) : features.map((item, idx) => {
            if (item.purchaseable) {
              const Icon = item.icon;
              const amount = formatNGN(expenses[item.id])
              return (
                <MenuItem
                  key={idx}
                  icon={<Icon size={20} color="#21A29D" />}
                  label={item.title}
                  showBorder={false}
                  type="data"
                  amount={amount}
                />
              );
            }
            return (<div key={idx}></div>);
          })}
        </div>
      </div>

    </div>
  );
}
