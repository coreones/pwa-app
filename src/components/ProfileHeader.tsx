import { useBack } from "@/hooks/useBack";
import { ArrowLeft, Lock, Trash2 } from "lucide-react";

interface ProfileHeaderProps {
    title: string
}

export default function ProfileHeader({ title }: ProfileHeaderProps) {
    const handleBack = useBack("/app");
    return (
        <header className="sticky top-0 z-10 bg-[#21A29D] p-4 flex items-center justify-between shadow-sm">
            <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-white/20 transition"
            >
                <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white truncate">{title}</h1>
            <div className="w-8" /> {/* Spacer */}
        </header>
    )
}