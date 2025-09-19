"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SelectDropdown from "./SelectDropdown";
import { companySchema } from "../helper/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import DataInputFlowForm from "./DataInputFlowForm";
import { companyApi } from "../helper/api";
import { CreateCompanyRequest } from "../types/api";

const CompanyProfile = () => {
  const router = useRouter();
  const [isDataInput, setIsDataInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    // resolver: yupResolver(companySchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage("");
    const raw: any = localStorage.getItem("userInfo");
    let email: any = null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.email) email = parsed.email;


    try {
      const companyData: CreateCompanyRequest = {
        name: data.name,
        sector: selectedSector,
        country: selectedCountry,
        reg_number: data.reg_number,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        status: "Pending",
        created_by: email,
      };

      const response: any = await companyApi.create(companyData);
      console.log("Company created successfully:", response);
      localStorage.setItem("companyId", response.id);
      setIsDataInput(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create company");
    } finally {
      setIsLoading(false);
    }
  };
  const sectorOptions = [
    { label: "Energy", value: "Energy" },
    { label: "Materials", value: "Materials" },
    { label: "Utilities", value: "Utilities" },
    { label: "Healthcare/Pharma", value: "Healthcare/Pharma" },
    { label: "Consumer Staples", value: "Consumer Staples" },
    { label: "Information Technology", value: "Information Technology" },
    { label: "Industrial/Construction", value: "Industrial/Construction" },
    { label: "Transportation", value: "Transportation" },
    { label: "Financials", value: "Financials" },
    { label: "Real Estate", value: "Real Estate" },
    { label: "Communication Services", value: "Communication Services" },
    { label: "Consumer Discretionary", value: "Consumer Discretionary" },
  ];

  const countryOptions = [
    { label: "Germany", value: "DE" },
    { label: "United States", value: "US" },
    { label: "India", value: "IN" },
    { label: "United Kingdom", value: "GB" },
    { label: "Canada", value: "CA" },
    { label: "Australia", value: "AU" },
    { label: "France", value: "FR" },
    { label: "Italy", value: "IT" },
    { label: "Spain", value: "ES" },
    { label: "Japan", value: "JP" },
    { label: "China", value: "CN" },
    { label: "Brazil", value: "BR" },
    { label: "South Africa", value: "ZA" },
    { label: "Mexico", value: "MX" },
    { label: "Russia", value: "RU" },
    { label: "Switzerland", value: "CH" },
    { label: "UAE", value: "AE" },
    { label: "Singapore", value: "SG" },
    { label: "Finland", value: "FI" },
  ];

  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    setValue("sector", value);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setValue("country", value);
  };
  return (
    <>
      {!isDataInput ? (
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
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage}
              </div>
            )}
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
              <div>
                <input
                  {...register("name")}
                  type="text"
                  maxLength={80}
                  placeholder="Company Name"
                  className="w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white"
                />
                {/* {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )} */}
              </div>
              <div>
                <SelectDropdown
                  options={sectorOptions}
                  placeholder="Sector/Industry"
                  onChange={handleSectorChange}
                />
                <input
                  {...register("sector")}
                  type="hidden"
                  value={selectedSector}
                />
                {/* {errors.sector && (
                  <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>
                )} */}
              </div>
              <div>
                <SelectDropdown
                  options={countryOptions}
                  placeholder="Country"
                  onChange={handleCountryChange}
                />
                <input
                  {...register("country")}
                  type="hidden"
                  value={selectedCountry}
                />
                {/* {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )} */}
              </div>
              <div>
                <input
                  {...register("reg_number")}
                  type="text"
                  maxLength={50}
                  placeholder="Registration Number"
                  className="w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white"
                />
                <p className="text-[#607D70] text-sm font-normal mt-1.5">
                  (alphanumeric, max 50 chars)
                </p>
                {/* {errors.reg_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.reg_number.message}</p>
                )} */}
              </div>

              <div>
                <input
                  {...register("contact_name")}
                  type="text"
                  maxLength={80}
                  placeholder="Contact Person"
                  className="w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white"
                />
                {/* {errors.contact_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_name.message}</p>
                )} */}
              </div>
              <div>
                <input
                  {...register("contact_email")}
                  type="email"
                  maxLength={120}
                  placeholder="Contact Email"
                  className="w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] bg-white border-white"
                />
                {/* {errors.contact_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_email.message}</p>
                )} */}
              </div>
            </div>

            <div className="w-full flex justify-center items-center lg:mt-[50px] mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full lg:w-[521px] py-5 px-[30px] rounded-md transition text-2xl font-[600] cursor-pointer ${isLoading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#12291E] text-[#F5F5F3] hover:bg-green-800"
                  }`}
              >
                {isLoading ? "Creating Company..." : "Create Company"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <DataInputFlowForm />
      )}
    </>
  );
};

export default CompanyProfile;
