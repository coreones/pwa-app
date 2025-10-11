"use client";

import EditProfile from "@/components/profile/edit-profile";
import BillTag from "@/components/profile/set-billTag";
import { MenuItem } from "@/components/ui/buttons";
import { NotebookPen, User } from "lucide-react";
import React, { useState } from "react";

export default function page() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-[#21A29D] p-4 relative">
      <div className="mx-auto max-w-3xl">
        <div className=" flex  items-center w-full">
          <div className="mb-8 text-xl font-bold rext-white">
            <button onClick={handleBack} className="hover:bg-alternate/20 p-2 rounded-full">
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
            My Profile
          </h1>
        </div>

        <div className="flex flex-col bg-[#3FD9D4]/20 p-3 rounded-2xl gap-3">
          <MenuItem
            icon={<User size={20} color="black" />}
            showBorder={false}
            label={"Profile Information"}
            onclick={() => setActiveModal("profile information")}
           
          />
          <MenuItem
            onclick={() => setActiveModal("BillTag")}
            icon={<NotebookPen size={20} color="black" />}
            showBorder={false}
            label={"Set BillTag"}
          />
        </div>
      </div>

      {activeModal === "profile information" && (
        <EditProfile setTab={setActiveModal} />
      )}
      {activeModal === "BillTag" && <BillTag setTab={setActiveModal} />}
    </div>
  );
}
