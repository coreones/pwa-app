import { X } from "lucide-react";
import React from "react";

export default function DeactivateAccount({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <div className="w-full h-full absolute top-0 left-0 min-h-screen bg-black/30 flex items-center justify-center">
    
      <div className="w-full space-y-3 max-w-md p-4 bg-white/90 rounded-2xl">
        <h1 className="text-3xl font-black text-primary text-center">
          Deactivate Account
        </h1>
        <p className="text-lg text-center text-black/60">
          You are about to deactivate you account. THis action cannot be undone.
          Are you sure you want to proceed?
        </p>
        <div className="w-full flex justify-between items-center gap-4">
          <button  onClick={() => setTab(null)} className=" w-full p-5 rounded-2xl text-lg bg-white text-black/60">
            Cancel
          </button>
          <button className=" w-full p-5 rounded-2xl text-lg bg-red-500 text-white">
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}
