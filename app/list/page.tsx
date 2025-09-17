"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Pagination from "../Components/Pagination";
import AuthLayout from "../Layout/AuthLayout";
import { ProtectedRoute } from "../Components/ProtectedRoute";
import { companyApi } from "../helper/api";
import { Company } from "../types/api";
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
import DeleteCompanyModal from "../Components/DeleteCompanyModal";
import CompanyDashboard from "../Components/CompanyDashboard";
import UpdateDataFlowModal from "../Components/UpdateDataFlowModal";
import TokenList from "../Components/TokenList";
import { Eye } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function page() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    "Active" | "Pending" | "Verified" | "Rejected" | ""
  >("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  // Fetch companies on component mount and when filters change
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const params = {
          status: statusFilter || undefined,
          skip: (currentPage - 1) * 20,
          limit: 20,
        };

        const response = await companyApi.getAll(params);

        // Handle different response structures
        if (Array.isArray(response)) {
          // If response is directly an array
          setCompanies(response);
          setTotalCount(response.length);
          setTotalPages(Math.ceil(response.length / 20));
        } else if (response.data && Array.isArray(response.data)) {
          // If response has data property
          setCompanies(response.data);
          const total =
            response.meta?.pagination?.total || response.data.length;
          const pageSize = response.meta?.pagination?.pageSize || 20;
          setTotalCount(total);
          setTotalPages(Math.ceil(total / pageSize));
        } else {
          // Fallback
          setCompanies([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch companies");
        console.error("Error fetching companies:", err);
        setCompanies([]);
        setTotalCount(0);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage, statusFilter]);

  const toggleSelect = (companyId: number) => {
    setSelected((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleDeleteClick = (company: Company) => {
    setCompanyToDelete(company);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!companyToDelete) return;

    setIsDeleting(true);
    try {
      await companyApi.delete(companyToDelete.id);

      // Remove the deleted company from the list
      setCompanies((prev) =>
        prev.filter((company) => company.id !== companyToDelete.id)
      );
      setTotalCount((prev) => prev - 1);

      // Close modal and reset state
      setDeleteModalOpen(false);
      setCompanyToDelete(null);

      // Show success message (optional)
      console.log("Company deleted successfully");
    } catch (error: any) {
      setError(error.message || "Failed to delete company");
      console.error("Error deleting company:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setCompanyToDelete(null);
  };

  const handleAddNew = () => {
    router.push("/create-company");
  };

  return (
    <ProtectedRoute>
      {isToken ? (
        <AuthLayout pageTitle={"Token List"} activeTitle="/dashboard">
          <TokenList companyId={selectedCompanyId} />
        </AuthLayout>
      ) : isDashboard ? (
        <AuthLayout pageTitle={"ESG Dashboard"} activeTitle="/list">
          <CompanyDashboard />
        </AuthLayout>
      ) : (
        <AuthLayout pageTitle={"List of All"} activeTitle="/list">
          <main className="min-h-screen bg-[#123D2A] text-white rounded-xl border border-[#416455]">
            <div className="flex justify-between items-center px-[30px] pb-[22px] pt-[32px]">
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
            </div>

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
                        <span className="text-[10px] font-semibold">ID</span>
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
                        <span className="text-[10px] font-semibold">
                          Sector
                        </span>
                      </div>
                    </th>
                    <th className=" py-3">
                      <div className="flex items-center gap-1.5">
                        <span>
                          <PiMapPinLineFill className="text-[#D99A70] h-2.5 w-2.5" />
                        </span>
                        <span className="text-[10px] font-semibold">
                          Country
                        </span>
                      </div>
                    </th>
                    <th className=" py-3">
                      <div className="flex items-center gap-1.5">
                        <span>
                          <FaCheckSquare className="text-[#D99A70] h-2.5 w-2.5" />
                        </span>
                        <span className="text-[10px] font-semibold">
                          Status
                        </span>
                      </div>
                    </th>
                    <th className=" py-3">
                      <div className="flex items-center gap-1.5">
                        <span>
                          <MdLeaderboard className="text-[#D99A70] h-2.5 w-2.5" />
                        </span>
                        <span className="text-[10px] font-semibold">
                          Contact Email
                        </span>
                      </div>
                    </th>
                    <th className="pr-[27px] py-3">
                      <div className="flex items-center gap-1.5">
                        <span>
                          <MdVerified className="text-[#D99A70] h-2.5 w-2.5" />
                        </span>
                        <span className="text-[10px] font-semibold">
                          Contact Person
                        </span>
                      </div>
                    </th>
                    <th className="p-3 text-left">View Tokens</th>
                    <th className=" py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-8 text-[#D7A992]"
                      >
                        Loading companies...
                      </td>
                    </tr>
                  ) : companies.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-8 text-[#D7A992]"
                      >
                        No companies found
                      </td>
                    </tr>
                  ) : (
                    companies.map((company, i) => (
                      <motion.tr
                        key={company.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="py-6 table_row_bg"
                      >
                        <td className="text-[10px] leading-3.5 font-medium py-6 ps-[27px] flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selected.includes(company.id)}
                            onChange={() => toggleSelect(company.id)}
                            className="w-4 h-4 accent-orange-500 rounded text-white border-white bg-transparent"
                          />
                          {company.id}
                        </td>
                        <td
                          className="text-[10px] leading-3.5 font-medium py-6 cursor-pointer"
                          onClick={() => setIsDashboard(true)}
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
                        <td className="p-3 py-6">
                          <button
                            onClick={() => {
                              setIsToken(true),
                                setSelectedCompanyId(company.id);
                            }}
                            className="text-[#D99A70] hover:text-orange-400 cursor-pointer flex items-center"
                          >
                            <Eye size={16} /> <span className="ms-2">View</span>
                          </button>
                        </td>
                        <td className="text-[10px] leading-3.5 font-medium space-x-2 py-6 pr-[27px]">
                          <button
                            className="text-[#D99A70] cursor-pointer"
                            onClick={() => setIsEdit(true)}
                            data-tooltip-id="Edit_Company"
                            data-tooltip-content="Edit Company"
                          >
                            <HiMiniPencil className="h-3 w-3" />
                          </button>
                          <Tooltip id="Edit_Company" />
                          <button
                            data-tooltip-id="Delete_Company"
                            data-tooltip-content="Delete Company"
                            onClick={() => handleDeleteClick(company)}
                            className="text-[#D99A70] cursor-pointer"
                          >
                            <RiDeleteBin7Fill className="h-3 w-3" />
                          </button>
                          <Tooltip id="Delete_Company" />
                          <button
                            data-tooltip-id="View_Company_Company"
                            data-tooltip-content="View Company Company"
                            onClick={() => setIsDashboard(true)}
                            className="text-[#D99A70] cursor-pointer"
                          >
                            <IoMdEye className="h-3 w-3" />
                          </button>
                          <Tooltip id="View_Company_Company" />
                        </td>
                      </motion.tr>
                    ))
                  )}
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
          {/* {deleteModalOpen && (
            <DeleteCompanyModal
              open={open}
              setOpen={setOpen}
              handleDeleteCancel={handleDeleteCancel}
              handleDeleteConfirm={handleDeleteConfirm}
            />
          )} */}
          <UpdateDataFlowModal isEdit={isEdit} setIsEdit={setIsEdit} />

          {/* Delete Confirmation Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Delete Company
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete{" "}
                  <strong>{companyToDelete?.name}</strong>? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleDeleteCancel}
                    disabled={isDeleting}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center cursor-pointer"
                  >
                    {isDeleting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </AuthLayout>
      )}
    </ProtectedRoute>
  );
}
