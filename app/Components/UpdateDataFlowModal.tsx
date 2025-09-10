"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SelectDropdown from "./SelectDropdown";

interface IProps {
  isEdit: boolean;
  setIsEdit: any;
}

const steps = ["Environment", "Social", "Governance"];

export default function UpdateDataFlowModal(props: IProps) {
  const { isEdit, setIsEdit } = props;
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  console.log(step, "step");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSelectChange = (value: string) => {
    console.log("Selected:", value);
  };

  const policyOptions = [
    { label: "Anti-Bribery", value: "Anti-Bribery" },
    { label: "Anti-Corruption Policy", value: "Anti-Corruption Policy" },
  ];

  const privacyOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  return (
    <AnimatePresence>
      {isEdit && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-white rounded-[10px] shadow-lg max-w-3xl max-h-4/5 overflow-y-auto w-full mx-4 text-center"
          >
            <div
              className="bg-[#F5F5F3] px-[26px] py-[50px] rounded-[10px] lg:max-w-[902px]"
              style={{ boxShadow: "0px 4px 20px 0px #00000012" }}
            >
              <div className="w-full flex items-start flex-col">
                <h2 className="lg:text-[28px] text-2xl font-bold text-[#12291E] lg:mb-[50px] mb-4 text-center">
                  Update Data Flow
                </h2>
              </div>

              {/* Tabs */}
              <div className="relative flex bg-white rounded-lg overflow-hidden lg:mb-[50px] mb-6 p-3">
                {steps.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className="flex-1 relative py-3.5 px-[30px] transition-colors cursor-pointer"
                  >
                    {/* Text should always be above the motion.div */}
                    <span
                      className={`relative z-10 text-2xl leading-[34px] font-normal font_title ${
                        step === i ? "text-white" : "text-[#12291E]"
                      }`}
                    >
                      {label}
                    </span>

                    {step === i && (
                      <motion.div
                        style={{ boxShadow: "0px 2px 2px 0px #0000000D" }}
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#12291E] rounded-md"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                    {step === 0 && (
                      <>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            CO₂ Emissions
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 tons/year"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Scope 1 Emissions
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 tons/year"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Scope 2 Emissions
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 tons/year"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Scope 3 Emissions
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 tons/year"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Water Consumed
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 m³"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            % Recycled Water
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 %"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Total Waste Generated
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 tons"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            % Recycled Waste
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 %"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Energy Consumed
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 kWh"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            % Renewable Energy Used
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 %"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Total Employees
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="Numeric"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            % Women Employees
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 %"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            % Women in Leadership Roles
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 %"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Training Hours per Employee
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="Numeric"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Lost-Time Injury Frequency Rate
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="Liter"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            % of Revenue Spent on CSR/Community Programs
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 %"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Total Board Members
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="Numeric"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            % Independent Directors
                          </label>
                          <input
                            type="number"
                            maxLength={80}
                            placeholder="0 %"
                            className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Anti-Bribery Policy
                          </label>
                          <SelectDropdown
                            options={privacyOptions}
                            placeholder="(Yes/No)"
                            onChange={handleSelectChange}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Data Privacy Policy
                          </label>
                          <SelectDropdown
                            options={privacyOptions}
                            placeholder="(Yes/No)"
                            onChange={handleSelectChange}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            ESG Report Published
                          </label>
                          <SelectDropdown
                            options={privacyOptions}
                            placeholder="(Yes/No)"
                            onChange={handleSelectChange}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-base leading-[26px] text-[#1C1C1E] mb-1.5"
                          >
                            Third-Party Audited
                          </label>
                          <SelectDropdown
                            options={privacyOptions}
                            placeholder="(Yes/No)"
                            onChange={handleSelectChange}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* File Upload */}
              <div className="p-2.5 bg-[#B6C3BD] rounded-[10px] mb-10 lg:mb-[50px]">
                <div className="border border-dashed border-[#B8B8B2] rounded-lg lg:py-10 p-6 flex flex-col items-center justify-center text-center bg-[#E7ECEA]">
                  <label
                    htmlFor="fileUpload"
                    className=" mb-2.5 bg-[#D99A70] text-[#F5F5F3] px-5 py-3.5 rounded-[10px] text-base leading-[30px] flex gap-2.5 items-center font-semibold cursor-pointer"
                  >
                    <Image
                      src={"/icon/upload.png"}
                      alt="upload"
                      height={36}
                      width={36}
                    />
                    Upload Supporting Document Mandatory
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.csv,.xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer text-sm leading-6 text-[#1C1C1E] font-normal"
                  >
                    {file ? file.name : "Drop (PDF/CSV/XLX) file here"}
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="flex items-center justify-around mt-6"
                onClick={() => setIsEdit(false)}
              >
                <button className="px-6 py-2 lg:py-[18px] lg:px-[80px] rounded-lg border border-[#D99A70] text-[#D99A70] text-2xl leading-[34px] cursor-pointer font-semibold h-auto">
                  Cancel
                </button>
                <button className="px-6 py-2 lg:py-[18px] lg:px-[80px] rounded-lg bg-[#1A3C34] text-white h-auto text-2xl leading-[34px] cursor-pointer font-semibold">
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
