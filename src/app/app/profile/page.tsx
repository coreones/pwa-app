import { MenuItem, ToggleItem } from "@/components/ui/buttons";

import {
  ChartNoAxesColumn,
  Fingerprint,
  Headphones,
  LockKeyhole,
  LogOut,
  Moon,
  NotebookPen,
  NotebookText,
  Scale,
  Send,
  ShieldEllipsis,
  Trash,
  User,
  Wallet,
} from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#21A29D] p-4">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="text-center text-2xl font-semibold text-white mb-6">
          Profile
        </h1>

        {/* User Profile Card */}
        <div className=" bg-[#3FD9D4]/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
              <Image
                src="/img/user.png"
                alt="Profile"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl font-semibold">Tali Nanzing</h2>
              <p className="text-white text-sm">talinanzing111@gmail.com</p>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">b</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6 bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">Account</h3>
          <div className=" rounded-2xl overflow-hidden">
            <MenuItem
              icon={<User size={20} color="black" />}
              label="My Profile"
              showBorder={false}
              type="link"
              link="/app/profile/my-profile"
            />
            <MenuItem
              icon={<NotebookPen size={20} color="black" />}
              label="Reports"
              showBorder={false}
              type="link"
              link="/app/profile/reports"
            />
            <MenuItem
              icon={<Send size={20} color="black" />}
              label="Referrals"
              showBorder={false}
              type="link"
              link="/app/profile/referal"
            />
            <MenuItem
              icon={<Headphones size={20} color="black" />}
              label="Help & Support"
              showBorder={false}
              type="link"
              link="/app/profile/helpAndSupport"
            />
            <MenuItem
              icon={<NotebookText size={20} color="black" />}
              label="Expenses"
              showBorder={false}
              type="link"
              link="/app/profile/expenses"
            />
            <MenuItem
              icon={<ChartNoAxesColumn size={20} color="black" />}
              label="Leaderboard"
              showBorder={false}
              type="link"
              link="/app/profile/leaderboard"
            />
          </div>
        </div>

        {/* Preference Section */}
        <div className="mb-6  bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">Preference</h3>
          <div className=" rounded-2xl overflow-hidden">
            <ToggleItem
              icon={<Moon size={20} color="black" />}
              label="Dark Mode"
              showBorder={false}
            />
            <ToggleItem
              icon={<Fingerprint size={20} color="black" />}
              label="Biometrics"
              showBorder={false}
            />
            <ToggleItem
              icon={<Wallet size={20} color="black" />}
              label="Wallet Balance"
              showBorder={false}
            />
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="mb-6  bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">
            Privacy & Security
          </h3>
          <div className=" rounded-2xl overflow-hidden">
            <MenuItem
              icon={<LockKeyhole size={20} color="black" />}
              label="Reset Password"
              showBorder={false}
               type="link"
              link="/app/profile/reset-password"
            />
            <MenuItem
              icon={<ShieldEllipsis size={20} color="black" />}
              label="Reset BillPoint PIN"
              showBorder={false}
               type="link"
              link="/app/profile/reset-billPoint-pin"
            />
            <MenuItem
              icon={<ShieldEllipsis size={20} color="black" />}
              label="Verify NIN"
              showBorder={false}
               type="link"
              link="/app/profile/leaderboard"
            />
          </div>
        </div>

        {/* More Section */}
        <div className="mb-6  bg-[#3FD9D4]/20 p-3 rounded-2xl">
          <h3 className="text-white text-lg font-semibold mb-3">More</h3>
          <div className=" rounded-2xl overflow-hidden">
            <MenuItem
              icon={<Scale size={20} color="black" />}
              label="Legal"
              showBorder={false}
                type="link"
              link="/app/profile/legal"
            />
            <MenuItem
              icon={<Trash size={20} color="black" />}
              label="Deactivate/Delete Account"
              showBorder={false}
                type="link"
              link="/app/profile/deactivate-delete-account"
            />
            <MenuItem
              icon={<LogOut size={20} color="black" />}
              label="Logout"
              isRed
              showBorder={false}
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
