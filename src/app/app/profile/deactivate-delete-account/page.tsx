"use client";

import DeactivateAccount from "@/components/modal/deactivate-account";
import DeleteAccount from "@/components/modal/delete-account";
import { MenuItem } from "@/components/ui/buttons";
import { useBack } from "@/hooks/useBack";
import { ArrowLeftIcon, Lock, Trash2 } from "lucide-react";
import React, { useState } from "react";

export default function DeactivateDeleteAccountPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleBack = useBack("/app");

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
        <h1 className="text-lg font-semibold text-white">Deactivate/Delete Account</h1>
        <div className="w-8" /> {/* Spacer */}
      </header>

      {/* Profile Actions */}
      <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl shadow-sm">
        <p className="text-stone-600 mb-4 text-sm text-center">
          Manage your account status. You can deactivate or permanently delete your profile.
        </p>

        <div className="flex flex-col divide-y divide-stone-200">
          <MenuItem
            icon={<Lock size={20} className="text-stone-700" />}
            showBorder={false}
            label="Deactivate Account"
            type="button"
            onclick={() => setActiveModal("Deactivate Account")}
          />

          <MenuItem
            icon={<Trash2 size={20} className="text-red-500" />}
            showBorder={false}
            label="Delete Account"
            type="button"
            onclick={() => setActiveModal("Delete Account")}
          />
        </div>
      </div>

      {/* Modals */}
      {activeModal === "Deactivate Account" && (
        <DeactivateAccount setTab={setActiveModal} />
      )}
      {activeModal === "Delete Account" && (
        <DeleteAccount setTab={setActiveModal} />
      )}
    </div>
  );
}
