// components/Topbar.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  LogOut,
  User,
  Settings,
  Shield,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "../helper/api";

export default function Topbar(props: any) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const router = useRouter();
  console.log(userInfo.role, "userInfo.role");

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    authApi.logout();
    setShowProfile(false);
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window != undefined) {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        setUserInfo(JSON.parse(stored));
      }
    }
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between lg:py-[23px] lg:px-[30px] p-4 border-b border-[#416455]"
    >
      <h1 className="text-xl lg:text-[28px] lg:leading-[38px] font-semibold text-white">
        {props.pageTitle}
      </h1>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-[13px] top-[calc(50%-11px)] w-[22px] h-[22px] text-[#F5F5F3]" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="pl-12 pr-4 p-[13px] bg-[#123D2A] text-sm focus:outline-none border border-[#1A3A2E] h-12 w-[332px] rounded-sm text-white placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative ">
          <button
            onClick={() => setShowNotif((prev) => !prev)}
            className="bg-[#123D2A] p-[13px] rounded-full cursor-pointer"
          >
            <Bell className="w-[22px] h-[22px] text-white" />
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-[360px] bg-[#0C2C1F] border border-[#1A3A2E] rounded-lg shadow-lg z-50"
              >
                <div className="p-4 border-b border-[#1A3A2E] flex justify-between items-center">
                  <p className="text-white font-medium">Notifications</p>
                  <div className="space-x-2">
                    <button className="px-2 py-1 text-xs bg-[#123D2A] text-white rounded">
                      All
                    </button>
                    <button className="px-2 py-1 text-xs text-gray-400">
                      Read
                    </button>
                    <button className="px-2 py-1 text-xs text-gray-400">
                      Unread
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-[#1A3A2E] max-h-[260px] overflow-y-auto">
                  <div className="flex items-start gap-3 p-4 hover:bg-[#123D2A]">
                    <div className="w-8 h-8 rounded-full bg-[#123D2A] flex items-center justify-center">
                      <Image
                        src="/img/top-profile.jpg"
                        alt="profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-sm text-white">
                      EcoSolutions Inc. has been successfully verified by PWC.
                      <p className="text-gray-400 text-xs mt-1">
                        Just 30 sec ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 hover:bg-[#123D2A]">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="/img/top-profile.jpg"
                        alt="profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-sm text-white">
                      New emissions data uploaded Green Hermet Co.
                      <p className="text-gray-400 text-xs mt-1">
                        Just 30 sec ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-[#1A3A2E]">
                  <button className="w-full py-2 text-center bg-[#123D2A] text-white rounded text-sm">
                    View All Messages
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center space-x-2 bg-[#123D2A] px-3 py-1 rounded-md"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                // src="/img/top-profile.jpg"
                src="/img/dummy-profile.png"
                alt="profile"
                height={38}
                width={38}
              />
            </div>
            <div className="text-sm text-left">
              <p className="font-medium text-white">{userInfo?.full_name}</p>
              <p className="text-gray-400">{userInfo?.role}</p>
            </div>
            <span></span>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-[220px] bg-[#0C2C1F] border border-[#1A3A2E] rounded-lg shadow-lg z-50"
              >
                <ul className="py-2 text-sm text-white">
                  <li className="px-4 py-2 hover:bg-[#123D2A] flex items-center gap-2 cursor-pointer">
                    <User size={16} /> Profile Overview
                  </li>
                  <li className="px-4 py-2 hover:bg-[#123D2A] flex items-center gap-2 cursor-pointer">
                    <Settings size={16} /> Account Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-[#123D2A] flex items-center gap-2 cursor-pointer">
                    <Shield size={16} /> Security & Access
                  </li>
                  <li className="px-4 py-2 hover:bg-[#123D2A] flex items-center gap-2 cursor-pointer">
                    <HelpCircle size={16} /> Support & Info
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-[#123D2A] flex items-center gap-2 cursor-pointer text-red-400"
                  >
                    <LogOut size={16} /> Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
