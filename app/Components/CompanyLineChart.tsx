"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Area,
} from "recharts";

const data = [
  { name: "Jul", value: 0 },
  { name: "Aug", value: 12000 },
  { name: "Aug", value: 22000 },
  { name: "Sept", value: 35000 },
  { name: "Sept", value: 30000 },
  { name: "Oct", value: 23540 }, // Tooltip shows 2354kt → 23,540
  { name: "Oct", value: 8000 },
  { name: "Nov", value: 17000 },
  { name: "Nov", value: 15000 },
  { name: "Nov", value: 21000 },
  { name: "Dec", value: 0 },
  { name: "Dec", value: 10000 },
];

export default function CompanyLineChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#123D2A80] rounded-[10px] p-4 shadow-lg border border-[#416455]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Gradient + Shadow */}
          <defs>
            {/* Gradient for area fill */}
            <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>

            {/* Shadow filter for line */}
            <filter
              id="lineShadow"
              x="-20%"
              y="-20%"
              width="200%"
              height="150%"
            >
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodColor="#3B82F6"
                floodOpacity="0.4"
              />
            </filter>
          </defs>

          {/* Gridlines */}
          <CartesianGrid stroke="#ffffff20" vertical={false} />

          {/* X axis */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#ffffff", fontSize: 12 }}
          />

          {/* Y axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000}kt`}
            tick={{ fill: "#ffffff", fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              border: "none",
              color: "#000",
              fontSize: "12px",
            }}
            formatter={(value) => [`${(value as number) / 1000}kt`, ""]}
          />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            align="left"
            iconType="circle"
            wrapperStyle={{ paddingTop: 10 }}
            formatter={() => <span className="text-blue-400">ESG Score</span>}
          />

          {/* Area (fill under line) */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#colorFill)"
          />

          {/* Line with shadow */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#3B82F6" }}
            style={{ filter: "url(#lineShadow)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
