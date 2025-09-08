"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Full dataset (Jan–Dec)
const fullData = [
  { name: "Jan", emissions: 12000, water: 11000, waste: 15000 },
  { name: "Feb", emissions: 15000, water: 23000, waste: 38000 },
  { name: "Mar", emissions: 20000, water: 18000, waste: 33000 },
  { name: "Apr", emissions: 18000, water: 15000, waste: 22000 },
  { name: "May", emissions: 14000, water: 16000, waste: 18000 },
  { name: "Jun", emissions: 11000, water: 20000, waste: 15000 },
  { name: "Jul", emissions: 8000, water: 6000, waste: 3000 },
  { name: "Aug", emissions: 25000, water: 22000, waste: 42000 },
  { name: "Sep", emissions: 13000, water: 12000, waste: 14000 },
  { name: "Oct", emissions: 11000, water: 10000, waste: 20000 },
  { name: "Nov", emissions: 10000, water: 9000, waste: 16000 },
  { name: "Dec", emissions: 15000, water: 12000, waste: 20000 },
];

const filterOptions = [
  { label: "Jan 2024 - Dec 2024", range: [0, 12] },
  { label: "Jan 2024 - Jun 2024", range: [0, 6] },
  { label: "Jul 2024 - Dec 2024", range: [6, 12] },
];

export default function MatrixBarChart() {
  const [selectedRange, setSelectedRange] = useState([0, 12]);

  const filteredData = fullData.slice(selectedRange[0], selectedRange[1]);

  return (
    <motion.div
      className="rounded-2xl p-1.5 shadow-lg border border-[#416455] px-6 pt-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Dropdown top-right */}
      <div className="flex justify-end mb-2 relative px-4">
        <select
          value={selectedRange.join(",")}
          onChange={(e) =>
            setSelectedRange(e.target.value.split(",").map(Number))
          }
          className="bg-[#416455] text-white text-sm p-1.5 rounded-md cursor-pointer"
        >
          {filterOptions.map((opt) => (
            <option
              key={opt.label}
              value={opt.range.join(",")}
              className="bg-[#071A14] text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={filteredData}
          barSize={5}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          {/* Grid → only horizontal dashed lines, matching screenshot */}
          <CartesianGrid stroke="#444" strokeDasharray="1 1" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100000]}
            ticks={[0, 20000, 40000, 60000, 80000, 100000]}
            tickFormatter={(value) => `${value / 1000}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0F2A22",
              border: "1px solid #2B3E34",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ color: "#fff", fontSize: "14px" }}
          />
          <Bar dataKey="emissions" stackId="a" fill="#D46EFF" />
          <Bar dataKey="water" stackId="a" fill="#1D4ED8" />
          <Bar dataKey="waste" stackId="a" fill="#F87171" />
        </BarChart>
      </ResponsiveContainer>

      {/* Bottom title */}
      <div className="text-center lg:mt-10 mt-6 lg:mb-12">
        <h2 className="text-white text-3xl font-semibold">
          Matrix Alignment Effect
        </h2>
      </div>
    </motion.div>
  );
}
