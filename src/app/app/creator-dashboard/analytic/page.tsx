import { Book, Check, ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="space-y-10 w-full h-full">
      <div className="w-full max-w-[90%] mx-auto">
        <h1 className="text-4xl font-black max-w-2/3-">Analytics</h1>
      </div>

      <div className="w-full p-8 h-full space-y-10 rounded-t-[45px] bg-secondary">
        <div className="w-full lg:pl-16 font-black text-primary flex flex-col  gap-3">
          <h3 className="3xl">Lorem, ipsum.</h3>
          <h1 className="text-5xl"> N120,000</h1>
        </div>
        <hr className="w-full h-0.5  bg-primary/20" />
        <div className="flex flex-col max-w-xl mx-auto gap-2">
          <label
            htmlFor="bank"
            className="text-alternate font-semibold text-xl"
          >
            Bank
          </label>
          <div className="flex px-3 rounded-2xl w-full border-3 border-primary/20  text-black text-xl items-center focus:border-primary/50">
            <input
              type="text"
              name="bank"
              id=""
              placeholder="e.g. GTBank"
              className="py-3 outline-none "
            />
          </div>
        </div>
        <div className="flex flex-col max-w-xl mx-auto gap-2">
          <label
            htmlFor="amount"
            className="text-alternate font-semibold text-xl"
          >
            Account Number
          </label>
          <div className="flex px-3 rounded-2xl w-full border-3 border-primary/20  text-black text-xl items-center focus:border-primary/50">
            <input
              type="number"
              name=""
              id=""
              placeholder="1234567890"
              className="py-3 outline-none  w-full"
            />
          </div>
        </div>
        <div className="flex flex-col max-w-xl mx-auto gap-2">
          <label
            htmlFor="amount"
            className="text-alternate font-semibold text-xl"
          >
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
        <div className="w-full flex max-w-xl items-center justify-center -mt-3 mx-auto">
          <button
            type="button"
            className="w-full py-4 rounded-2xl bg-primary text-secondary text-2xl mx-auto"
          >
            Withdraw to bank
          </button>
        </div>
      </div>
    </div>
  );
}
