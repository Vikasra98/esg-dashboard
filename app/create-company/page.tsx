import React from "react";
import AuthLayout from "../Layout/AuthLayout";
import CompanyProfile from "../Components/CompanyProfile";
import DataInputFlowForm from "../Components/DataInputFlowForm";
import VerificationCompleted from "../Components/VerificationCompleted";

const page = () => {
  return (
    <>
      <AuthLayout pageTitle={"Create Company"} activeTitle="/create-company">
        {/* <CompanyProfile /> */}
        <VerificationCompleted />
        {/* <CompanyDashboard /> */}
      </AuthLayout>
    </>
  );
};

export default page;
