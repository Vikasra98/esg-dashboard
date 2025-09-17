// components/StatsCards.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getTokensByUser, metricsApi } from "../helper/api";
import { MetricsOverview } from "../types/api";
import size from "lodash";

export default function StatsCards() {
  const [metrics, setMetrics] = useState<MetricsOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [tokenData, setTokenData] = useState<any>();
  const [userId, setUserId] = useState<any>();
  console.log(`userId`, userId);
  console.log("Token data size:", tokenData);

  useEffect(() => {
    if (typeof window != undefined) {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUserId(stored);
      }
    }
  }, []);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await metricsApi.getOverview();
        setMetrics(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch metrics");
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  useEffect(() => {
    const fetchTokenCount = async () => {
      try {
        const data = await getTokensByUser(userId);
        setTokenData(data.length);
      } catch (err: any) {
        setError(err.message || "Failed to fetch metrics");
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) {
      fetchTokenCount();
    }
  }, [userId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No data";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const stats = [
    {
      title: "Companies Verified",
      value: isLoading
        ? "Loading..."
        : metrics
        ? formatNumber(metrics.companies_verified)
        : "0",
      color: "bg_card_sky",
      text: "text-white",
      icon: "/icon/insurance.png",
    },
    {
      title: "Tokens Issued",
      value: isLoading ? "Loading..." : tokenData || 0,
      color: "bg_card_purple",
      text: "text-white",
      icon: "/icon/blockchain.png",
    },
    {
      title: "Last Verification Date",
      value: isLoading
        ? "Loading..."
        : metrics
        ? formatDate(metrics.last_verification_date)
        : "No data",
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
            <p className="text-[#F5F5F3] lg:text-xl font-bold text-sm">
              {stat.title}
            </p>
            <h2
              className={`text-2xl lg:text=[28px] lg:leading-[38px] font-bold mt-2 ${
                stat.text || "text-green-300"
              }`}
            >
              {stat.value}
            </h2>
          </div>
          <div>
            <Image src={stat.icon} alt={stat.icon} height={60} width={60} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
