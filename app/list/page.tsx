"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Pagination from "../Components/Pagination";
import AuthLayout from "../Layout/AuthLayout";
import { FaCalendar, FaCheckSquare, FaUser } from "react-icons/fa";
import {
  MdBalance,
  MdIndeterminateCheckBox,
  MdLeaderboard,
  MdOutlineApartment,
  MdVerified,
} from "react-icons/md";
import { PiMapPinLineFill } from "react-icons/pi";
import { HiMiniPencil } from "react-icons/hi2";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";

const companies = [
  {
    order: 1,
    name: "EcoSolutions Inc.",
    sector: "Energy",
    country: "Germany",
    status: "Verified",
    score: 80.5,
    verifiedBy: "PwC Germany",
  },
  {
    order: 2,
    name: "GreenHarvest Co.",
    sector: "Materials",
    country: "USA",
    status: "Pending",
    score: 75.2,
    verifiedBy: "KPMG US",
  },
  {
    order: 3,
    name: "AquaPure Global",
    sector: "Utilities (Water)",
    country: "India",
    status: "Verified",
    score: 68.2,
    verifiedBy: "Bureau Veritas",
  },
  {
    order: 4,
    name: "RenewGen Power Ltd.",
    sector: "Energy (Renewables)",
    country: "UK",
    status: "Active",
    score: 86.5,
    verifiedBy: "EY UK",
  },
  {
    order: 5,
    name: "MediLife Pharma Corp.",
    sector: "Healthcare/Pharma",
    country: "Switzerland",
    status: "Verified",
    score: 80.2,
    verifiedBy: "Deloitte CH",
  },
  {
    order: 6,
    name: "AgriNext Foods",
    sector: "Consumer Staples",
    country: "Brazil",
    status: "Pending",
    score: 78.4,
    verifiedBy: "KPMG Brazil",
  },
  {
    order: 7,
    name: "NeonTech Systems",
    sector: "Information Technology",
    country: "Finland",
    status: "Verified",
    score: 92.3,
    verifiedBy: "PwC Finland",
  },
  {
    order: 8,
    name: "UrbanInfra Builders",
    sector: "Industrial/Construction",
    country: "UAE",
    status: "Verified",
    score: 84.1,
    verifiedBy: "EY MENA",
  },
  {
    order: 9,
    name: "OceanHarvest Shipping",
    sector: "Transportation",
    country: "Singapore",
    status: "Verified",
    score: 81.7,
    verifiedBy: "SGS Singapore",
  },
  {
    order: 10,
    name: "BlueEarth Financials",
    sector: "Financials",
    country: "Canada",
    status: "Verified",
    score: 88.9,
    verifiedBy: "Deloitte Canada",
  },
];

