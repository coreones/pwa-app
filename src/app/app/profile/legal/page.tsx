"use client";

import { MenuItem } from "@/components/ui/buttons";
import { NotebookPen, User } from "lucide-react";
import React from "react";
import ProfileHeader from "@/components/ProfileHeader";

export default function LegalPage() {

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Legal" />

      {/* Content */}
      <div className="w-full p-4">
        <div className="w-full p-4 text-stone-400 text-sm">
          Review our legal documents and policies below.
        </div>
        <div className="flex flex-col  divide-y divide-stone-200">
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
    </div>
  );
}
