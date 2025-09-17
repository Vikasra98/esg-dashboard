// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { ProtectedRoute } from "../Components/ProtectedRoute";
import AuthLayout from "../Layout/AuthLayout";
import StatsCards from "../Components/StatsCards";
import EmissionsChart from "../Components/EmissionsChart";
import BudsChart from "../Components/BudsChart";
import RecentVerification from "../Components/RecentVerification";
import UpdateDataFlowModal from "../Components/UpdateDataFlowModal";
import CompanyDashboard from "../Components/CompanyDashboard";
import TokenList from "../Components/TokenList";
import VerifySubmision from "../Components/VerifySubmision";

export default function Dashboard() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDashboard, setIsDashboard] = useState(true); // default: dashboard screen
  const [isToken, setIsToken] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [isCompleted, setIsCompleted] = useState(false);
  // helpers to switch views safely
  const showDashboard = () => {
    setIsDashboard(true);
    setIsToken(false);
  };

  const showCompanyDashboard = () => {
    setIsDashboard(false);
    setIsToken(false);
  };

  const showTokenList = () => {
    setIsDashboard(false);
    setIsToken(true);
  };

  return (
    <ProtectedRoute>
      {isCompleted ? (
        <AuthLayout pageTitle={"Verify Submission"} activeTitle="/dashboard">
          <VerifySubmision />
        </AuthLayout>
      ) : isDashboard && !isToken ? (
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
            setIsToken={showTokenList}
            setIsEdit={setIsEdit}
            setIsDashboard={showCompanyDashboard}
            setSelectedCompanyId={setSelectedCompanyId}
            selectedCompanyId={selectedCompanyId}
          />
          <UpdateDataFlowModal
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            selectedCompanyId={selectedCompanyId}
            setIsCompleted={setIsCompleted}
          />
        </AuthLayout>
      ) : !isDashboard && !isToken ? (
        <AuthLayout pageTitle={"ESG Dashboard"} activeTitle="/list">
          <CompanyDashboard />
        </AuthLayout>
      ) : isToken ? (
        <AuthLayout pageTitle={"Token List"} activeTitle="/dashboard">
          <TokenList />
        </AuthLayout>
      ) : null}
    </ProtectedRoute>
  );
}
