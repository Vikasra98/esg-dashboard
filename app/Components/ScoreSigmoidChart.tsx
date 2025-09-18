"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { scoringApi } from "../helper/api";
import { ScoringRequest, ScoringResponse } from "../types/api";

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

// build fine-grained x -> y data for a smooth curve
const buildSigmoidData = (start = -10, end = 10, step = 0.1) => {
  const arr: { x: number; y: number }[] = [];
  for (let x = start; x <= end + 1e-9; x = +(x + step).toFixed(12)) {
    arr.push({ x: +x.toFixed(3), y: +sigmoid(x).toFixed(3) });
  }
  return arr;
};

interface ScoreSigmoidChartProps {
  scoringData?: Partial<ScoringRequest>;
  title?: string;
  height?: number;
}

export default function ScoreSigmoidChart({
  scoringData,
  title = "Arc™ Curve Placement (Sigmoid)",
  height = 360,
}: ScoreSigmoidChartProps) {
  const [resp, setResp] = useState<ScoringResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default payload with ability to override via props
  const defaultPayload: ScoringRequest = {
    name: "MVP",
    V: 0.6,
    M: 5,
    R_factor: 1.25,
    Sigma: 0.9,
    Theta: 1,
    L: 1.5,
    Pi: 1.1,
    CW: 1,
    c_urgency: 1.2,
    c_baseline: 1,
    c_u: 0.3,
    u: 1,
    gamma: [0],
    r: [1],
    w_d: 0,
    P: [[1]],
    theta: [[1]],
    A: [[1]],
    B: [[1]],
    C: [[1]],
    C_tier: 1000,
    k: 0.01,
    S0: 500,
    tau: 1,
    T: 100,
    X_level: 1,
  };

  const payload = { ...defaultPayload, ...scoringData };

  useEffect(() => {
    async function fetchScore() {
      setLoading(true);
      setError(null);
      try {
        const response = await scoringApi.calculate(payload);
        setResp(response);
      } catch (err: any) {
        console.error("Scoring API error:", err);
        setError(err.message || "Failed to calculate scoring");
      } finally {
        setLoading(false);
      }
    }

    fetchScore();
  }, [JSON.stringify(payload)]);

  const data = useMemo(() => buildSigmoidData(-10, 10, 0.1), []);

  const fixedX = useMemo(() => {
    return resp?.parameters?.M ?? resp?.M ?? payload.M;
  }, [resp]);

  const fixedYFromResp = resp?.V ?? payload.V;
  const fixedYOnCurve = sigmoid(fixedX);

  return (
    <div className="rounded-2xl p-1.5 shadow-lg border border-[#416455] px-6 pt-[135px]">
      {loading && (
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="text-gray-300">Loading scoring data...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="text-red-400 text-center">
            <div className="font-semibold mb-2">Error loading chart</div>
            <div className="text-sm">{error}</div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height={330}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                type="number"
                domain={[0, 100]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                stroke="#B5B5B5"
                label={{
                  value: "Compound matrix value",
                  position: "insideBottom",
                  dy: 25,
                  fill: "#B5B5B5",
                }}
              />
              <YAxis
                type="number"
                domain={[0, 100]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                tickCount={11}
                interval={0}
                allowDecimals={false}
                stroke="#B5B5B5"
                label={{
                  value: "BUDS",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#B5B5B5",
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D2017",
                  borderRadius: 8,
                  border: "1px solid #333",
                  color: "#fff",
                }}
                cursor={false}
              />

              <ReferenceLine
                x={fixedX}
                stroke="#FACC15"
                strokeDasharray="4 4"
              />

              <Line
                type="monotone"
                dataKey="y"
                stroke="#EF4444"
                strokeWidth={2}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />

              <ReferenceDot
                x={fixedX}
                y={+fixedYOnCurve.toFixed(12)}
                r={6}
                stroke="#fff"
                fill="#EF4444"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="text-center">
        <h2 className="text-white text-3xl font-semibold">
          Arc™ Curve Placement
        </h2>
      </div>
    </div>
  );
}
