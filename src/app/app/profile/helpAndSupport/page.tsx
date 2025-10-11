"use client";

import EditProfile from "@/components/profile/edit-profile";
import BillTag from "@/components/profile/set-billTag";
import { MenuItem } from "@/components/ui/buttons";
import { Headphones, NotebookPen, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen  bg-[#21A29D] p-4 relative">
      <div className="mx-auto max-w-3xl flex flex-col gap-10 justify-between ">
        <div className="w-full ">
          <div className=" flex  items-center w-full">
            <div className="mb-8 text-xl font-bold rext-white">
              <button
                onClick={handleBack}
                className="hover:bg-alternate/20 p-2 rounded-full"
              >
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
              Help And Support
            </h1>
          </div>

          <div className="flex flex-col bg-[#3FD9D4]/20 p-3 rounded-2xl gap-3">
            <MenuItem
              icon={<Headphones size={20} color="black" />}
              showBorder={false}
              label={"WhatsApp"}
            />
            <MenuItem
              icon={<Headphones size={20} color="black" />}
              showBorder={false}
              label={"Facebook"}
            />
            <MenuItem
              icon={<Headphones size={20} color="black" />}
              showBorder={false}
              label={"Instagram"}
            />
            <MenuItem
              icon={<Headphones size={20} color="black" />}
              showBorder={false}
              label={"X   (twitter)"}
            />
            <MenuItem
              icon={<Headphones size={20} color="black" />}
              showBorder={false}
              label={"Phone"}
            />
          </div>
        </div>

        <div className="flex flex-col bg-[#3FD9D4]/20 p-3 rounded-2xl gap-5">
          <MenuItem
            icon={<Headphones size={20} color="black" />}
            showBorder={false}
            label={"Report an Issue"}
          />

          <div className="flex items-center gap-2  w-full">
            <div className="w-full h-0.5 bg-white/40" />
            <div className="flex flex-none ">Follow us on</div>
            <div className="w-full h-0.5 bg-white/40" />
          </div>

          <div className="flex items-center max-w-sm mx-auto w-full justify-between">
            <Link href={""} className="w-15 h-15 relative">
            <Image src={"/svg/telegram.svg"} alt="telegram logo" fill />
            </Link>
            <Link href={""} className="w-15 h-15 relative">
            <Image src={"/svg/instagram.svg"} alt="telegram logo" fill />
            </Link>
            <Link href={""} className="w-15 h-15 relative">
            <Image src={"/svg/x.svg"} alt="telegram logo" fill />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
