"use client";

import { motion } from "framer-motion";
import { Delete, Lock, X } from "lucide-react";

interface OTPKeypadProps {
    otp: string[];
    setOtp: (otp: string[]) => void;
    headerText?: string;
    onConfirm: () => void;
    onBack: () => void;
}

export function OTPKeypad({ otp, setOtp, headerText, onConfirm, onBack }: OTPKeypadProps) {
    const handleKeyPress = (key: string) => {
        const newOtp = [...otp];
        const idx = newOtp.findIndex((v) => v === "");
        if (idx !== -1) {
            newOtp[idx] = key;
            setOtp(newOtp);
        }
    };

    const handleDelete = () => {
        const newOtp = [...otp];
        const idx = newOtp.findLastIndex((v) => v !== "");
        if (idx !== -1) {
            newOtp[idx] = "";
            setOtp(newOtp);
        }
    };

    const handleConfirm = () => {
        if (otp.every((d) => d !== "")) onConfirm();
    };

    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

    return (
        <div className="w-full flex flex-col items-center justify-center space-y-8 p-6">
            <button onClick={onBack} className="absolute top-4 left-4 text-gray-600 hover:text-gray-800">
                <X size={24} />
            </button>
            <div className="flex flex-col items-center space-y-4">
                <Lock className="w-8 h-8 text-teal-500" />
                <h2 className="text-xl font-bold text-gray-800">{headerText}</h2>
            </div>
            <div className="flex gap-4">
                {otp.map((digit, i) => (
                    <motion.div
                        key={i}
                        className={`w-4 h-4 rounded-full border-2 ${digit ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                        animate={{ scale: digit ? 1.2 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4 w-64">
                {digits.map((key, i) =>
                    key === "" ? (
                        <div key={i}></div>
                    ) : key === "del" ? (
                        <motion.button
                            key={i}
                            onClick={handleDelete}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-xl bg-gray-100 hover:bg-gray-200 flex justify-center items-center transition-all"
                        >
                            <Delete className="w-5 h-5 text-gray-600" />
                        </motion.button>
                    ) : (
                        <motion.button
                            key={i}
                            onClick={() => handleKeyPress(key)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 text-lg font-semibold bg-gray-50 hover:bg-teal-50 rounded-xl text-gray-800 transition-all"
                        >
                            {key}
                        </motion.button>
                    )
                )}
            </div>
            <motion.button
                onClick={handleConfirm}
                disabled={!otp.every((d) => d !== "")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-64 mt-6 py-3 rounded-lg font-semibold text-white ${otp.every((d) => d !== "") ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700" : "bg-gray-300 cursor-not-allowed"} transition-all`}
            >
                Authorize Payment
            </motion.button>
        </div>
    );
}