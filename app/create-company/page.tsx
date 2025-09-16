import React from "react";
import AuthLayout from "../Layout/AuthLayout";
import CompanyProfile from "../Components/CompanyProfile";
import { ProtectedRoute } from "../Components/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <AuthLayout pageTitle={"Create Company"} activeTitle="/create-company">
        <CompanyProfile />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default page;
