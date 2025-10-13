"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, X, XCircle } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function SetPin({
    close,
    onSuccess,
}: {
    close: Dispatch<SetStateAction<boolean>>;
    onSuccess?: () => void;
}) {
    const [step, setStep] = useState<"create" | "confirm" | "success" | "error">(
        "create"
    );
    const [pin, setPin] = useState<string>("");
    const [confirmPin, setConfirmPin] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleNumberClick = (num: string) => {
        if (step === "create" && pin.length < 4) {
            setPin((prev) => prev + num);
        } else if (step === "confirm" && confirmPin.length < 4) {
            setConfirmPin((prev) => prev + num);
        }
    };

    const handleDelete = () => {
        if (step === "create") setPin((prev) => prev.slice(0, -1));
        else setConfirmPin((prev) => prev.slice(0, -1));
    };

    const handleConfirm = async () => {
        if (pin !== confirmPin) {
            setStep("error");
            toast.error("PINs do not match");
            return setTimeout(() => {
                setPin("");
                setConfirmPin("");
                setStep("create");
            }, 1500);
        }

        try {
            setLoading(true);

            const res = await api.post("/user/set/pin", {
                pin,
                confirm_pin: confirmPin,
            });

            const { error } = res.data;

            if (!error) {
                toast.success("🎉 Hurray! New account transaction PIN set");
                setStep("success");
                setTimeout(() => {
                    setPin("");
                    setConfirmPin("");
                    close(false);
                }, 1500);
                onSuccess?.();
            } else {
                throw new Error("Unable to set PIN");
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to set PIN, please try again");
            setStep("error");
            setTimeout(() => {
                setPin("");
                setConfirmPin("");
                setStep("create");
            }, 1500);
        } finally {
            setLoading(false);
        }

    };

    const renderDots = (val: string) => (
        <div className="flex justify-center gap-3 mb-6">
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ scale: val[i] ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-4 h-4 rounded-full ${val[i]
                        ? "bg-teal-600 shadow-md"
                        : "bg-stone-200 border border-stone-300"
                        }`}
                ></motion.div>
            ))}
        </div>
    );

    const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "←", "0", "✓"];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50"
        >
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="relative bg-white rounded-3xl pb-20 sm:pb-10 pt-10 w-full sm:max-w-sm shadow-2xl"
            >
                {/* ✨ Close Button */}
                <motion.button
                    onClick={() => close(false)}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-all"
                >
                    <X className="w-6 h-6" />
                </motion.button>

                <AnimatePresence mode="wait">
                    {step === "create" && (
                        <motion.div
                            key="create"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <Lock className="mx-auto text-teal-600 w-10 h-10 mb-4" />
                            <h2 className="text-2xl font-bold text-stone-900 mb-1">
                                Create Your PIN
                            </h2>
                            <p className="text-stone-500 mb-6 text-sm">
                                Choose a secure 4-digit PIN for transactions
                            </p>
                            {renderDots(pin)}
                            <Keypad
                                numbers={keypadNumbers}
                                onNumberClick={handleNumberClick}
                                onDelete={handleDelete}
                                onConfirm={() => pin.length === 4 && setStep("confirm")}
                                disableConfirm={pin.length < 4}
                                loading={loading}
                            />
                        </motion.div>
                    )}

                    {step === "confirm" && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <Lock className="mx-auto text-teal-600 w-10 h-10 mb-4" />
                            <h2 className="text-2xl font-bold text-stone-900 mb-1">
                                Confirm PIN
                            </h2>
                            <p className="text-stone-500 mb-6 text-sm">
                                Re-enter the same 4-digit PIN
                            </p>
                            {renderDots(confirmPin)}
                            <Keypad
                                numbers={keypadNumbers}
                                onNumberClick={handleNumberClick}
                                onDelete={handleDelete}
                                onConfirm={() =>
                                    confirmPin.length === 4 && handleConfirm()
                                }
                                disableConfirm={confirmPin.length < 4}
                                loading={loading}
                            />
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-4 py-16"
                        >
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                            <h3 className="text-xl font-semibold text-stone-800">
                                PIN Created Successfully
                            </h3>
                        </motion.div>
                    )}

                    {step === "error" && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-4 py-16"
                        >
                            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                            <h3 className="text-xl font-semibold text-stone-800">
                                PINs Don’t Match
                            </h3>
                            <p className="text-stone-500">Please try again</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

function Keypad({
    numbers,
    onNumberClick,
    onDelete,
    onConfirm,
    disableConfirm,
    loading
}: {
    numbers: string[];
    onNumberClick: (num: string) => void;
    onDelete: () => void;
    onConfirm: () => void;
    disableConfirm: boolean;
    loading: boolean;
}) {
    return (
        <div className="grid grid-cols-3 gap-3 mx-auto w-64">
            {numbers.map((num, idx) => {
                if (num === "←") {
                    return (
                        <motion.button
                            key={idx}
                            whileTap={{ scale: 0.9 }}
                            onClick={onDelete}
                            className="text-lg py-4 rounded-2xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200 transition-all"
                        >
                            ⌫
                        </motion.button>
                    );
                } else if (num === "✓") {
                    return (
                        <motion.button
                            key={idx}
                            whileTap={{ scale: 0.95 }}
                            onClick={onConfirm}
                            disabled={disableConfirm || loading}
                            className={`text-lg py-4 rounded-2xl font-semibold transition-all ${disableConfirm || loading
                                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-md"
                                }`}
                        >
                            ✓
                        </motion.button>
                    );
                } else {
                    return (
                        <motion.button
                            key={idx}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNumberClick(num)}
                            className="text-lg py-4 rounded-2xl bg-white border border-stone-200 text-stone-800 font-semibold hover:bg-stone-100 transition-all shadow-sm"
                        >
                            {num}
                        </motion.button>
                    );
                }
            })}
        </div>
    );
}
