"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import { ScoreSigmoidChartProps } from "../types/api";

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

const buildSigmoidData = (center: number, start = 0, end = 10, step = 0.05, steepness = 2) => {
  const arr: { x: number; y: number }[] = [];
  for (let x = start; x <= end + 1e-9; x = +(x + step).toFixed(12)) {
    const input = (x - center) * steepness;
    arr.push({ x: +x.toFixed(3), y: +(sigmoid(input) * 100).toFixed(3) });
  }
  return arr;
};

type Props = ScoreSigmoidChartProps & {
  /** Optional explicit values from parent. Prefer passing these. */
  avgBudRaw?: number | null;
  avgArcRaw?: number | null;
};

export default function ScoreSigmoidChart({
  title = "Arc Curve Placement",
  height = 360,
  centerOverride,
  avgBudRaw: propAvgBud,
  avgArcRaw: propAvgArc,
}: Props) {
  // Local fallback values read once (client-side)
  const [localFallback, setLocalFallback] = useState<{ avgBud?: number; avgArc?: number }>({});
  console.log("🚀 ~ ScoreSigmoidChart ~ localFallback:", localFallback)

  useEffect(() => {
    // read localStorage only on client once
    try {
      const b = localStorage.getItem("avgBud");
      const a = localStorage.getItem("avgArc");
      setLocalFallback({
        avgBud: b != null && b !== "" ? parseFloat(b) : undefined,
        avgArc: a != null && a !== "" ? parseFloat(a) : undefined,
      });
    } catch (e) {
      // ignore localStorage read errors (e.g., privacy modes)
      setLocalFallback({});
    }
  }, []);

  const clamp = (v: number | undefined | null, min = 0, max = 100) =>
    v == null || Number.isNaN(Number(v)) ? undefined : Math.min(max, Math.max(min, Number(v)));

  // Choose source: prop -> localStorage fallback -> null
  const avgBud = propAvgBud ?? localFallback.avgBud ?? null;
  const avgArc = propAvgArc ?? localFallback.avgArc ?? null;

  const dotX = typeof avgArc === "number" ? Math.min(10, Math.max(0, avgArc)) : undefined;
  const dotY = clamp(avgBud, 0, 100);

  const steepness = 2;

  const computedCenter = (() => {
    if (typeof centerOverride === "number" && !Number.isNaN(centerOverride)) return Math.min(10, Math.max(0, centerOverride));
    if (typeof dotX === "number" && typeof dotY === "number") {
      const eps = 1e-6;
      let y = dotY;
      if (y <= 0) y = eps;
      if (y >= 100) y = 100 - eps;
      const yFrac = y / 100;
      const logit = Math.log(yFrac / (1 - yFrac));
      const centerVal = dotX - logit / steepness;
      return Math.min(10, Math.max(0, centerVal));
    }
    return 3.75;
  })();

  const data = useMemo(() => buildSigmoidData(computedCenter, 0, 10, 0.05, steepness).sort((a, b) => a.x - b.x), [computedCenter]);

  const finalDotX = typeof dotX === "number" ? dotX : 0;
  const finalDotY = typeof dotY === "number" ? dotY : +(sigmoid((finalDotX - computedCenter) * steepness) * 100).toFixed(3);

  // Debug logs (remove in production)
  console.log("propAvgArc (used as x 0..10) =", propAvgArc, " avgArc fallback =", avgArc, " plotted finalDotX =", finalDotX);
  console.log("propAvgBud (y 0..100) =", propAvgBud, " avgBud fallback =", avgBud, " plotted finalDotY =", finalDotY);
  console.log("computedCenter (0..10) =", computedCenter);

  return (
    <div className="rounded-2xl p-1.5 shadow-lg border border-[#416455] px-6 pt-[135px]">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height={330}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 10]}
              ticks={[0, 2.5, 5, 7.5, 10]}
              allowDataOverflow={false}
              scale="linear"
              stroke="#B5B5B5"
              label={{ value: "Compound matrix value", position: "insideBottom", dy: 25, fill: "#B5B5B5" }}
            />
            <YAxis
              dataKey="y"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              allowDataOverflow={false}
              stroke="#B5B5B5"
              label={{ value: "BUDS", angle: -90, position: "insideLeft", fill: "#B5B5B5" }}
            />
            <Tooltip contentStyle={{ backgroundColor: "#0D2017", borderRadius: 8, border: "1px solid #333", color: "#fff", }} cursor={false} formatter={(value: any) => typeof value === "number" ? +value.toFixed(2) : value}
            />
            <ReferenceLine x={finalDotX} stroke="#FFD700" strokeDasharray="2 6" label={{ position: "bottom", fill: "#FFD700", fontSize: 11 }} />
            <Line type="monotone" dataKey="y" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={false} isAnimationActive={false} />
            <ReferenceDot x={finalDotX} y={finalDotY} r={6} stroke="#fff" fill="#EF4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <h2 className="text-white text-3xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}
