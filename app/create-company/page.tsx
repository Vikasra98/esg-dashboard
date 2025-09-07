import React from "react";
import AuthLayout from "../Layout/AuthLayout";
import CompanyProfile from "../Components/CompanyProfile";
import DataInputFlowForm from "../Components/DataInputFlowForm";

const page = () => {
  return (
    <>
      <AuthLayout pageTitle={"Create Company"} activeTitle="/create-company">
        <CompanyProfile />
      </AuthLayout>
    </>
  );
};

export default page;
