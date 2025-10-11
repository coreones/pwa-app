"use client";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div
      className={` grid grid-cols-1 grid-rows-5 relative w-full min-h-screen bg-[#21A29D] `}
    >
      <div className="row-span-2 p-4">
        <div className="text-xl font-bold  absolute top-4 left-4 text-white">
          <button
            onClick={() => window.history.back()}
            className="hover:bg-alternate/20 p-2 rounded-2xl"
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
        <div className=" flex  items-center w-full flex-col">
          {/* Header */}
          <h1 className="text-center text-2xl font-semibold w-full text-white mb-6">
            Refferals
          </h1>
          <div className=" w-full max-w-lg  flex items-center justify-center rounded-2xl bg-alternate/20 object-center mx-auto relative ">
            <Image
              src={"/img/refer.png"}
              alt="user profile picture"
              width={290}
              height={100}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="row-span-3 text-black/90 rounded-[60px] bg-white p-4">
        <div className="space-y-3  mx-auto text-lg">
          <div className="max-w-lg space-y-5 bg-gre mx-auto w-full">
            <h1 className="text-3xl font-bold text-primary text-center">
              Refer friends and earn N6 instantly
            </h1>
            <div className="text-lg max-w-md mx-auto text-center">
              Invite friends to Billpoint and earn N6 on each referrals first
              transaction
            </div>
            <button className="w-full mt-5  text-alternate/50 hover:border-primary border-2 border-alternate/50 hover:text-primary font-semibold py-4 px-6 rounded-lg transition-colors">
              TALI001
            </button>
            <button className="w-full mt-5 bg-[#2acfca]/70 text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#21A29D]/90 transition-colors">
              Share referral code{" "}
            </button>
          </div>
          <div className="w-full flex items-center justify-center">
            <button className="text-lg font-black text-alternate hover:text-primary">
              Refferal history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
