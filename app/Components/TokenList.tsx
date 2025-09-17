"use client";

import React, { useState } from "react";
import AuthLayout from "../Layout/AuthLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { FaCalendar, FaCheckSquare, FaUser } from "react-icons/fa";
import {
  MdBalance,
  MdIndeterminateCheckBox,
  MdLeaderboard,
  MdOutlineApartment,
  MdVerified,
} from "react-icons/md";
import { PiMapPinLineFill } from "react-icons/pi";
import { motion } from "framer-motion";
import Pagination from "./Pagination";

const TokenList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);
  return (
    // <ProtectedRoute>
    //   <AuthLayout pageTitle={"List of All"} activeTitle="/list">
    <main className="min-h-screen bg-[#123D2A] text-white rounded-xl border border-[#416455]">
      {/* <div className="flex justify-between items-center px-[30px] pb-[22px] pt-[32px]">
              <p className="text-xl font-semibold">List of All</p>
              <div className="flex space-x-3 items-center">
                <p className="text-sm leading-3.5">
                  <span className="text-[#D7A992]">
                    {isLoading
                      ? "Loading..."
                      : `${(currentPage - 1) * 20 + 1}-${Math.min(
                          currentPage * 20,
                          totalCount
                        )}`}
                  </span>{" "}
                  of {totalCount}
                </p>
                <select
                  className="bg-[#416455] px-3 py-2 text-sm rounded-lg border border-[#3B544A]"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button className="bg-[#D99A70] hover:bg-[#FF6932] px-4 py-2 text-[10px] rounded-lg font-medium flex items-center gap-1.5">
                  <MdBalance className="h-3 w-3" />
                  Compare Data
                </button>
                <button
                  onClick={handleAddNew}
                  className="bg-[#D99A70] hover:bg-[#FBBF24] px-4 py-2 text-[10px] rounded-lg font-medium text-white transition-colors cursor-pointer"
                >
                  Add New
                </button>
              </div>
            </div> */}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-[30px]">
          {error}
        </div>
      )}

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
                  <span className="text-[10px] font-semibold">
                    BUDS Token ID
                  </span>
                </div>
              </th>
              <th className=" py-3">
                <div className="flex items-center gap-1.5">
                  <span>
                    <FaUser className="text-[#D99A70] h-2.5 w-2.5" />
                  </span>
                  <span className="text-[10px] font-semibold">BUDS Score</span>
                </div>
              </th>
              <th className=" py-3">
                <div className="flex items-center gap-1.5">
                  <span>
                    <MdOutlineApartment className="text-[#D99A70] h-2.5 w-2.5" />
                  </span>
                  <span className="text-[10px] font-semibold">
                    Arc Position
                  </span>
                </div>
              </th>
              <th className=" py-3">
                <div className="flex items-center gap-1.5">
                  <span>
                    <PiMapPinLineFill className="text-[#D99A70] h-2.5 w-2.5" />
                  </span>
                  <span className="text-[10px] font-semibold">
                    Matrix Effect
                  </span>
                </div>
              </th>
              <th className=" py-3">
                <div className="flex items-center gap-1.5">
                  <span>
                    <FaCheckSquare className="text-[#D99A70] h-2.5 w-2.5" />
                  </span>
                  <span className="text-[10px] font-semibold">Timestamp</span>
                </div>
              </th>
              <th className=" py-3">
                <div className="flex items-center gap-1.5">
                  <span>
                    <MdLeaderboard className="text-[#D99A70] h-2.5 w-2.5" />
                  </span>
                  <span className="text-[10px] font-semibold">
                    Verifier Attribution
                  </span>
                </div>
              </th>
              <th className="pr-[27px] py-3">
                <div className="flex items-center gap-1.5">
                  <span>
                    <MdVerified className="text-[#D99A70] h-2.5 w-2.5" />
                  </span>
                  <span className="text-[10px] font-semibold">Doc Link</span>
                </div>
              </th>
              {/* <th className=" py-3"></th> */}
            </tr>
          </thead>
          <tbody>
            {/* {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-[#D7A992]">
                  Loading companies...
                </td>
              </tr>
            ) : companies.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-[#D7A992]">
                  No companies found
                </td>
              </tr>
            ) : ( */}
            {companies.map((company, i) => (
              <motion.tr
                key={company.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="py-6 table_row_bg"
              >
                <td className="text-[10px] leading-3.5 font-medium py-6 ps-[27px] flex items-center gap-2">
                  {/* <input
                            type="checkbox"
                            checked={selected.includes(company.id)}
                            onChange={() => toggleSelect(company.id)}
                            className="w-4 h-4 accent-orange-500 rounded text-white border-white bg-transparent"
                          /> */}
                  {company.id}
                </td>
                <td
                  className="text-[10px] leading-3.5 font-medium py-6 cursor-pointer"
                  //   onClick={() => setIsDashboard(true)}
                >
                  {company.name}
                </td>
                <td className="text-[10px] leading-3.5 font-medium py-6">
                  {company.sector}
                </td>
                <td className="text-[10px] leading-3.5 font-medium py-6">
                  {company.country}
                </td>
                <td className="text-[10px] leading-3.5 font-medium py-6">
                  <span
                    className={`px-1.5 ps-[13px] py-0.5 rounded text-[10px] border leading-3.5 font-medium relative after:absolute after:h-[3px] after:w-[3px] after:rounded-full  after:left-1.5 after:top-[calc(50%-1.5px)] ${
                      company.status === "Verified"
                        ? "bg-[#05C16833] text-[#F5F5F3] after:bg-[#05C168] border-[#05C16833]"
                        : company.status === "Pending"
                        ? "bg-yellow-500/20 text-[#FDB52A] after:bg-[#FDB52A] border-[#FFB01633]"
                        : company.status === "Active"
                        ? "bg-[#00C2FF33] text-[#00C2FF] after:bg-[#00C2FF] border-[#00C2FF33]"
                        : "bg-red-500/20 text-red-400 after:bg-red-400 border-red-500/20"
                    }`}
                  >
                    {company.status}
                  </span>
                </td>
                <td className="text-[10px] leading-3.5 font-medium py-6">
                  {company.contact_email}
                </td>
                <td className="text-[10px] leading-3.5 font-medium py-6">
                  {company.contact_name}
                </td>
                {/* <td className="text-[10px] leading-3.5 font-medium space-x-2 py-6 pr-[27px]">
                          <button
                            className="text-[#D99A70] cursor-pointer"
                            onClick={() => setIsEdit(true)}
                          >
                            <HiMiniPencil className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(company)}
                            className="text-[#D99A70] cursor-pointer"
                          >
                            <RiDeleteBin7Fill className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => setIsDashboard(true)}
                            className="text-[#D99A70] cursor-pointer"
                          >
                            <IoMdEye className="h-3 w-3" />
                          </button>
                        </td> */}
              </motion.tr>
              //   ))
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
    //   </AuthLayout>
    // </ProtectedRoute>
  );
};

export default TokenList;
