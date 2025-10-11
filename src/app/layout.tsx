import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
            <body className="min-h-screen w-full overflow-x-hidden font-geist bg-white text-gray-900">
                {children}
            </body>
        </html>
    );
}
