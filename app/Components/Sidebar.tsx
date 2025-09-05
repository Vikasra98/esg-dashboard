// components/Sidebar.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-[#081A12] ps-0 p-6 flex flex-col space-y-8"
    >
      {/* Logo */}
      <div className="lg:mb-[63px] mb-10 ps-[30px]">
        <Image
          src={"/Logo/logo_White.png"}
          alt="logo_White"
          height={44}
          width={139}
        />
      </div>

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
                className="h-7 w-7"
                src={item.icon}
                alt={item.label}
                height={28}
                width={28}
              />
              <span className="text-sm lg:text-lg lg:leading-5 font-semibold text-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
