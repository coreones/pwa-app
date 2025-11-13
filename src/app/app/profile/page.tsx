"use client";

import Image from "next/image";
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
  ShieldEllipsis,
  Trash,
  User,
  Users,
} from "lucide-react";
import { MenuItem, ToggleItem } from "@/components/ui/buttons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { logoutModal } from "@/lib/logout-modal";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="container">
      {/* Top header */}
      <div className="w-full bg-gradient-to-br from-teal-600 via-teal-800 to-teal-900 px-6 pb-6 pt-10 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Account Settings
          </h1>
          <button
            onClick={() => logoutModal.open()}
            className="text-left px-4 py-2 rounded-xl bg-stone-300/50 hover:bg-stone-400/50 border border-stone-400/75 text-red-600 font-normal flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <p className="text-white/90 text-sm">
          Manage your account, security and preferences
        </p>
      </div>

      {/* Content container */}
      <main className="w-full mx-auto px-5 mt-6 pb-12 space-y-6">
        {/* Profile card */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="bg-white border border-stone-100 rounded-2xl flex-col text-center sm:text-start sm:flex-row shadow-sm p-4 flex items-center gap-4"
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex flex-none bg-stone-100">
            <Image src={user?.photo ?? "/default.png"} alt="profile" fill className="object-cover flex flex-none" />
          </div>

          <div className="flex-1">
            <div className="flex  items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">{user?.firstname ?? "unknown"} {user?.lastname ?? "user"}</h2>
                <p className="text-stone-500 text-sm">{user?.email ?? "--"}</p>
              </div>
            </div>
          </div>
              <Link href={"/app/profile/upgrade-account"} className="flex items-center gap-2">
                <span className="text-xs px-2 py-2 rounded-lg bg-[#E6FFFB] text-[#0f9c95] font-semibold">Upgrade account</span>
              </Link>
        </motion.section>

        {/* Section: Account */}
        <Section title="Account" description="Personal and account-related pages" delay={0.12}>
          <MenuItem icon={<User size={18} />} label="Edit Profile" type="link" link="/app/profile/edit" />
          <MenuItem icon={<NotebookPen size={18} />} label="My Reports" type="link" link="/app/reports" />
          <MenuItem icon={<NotebookText size={18} />} label="My Expenses" type="link" link="/app/expenses" />
          <MenuItem icon={<Users size={18} />} label="Referrals" type="link" link="/app/referrals" />
          <MenuItem icon={<ChartNoAxesColumn size={18} />} label="Leaderboard" type="link" link="/app/leaderboard" />
        </Section>

        {/* Section: Preferences */}
        <Section title="Preferences" description="Control appearance & quick settings" delay={0.20}>
          <ToggleItem icon={<Moon size={18} />} label="Dark Mode" />
          <ToggleItem icon={<Fingerprint size={18} />} label="Biometrics" />
          {/* <ToggleItem icon={<Wallet size={18} />} label="Show Wallet Balance" /> */}
        </Section>

        {/* Section: Privacy & Security */}
        <Section title="Privacy & Security" description="Keep your account safe" delay={0.28}>
          <MenuItem icon={<LockKeyhole size={18} />} label="Change Password" type="link" link="/app/profile/change-password" />
          <MenuItem icon={<ShieldEllipsis size={18} />} label="Change PIN" type="link" link="/app/profile/change-pin" />
          {/* <MenuItem icon={<ShieldEllipsis size={18} />} label="Verify NIN" type="link" link="/app/profile/verify-nin" /> */}
        </Section>

        {/* Section: More */}
        <Section title="More" description="Legal, account and app actions" delay={0.36}>
          <MenuItem icon={<Scale size={18} />} label="Legal" type="link" link="/app/legal" />
          <MenuItem icon={<Headphones size={18} />} label="Help & Support" type="link" link="/app/help-and-support" />
          <MenuItem icon={<Trash size={18} />} label="Deactivate Account" type="link" link="/app/profile/deactivate-delete-account" />
        </Section>

      </main>

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
