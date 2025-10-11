"use client";

import { MenuItem } from "@/components/ui/buttons";
import { NotebookPen, User } from "lucide-react";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function LegalPage() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#21A29D] px-6 py-5 flex items-center justify-between shadow-sm">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">Legal</h1>
        <div className="w-8" /> {/* Spacer */}
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Content Card */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-4 sm:p-6 shadow-sm">
          <p className="text-stone-600 text-center mb-6">
            Review our legal documents and policies below.
          </p>

          <div className="flex flex-col ">
            <MenuItem
              icon={<User size={20} className="text-[#21A29D]" />}
              showBorder={false}
              label="Privacy Policy"
              type="link"
              link="#"
            />
            <MenuItem
              icon={<NotebookPen size={20} className="text-[#21A29D]" />}
              showBorder={false}
              label="Terms of Service"
              type="link"
              link="#"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-stone-500">
          © {new Date().getFullYear()} BillNa Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
