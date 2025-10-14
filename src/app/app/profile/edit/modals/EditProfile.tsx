"use client";

import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { setToLocalStorage } from "@/lib/local-storage";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditProfile({ setTab }: { setTab: (v: string | null) => void }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: ""
    });

    useEffect(() => {
        setFormData({
            firstname: user?.firstname ?? "",
            lastname: user?.lastname ?? "",
        })
    }, [user])

    const [photo, setPhoto] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setPhoto(reader.result as string);
        reader.readAsDataURL(file);

        // Upload file
        try {
            setUploading(true);
            const form = new FormData();
            form.append("file", file);

            const { data } = await api.post("/general/upload-file", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Set uploaded photo URL
            setFormData((prev) => ({ ...prev, photo: data }));
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.put("/user/profile", formData);
            if (res.data.error) {
                toast.error("Failed to update profile");
            }
            setToLocalStorage("user", JSON.stringify(res.data.data))
            toast.success("Profile updated");
            setTab(null);
        } catch (err) {
            toast.error("Failed to update profile");
            console.error("Profile update failed", err);
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
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-600 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-[#21A29D] text-white py-2.5 rounded-lg font-medium hover:bg-[#1C8D88] transition-all ${uploading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}
