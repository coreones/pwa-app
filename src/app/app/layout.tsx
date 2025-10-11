"use client";

import "../globals.css";
import {
  Headset,
  HomeIcon,
  Send,
  Settings,
  User,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isActive = (linkPath: string) => {
    return pathname === linkPath;
  };

  const navitems = [
    {
      icon: <HomeIcon size={24} />,
      name: "Home",
      link: "/app",
    },
    {
      icon: <Send size={24} />,
      name: "Referal",
      link: "/app/profile/referal",
    },
    {
      icon: <Headset size={24} />,
      name: "Help",
      link: "/app/profile/helpAndSupport",
    },
    {
      icon: <Settings size={24} />,
      name: "Settings",
      link: "/app/profile",
    },
  ];
  return (
    <html lang="en">
      <body className=" w-full max-w-3xl mx-auto relative">
        <div className="h-full w-full overflow-y-scroll">{children}</div>

        <div className="fixed max-w-3xl mx-auto bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="w-full max-w-3xl mx-auto flex items-center justify-around py-4">
            {navitems?.map((item, id) => (
              <Link
                key={id}
                href={item.link}
                className={`flex flex-col items-center  gap-1 ${
                  isActive(item.link)
                    ? "text-[#21A29D] scale-150 "
                    : "text-gray-400"
                }`}
              >
                  <div
                    className={`${
                      isActive(item.link) ? "scale-100 items-center flex flex-col  transition-all duration-1000 " : ""
                    } w-fit `}
                  >
                    {item.icon}
                  <span className="text-xs font-medium">{item.name}</span>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
