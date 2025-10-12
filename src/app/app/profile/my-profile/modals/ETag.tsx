"use client";

import React, { useState } from "react";
import { XMarkIcon, TagIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { setClientLocalStorage } from "@/lib/local-storage";

export default function ETag({ setTab }: { setTab: (v: string | null) => void }) {
    const [eTag, setETag] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await api.put("/user/change/username", { username: eTag });
            if (res.data.error) {
                toast.error("Failed to change e-tag");
            }
            setClientLocalStorage("user", JSON.stringify(res.data.data))
            toast.success("e-Tag changed");
            setTab(null);
        } catch (err) {
            toast.error("Failed to change e-tag");
            console.error("e-Tag change failed", err);
        }
        finally {
            setIsSaving(false)
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative border border-stone-200">
                {/* Close Button */}
                <button
                    onClick={() => setTab(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 transition-all"
                >
                    <XMarkIcon className="w-5 h-5 text-stone-600" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-[#21A29D]/10 text-[#21A29D]">
                        <TagIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-stone-800">Set E-Tag</h2>
                        <p className="text-sm text-stone-500">Create or update your unique E-Tag name.</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-stone-600 font-medium">E-Tag</label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                value={eTag}
                                onChange={(e) => setETag(e.target.value)}
                                placeholder=""
                                className="w-full text-stone-800 placeholder:text-stone-600 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:outline-none pr-10"
                            />
                            <span className="absolute right-3 top-2 text-stone-400 text-sm">@</span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">
                            Your e-Tag helps others send or request money easily.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!eTag || isSaving}
                        className={`w-full py-2.5 rounded-lg font-medium text-white transition-all ${isSaving
                            ? "bg-[#21A29D]/60 cursor-not-allowed"
                            : "bg-[#21A29D] hover:bg-[#1C8D88]"
                            }`}
                    >
                        {isSaving ? "Saving..." : "Save e-Tag"}
                    </button>
                </form>
            </div>
        </div>
    );
}
