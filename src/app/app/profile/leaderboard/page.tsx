"use client";

import Image from "next/image";
import { Trophy, Medal, ChevronLeft } from "lucide-react";
import React from "react";
import { useBack } from "@/hooks/useBack";

export default function LeaderboardPage() {
  const [loading, setLoading] = React.useState(true);

  const handleBack = useBack("/app");

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const positions = [
    { name: "Tali", rank: "1st", icon: "/img/user.jpg" },
    { name: "Jude", rank: "2nd", icon: "/img/user.jpg" },
    { name: "Amaka", rank: "3rd", icon: "/img/user.jpg" },
    { name: "Emeka", rank: "4th", icon: "/img/user.jpg" },
    { name: "Chioma", rank: "5th", icon: "/img/user.jpg" },
    { name: "Ada", rank: "6th", icon: "/img/user.jpg" },
    { name: "Ife", rank: "7th", icon: "/img/user.jpg" },
    { name: "Tunde", rank: "8th", icon: "/img/user.jpg" },
  ];

  const Skeleton = () => (
    <div className="animate-pulse flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-300" />
      <div className="w-16 h-4 bg-gray-300 rounded" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="relative bg-[#21A29D] text-white p-6 rounded-b-3xl shadow-md">
        <button
          onClick={handleBack}
          className="absolute top-5 left-5 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-center">Leaderboard</h1>
        <p className="text-center text-white/80 text-sm mt-1">
          Top performers of the week 🏆
        </p>
      </div>

      {/* Top 3 section */}
      <div className="flex justify-center items-end gap-6 p-6 mt-8 z-10">
        {loading ? (
          <>
            <Skeleton /> <Skeleton /> <Skeleton />
          </>
        ) : (
          <>
            {/* 2nd */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 relative rounded-full overflow-hidden border-4 border-stone-400">
                <Image
                  src="/img/user.jpg"
                  alt="2nd place"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-stone-700">Jude</span>
              <span className="bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-full">
                2nd
              </span>
            </div>

            {/* 1st */}
            <div className="flex flex-col items-center gap-2 scale-110">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
                <Image
                  src="/img/user.jpg"
                  alt="1st place"
                  fill
                  className="object-cover"
                />
                <Trophy className="absolute -top-3 right-0 text-yellow-400 bg-white rounded-full p-1 w-6 h-6" />
              </div>
              <span className="font-bold text-gray-800">Tali</span>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                1st
              </span>
            </div>

            {/* 3rd */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 relative rounded-full overflow-hidden border-4 border-red-400">
                <Image
                  src="/img/user.jpg"
                  alt="3rd place"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-red-700">Amaka</span>
              <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                3rd
              </span>
            </div>
          </>
        )}
      </div>

      {/* Leaderboard List */}
      <div className="bg-gray-50 flex-1 rounded-t-3xl -mt-2 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Other Rankings
        </h2>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pb-4">
          {positions.slice(3).map((pos, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={pos.icon}
                    alt={pos.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{pos.name}</p>
                  <p className="text-xs text-gray-500">Rank {pos.rank}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#21A29D] font-semibold">
                <Medal className="w-4 h-4" />
                {pos.rank}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
