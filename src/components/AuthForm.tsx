"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBack } from "@/hooks/useBack";
import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { deleteClientCookie, setClientCookie } from "@/lib/cookies";
import { setClientLocalStorage } from "@/lib/local-storage";
import { useSearchParams } from "next/navigation";

// Zod schemas
const loginSchema = z.object({
    entity: z.string().min(4, "Email or username is required"),
    password: z.string().min(6, "Password is required"),
});

const registerSchema = z.object({
    firstname: z.string().min(3, "First name is required"),
    lastname: z.string().min(3, "Last name is required"),
    username: z
        .string()
        .min(4, "Username is required")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.email("Invalid email address").min(10, "Email is too short"),
    phone: z
        .string()
        .regex(/^234\d{10}$/, "Phone number must start with 234 and be 13 digits long"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
            "Password must contain uppercase, lowercase, number, and special character"
        ),
});

const forgotPasswordSchema = z.object({
    email: z.email().min(10, "Invalid email address"),
});

type AuthType = "login" | "register" | "forgot-password";

type AuthFormProps = {
    type: AuthType;
};

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;


export default function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const handleBack = useBack("/app");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const [ref, setRef] = useState<string | null>(null);

    useEffect(() => {
        const refParam = searchParams.get("ref");
        if (refParam) setRef(refParam);
    }, [searchParams]);

    // Determine schema and default values
    const schema =
        type === "login"
            ? loginSchema
            : type === "register"
                ? registerSchema
                : forgotPasswordSchema;

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(schema),
    });

    const inputClasses =
        "w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none";

    const onSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true);
        try {
            if (type === "login") {
                const res = await api.post<ApiResponse>("/auth/login", data);
                if (!res.data.error) {
                    toast.success("Logged in successfully!");
                    deleteClientCookie("accessToken");
                    setClientCookie("accessToken", res.data.data.token);
                    setClientLocalStorage("user", JSON.stringify(res.data.data.user));
                    router.push("/app");
                }
            } else if (type === "register") {
                const res = await api.post<ApiResponse>("/auth/register", { ...data, referral_code: ref });
                if (!res.data.error) {
                    toast.success("Account created successfully!");
                    router.push("/auth/login");
                }
            } else if (type === "forgot-password") {
                const res = await api.post<ApiResponse>("/auth/forgot-password", data);
                if (!res.data.error) {
                    toast.success("Reset link sent! Check your email.");
                }
            }
        } catch (err: any) {
            console.error("Auth error", err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Helper to render fields dynamically
    const renderFields = () => {
        switch (type) {
            case "login":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email/Username
                            </label>
                            <input
                                type="text"
                                placeholder="john@doe.com"
                                {...formRegister("entity")}
                                className={inputClasses}
                            />
                            {errors.entity?.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.entity.message.toString()}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    {...formRegister("password")}
                                    className={`${inputClasses} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#21A29D]"
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 3l18 18M10.477 10.477A3 3 0 0112 9a3 3 0 013 3c0 .389-.074.76-.211 1.1M9.88 9.88A3 3 0 0115 12a3 3 0 01-3 3 3 3 0 01-2.12-.88M12 5c7.18 0 11 7 11 7s-1.5 3.06-4.39 5.26M9.88 9.88L4.21 4.21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password?.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message.toString()}</p>
                            )}
                        </div>
                    </>
                );
            case "register":
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input type="text" placeholder="John" {...formRegister("firstname")} className={inputClasses} />
                                {errors.firstname?.message && <p className="text-red-500 text-sm mt-1">{errors.firstname.message.toString()}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input type="text" placeholder="Doe" {...formRegister("lastname")} className={inputClasses} />
                                {errors.lastname?.message && <p className="text-red-500 text-sm mt-1">{errors.lastname.message.toString()}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input type="text" placeholder="johndoe123" {...formRegister("username")} className={inputClasses} />
                            {errors.username?.message && <p className="text-red-500 text-sm mt-1">{errors.username.message.toString()}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" placeholder="you@example.com" {...formRegister("email")} className={inputClasses} />
                            {errors.email?.message && <p className="text-red-500 text-sm mt-1">{errors.email.message.toString()}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="2348012345678"
                                {...formRegister("phone")}
                                className={inputClasses}
                                onChange={(e) => {
                                    let value = e.target.value;

                                    // Ensure it always starts with 234
                                    if (!value.startsWith("234")) {
                                        value = "234" + value.replace(/^234/, "");
                                    }

                                    // Remove non-digit characters
                                    value = value.replace(/\D/g, "");

                                    // Limit to 13 digits
                                    if (value.length > 13) {
                                        value = value.slice(0, 13);
                                    }

                                    e.target.value = value;
                                }}
                            />
                            {errors.phone?.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message.toString()}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} placeholder="********" {...formRegister("password")} className={`${inputClasses} pr-12`} />
                                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#21A29D]">
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0112 9a3 3 0 013 3c0 .389-.074.76-.211 1.1M9.88 9.88A3 3 0 0115 12a3 3 0 01-3 3 3 3 0 01-2.12-.88M12 5c7.18 0 11 7 11 7s-1.5 3.06-4.39 5.26M9.88 9.88L4.21 4.21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password?.message && <p className="text-red-500 text-sm mt-1">{errors.password.message.toString()}</p>}
                        </div>
                    </>
                );
            case "forgot-password":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" placeholder="you@example.com" {...formRegister("email")} className={inputClasses} />
                            {errors.email?.message && <p className="text-red-500 text-sm mt-1">{errors.email.message.toString()}</p>}
                        </div>
                    </>
                );
        }
    };

    const getTitle = () => {
        if (type === "login") return "Welcome Back 👋";
        if (type === "register") return "Welcome to BillNa 🎉";
        if (type === "forgot-password") return "Password Recovery";
    };

    const getDescription = () => {
        if (type === "login") return "Log in to your BillNa account and continue managing your bills with ease.";
        if (type === "register") return "Pay bills, buy airtime & data, send money — all in one place. Let’s get you started.";
        if (type === "forgot-password") return "Enter your email address and we’ll send you a link to reset your password.";
    };

    const getSubmitText = () => {
        if (type === "login") return "Continue";
        if (type === "register") return "Continue";
        if (type === "forgot-password") return "Send Reset Link";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#21A29D]/10 to-white flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg bg-white rounded-2xl p-8 md:p-10 border border-gray-100">
                <button onClick={handleBack} className="mb-6 text-gray-500 hover:text-[#21A29D] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{getTitle()}</h2>
                    <p className="text-gray-500 mt-2">{getDescription()}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {renderFields()}

                    <button type="submit" disabled={loading} className="w-full bg-[#21A29D] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#1b8e89] transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                        {loading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>}
                        {getSubmitText()}
                    </button>
                </form>

                {type === "login" && (
                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <Link href="/auth/register" className="text-[#21A29D] font-semibold hover:underline">Sign up</Link>
                    </p>
                )}

                {type === "register" && (
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-[#21A29D] font-semibold hover:underline">Log in</Link>
                    </p>
                )}

                {type === "forgot-password" && (
                    <p className="mt-6 text-center text-gray-600 text-sm">
                        Remember your password?{" "}
                        <Link href="/auth/login" className="text-[#21A29D] font-medium">Back to Login</Link>
                    </p>
                )}
            </motion.div>
        </div>
    );
}
