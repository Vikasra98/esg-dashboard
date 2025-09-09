"use client";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Environment", value: 30, color: "#FACC15" }, // yellow
  { name: "Governance", value: 35, color: "#22D3EE" }, // cyan
  { name: "Social", value: 35, color: "#22C55E" }, // green
];

export default function DonutChart() {
  return (
    <motion.div
      className="rounded-[10px] p-4 bg-[#123D2A80] w-full max-w-md border border-[#416455]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-3 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-white font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
