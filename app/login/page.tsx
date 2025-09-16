"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FcGoogle } from "react-icons/fc";
import { authApi } from "../helper/api";
import { loginSchema } from "../helper/validationSchema";
import { LoginRequest } from "../types/api";

export default function login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (authApi.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response: any = await authApi.login(data);
      console.log(response, "response<<<<<");

      console.log("Login successful:", response.user_id);
      localStorage.setItem("user", response.user.id);
      localStorage.setItem("userInfo", JSON.stringify(response.user));
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <main className="flex min-h-screen items-center justify-center bg-[#081A12] lg:px-[135px] lg:py-20">
    <div className="grid w-full  grid-cols-1 overflow-hidden shadow-lg md:grid-cols-2 min-h-screen">
      {/* Left Section */}
      <div className="lg:py-[89px] lg:px-[83px] p-6 flex flex-col justify-between text-white bg_gradient h-full">
        <div>
          <img
            src="/Logo/logo_White.png"
            alt="calyx logo"
            className="w-[200px] h-[63px] lg:mb-[52px] mb-8"
          />
          <h1 className="text-4xl lg:text-[70px] font-bold leading-[82px]">
            The future of ESG data starts here
          </h1>
          <h4 className="mt-5 text-lg lg:text-4xl lg:leading-[46px] text-[#D99A70] font-semibold">
            Oct 21
          </h4>
        </div>
        <button
          onClick={() => router.push("/signUp")}
          className="cursor-pointer lg:mt-[50px] mt-10 w-full rounded-md bg-[#D99A70] px-6 lg:py-5 py-3 font-semibold leading-[34px] text-2xl text-[white] hover:bg-[#d7894e] transition"
        >
          Register Now →
        </button>
      </div>

      {/* Right Section */}
      <div className="bg-[#F9F9F7] p-10 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <img
            src="/Logo/fullcolor_horizontal_calyx_logo.png"
            alt="calyx logo"
            className="w-[200px] h-[63px] mb-5"
          />
          <h2 className="lg:text-4xl lg:leading-[46px] text-2xl font-semibold lg:mb-[60px] mb-8 text-[#1C1C1E]">
            Login to your account
          </h2>

          {/* Google Login */}
          <button className="flex w-full items-center justify-center gap-4 rounded-md bg-white py-3 text-base leading-[26px] font-medium text-[#1C1C1E] hover:bg-gray-50 transition">
            <FcGoogle size={29} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-[#1C1C1E]">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-[26px]">
              <input
                {...register("email")}
                maxLength={120}
                type="email"
                placeholder="Email Address (required)"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] ${
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

            <div className="mb-3">
              <input
                {...register("password")}
                type="password"
                placeholder="Password (required)"
                className={`w-full px-[30px] py-3.5 border-1 rounded-[10px] outline-none placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] ${
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

            <div className="text-left lg:mb-[40px] mb-6">
              <a href="#" className="lg:text-lg text-sm text-[#1C1C1E]">
                Forgot Your{" "}
                <span className="text-[#D99A70] underline">Password?</span>
              </a>
            </div>

            {errorMessage && (
              <p className="text-[#FF1F23] text-sm font-normal mb-4 text-center">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full rounded-md bg-[#12291E] text-2xl lg:font-semibold leading-[34px] px-6 lg:py-5 py-3 font-medium text-white hover:bg-[#0d291c] transition mb-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Continue"}
            </button>
          </form>

          <p className="text-left lg:text-base leading-[26px] text-sm text-[#1C1C1E] w-full">
            Don’t have an account?{" "}
            <a href="/signUp" className="text-[#D99A70] underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
    // </main>
  );
}
