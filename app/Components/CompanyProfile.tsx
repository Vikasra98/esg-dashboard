"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SelectDropdown from "./SelectDropdown";
import { waitlistSchema } from "../helper/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const CompanyProfile = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(waitlistSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  const userTypes = [
    { label: "Verifier", value: "verifier" },
    { label: "Institution", value: "institution" },
    { label: "Developer", value: "developer" },
    { label: "Other", value: "other" },
  ];

  const countryList = [
    { label: "India", value: "india" },
    { label: "United States", value: "united-states" },
    { label: "United Kingdom", value: "united-kingdom" },
    { label: "Canada", value: "canada" },
    { label: "Australia", value: "australia" },
    { label: "Germany", value: "germany" },
    { label: "France", value: "france" },
    { label: "Italy", value: "italy" },
    { label: "Spain", value: "spain" },
    { label: "Japan", value: "japan" },
    { label: "China", value: "china" },
    { label: "Brazil", value: "brazil" },
    { label: "South Africa", value: "south-africa" },
    { label: "Mexico", value: "mexico" },
    { label: "Russia", value: "russia" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected:", value);
  };
  return (
    <>
      <div
        className="bg-[#F5F5F3] px-[26px] py-[50px] rounded-[10px] h-full lg:max-w-[902px]"
        style={{ boxShadow: "0px 4px 20px 0px #00000012" }}
      >
        <div className="w-full flex items-start flex-col">
          <h2 className="lg:text-[28px] text-2xl font-bold text-[#12291E] lg:mb-[40px] mb-4 text-center">
            Company Profile
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
            <div>
              <input
                type="text"
                maxLength={80}
                placeholder="Company Name (text)"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] ${
                  errors.fullName
                    ? "border-[#FF6969] bg-[#FFF6F6]"
                    : "border-0 bg-white border-white"
                }`}
              />
            </div>
            <SelectDropdown
              options={countryList}
              placeholder="Sector/Industry"
              onChange={handleSelectChange}
            />
            <SelectDropdown
              options={countryList}
              placeholder="Country"
              onChange={handleSelectChange}
            />
            <div>
              <input
                maxLength={200}
                type="Number"
                placeholder="Registration Number/ Details"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
              />
              <p className="text-[#607D70] text-sm font-normal mt-1.5">
                (alphanumeric, max 50 chars)
              </p>
            </div>

            <div>
              <input
                maxLength={200}
                type="Number"
                placeholder="Contact Person"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
              />
            </div>
            <div>
              <input
                maxLength={200}
                type="Number"
                placeholder="Contact Email"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white`}
              />
            </div>
          </div>

          <div className="w-full flex justify-center items-center lg:mt-[50px] mt-8">
            <button
              type="submit"
              className="w-full lg:w-[521px] bg-[#12291E] text-[#F5F5F3] py-5 px-[30px] rounded-md hover:bg-green-800 transition text-2xl font-[600] cursor-pointer"
              //   onClick={() => router.push("/login")}
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyProfile;
