// app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import StatsCards from "../Components/StatsCards";
import EmissionsChart from "../Components/EmissionsChart";
import BudsChart from "../Components/BudsChart";
import RecentVerification from "../Components/RecentVerification";
import AuthLayout from "../Layout/AuthLayout";

export default function Dashboard() {
  return (
    <AuthLayout pageTitle={"Dashboard"} activeTitle="/dashboard">
      <h3 className="text-[28px] leading-[38px] font-bold mb-8 text-[#F5F5F3]">
        Company A
      </h3>
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EmissionsChart />
        <BudsChart />
      </div>

      <RecentVerification />
    </AuthLayout>
  );
}