export default function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([1, 2]); // example: first 2 selected

  const toggleSelect = (order: number) => {
    setSelected((prev) =>
      prev.includes(order)
        ? prev.filter((id) => id !== order)
        : [...prev, order]
    );
  };

  return (
    <AuthLayout pageTitle={"List of All"} activeTitle="/list">
      <main className="min-h-screen bg-[#123D2A] text-white rounded-xl border border-[#416455]">
        <div className="flex justify-between items-center px-[30px] pb-[22px] pt-[32px]">
          <p className="text-xl font-semibold">List of All</p>
          <div className="flex space-x-3 items-center">
            <p className="text-sm leading-3.5">
              <span className="text-[#D7A992]">1-10 </span>of 256
            </p>
            <select className="bg-[#416455] px-3 py-2 text-sm rounded-lg border border-[#3B544A]">
              <FaCalendar className="w-2.5 h-2.5 text-white" />
              <option>Jan 2025</option>
            </select>
            <button className="bg-[#D99A70] hover:bg-[#FF6932] px-4 py-2 text-[10px] rounded-lg font-medium flex items-center gap-1.5">
              <MdBalance className="h-3 w-3" />
              Compare Data
            </button>
            <button className="bg-[#D99A70] hover:bg-[#FBBF24] px-4 py-2 text-[10px] rounded-lg font-medium text-white">
              Add New
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse ">
            <thead>
              <tr className="text-[#FFFFFF]">
                <th className=" py-3 ps-[27px]">
                  <div className="flex items-center gap-1.5">
                    <span>
                      <MdIndeterminateCheckBox className="text-[#D99A70] h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold">Order</span>
                  </div>
                </th>
                <th className=" py-3">
                  <div className="flex items-center gap-1.5">
                    <span>
                      <FaUser className="text-[#D99A70] h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold">
                      Company Name
                    </span>
                  </div>
                </th>
                <th className=" py-3">
                  <div className="flex items-center gap-1.5">
                    <span>
                      <MdOutlineApartment className="text-[#D99A70] h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold">Sector</span>
                  </div>
                </th>
                <th className=" py-3">
                  <div className="flex items-center gap-1.5">
                    <span>
                      <PiMapPinLineFill className="text-[#D99A70] h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold">Country</span>
                  </div>
                </th>
                <th className=" py-3">
                  <div className="flex items-center gap-1.5">
                    <span>
                      <FaCheckSquare className="text-[#D99A70] h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold">Status</span>
                  </div>
                </th>
                <th className=" py-3">
                  <div className="flex items-center gap-1.5">
                    <span>
                      <MdLeaderboard className="text-[#D99A70] h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold">Bud Score</span>
                  </div>
                </th>
                <th className="pr-[27px] py-3">
                  <div className="flex items-center gap-1.5">
                    <span>
                      <MdVerified className="text-[#D99A70] h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold">
                      Last Verified By
                    </span>
                  </div>
                </th>
                <th className=" py-3"></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-6 table_row_bg"
                >
                  <td className="text-[10px] leading-3.5 font-medium py-6 ps-[27px] flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(c.order)}
                      onChange={() => toggleSelect(c.order)}
                      className="w-4 h-4 accent-orange-500 rounded text-white border-white bg-transparent"
                    />
                    {c.order}
                  </td>
                  <td className="text-[10px] leading-3.5 font-medium py-6">
                    {c.name}
                  </td>
                  <td className="text-[10px] leading-3.5 font-medium py-6">
                    {c.sector}
                  </td>
                  <td className="text-[10px] leading-3.5 font-medium py-6">
                    {c.country}
                  </td>
                  <td className="text-[10px] leading-3.5 font-medium py-6">
                    <span
                      className={`px-1.5 ps-[13px] py-0.5 rounded text-[10px] border leading-3.5 font-medium relative after:absolute after:h-[3px] after:w-[3px] after:rounded-full  after:left-1.5 after:top-[calc(50%-1.5px)] ${
                        c.status === "Verified"
                          ? "bg-[#05C16833] text-[#F5F5F3] after:bg-[#05C168] border-[#05C16833]"
                          : c.status === "Pending"
                          ? "bg-yellow-500/20 text-[#FDB52A] after:bg-[#FDB52A] border-[#FFB01633]"
                          : "bg-[#00C2FF33] text-[#00C2FF] after:bg-[#00C2FF] border-[#00C2FF33]"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="text-[10px] leading-3.5 font-medium py-6">
                    {c.score}
                  </td>
                  <td className="text-[10px] leading-3.5 font-medium py-6">
                    {c.verifiedBy}
                  </td>
                  <td className="text-[10px] leading-3.5 font-medium space-x-2 py-6 pr-[27px]">
                    <button className="text-[#D99A70] cursor-pointer">
                      <HiMiniPencil className="h-3 w-3" />
                    </button>
                    <button className="text-[#D99A70] cursor-pointer">
                      <RiDeleteBin7Fill className="h-3 w-3" />
                    </button>
                    <button className="text-[#D99A70] cursor-pointer">
                      <IoMdEye className="h-3 w-3" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={8}
          onPageChange={setCurrentPage}
        />
      </main>
    </AuthLayout>
  );
}
