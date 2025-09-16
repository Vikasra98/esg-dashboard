"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SelectDropdown from "./SelectDropdown";
import { waitlistSchema } from "../helper/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "../helper/api";
import { JoinRequest } from "../types/api";

const JoinUsContent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(waitlistSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const joinData: JoinRequest = {
        full_name: data.fullName,
        email: data.email,
        organization: data.organization || undefined,
        country: selectedCountry,
        role: selectedRole,
        consent: data.consent,
        password: data.password,
      };

      console.log("Submitting data:", joinData);
      
      const response = await authApi.join(joinData);
      console.log("Success:", response);
      
      // Redirect to dashboard after successful signup
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);
      setErrorMessage(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };
  const userTypes = [
    { label: "Verifier", value: "verifier" },
    { label: "Institution", value: "institution" },
    { label: "Developer", value: "developer" },
    { label: "Other", value: "other" },
  ];

  const countryList = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "GB" },
    { label: "Canada", value: "CA" },
    { label: "Australia", value: "AU" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Italy", value: "IT" },
    { label: "Spain", value: "ES" },
    { label: "Japan", value: "JP" },
    { label: "China", value: "CN" },
    { label: "Brazil", value: "BR" },
    { label: "South Africa", value: "ZA" },
    { label: "Mexico", value: "MX" },
    { label: "Russia", value: "RU" },
    { label: "Finland", value: "FI" },
  ];

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setValue("country", value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setValue("role", value);
  };

  return (
    <>
      <div
        className="bg-[#F5F5F3] px-[26px] py-[30px] rounded-[10px]"
        style={{ boxShadow: "0px 4px 20px 0px #00000012" }}
      >
        <div className="w-full flex items-center flex-col">
          <h2 className="lg:text-[52px] font_title text-2xl md:text-3xl font-bold text-[#12291E] lg:mb-[30px] mb-4 text-center">
            Join
            {/* the Calyx Waitlist Today */}
          </h2>
          <p className="text-[#1C1C1E] text-xl font-normal lg:mb-[40px] mb-6 lg:max-w-3xl text-center">
            {/* Join our waitlist to get early updates, exclusive access, and play
              a role in building auditable ESG standards. */}
            Choose your role as Verifier, Institution, or Developer and complete
            the quick application form to begin.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
            <div>
              <input
                {...register("fullName")}
                type="text"
                maxLength={80}
                placeholder="Full Name"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] ${
                  errors.fullName
                    ? "border-[#FF6969] bg-[#FFF6F6]"
                    : "border-0 bg-white border-white"
                }`}
              />
              {errors.fullName && (
                <p className="text-[#FF1F23] text-sm font-normal mt-1.5">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("email")}
                maxLength={120}
                type="email"
                placeholder="Email Address"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] ${
                  errors.email
                    ? "border-[#FF6969] bg-[#FFF6F6]"
                    : "border-0 bg-white border-white"
                }`}
              />
              {errors.email && (
                <p className="text-[#FF1F23] text-sm font-normal mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("organization")}
                maxLength={120}
                type="text"
                placeholder="Organization / Company"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] ${
                  errors.organization
                    ? "border-[#FF6969] bg-[#FFF6F6]"
                    : "border-0 bg-white border-white"
                }`}
              />
              {errors.organization && (
                <p className="text-[#FF1F23] text-sm font-normal mt-1.5">
                  {errors.organization.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] ${
                  errors.password
                    ? "border-[#FF6969] bg-[#FFF6F6]"
                    : "border-0 bg-white border-white"
                }`}
              />
              {errors.password && (
                <p className="text-[#FF1F23] text-sm font-normal mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>
            <SelectDropdown
              options={countryList}
              placeholder="Country"
              onChange={handleCountryChange}
            />
            <SelectDropdown
              options={userTypes}
              placeholder="Role"
              onChange={handleRoleChange}
            />
          </div>
          {/* <div>
              <input
                {...register("website")}
                maxLength={200}
                type="text"
                placeholder="LinkedIn / Website (optional)"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] mb-6 ${
                  errors.website
                    ? "border-[#FF6969] bg-[#FFF6F6]"
                    : "border-0 bg-white border-white"
                }`}
              />
              {errors.website && (
                <p className="text-[#FF1F23] text-sm font-normal mt-1.5">
                  {errors.website.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                {...register("motivation")}
                maxLength={500}
                placeholder="Short Motivation (optional)"
                cols={25}
                rows={6}
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none  placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] mb-6 ${
                  errors.motivation
                    ? "border-[#FF6969] bg-[#FFF6F6]"
                    : "border-0 bg-white border-white"
                }`}
              ></textarea>
              {errors.motivation && (
                <p className="text-[#FF1F23] text-sm font-normal mt-1.5">
                  {errors.motivation.message}
                </p>
              )}
            </div> */}
          <div className="flex items-end justify-center w-full mb-6">
            <input
              {...register("consent")}
              type="checkbox"
              className="w-[18px] h-[18px] px-[30px] py-3.5 border-0 rounded-[10px] outline-none bg-white placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] mb-1 mr-[11px]"
            />
            <label
              htmlFor="consent"
              className="w-full text-[#1C1C1E] text-base font-normal leading-[26px]"
            >
              I agree to be contacted about Calyx updates and understand this is
              a waitlist, not an account creation.
            </label>
          </div>
          {errors.consent && (
            <p className="text-[#FF1F23] text-sm font-normal mt-1.5 text-center">
              {errors.consent.message}
            </p>
          )}
          {errorMessage && (
            <p className="text-[#FF1F23] text-sm font-normal mt-1.5 text-center">
              {errorMessage}
            </p>
          )}
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full lg:w-[521px] bg-[#12291E] text-[#F5F5F3] py-5 px-[30px] rounded-md hover:bg-green-800 transition text-2xl font-[600] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default JoinUsContent;
