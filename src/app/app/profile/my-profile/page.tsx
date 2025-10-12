"use client";
import { MenuItem } from "@/components/ui/buttons";
import { UserIcon, PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import EditProfile from "./modals/EditProfile";
import ETag from "./modals/ETag";
import { useBack } from "@/hooks/useBack";

export default function MyProfilePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const handleBack = useBack("/app");

  return (
    <div className="container flex flex-col">
      {/* Header */}
      <div className="bg-[#21A29D] px-4 py-5 flex items-center shadow-md">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-white text-xl font-semibold tracking-wide">
          My Profile
        </h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pt-8 pb-24">
        <div className="mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-4">
            <p className="text-stone-600 font-medium mb-2">
              Manage your personal details and customize your E-Tag.
            </p>

            <div className="divide-y divide-stone-200">
              <MenuItem
                icon={<UserIcon className="w-5 h-5 text-[#21A29D]" />}
                showBorder={false}
                label="Profile Information"
                type="button"
                onclick={() => setActiveModal("EditProfile")}
              />

              <MenuItem
                icon={<PencilSquareIcon className="w-5 h-5 text-[#21A29D]" />}
                showBorder={false}
                label="Set ETag"
                type="button"
                onclick={() => setActiveModal("ETag")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "EditProfile" && (
        <EditProfile setTab={setActiveModal} />
      )}
      {activeModal === "ETag" && <ETag setTab={setActiveModal} />}
    </div>
  );
}
