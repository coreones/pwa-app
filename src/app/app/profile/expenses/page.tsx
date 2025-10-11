"use client"

import { MenuItem } from "@/components/ui/buttons";

import {
  ChartNoAxesColumn,
  Gift,
  Lightbulb,
  NotepadText,
  Plane,
  Smartphone,
  Ticket,
  TvMinimalPlay,
  Volleyball,
  Wifi,
} from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {

    const handleBack = () => {
        window.history.back()
    }
  return (
    <div className="min-h-screen bg-[#21A29D] p-4">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
       <div className=" flex  items-center w-full">
            <div className="mb-8 text-xl font-bold rext-white">
              <button
                onClick={handleBack}
                className="hover:bg-alternate/20 p-2 rounded-full"
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
            </div>
            {/* Header */}
            <h1 className="text-center text-2xl font-semibold w-full text-white mb-6">
              Expenses
            </h1>
          </div>

     
        {/* Account Section */}
        <div className="mb-6 bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">Bills payment</h3>
          <div className=" rounded-2xl overflow-hidden">
            <MenuItem
              icon={<Smartphone size={20} color="black" />}
              label="Airtime"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<ChartNoAxesColumn size={20} color="black" />}
              label="Data"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Lightbulb size={20} color="black" />}
              label="Electricity"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<TvMinimalPlay size={20} color="black" />}
              label="TV"
              showBorder={false}
              type="data"
            />
           
          </div>
        </div>

        {/* Preference Section */}
        <div className="mb-6  bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">Life Style</h3>
          <div className=" rounded-2xl overflow-hidden">
             <MenuItem
              icon={<Gift size={20} color="black" />}
              label="Gift Card"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Gift size={20} color="black" />}
              label="ESims"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Gift size={20} color="black" />}
              label="Gift User"
              showBorder={false}
              type="data"
            />
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="mb-6  bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">
           Digital
          </h3>
          <div className=" rounded-2xl overflow-hidden">
            <MenuItem
              icon={<Volleyball size={20} color="black" />}
              label="Sport Funding"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Wifi size={20} color="black" />}
              label="Internet"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Plane size={20} color="black" />}
              label="Flight"
              showBorder={false}
              type="data"
            />
          </div>
        </div>

        {/* More Section */}
        <div className="mb-6  bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">Others</h3>
          <div className=" rounded-2xl overflow-hidden">
            <MenuItem
              icon={<NotepadText size={20} color="black" />}
              label="Education"
              showBorder={false}
              type="data"
            />
            <MenuItem
              icon={<Ticket size={20} color="black" />}
              label="Ticket"
              showBorder={false}
              type="data"
            />
           
          </div>
        </div>

        {/* Version */}
        <p className="text-center text-gray-400 text-sm mb-8">
          Version 1.6.5 (56)
        </p>
      </div>
    </div>
  );
}
