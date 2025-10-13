"use client";

import DeactivateAccount from "@/components/modal/deactivate-account";
import DeleteAccount from "@/components/modal/delete-account";
import { MenuItem } from "@/components/ui/buttons";
import { Lock, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";

export default function DeactivateDeleteAccountPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Deactivate/Delete Account" />

      {/* Content */}
      <div className="w-full p-4">
        <div className="w-full p-4 text-stone-400 text-sm">
          Deactivate or permanently delete your account.
        </div>

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
