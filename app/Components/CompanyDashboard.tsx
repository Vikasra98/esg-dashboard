"use client";

import React, { useState } from "react";
import CompanyStatCard from "./CompanyStatCard";
import DonutChart from "./DonutChart";
import TokenScore from "./TokenScore";
import ProjectsCard from "./ProjectsCard";
import RecentSubmissionTable from "./RecentSubmissionTable";
import CompanyLineChart from "./CompanyLineChart";
import Image from "next/image";

const CompanyDashboard = () => {
  const [selectedRange, setSelectedRange] = useState([0, 12]);
  const filterOptions = [
    { label: "Jan 2024 - Dec 2024", range: [0, 12] },
    { label: "Jan 2024 - Jun 2024", range: [0, 6] },
    { label: "Jul 2024 - Dec 2024", range: [6, 12] },
  ];
  return (
    <>
      <div className="flex items-center justify-end w-full mb-[34px]">
        <div className="flex items-center gap-[39px] w-full">
          <h3 className="text-[28px] leading-[38px] font-bold text-[#F5F5F3] text-nowrap w-auto">
            Company A{" "}
          </h3>
          <Image alt="pencil" src={"/icon/pencil.png"} height={27} width={27} />
        </div>
        <div className="w-full flex gap-3 items-center justify-end">
          <p className="text-[14px] font-medium">Reporting Period</p>
          <p className="text-base font-bold">FY 2024-25 Q1</p>
          <div className="flex justify-end relative">
            <select
              value={selectedRange.join(",")}
              onChange={(e) =>
                setSelectedRange(e.target.value.split(",").map(Number))
              }
              className="bg-[#123D2A] text-white text-sm p-1.5 rounded-md cursor-pointer border border-[#416455] focus:outline-0"
            >
              {filterOptions.map((opt) => (
                <option
                  key={opt.label}
                  value={opt.range.join(",")}
                  className="bg-[#071A14] text-white"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <main className="min-h-screen text-white font-sans">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px] mb-10">
          <CompanyStatCard
            src="/icon/save_world.png"
            title="Environmental"
            subtitle="Carbon Emissions"
            value="800kt"
            percentageLeft={58}
            percentageRight={42}
            color="linear-gradient(0deg, #548DA2 38.94%, #75C0E2 100%)"
          />
          <CompanyStatCard
            src="/icon/social.png"
            title="Social"
            subtitle="Employee Diversity"
            value="48%"
            percentageLeft={58}
            percentageRight={42}
            color="linear-gradient(90deg, #493B99 0%, #AE62FF 100%);"
          />
          <CompanyStatCard
            src="/icon/social.png"
            title="Governance"
            subtitle="Board Diversity"
            value="40%"
            percentageLeft={60}
            percentageRight={40}
            color="linear-gradient(90deg, #E54141 0%, #FF6767 100%)"
          />
        </div>

        {/* ESG Breakdown */}
        <h2 className="lg:text-[28px] text-xl lg:leading-[38px] font-bold mb-4">
          ESG Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px] lg:mb-10 mb-8">
          <DonutChart />
          <CompanyLineChart />
          <TokenScore />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
          <ProjectsCard />
          <RecentSubmissionTable />
        </div>
      </main>
    </>
  );
};

export default CompanyDashboard;
