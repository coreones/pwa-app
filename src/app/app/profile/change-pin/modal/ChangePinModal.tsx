"use client";

import { Dispatch, SetStateAction } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface ChangePinProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function ChangePin({ setModal }: ChangePinProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#21A29D] text-white p-6 flex items-center justify-between">
          <button
            onClick={() => setModal(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold flex-1 text-center">
            Change Pin
          </h2>
          <div className="w-8" />
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          <div>
            <label
              htmlFor="NP"
              className="block font-medium text-stone-700 mb-2"
            >
              New Pin
            </label>
            <input
              id="NP"
              type="password"
              placeholder="Enter new pin"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D]"
            />
          </div>

          <div>
            <label
              htmlFor="CNP"
              className="block font-medium text-stone-700 mb-2"
            >
              Confirm New Pin
            </label>
            <input
              id="CNP"
              type="password"
              placeholder="Confirm new pin"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D]"
            />
          </div>

          <button className="w-full bg-[#21A29D] hover:bg-[#1c908c] text-white font-semibold py-4 rounded-xl transition-all shadow-md">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
