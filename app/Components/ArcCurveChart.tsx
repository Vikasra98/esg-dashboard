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
  ReferenceLine,
} from "recharts";

// Sigmoid curve data
const sigmoidData = Array.from({ length: 200 }, (_, i) => {
  const x = -10 + i * 0.1;
  return { x, y: 1 / (1 + Math.exp(-x)) };
});

export default function ArcCurveChart() {
  return (
    <motion.div
      className="rounded-2xl p-1.5 shadow-lg border border-[#416455] px-6 pt-[135px]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <ResponsiveContainer width="100%" height={330}>
        <LineChart data={sigmoidData}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            stroke="#B5B5B5"
            domain={[-10, 10]}
            ticks={[-10, -7.5, -5, -2.5, 0, 2.5, 5, 7.5, 10]}
            label={{
              value: "Field Value",
              position: "insideBottom",
              dy: 10,
              fill: "#B5B5B5",
            }}
          />
          <YAxis
            stroke="#B5B5B5"
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            label={{
              value: "Verified Score",
              angle: -90,
              position: "insideLeft",
              fill: "#B5B5B5",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0D2017",
              borderRadius: "8px",
              border: "1px solid #333",
              color: "#fff",
            }}
          />
          {/* Reference lines as in screenshot */}
          <ReferenceLine y={0.9} stroke="#FACC15" strokeDasharray="4 4" />
          <ReferenceLine x={2.5} stroke="#FACC15" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#EF4444"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-center lg:mt-10 mt-6 lg:mb-12">
        <h2 className="text-white text-3xl font-semibold">
          Arc™ Curve Placement
        </h2>
      </div>
    </motion.div>
  );
}
