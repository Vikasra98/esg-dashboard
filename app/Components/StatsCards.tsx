// components/StatsCards.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  {
    title: "Companies Verified",
    value: "1245",
    color: "bg_card_sky",
    text: "text-white",
    icon: "/icon/insurance.png",
  },
  {
    title: "Tokens Issued",
    value: "5,876,123",
    color: "bg_card_purple",
    text: "text-white",
    icon: "/icon/blockchain.png",
  },
  {
    title: "Last Verification Date",
    value: "2023-10-26",
    color: "bg_card_red",
    text: "text-white",
    icon: "/icon/calendar.png",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
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
