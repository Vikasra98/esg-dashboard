// app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import StatsCards from "../Components/StatsCards";
import EmissionsChart from "../Components/EmissionsChart";
import BudsChart from "../Components/BudsChart";
import RecentVerification from "../Components/RecentVerification";
import AuthLayout from "../Layout/AuthLayout";
import { ProtectedRoute } from "../Components/ProtectedRoute";
import UpdateDataFlowModal from "../Components/UpdateDataFlowModal";
import { useState } from "react";
import CompanyDashboard from "../Components/CompanyDashboard";

export default function Dashboard() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  // Remove duplicate API call - RecentVerification component will handle fetching

  return (
    <ProtectedRoute>
      {!isDashboard ? (
        <AuthLayout pageTitle={"Dashboard"} activeTitle="/dashboard">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[28px] leading-[38px] font-bold text-[#F5F5F3]">
              ESG Dashboard
            </h3>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EmissionsChart />
            <BudsChart />
          </div>

          <RecentVerification
            setIsEdit={setIsEdit}
            setIsDashboard={setIsDashboard}
          />
          <UpdateDataFlowModal isEdit={isEdit} setIsEdit={setIsEdit} />
        </AuthLayout>
      ) : (
        <AuthLayout pageTitle={"ESG Dashboard"} activeTitle="/list">
          <CompanyDashboard />
        </AuthLayout>
      )}
    </ProtectedRoute>
  );
}
