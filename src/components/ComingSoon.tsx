"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { Bell, Clock, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function ComingSoon({
  close,
}: {
  close: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence>
      {true && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[99]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] sm:w-[450px] bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center gap-6"
          >
            {/* Icon + Animation */}
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-6xl"
            >
              <Sparkles className="w-14 h-14 text-teal-500" />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 text-center">
              Coming Soon 🚀
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 text-center leading-relaxed max-w-sm">
              We’re crafting something amazing for your <span className="font-semibold text-teal-600">financial future</span>.
              Stay tuned for seamless payments, smarter saving tools, and instant insights.
            </p>

            {/* Countdown / Info Section */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Launching very soon...</span>
            </div>

            {/* Notify CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-3 flex items-center gap-2 px-5 py-3 bg-teal-600 text-white rounded-xl font-medium shadow-md hover:bg-teal-700 transition-all"
              onClick={() => toast.success("Notifications enabled!")}
            >
              <Bell className="w-4 h-4" />
              Notify Me
            </motion.button>

            {/* Close Button */}
            <button
              onClick={() => close(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
