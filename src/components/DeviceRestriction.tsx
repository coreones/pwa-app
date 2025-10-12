"use client";

import { useEffect, useState, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function DeviceRestriction({ children }: Props) {
    const [isAllowed, setIsAllowed] = useState(true);

    useEffect(() => {
        const checkWidth = () => {
            setIsAllowed(window.innerWidth <= 1200);
        };

        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    if (!isAllowed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-100 text-stone-800 p-6 text-center">
                <div className="max-w-md">
                    <h1 className="text-2xl font-semibold mb-3">🚫 Unsupported Device</h1>
                    <p className="text-stone-600">
                        BillNa is optimized for mobile and tablet screens only. Please use a smaller device.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
