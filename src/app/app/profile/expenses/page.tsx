"use client";

import { MenuItem } from "@/components/ui/buttons";
import { useBack } from "@/hooks/useBack";
import {
  Smartphone,
  ChartNoAxesColumn,
  Lightbulb,
  TvMinimalPlay,
  Gift,
  ShoppingBag,
  Plane,
  Volleyball,
  Wifi,
  NotepadText,
  Ticket,
  Bus,
} from "lucide-react";

export default function ExpensesPage() {
  const handleBack = useBack("/app");

  return (
    <div className="container pb-16">
      {/* Top Header */}
      <div className="bg-[#21A29D] text-white p-4 rounded-b-3xl shadow-md">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-center flex-1">
            Expenses
          </h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="space-y-6">
        {/* Bills Payment */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4">
          <h3 className="text-stone-800 text-lg font-semibold mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#21A29D]" />
            Bills Payment
          </h3>
          <div className="divide-y divide-stone-100">
            <MenuItem
              icon={<Smartphone size={20} color="#21A29D" />}
              label="Airtime"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<ChartNoAxesColumn size={20} color="#21A29D" />}
              label="Data"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Lightbulb size={20} color="#21A29D" />}
              label="Electricity"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<TvMinimalPlay size={20} color="#21A29D" />}
              label="Cable TV"
              showBorder={false}
              type="data"
            />
          </div>
        </div>

      
        {/* Digital */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4">
          <h3 className="text-stone-800 text-lg font-semibold mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-[#21A29D]" />
            Digital
          </h3>
          <div className="divide-y divide-stone-100">
            <MenuItem
              icon={<Volleyball size={20} color="#21A29D" />}
              label="Sports Funding"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Wifi size={20} color="#21A29D" />}
              label="Internet Subscription"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Plane size={20} color="#21A29D" />}
              label="Flight Booking"
              showBorder={false}
              type="data"
            />
          </div>
        </div>

        {/* Education & Tickets */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4">
          <h3 className="text-stone-800 text-lg font-semibold mb-4 flex items-center gap-2">
            <NotepadText className="w-5 h-5 text-[#21A29D]" />
            Others
          </h3>
          <div className="divide-y divide-stone-100">
            <MenuItem
              icon={<Bus size={20} color="#21A29D" />}
              label="Transportation"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Ticket size={20} color="#21A29D" />}
              label="Tickets"
              showBorder={false}
              type="data"
            />
          </div>
        </div>

        {/* App Version */}
        <p className="text-center text-stone-400 text-sm pt-4">
          Version 1.6.5 (56)
        </p>
      </div>
    </div>
  );
}
