// components/RecentVerification.tsx
"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useState } from "react";

const companies = [
  {
    order: 1,
    name: "EcoSolutions Inc.",
    sector: "Energy",
    country: "Germany",
    status: "Verified",
    budScore: 80.5,
    verifiedBy: "PwC Germany",
  },
  {
    order: 2,
    name: "GreenHermet Co.",
    sector: "Materials",
    country: "USA",
    status: "Pending",
    budScore: 75.2,
    verifiedBy: "KPMG US",
  },
  {
    order: 3,
    name: "AquaPure Global",
    sector: "Utilities (Water)",
    country: "India",
    status: "Verified",
    budScore: 68.2,
    verifiedBy: "Bureau Veritas",
  },
  {
    order: 4,
    name: "RenewGen Power Ltd.",
    sector: "Energy (Renewables)",
    country: "UK",
    status: "Active",
    budScore: 86.5,
    verifiedBy: "EY UK",
  },
  {
    order: 5,
    name: "MediLife Pharma Corp.",
    sector: "Healthcare/Pharma",
    country: "Switzerland",
    status: "Verified",
    budScore: 90.2,
    verifiedBy: "Deloitte CH",
  },
];

const statusColors: Record<string, string> = {
  Verified: "bg-green-600/20 text-green-400",
  Pending: "bg-yellow-600/20 text-yellow-400",
  Active: "bg-blue-600/20 text-blue-400",
};

export default function RecentVerification() {
  const [selected, setSelected] = useState<number[]>([1, 2]); // example: first 2 selected

  const toggleSelect = (order: number) => {
    setSelected((prev) =>
      prev.includes(order)
        ? prev.filter((id) => id !== order)
        : [...prev, order]
    );
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
        <h2 className="text-lg font-semibold text-white">
          Recent Verification
        </h2>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">1 - 10 of 256</span>
          <button className="bg-[#1E3A2D] px-3 py-1 rounded-lg text-gray-300">
            Jan 2025
          </button>
          <button className="bg-[#FF7E4D] px-3 py-1 rounded-lg text-white">
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Company Name</th>
              <th className="p-3 text-left">Sector</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Bud Score</th>
              <th className="p-3 text-left">Last Verified By</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c, i) => (
              <motion.tr
                key={c.order}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-t border-[#1A3A2E] hover:bg-[#163728] transition table_row_bg"
              >
                {/* Order + Checkbox */}
                <td className="p-3 py-6 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(c.order)}
                    onChange={() => toggleSelect(c.order)}
                    className="w-4 h-4 accent-orange-500 rounded border-gray-600 bg-transparent"
                  />
                  <span>{c.order}</span>
                </td>

                <td className="p-3 py-6">{c.name}</td>
                <td className="p-3 py-6">{c.sector}</td>
                <td className="p-3 py-6">{c.country}</td>
                <td className="p-3 py-6">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      statusColors[c.status]
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3 py-6">{c.budScore}</td>
                <td className="p-3 py-6">{c.verifiedBy}</td>

                {/* Actions */}
                <td className="p-3 py-6 flex gap-3">
                  <button className="text-gray-400 hover:text-orange-400">
                    <Pencil size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <Eye size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
