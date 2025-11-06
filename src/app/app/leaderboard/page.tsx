"use client";

import Image from "next/image";
import { Trophy, Medal } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import ProfileHeader from "@/components/ProfileHeader";

type Leaderboard = {
  name: string,
  photo: string,
  rank: string,
  total_amount?: string
}
export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[] | [] | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true)
    const getLeaderboard = async () => {
      const res = await api.get("/transactions/leaderboards")
      if (!res.data.error) {
        setLeaderboard(res.data.data)
      }
      setLoading(false);
    }
    getLeaderboard();
  }, []);

  const Skeleton = () => (
    <div className="animate-pulse flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-300" />
      <div className="w-16 h-4 bg-gray-300 rounded" />
    </div>
  );

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Leaderboard" />
      <p className="text-center text-stone-600 text-sm w-full py-4 px-4">
        Top performers of the week 🏆
      </p>
      {/* Top 3 section */}
      <div className="w-full flex justify-center items-end gap-6 p-4 z-10">
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
                  src={leaderboard && leaderboard.length > 1 ? leaderboard[1]?.photo ?? "/default.png" : "/default.png"}
                  alt="2nd place"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-stone-700">{leaderboard && leaderboard.length > 1 ? leaderboard[1]?.name : "--"}</span>
              <span className="bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-full">
                2nd
              </span>
            </div>

            {/* 1st */}
            <div className="flex flex-col items-center gap-2 scale-110">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
                <Image
                  src={leaderboard && leaderboard.length > 0 ? leaderboard[0]?.photo ?? "/default.png" : "/default.png"}
                  alt="1st place"
                  fill
                  className="object-cover"
                />
                <Trophy className="absolute -top-3 right-0 text-yellow-400 bg-white rounded-full p-1 w-6 h-6" />
              </div>
              <span className="font-bold text-gray-800">{leaderboard && leaderboard.length > 0 ? leaderboard[0]?.name : "--"}</span>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                1st
              </span>
            </div>

            {/* 3rd */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 relative rounded-full overflow-hidden border-4 border-red-400">
                <Image
                  src={leaderboard && leaderboard.length > 2 ? leaderboard[2]?.photo ?? "/default.png" : "/default.png"}
                  alt="3rd place"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-red-700">{leaderboard && leaderboard.length > 2 ? leaderboard[2]?.name : "--"}</span>
              <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                3rd
              </span>
            </div>
          </>
        )}
      </div>

      {/* Leaderboard List */}
      <div className="w-full flex-1 rounded-t-3xl -mt-2 p-4">
        <p className="w-full p-4 text-lg font-semibold text-gray-600">
          Other Rankings
        </p>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pb-4">
          {leaderboard && leaderboard.length > 3 ? leaderboard.slice(3).map((pos, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={pos.photo}
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
          )) : <></>}
        </div>
      </div>
    </div>
  );
}
