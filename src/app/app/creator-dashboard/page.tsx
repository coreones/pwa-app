import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="space-y-5 min-h-full w-full h-full pt-20">
      <div className="w-full max-w-[90%] space-y-10 mx-auto">
        <h1 className="text-4xl font-black max-w-2/3-">Creator Dashboard</h1>
        <h1 className="text-4xl font-black max-w-2/3-">Welcom, @Tali</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-5 w-full ">
            <div className="w-full space-y-3 text-center bg-alternate py-5 rounded-3xl">
              <h1 className="text-4xl font-semibold">N120,000</h1>
              <h3 className="text-2xl">Total Earnings</h3>
            </div>
            <button className="bg-secondary text-primary text-3xl font-semibold rounded-2xl p-4">
              Post Update
            </button>
          </div>
          <div className="flex flex-col gap-5 w-full ">
            <div className="w-full space-y-3 text-center bg-alternate py-5 rounded-3xl">
              <h1 className="text-4xl font-semibold">3,400</h1>
              <h3 className="text-2xl">Total Fans</h3>
            </div>
            <button className="bg-secondary text-primary text-3xl font-semibold rounded-2xl p-4">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div className="w-full p-8 min-h-89 space-y-10 rounded-t-[45px] bg-secondary">
        <button
          type={"button"}
          className="text-3xl hover:cursor-pointer w-full flex justify-between items-center text-primary font-black"
        >
          <span>Post Update</span>
          <ChevronRight size={30} />
        </button>
        <div className="h-1 w-full bg-black/20" />
        <div className="w-full flex items-center justify-between gap-5">
          <div className="flex gap-5 items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary">
              <Plus className="text-secondary size-10 " />
            </div>
            <div className="text-black text-2xl font-semibold ">
              Post Update Now
            </div>
          </div>
          <div className="text-xl text-black/60 font-semibold">5 hrs ago</div>
        </div>
        <div className="h-1 w-full bg-black/20" />
      </div>
      
    </div>
  );
}
