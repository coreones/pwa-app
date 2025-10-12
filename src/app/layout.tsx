import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import DeviceRestriction from "@/components/DeviceRestriction";
const geist = localFont({
    src: [
        { path: "../../public/fonts/Geist/webfonts/Geist-Thin.woff2", weight: "200", style: "normal" },
        { path: "../../public/fonts/Geist/webfonts/Geist-Light.woff2", weight: "300", style: "normal" },
        { path: "../../public/fonts/Geist/webfonts/Geist-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/Geist/webfonts/Geist-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../public/fonts/Geist/webfonts/Geist-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../../public/fonts/Geist/webfonts/Geist-Bold.woff2", weight: "700", style: "normal" },
        { path: "../../public/fonts/Geist/webfonts/Geist-Black.woff2", weight: "800", style: "normal" },
    ],
    variable: "--font-geist",
    display: "swap",
});

export const metadata: Metadata = {
    title: "BillNa",
    description: "Smarter bills, simpler payments ⚡",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={geist.variable}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <meta name="application-name" content="BillNa" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#21A29D" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            </head>
            <body className="min-h-screen w-full overflow-x-hidden font-geist bg-white text-gray-900">
                <DeviceRestriction>
                    <Toaster />
                    {children}
                </DeviceRestriction>
            </body>
        </html>
    );
}
