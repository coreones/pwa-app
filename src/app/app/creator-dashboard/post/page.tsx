import { Book, ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="space-y-5 flex flex-col justify-between min-h-full w-full h-full ">
      <div className="w-full max-w-[90%] space-y-10 mx-auto">
        <h1 className="text-4xl font-black max-w-2/3-">Post Update</h1>
      </div>
      <div className="w-full p-8 min-h-89 space-y-5 rounded-t-[45px] bg-secondary">
        <textarea
          name=""
          id=""
          className="w-full min-h-70 rounded-2xl border-3 placeholder:text-black/50 text-lg border-alternate/30 p-3"
          placeholder="What's new with Your fans?"
        >
        </textarea>
        <div className="flex items-center gap-2 justify-start">
          <button className="bg-alternate/20 cursor-pointer p-2 rounded-md ">
            <ImageIcon className="w-10 h-10 text-primary" />
          </button>
          <button className="bg-alternate/20 cursor-pointer p-2 rounded-md ">
            <Book className="w-10 h-10 text-primary" />
          </button>
          <button className="bg-alternate/20 cursor-pointer p-2 rounded-md ">
            <Pencil className="w-10 h-10 text-primary" />
          </button>
        </div>
        <div className="w-full flex items-center justify-center mx-auto pb-4">
          <button
            type="button"
            className="w-full py-4 rounded-2xl bg-primary text-secondary text-2xl max-w-[80%] mx-auto"
          >
            Post to fan
          </button>
        </div>
        <hr className="w-full h-0.5  bg-primary/50" />

        <div className="w-full p-8 h-auto space-y-10 rounded-t-[45px] bg-secondary">
          <div className="w-full flex items-center justify-between gap-5">
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 rounded-full relative overflow-hidden flex items-center justify-center bg-primary">
                <Image
                  src={"/img/user.jpg"}
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-black text-2xl font-semibold ">
                  New freestyle out now
                </div>
                <div className="text-xl text-black/60 font-semibold">
                  5 hrs ago
                </div>
              </div>
            </div>
          </div>
          <div className="text-primary text-xl font-semibold ">
            New freestyle out now
          </div>
        </div>
      </div>
    </div>
  );
}
