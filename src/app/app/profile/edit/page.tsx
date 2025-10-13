"use client";
import { MenuItem } from "@/components/ui/buttons";
import { UserIcon, PencilSquareIcon, HomeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import EditProfile from "./modals/EditProfile";
import ETag from "./modals/ETag";
import Address from "./modals/Address";
import ProfileHeader from "@/components/ProfileHeader";

export default function MyProfilePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Profile" />

      {/* Content */}
      <div className="w-full p-4">
        <div className="w-full p-4 text-stone-400 text-sm">
          Manage your account details
        </div>

        <div className="flex flex-col divide-y divide-stone-200">
          <MenuItem
            icon={<UserIcon className="w-5 h-5 text-[#21A29D]" />}
            showBorder={false}
            label="Profile Information"
            type="button"
            onclick={() => setActiveModal("EditProfile")}
          />

          <MenuItem
            icon={<HomeIcon className="w-5 h-5 text-[#21A29D]" />}
            showBorder={false}
            label="My Address"
            type="button"
            onclick={() => setActiveModal("MyAddress")}
          />

          <MenuItem
            icon={<PencilSquareIcon className="w-5 h-5 text-[#21A29D]" />}
            showBorder={false}
            label="Set BillNa Handle"
            type="button"
            onclick={() => setActiveModal("ETag")}
          />
        </div>
      </div>

      {/* Modals */}
      {activeModal === "EditProfile" && (
        <EditProfile setTab={setActiveModal} />
      )}
      {activeModal === "MyAddress" && <Address setTab={setActiveModal} />}
      {activeModal === "ETag" && <ETag setTab={setActiveModal} />}
    </div>
  );
}
