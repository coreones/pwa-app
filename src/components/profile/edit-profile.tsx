import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function EditProfile({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <div className={` grid grid-cols-1 grid-rows-5  absolute top-0 left-0 w-full min-h-screen bg-[#21A29D] `}>
      <div className="row-span-2 p-4">
        <div className="mb-8 text-xl font-bold  text-white">
          <button onClick={() => setTab(null)} className="hover:bg-alternate/20 p-2 rounded-full">
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
        <div className=" flex  items-center w-full flex-col">
          {/* Header */}
          <h1 className="text-center text-2xl font-semibold w-full text-white mb-6">
            Edit Profile
          </h1>
          <div className="w-40 h-40  object-center mx-auto relative ">
            <Image
              src={"/img/user.jpg"}
              alt="user profile picture"
              fill
              className="rounded-full"
            />
            <button className=" absolute bottom-2 right-2 bg-white p-2 rounded-full z-20">
              <Pencil size={20} color="black" />
            </button>
          </div>
        </div>
      </div>

      <div className="row-span-3 space-y-10 rounded-[60px] bg-white p-4">
        <div className="space-y-10 max-w-md mx-auto text-lg">
          <div className="space-y-4">
            <div>
              <label className="block  font-medium text-black/80 mb-2">
                Full name
              </label>

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border text-black/90 placeholder:text-black/60 bg-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block  font-medium text-black/80 mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                placeholder="phone"
                className="w-full px-4 py-3 border  text-black/90 placeholder:text-black/60 bg-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block  font-medium text-black/80 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                className="w-full px-4 py-3 border text-black/90 placeholder:text-black/60 bg-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>
          </div>

          <button className="w-full bg-[#2acfca]/70 text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#21A29D]/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
