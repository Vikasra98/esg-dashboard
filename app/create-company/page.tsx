import React from "react";
import AuthLayout from "../Layout/AuthLayout";
import CompanyProfile from "../Components/CompanyProfile";
import { ProtectedRoute } from "../Components/ProtectedRoute";
import VerificationCompleted from "../Components/VerificationCompleted";

const page = () => {
  return (
    <ProtectedRoute>
      <AuthLayout pageTitle={"Create Company"} activeTitle="/create-company">
        <CompanyProfile />
        {/* <VerificationCompleted /> */}
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default page;
