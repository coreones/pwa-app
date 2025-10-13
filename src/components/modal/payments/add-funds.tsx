import {
  XMarkIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Landmark, User, X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export default function AddFunds({
  close,
}: {
  close: Dispatch<SetStateAction<boolean>>;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText("08123456789");
    toast.success("Referral code copied");
  };
  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/40 w-full container backdrop-blur-sm flex items-end justify-center z-[99]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close(false)}
        >
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-t-3xl space-y-4 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Top up your account
              </h4>
              <button
                onClick={() => close(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full text-center bg-alternate/10 p-3 rounded-xl font-semibold text-black/70 ">
              Transafer to the virtual account below
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl flex  items-center justify-between px-4 py-3 mb-4">
              <div className="flex flex-col w-full">
                <h4 className="text-[#21A29D]">Account Number</h4>
                <span className="text-gray-700 text-lg truncate max-w-[70%]">
                  08123456789
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-[#21A29D] hover:text-[#1b8a88] transition"
              >
                <ClipboardDocumentIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full text-center bg-alternate/10 p-3 flex gap-3 justify-start items-center rounded-xl font-semibold text-black/70 ">
              <Landmark color="#21A29D" size={35} />
              <div className="flex text-start flex-col">
                <h4>Bank Name</h4>
                <h4 className="text-[#21A29D]">BillNa</h4>
              </div>
            </div>
            <div className="w-full text-center bg-alternate/10 p-3 flex gap-3 justify-start items-center rounded-xl font-semibold text-black/70 ">
              <User color="#21A29D" size={35} />
              <div className="flex text-start flex-col">
                <h4>Account Name</h4>
                <h4 className="text-[#21A29D]">Tali Nanzing</h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
