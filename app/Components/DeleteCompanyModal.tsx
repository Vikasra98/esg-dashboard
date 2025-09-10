"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface IProps {
  open: boolean;
  setOpen: any;
}

export default function DeleteCompanyModal(props: IProps) {
  const { open, setOpen } = props;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-white rounded-[10px] shadow-lg max-w-3xl w-full mx-4 p-8 lg:px-[70px] lg:py-10 text-center"
          >
            {/* Title */}
            <h2 className="text-[36px] leading-[46px] font-bold text-[#1C1C1E] lg:mb-[30px] mb-4">
              Delete Company Profile?
            </h2>

            {/* Description */}
            <p className="text-[16px] leading-[26px] text-[#1C1C1E] mb-[30px]">
              Are you sure you want to delete <span>Company A</span>?<br />
              This action cannot be undone. All verification history, ESG data,
              and associated records will be permanently removed.
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-around gap-4">
              <button
                onClick={() => setOpen(false)}
                className="px-8 lg:px-20 py-4 rounded-[10px] text-white font-semibold text-[16px] bg-[#D80000] hover:bg-[#b71c1c] transition cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-8 lg:px-20 py-4 rounded-[10px] text-white font-semibold text-[16px] bg-[#12291E] hover:bg-[#0d2b23] transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
