"use client";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full py-4 px-6">
      <span className="text-sm text-[#F5F5F3]">
        {`${(currentPage - 1) * 10 + 1} - ${Math.min(
          currentPage * 10,
          totalPages * 10
        )} of ${totalPages * 10}`}
      </span>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-[#F5F5F3]">Rows per page:</span>
        <select className="bg-[#123D2A] text-white px-2 py-1 rounded-md border border-[#416455] text-sm">
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2 py-1 text-sm text-[#B5B5AA] hover:text-white disabled:opacity-40"
        >
          ←
        </button>

        {/* {pages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === page
                ? "bg-[#1F3C35] text-white"
                : "text-[#B5B5AA] hover:text-white"
            }`}
          >
            {page}
          </motion.button>
        ))} */}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2 py-1 text-sm text-[#B5B5AA] hover:text-white disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}
