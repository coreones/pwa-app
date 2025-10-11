import { Book, Check, ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="space-y-5 min-h-full w-full h-full pt-20">
      <div className="w-full max-w-[90%] space-y-10 mx-auto">
        <h1 className="text-4xl font-black max-w-2/3-">Gift Fans</h1>
      </div>
      <div className="w-full  min-h-89  rounded-t-[45px] bg-alternate/50">
        <h1 className="text-2xl w-full py-5 text-center">
          send gift to you fans
        </h1>

        <div className="w-full p-8 h-full space-y-10 rounded-t-[45px] bg-secondary">
          <div className="w-full flex flex-col pl-15 gap-3">
            <div className="flex gap-3 text-black font-semibold text-xl items-center">
              <input
                type="radio"
                name="select"
                value={"Airtime"}
                id="airtime"
                className="radio-custom "
              />
              <label htmlFor="airtime">Airtime</label>
            </div>
            <div className="flex gap-3 text-black font-semibold  text-xl items-center">
              <input
                type="radio"
                name="select"
                value={"Data"}
                id="data"
                className="radio-custom "
              />
              <label htmlFor="data">Data</label>
            </div>
            <div className="flex gap-3 text-black font-semibold  text-xl items-center">
              <input
                type="radio"
                name="select"
                value={"Event Ticket"}
                id="event"
                className="radio-custom "
              />
              <label htmlFor="event">Event Ticket</label>
            </div>
          </div>
          <hr className="w-full h-0.5  bg-primary/20" />
          <div className="flex flex-col max-w-xl mx-auto gap-2">
            <label htmlFor="amount" className="text-black/50 text-xl">
              Amount
            </label>
            <div className="flex px-3 rounded-2xl w-full border-3 border-primary/20  text-black text-xl items-center focus:border-primary/50">
              <span>N</span>
              <input
                type="text"
                name=""
                id=""
                placeholder="5000"
                className="py-3 outline-none "
              />
            </div>
          </div>
          <div className="w-full flex max-w-xl items-center justify-center -mt-3 mx-auto pb-4">
            <button
              type="button"
              className="w-full py-4 rounded-2xl bg-primary text-secondary text-2xl mx-auto"
            >
              Withdraw to bank
            </button>
          </div>

          <div className="w-full h-auto py-5 px-5 bg-alternate/20 max-w-md mx-auto rounded-2xl">
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 rounded-full relative overflow-hidden flex items-center justify-center bg-primary">
                <Check size={20}/>
              </div>
              <div className="flex text-primary text-2xl flex-col gap-1">
               N23,000 sent to your bank account
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
