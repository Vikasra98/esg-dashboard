// components/BudsChart.tsx
"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreVertical } from "lucide-react";

const data = [
  { name: "Sun", red: 60, blue: 80, purple: 40 },
  { name: "Sun", red: 40, blue: 60, purple: 50 },
  { name: "Sun", red: 50, blue: 70, purple: 60 },
  { name: "Sun", red: 55, blue: 65, purple: 80 },
];

export default function BudsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-1 bg-[#123D2A80] p-5 rounded-2xl shadow-md border border-[#416455]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-sm font-semibold">BUDS Minted</h2>

        <div className="flex items-center gap-2">
          {/* Dropdown */}
          <button className="bg-[#1D4D38] text-white text-xs px-3 py-1 rounded-md">
            Q4 2025 ▼
          </button>
          {/* Menu */}
          <button className="p-1 rounded-md hover:bg-[#1b3d2e]">
            <MoreVertical className="text-white w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis
              stroke="#ccc"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1D4D38", borderRadius: "6px" }}
              labelStyle={{ color: "#fff" }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            <Bar dataKey="red" fill="#F44336" radius={[6, 6, 0, 0]} />
            <Bar dataKey="blue" fill="#4CAFED" radius={[6, 6, 0, 0]} />
            <Bar dataKey="purple" fill="#9C27B0" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
