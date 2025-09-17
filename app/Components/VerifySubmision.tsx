"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import VerificationCompleted from "./VerificationCompleted";
import { submitFieldId } from "../helper/api";

const VerifySubmision = () => {
  const [isVerify, setIsVerify] = useState(false);
  const [fieldData, setFieldData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  console.log(fieldData);

  useEffect(() => {
    if (typeof window != undefined) {
      const idField = localStorage.getItem("fieldId");
      setFieldData(idField);
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const field = localStorage.getItem("fieldId") || "COM-DEFAULT";
      const payload: any = {
        field_id: fieldData,
      };

      console.log("Submitting payload:", payload);
      await submitFieldId(payload);

      setIsVerify(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to submit:", err);
      alert("Failed to submit data. Check console for details.");
      setIsLoading(false);
    }
  };
  return (
    <>
      {!isVerify ? (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="bg-[#F5F5F3] px-[26px] py-[50px] rounded-[10px] h-full lg:max-w-[902px]"
            style={{ boxShadow: "0px 4px 20px 0px #00000012" }}
          >
            <div className="w-full flex items-center flex-col">
              <h2 className="lg:text-[36px] leading-[46px] text-2xl font-bold text-[#1C1C1E] lg:mb-[40px] mb-4 text-center">
                Company Profile
              </h2>
              <p className="lg:text-2xl text-lg lg:leading-8 lg:mb-[40px] mb-4 text-black">
                Click below to simulate a successful verification and see the
                results.
              </p>
              <div className="w-full flex justify-center items-center">
                <button
                  type="button"
                  disabled={isLoading}
                  className={`w-full lg:w-[521px] py-[18px] px-[30px] rounded-md transition text-2xl font-[600] cursor-pointer ${
                    isLoading
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-[#12291E] text-[#F5F5F3] hover:bg-green-800"
                  }`}
                  onClick={handleSave}
                >
                  {isLoading ? "Submitting..." : "Submit for Verification"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <VerificationCompleted />
      )}
    </>
  );
};

export default VerifySubmision;
