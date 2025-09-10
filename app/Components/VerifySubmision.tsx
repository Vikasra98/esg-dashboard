"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import VerificationCompleted from "./VerificationCompleted";

const VerifySubmision = () => {
  const [isVerify, setIsVerify] = useState(false);
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
                  className="w-full lg:w-[521px] bg-[#12291E] text-[#F5F5F3] py-[18px] px-[30px] rounded-md hover:bg-green-800 transition text-2xl font-[600] cursor-pointer"
                  onClick={() => setIsVerify(true)}
                >
                  Submit for Verification
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
