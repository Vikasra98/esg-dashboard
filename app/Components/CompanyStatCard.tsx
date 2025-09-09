"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatCardProps {
  src: string;
  title: string;
  subtitle: string;
  value: string;
  percentageLeft: number;
  percentageRight: number;
  color: string;
}

export default function CompanyStatCard({
  src,
  title,
  subtitle,
  value,
  percentageLeft,
  percentageRight,
  color,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-[15px] rounded-2xl shadow-md text-white`}
      style={{
        background: color,
      }}
    >
      <div className="flex gap-[18px] items-center mb-2.5">
        <Image alt="" src={src} height={40} width={40} />
        <h3 className="text-lg lg:text-xl font-bold">{title}</h3>
      </div>
      <div className="lg:mb-[51px] mb-8 flex items-center justify-between">
        <p className="text-sm opacity-90 lg:text-xl font-medium">{subtitle}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      <div className="flex justify-between text-xs">
        <span>{percentageLeft}%</span>
        <span>{percentageRight}%</span>
      </div>
      <div className="w-full bg-white/30 h-[9px] mt-1 rounded">
        <div
          className="h-[9px] rounded"
          style={{ width: `${percentageLeft}%`, background: "white" }}
        />
      </div>
    </motion.div>
  );
}
