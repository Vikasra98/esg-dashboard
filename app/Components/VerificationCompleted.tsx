"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import MatrixBarChart from "./MatrixBarChart";
import ArcCurveChart from "./ArcCurveChart";

const steps = ["Environment", "Social", "Governance"];

const VerificationCompleted = () => {
  const [step, setStep] = useState(0);

  const tokenInfo: any = [
    {
      id: 1,
      src: "/icon/token.png",
      title: "BUDS Token ID",
      value: "BUDS-ENV-000123",
    },
    {
      id: 1,
      src: "/icon/verifier.png",
      title: "Verifier Attribution",
      value: "Purnima Sharma",
    },
    {
      id: 1,
      src: "/icon/timestamp.png",
      title: "Timestamp",
      value: "August 29, 2025 at 7:14 PM",
    },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="bg-[#081A12] px-[26px] py-[50px] rounded-[10px] h-full"
          style={{ boxShadow: "0px 4px 20px 0px #00000012" }}
        >
          <div className="w-full flex items-center flex-col">
            <Image
              className="mb-6"
              src={"/icon/check_green.png"}
              alt="check"
              height={63}
              width={63}
            />
            <h2 className="lg:text-[36px] leading-[46px] text-2xl font-bold text-[#F5F5F3] lg:mb-[40px] mb-4 text-center">
              Verification Complete!
            </h2>
            <p className="lg:text-2xl text-lg lg:leading-8 lg:mb-[40px] mb-4 text-[#F5F5F3] lg:px-48 text-center">
              Your proof has been successfully verified, tokenized, and anchored
              on-chain.
            </p>

            {/* Tabs */}
            <div className="lg:px-28 px-6 w-full">
              <div className="relative flex border border-[#416455] rounded-lg overflow-hidden lg:mb-[50px] mb-6 p-3 w-full">
                {steps.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className="flex-1 relative py-3.5 px-[30px] transition-colors cursor-pointer"
                  >
                    {/* Text should always be above the motion.div */}
                    <span
                      className={`relative z-10 text-2xl leading-[34px] font-normal font_title ${
                        step === i ? "text-[#F5F5F3]" : "text-[#F5F5F3]"
                      }`}
                    >
                      {label}
                    </span>

                    {step === i && (
                      <motion.div
                        style={{ boxShadow: "0px 2px 2px 0px #0000000D" }}
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-md bg-[#123D2A]"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {tokenInfo.map((item: any, index: any) => (
                <div
                  key={index}
                  className="py-5 px-[52px] border border-[#416455] flex flex-col items-center justify-center rounded-[10px]"
                >
                  <Image
                    src={item.src}
                    alt={item.src}
                    height={70}
                    width={70}
                    className="mb-4"
                  />
                  <h4 className="lg:text-[28px] leading-[38px] font-bold mb-2.5 text-nowrap">
                    {item.title}
                  </h4>
                  <p className="text-xl lead[32px] font-normal text-nowrap">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[26px] bg-[#0A1912] text-white">
            <MatrixBarChart />
            <ArcCurveChart />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default VerificationCompleted;
