"use client";

import { icons, Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function EditProfile() {
  const positions = [
    { name: "tali", rank: "1st", icon: "/img/user.jpg" },
    { name: "tali", rank: "2nd", icon: "/img/user.jpg" },
    { name: "tali", rank: "3rd", icon: "/img/user.jpg" },
    { name: "tali", rank: "4th", icon: "/img/user.jpg" },
    { name: "tali", rank: "5th", icon: "/img/user.jpg" },
    { name: "tali", rank: "6th", icon: "/img/user.jpg" },
    { name: "tali", rank: "7th", icon: "/img/user.jpg" },
    { name: "tali", rank: "8th", icon: "/img/user.jpg" },
  ];
  return (
    <div
      className={` grid grid-cols-1 grid-rows-5 w-full min-h-screen bg-[#21A29D] `}
    >
      <div className="row-span-2 p-4 relative">
        <div className="mb-8 text-xl font-bold absolute top-4 left-4 text-white">
          <button
            onClick={() => window.history.back()}
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
        <div className=" flex h-full  items-center w-full flex-col">
          {/* Header */}
          <h1 className="text-center text-2xl font-semibold w-full text-white mb-6">
            Leaderboard
          </h1>
          <div className=" w-full min-h-full flex justify-center -space-x-2 items-end pb-10">
            <div className="w-35 h-4/5 flex flex-col">
              <div className="w-20 h-20 flex flex-none  mx-auto relative ">
                <Image
                  src={"/img/user.jpg"}
                  alt="user profile picture"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-center font-black text-lg">Tali</span>
              <div className="bg-gradient-to-br from-primary rounded-t-lg to-alternate/30 h-full flex items-center justify-center text-4xl font-black">
                2
              </div>
            </div>
            <div className="w-35 h-full flex flex-col">
              <div className="w-20 h-20 flex flex-none  mx-auto relative ">
                <Image
                  src={"/img/user.jpg"}
                  alt="user profile picture"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-center font-black text-lg">Tali</span>
              <div className="bg-gradient-to-br from-primary rounded-t-lg to-alternate/30 h-full flex items-center justify-center text-4xl font-black">
                1
              </div>
            </div>
            <div className="w-35 h-3/5 flex flex-col">
              <div className="w-20 h-20 flex flex-none  mx-auto relative ">
                <Image
                  src={"/img/user.jpg"}
                  alt="user profile picture"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-center font-black text-lg">Tali</span>
              <div className="bg-gradient-to-br from-primary rounded-t-lg relative flex items-center justify-center to-alternate/30 text-4xl font-black h-full">
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row-span-3 relative z-10 space-y-10 rounded-[60px] bg-white p-4">
        <div className="space-y-1  max-w-lg mx-auto text-lg overflow-y-scroll max-h-135 border-x-4 border-primary px-2 ">
          {positions.map((position, index) => (
            <button
              key={index}
              type="button"
              className={` w-full   flex items-center cursor-pointer bg-[#21A29D] pr-2 rounded-2xl transition-all duration-300 `}
            >
              <div className="flex w-full justify-start text-start items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full relative bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                 <Image src={position.icon} alt={position.name + position.rank} fill className="object-cover " />
                </div>
                <span className={`flex-1 font-black text-xl text-white`}>
                  {position.name}
                </span>
              </div>
             <div className="py-2 px-3 font-semibold w-fit bg-white text-primary rounded-full ">
                {position.rank}
             </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
