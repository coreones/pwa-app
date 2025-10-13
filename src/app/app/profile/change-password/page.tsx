"use client";

import React from "react";
import ProfileHeader from "@/components/ProfileHeader";

export default function ChangePasswordPage() {

  return (
    <div className="container">
      <ProfileHeader title="Change Password" />
      <div className="w-full px-4">
        <div className="w-full p-4 text-stone-400 text-sm">
          Change your account password.
        </div>

        <div className="flex flex-col space-y-6 px-4">
          <div>
            <label
              htmlFor="NP"
              className="block font-normal text-stone-700 text-xs mb-1"
            >
              New Password
            </label>
            <input
              id="NP"
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D]"
            />
          </div>

          <div>
            <label
              htmlFor="CNP"
              className="block font-normal text-stone-700 text-xs mb-1"
            >
              Confirm New Password
            </label>
            <input
              id="CNP"
              type="password"
              placeholder="Confirm new password"
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
