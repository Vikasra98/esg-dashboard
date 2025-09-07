"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: "/icon/dashboard.png", href: "/dashboard" },
  {
    label: "Create A Company",
    icon: "/icon/create.png",
    href: "/create-company",
  },
  { label: "List Of All", icon: "/icon/list.png", href: "/list" },
  { label: "Compare Data", icon: "/icon/compare.png", href: "/compare" },
  { label: "Settings", icon: "/icon/setting.png", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80 }}
        animate={{ width: isCollapsed ? 74 : 261, x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-[#081A12] ps-0 p-6 flex flex-col space-y-8 relative h-screen"
        style={{ overflow: "hidden" }}
      >
        {/* Logo */}
        {!isCollapsed ? (
          <div className="lg:mb-[63px] mb-10 ps-[30px]">
            <Image
              src={"/Logo/logo_White.png"}
              alt="logo_White"
              height={44}
              width={139}
            />
          </div>
        ) : (
          <div className="lg:mb-[63px] mb-10 ps-2">
            <Image
              className="h-[44px] w-[48px]"
              src={"/Logo/logo_short.png"}
              alt="logo_White"
              height={44}
              width={48}
            />
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex flex-col space-y-4">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center space-x-3 p-[13px] rounded-br-md rounded-tr-md ps-4 sidebar_hover 
                  ${
                    isActive
                      ? "sidebar_active text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                <Image
                  className={`h-7 w-7 ${isCollapsed ? "h-auto" : "h-7"}`}
                  src={item.icon}
                  alt={item.label}
                  height={28}
                  width={28}
                />
                {!isCollapsed && (
                  <span className="text-sm lg:text-lg lg:leading-5 font-semibold text-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Toggle Button (outside sidebar so it’s never clipped) */}
      <motion.div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-white h-[30px] w-[30px] rounded-full flex items-center justify-center absolute top-8 -right-[12px] cursor-pointer shadow-md z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="h-3.5 w-3.5 text-black" />
        </motion.div>
      </motion.div>
    </div>
  );
}
