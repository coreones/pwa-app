"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { MenuItem, ToggleItem } from "@/components/ui/buttons";

export default function ProfilePage() {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = () => {
    // wire real logout here
    setShowConfirmLogout(false);
    alert("Logged out (demo)");
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {/* Top header */}
      <div className="bg-[#21A29D] px-6 pb-6 pt-10 rounded-b-3xl">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-extrabold tracking-tight">
              Profile
            </h1>
            <Link href="/app/profile/my-profile" className="text-white/90 text-sm font-medium hover:underline">
              Edit
            </Link>
          </div>

          <p className="mt-2 text-white/90 text-sm">
            Manage your account, security and preferences
          </p>
        </div>
      </div>

      {/* Content container */}
      <main className="max-w-3xl mx-auto px-5 mt-6 pb-12 space-y-6">
        {/* Profile card */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="bg-white border border-stone-100 rounded-2xl shadow-sm p-4 flex items-center gap-4"
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-stone-100">
            <Image src="/img/user.png" alt="profile" fill className="object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">Tali Nanzing</h2>
                <p className="text-stone-500 text-sm">talinanzing111@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-lg bg-[#E6FFFB] text-[#0f9c95] font-semibold">Verified</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section: Account */}
        <Section title="Account" description="Personal and account-related pages" delay={0.12}>
          <MenuItem icon={<User size={18} />} label="My Profile" type="link" link="/app/profile/my-profile" />
          <MenuItem icon={<NotebookPen size={18} />} label="Reports" type="link" link="/app/profile/reports" />
          <MenuItem icon={<Send size={18} />} label="Referrals" type="link" link="/app/profile/referral" />
          <MenuItem icon={<Headphones size={18} />} label="Help & Support" type="link" link="/app/profile/help-and-support" />
          <MenuItem icon={<NotebookText size={18} />} label="Expenses" type="link" link="/app/profile/expenses" />
          <MenuItem icon={<ChartNoAxesColumn size={18} />} label="Leaderboard" type="link" link="/app/profile/leaderboard" />
        </Section>

        {/* Section: Preferences */}
        <Section title="Preferences" description="Control appearance & quick settings" delay={0.20}>
          <ToggleItem icon={<Moon size={18} />} label="Dark Mode" />
          <ToggleItem icon={<Fingerprint size={18} />} label="Biometrics" />
          <ToggleItem icon={<Wallet size={18} />} label="Show Wallet Balance" />
        </Section>

        {/* Section: Privacy & Security */}
        <Section title="Privacy & Security" description="Keep your account safe" delay={0.28}>
          <MenuItem icon={<LockKeyhole size={18} />} label="Change Password" type="link" link="/app/profile/change-password" />
          <MenuItem icon={<ShieldEllipsis size={18} />} label="Change PIN" type="link" link="/app/profile/change-pin" />
          <MenuItem icon={<ShieldEllipsis size={18} />} label="Verify NIN" type="link" link="/app/profile/verify-nin" />
        </Section>

        {/* Section: More */}
        <Section title="More" description="Legal, account and app actions" delay={0.36}>
          <MenuItem icon={<Scale size={18} />} label="Legal" type="link" link="/app/profile/legal" />
          <MenuItem icon={<Trash size={18} />} label="Deactivate / Delete Account" type="link" link="/app/profile/deactivate-delete-account" />
          <div className="mt-2">
            {/* logout as a clear CTA */}
            <button
              onClick={() => setShowConfirmLogout(true)}
              className="w-full text-left px-4 py-3 rounded-xl border border-stone-100 bg-white hover:bg-stone-50 text-red-600 font-semibold flex items-center gap-3"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </Section>

        {/* Version */}
        <div className="py-6 text-center">
          <p className="text-sm text-stone-400">Version 1.6.5 (56)</p>
        </div>
      </main>

      {/* Confirm logout modal */}
      <AnimateModal show={showConfirmLogout} onClose={() => setShowConfirmLogout(false)}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-stone-900">Confirm Logout</h3>
          <p className="mt-2 text-sm text-stone-500">Are you sure you want to log out? You can always sign back in.</p>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowConfirmLogout(false)}
              className="flex-1 py-3 rounded-xl border border-stone-200 bg-white text-stone-700"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </AnimateModal>
    </div>
  );
}

/* Section wrapper with heading, description and subtle card style */
function Section({ title, description, children, delay = 0.15 }: { title: string; description?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.28 }}
      className="bg-stone-50/50 rounded-2xl border border-stone-100 shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-stone-800">{title}</h3>
          {description && <p className="text-xs text-stone-500 mt-1">{description}</p>}
        </div>
      </div>

      <div className="flex flex-col divide-y divide-stone-100">
        {/* ensure MenuItem/ToggleItem render without cramped spacing */}
        <div className="py-1">{children}</div>
      </div>
    </motion.section>
  );
}

/* Simple animated modal for confirm actions */
function AnimateModal({ show, onClose, children }: { show: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center px-4 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/30" />

          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl p-5 shadow-lg"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
