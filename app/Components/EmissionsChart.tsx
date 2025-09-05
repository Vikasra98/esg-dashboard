// components/EmissionsChart.tsx
"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 60 },
  { name: "Mar", value: 50 },
  { name: "Apr", value: 80 },
  { name: "May", value: 60 },
  { name: "Jun", value: 90 },
  { name: "Jul", value: 70 },
  { name: "Aug", value: 100 },
];

export default function EmissionsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=" lg:col-span-2 bg-[#123D2A80] p-6 rounded-[10px] border border-[#416455]"
    >
      <h2 className="text-lg font-semibold mb-4">
        Scope 1 Emissions Verified (tons co2e)
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00C896"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
