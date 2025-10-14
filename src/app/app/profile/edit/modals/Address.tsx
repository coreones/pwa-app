"use client";

import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { setToLocalStorage } from "@/lib/local-storage";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Address({ setTab }: { setTab: (v: string | null) => void }) {
    const { user } = useAuth();
    const [editing, setEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        house_number: "",
        street: "",
        city: "",
        state: "",
        country: "Nigeria", // always default
    });

    useEffect(() => {
        setFormData({
            house_number: user?.house_number ?? "",
            street: user?.street ?? "",
            city: user?.city ?? "",
            state: user?.state ?? "",
            country: "Nigeria",
        })
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true)
        try {
            const res = await api.put("/user/profile", formData);
            if (res.data.error) {
                toast.error("Failed to update address,");
            }
            setToLocalStorage("user", JSON.stringify(res.data.data))
            toast.success("Address updated");
            setTab(null);
        } catch (err) {
            toast.error("Failed to update address");
            console.error("Address update failed", err);
        }
        finally {
            setEditing(false)
        }
    };

    const inputClasses =
        "w-full text-stone-800 placeholder:text-stone-600 mt-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:outline-none";

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative border border-stone-200 overflow-scroll">
                {/* Close Button */}
                <button
                    onClick={() => setTab(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100"
                >
                    <XMarkIcon className="w-5 h-5 text-stone-600" />
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold text-stone-800 mb-1">Change Address</h2>
                <p className="text-sm text-stone-500 mb-6">Update your account address.</p>


                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-stone-600 font-medium">House Number</label>
                        <input
                            type="text"
                            name="house_number"
                            value={formData.house_number}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            readOnly
                            className={`${inputClasses} bg-stone-100 cursor-not-allowed`}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-[#21A29D] text-white py-2.5 rounded-lg font-medium hover:bg-[#1C8D88] transition-all ${editing ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={editing}
                    >
                        {editing ? "Editing..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}
