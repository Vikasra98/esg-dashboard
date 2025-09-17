// components/RecentVerification.tsx
"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { companyApi } from "../helper/api";
import { Company } from "../types/api";

const statusColors: Record<string, string> = {
  Verified: "bg-green-600/20 text-green-400",
  Pending: "bg-yellow-600/20 text-yellow-400",
  Active: "bg-blue-600/20 text-blue-400",
  Rejected: "bg-red-600/20 text-red-400",
};

interface IProps {
  setIsToken?: any;
  setIsDashboard?: any;
  setIsEdit?: any;
  setSelectedCompanyId?: any;
  selectedCompanyId?: any;
}

export default function RecentVerification(props: IProps) {
  const {
    setIsToken,
    setIsDashboard,
    setIsEdit,
    setSelectedCompanyId,
    selectedCompanyId,
  } = props;
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await companyApi.getAll({
          limit: 10, // Show only 10 recent companies on dashboard
        });

        // Handle different response structures
        if (Array.isArray(response)) {
          // If response is directly an array
          setCompanies(response);
          setTotalCount(response.length);
        } else if (response.data && Array.isArray(response.data)) {
          // If response has data property
          setCompanies(response.data);
          setTotalCount(
            response.meta?.pagination?.total || response.data.length
          );
        } else {
          // Fallback
          setCompanies([]);
          setTotalCount(0);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch companies");
        console.error("Error fetching companies:", err);
        setCompanies([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#123D2A] p-6 rounded-[10px] border border-[#416455] mt-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Recent Companies</h2>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">
            {isLoading
              ? "Loading..."
              : `1 - ${Math.min(10, companies.length)} of ${totalCount}`}
          </span>
          <button className="bg-[#1E3A2D] px-3 py-1 rounded-lg text-gray-300">
            Jan 2025
          </button>
          <button
            onClick={handleAddNew}
            className="bg-[#FF7E4D] px-3 py-1 rounded-lg text-white hover:bg-[#FF6B3D] transition-colors cursor-pointer"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3 text-left">Company ID</th>
              <th className="p-3 text-left">Company Name</th>
              <th className="p-3 text-left">Sector</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Contact Email</th>
              <th className="p-3 text-left">Contact Person</th>
              <th className="p-3 text-left">View Tokens</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  Loading companies...
                </td>
              </tr>
            ) : companies.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  No companies found
                </td>
              </tr>
            ) : (
              companies.map((company, i) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t border-[#1A3A2E] hover:bg-[#163728] transition table_row_bg"
                >
                  {/* ID + Checkbox */}
                  <td className="p-3 py-6 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(company.id)}
                      onChange={() => toggleSelect(company.id)}
                      className="w-4 h-4 accent-orange-500 rounded text-white border-white bg-transparent"
                    />
                    <span>{company.id}</span>
                  </td>

                  <td className="p-3 py-6">{company.name}</td>
                  <td className="p-3 py-6">{company.sector}</td>
                  <td className="p-3 py-6">{company.country}</td>
                  <td className="p-3 py-6">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        statusColors[company.status] ||
                        "bg-gray-600/20 text-gray-400"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="p-3 py-6">{company.contact_email}</td>
                  <td className="p-3 py-6">{company.contact_name}</td>
                  <td className="p-3 py-6">
                    <button
                      onClick={() => setIsToken(true)}
                      className="text-[#D99A70] hover:text-orange-400 cursor-pointer flex items-center"
                    >
                      <Eye size={16} /> <span className="ms-2">View</span>
                    </button>
                  </td>
                  {/* <td className="p-3 py-6 flex gap-3">
                    <button
                      onClick={() => setIsEdit(true)}
                      className="text-[#D99A70] hover:text-orange-400 cursor-pointer"
                    >
                      <Eye size={16} />
                    </button>
                  </td> */}
                  {/* Actions */}
                  <td className="p-3 py-6 flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedCompanyId(company.id); // ✅ store ID
                        setIsEdit(true);
                      }}
                      className="text-[#D99A70] hover:text-orange-400 cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(company)}
                      className="text-[#D99A70] hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => setIsDashboard(true)}
                      className="text-[#D99A70] hover:text-white cursor-pointer"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Company
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{companyToDelete?.name}</strong>? This action cannot be
              undone.
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
    </motion.div>
  );
}
