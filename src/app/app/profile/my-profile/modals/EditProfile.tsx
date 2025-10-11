"use client";

import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function EditProfile({ setTab }: { setTab: (v: string | null) => void }) {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
    });
    const [photo, setPhoto] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPhoto(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ ...formData, photo });
        setTab(null);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative border border-stone-200">
                {/* Close Button */}
                <button
                    onClick={() => setTab(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100"
                >
                    <XMarkIcon className="w-5 h-5 text-stone-600" />
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold text-stone-800 mb-1">Edit Profile</h2>
                <p className="text-sm text-stone-500 mb-6">Update your information and profile photo.</p>

                {/* Profile Image Upload */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-24 h-24">
                        <img
                            src={photo || "/images/default-avatar.png"}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border border-stone-200"
                        />
                        <label
                            htmlFor="photo-upload"
                            className="absolute bottom-0 right-0 bg-[#21A29D] p-2 rounded-full cursor-pointer hover:bg-[#1C8D88] transition-all"
                        >
                            <CameraIcon className="w-4 h-4 text-white" />
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-stone-600 font-medium">First Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="w-full text-stone-800 placeholder:text-stone-600 mt-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full text-stone-800 placeholder:text-stone-600 mt-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full text-stone-800 placeholder:text-stone-600 mt-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full text-stone-800 placeholder:text-stone-600 mt-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#21A29D] text-white py-2.5 rounded-lg font-medium hover:bg-[#1C8D88] transition-all"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
