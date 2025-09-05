import React, { ReactNode } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

interface IProps {
  children: ReactNode;
  pageTitle: string;
  activeTitle: string;
}

const AuthLayout = (props: IProps) => {
  const { children, pageTitle, activeTitle } = props;
  return (
    <>
      <div className="flex h-screen dashboard_gradient text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Topbar pageTitle={pageTitle} />
          <main className="lg:px-[60px] p-6 space-y-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
