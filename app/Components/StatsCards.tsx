// components/StatsCards.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getTokensByUser, metricsApi, companyApi } from "../helper/api";
import { MetricsOverview } from "../types/api";

export default function StatsCards() {
  const [metrics, setMetrics] = useState<MetricsOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [tokenData, setTokenData] = useState<any>();
  const [userId, setUserId] = useState<any>();
  const [companiesCount, setCompaniesCount] = useState<number | null>(null);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [lastVerification, setLastVerification] = useState<string | null | undefined>(undefined); // undefined = not loaded

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user") || localStorage.getItem("userInfo");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            setUserId(parsed.id ?? parsed.userId ?? null);
          } else if (typeof parsed === "string") {
            setUserId(parsed);
          }
        } catch {
          setUserId(raw);
        }
      }
    }
  }, []);

  // metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await metricsApi.getOverview();
        setMetrics(data);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch metrics");
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  // tokens
  useEffect(() => {
    const fetchTokenCount = async () => {
      try {
        const data = await getTokensByUser(userId);
        setTokenData(data.length);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch tokens");
        console.error("Error fetching tokens:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) fetchTokenCount();
  }, [userId]);

  // companies by email (count)
  useEffect(() => {
    const fetchCompanies = async () => {
      if (typeof window === "undefined") return;
      const raw = localStorage.getItem("userInfo") || localStorage.getItem("user");
      if (!raw) {
        setCompaniesCount(0);
        return;
      }

      let email: string | null = null;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && parsed.email) email = parsed.email;
      } catch {
        // not JSON
      }

      if (!email) {
        setCompaniesCount(0);
        return;''
      }

      setCompaniesLoading(true);
      // inside the useEffect that fetches companies by email
      try {
        const data = await companyApi.getByEmail(email);
        const verifiedCount = data?.length > 0 ? data.filter(company => company?.status === "Verified") : [];
        // data is CompanyVerificationCount[] so simply use length
        setCompaniesCount(verifiedCount?.length || 0);
      } catch (err: any) {
        console.error("Error getting companies by email:", err);
        setError(err?.message || "Failed to fetch companies");
        setCompaniesCount(0);
      } finally {
        setCompaniesLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // last verification by email
  useEffect(() => {
    const fetchLastVerification = async () => {
      if (typeof window === "undefined") return;
      const raw = localStorage.getItem("userInfo") || localStorage.getItem("user");
      if (!raw) {
        setLastVerification(null);
        return;
      }

      let email: string | null = null;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && parsed.email) email = parsed.email;
      } catch {
        // not JSON
      }

      if (!email) {
        setLastVerification(null);
        return;
      }

      try {
        const resp = await companyApi.getLastVerificationByEmail(email);
        // resp { last_verification: string | null }
        setLastVerification(resp?.last_verification ?? null);
      } catch (err: any) {
        console.error("Error fetching last verification:", err);
        setError(err?.message || "Failed to fetch last verification");
        setLastVerification(null);
      }
    };

    fetchLastVerification();
  }, []);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "null";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return "null";
      return d.toLocaleDateString();
    } catch {
      return "null";
    }
  };

  const formatNumber = (num: number) => num.toLocaleString();

  const stats = [
    {
      title: "Companies Verified",
      value: companiesLoading ? "Loading..." : companiesCount !== null ? formatNumber(companiesCount) : isLoading ? "Loading..." : metrics ? formatNumber(metrics.companies_verified) : "0",
      color: "bg_card_sky",
      text: "text-white",
      icon: "/icon/insurance.png",
    },
    {
      title: "BUDS Issued",
      value: isLoading ? "Loading..." : tokenData || 0,
      color: "bg_card_purple",
      text: "text-white",
      icon: "/icon/blockchain.png",
    },
    {
      title: "Last Verification Date",
      value: lastVerification === undefined ? (isLoading ? "Loading..." : metrics ? formatDate(metrics.last_verification_date) : "No data") : formatDate(lastVerification),
      color: "bg_card_red",
      text: "text-white",
      icon: "/icon/calendar.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      {error && (
        <div className="col-span-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2 }}
          className={`${stat.color} rounded-[10px] p-6 flex items-center justify-between`}
          style={{ boxShadow: "0px 4px 20px 0px #00000080" }}
        >
          <div>
            <p className="text-[#F5F5F3] lg:text-xl font-bold text-sm">{stat.title}</p>
            <h2 className={`text-2xl lg:text=[28px] lg:leading-[38px] font-bold mt-2 ${stat.text || "text-green-300"}`}>{stat.value}</h2>
          </div>
          <div>
            <Image src={stat.icon} alt={stat.icon} height={60} width={60} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
