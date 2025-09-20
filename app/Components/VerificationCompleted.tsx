"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import MatrixBarChart from "./MatrixBarChart";
import ScoreSigmoidChart from "./ScoreSigmoidChart";
import { formatDate } from "../helper/utils";
import { map } from "lodash";

const steps = ["Environment", "Social", "Governance"];

const VerificationCompleted = () => {
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState<any>({});
  const [budData, setBudData] = useState<any>();
  // selected values for chart
  const [selectedAvgBud, setSelectedAvgBud] = useState<number | null>(null);
  const [selectedAvgArc, setSelectedAvgArc] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        setUserInfo(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBuds: any = localStorage.getItem("buds_id");
      if (storedBuds) {
        setBudData(JSON.parse(storedBuds));
      }
      // also optionally seed chart from quick keys (if present)
      try {
        const sBud = localStorage.getItem("avgBud");
        const sArc = localStorage.getItem("avgArc");
        if (sBud) setSelectedAvgBud(parseFloat(sBud));
        if (sArc) setSelectedAvgArc(parseFloat(sArc));
      } catch (e) {
        /* ignore localStorage errors */
      }
    }
  }, []);

  // tolerant extractor for a token object — adjust keys if your payload uses others
  const extractValuesFromToken = (item: any) => {
    if (!item) return { bud: undefined, arc: undefined };

    const budKeys = [
      "buds_score",
      "BUDS Score",
      "bud_score",
      "bud",
      "avg_bud_score",
      "avgBudScore",
      "budsScore",
    ];
    const arcKeys = [
      "arc_position",
      "Arc Position",
      "arc",
      "avg_arc_position",
      "avgArcPosition",
      "arcPos",
    ];

    const findNumeric = (keys: string[]) => {
      for (const k of keys) {
        if (k in item) {
          const v = parseFloat(item[k]);
          if (!Number.isNaN(v)) return v;
        }
      }
      return undefined;
    };

    const bud = findNumeric(budKeys);
    const arc = findNumeric(arcKeys);
    return { bud, arc };
  };

  // heuristic normalizer: chart expects arc ~ 0..10 and bud ~ 0..100
  const normalize = (rawBud?: number, rawArc?: number) => {
    let budVal: number | undefined = rawBud;
    let arcVal: number | undefined = rawArc;

    if (budVal !== undefined) {
      // if source gives 0..1, convert to 0..100
      if (budVal <= 1) budVal = budVal * 100;
      // clamp
      budVal = Math.min(100, Math.max(0, budVal));
    }

    if (arcVal !== undefined) {
      // if source gives 0..1, convert to 0..10
      if (arcVal <= 1) arcVal = arcVal * 10;
      // clamp
      arcVal = Math.min(10, Math.max(0, arcVal));
    }

    return { budVal: budVal ?? null, arcVal: arcVal ?? null };
  };

  // call when a token row is clicked
  const handleTokenClick = (item: any) => {
    const { bud, arc } = extractValuesFromToken(item);
    const { budVal, arcVal } = normalize(bud, arc);

    // save to state (chart will pick these)
    setSelectedAvgBud(budVal);
    setSelectedAvgArc(arcVal);

    // optional: persist for fallback / refresh
    try {
      if (budVal != null) localStorage.setItem("avgBud", String(budVal));
      if (arcVal != null) localStorage.setItem("avgArc", String(arcVal));
      // keep same shape your existing code expects
      localStorage.setItem("buds_id", JSON.stringify(Array.isArray(budData) ? budData : [item]));
    } catch (e) {
      // ignore localStorage write errors (private mode)
    }
  };

  // compute selected highlight id for UI (optional)
  const selectedId = useMemo(() => {
    // if budData items have buds_id field, try to find currently selected one
    if (!budData || !Array.isArray(budData)) return null;
    return budData.findIndex((it: any) => {
      const { bud, arc } = extractValuesFromToken(it);
      const { budVal, arcVal } = normalize(bud, arc);
      // match by numeric equality (loose) against selected state
      return (
        (budVal === selectedAvgBud || (budVal == null && selectedAvgBud == null)) &&
        (arcVal === selectedAvgArc || (arcVal == null && selectedAvgArc == null))
      );
    });
  }, [budData, selectedAvgBud, selectedAvgArc]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="bg-[#081A12] px-[26px] py-[50px] rounded-[10px] h-full"
          style={{ boxShadow: "0px 4px 20px 0px #00000012" }}
        >
          <div className="w-full flex items-center flex-col">
            <Image
              className="mb-6"
              src={"/icon/check_green.png"}
              alt="check"
              height={63}
              width={63}
            />
            <h2 className="lg:text-[36px] leading-[46px] text-2xl font-bold text-[#F5F5F3] lg:mb-[40px] mb-4 text-center">
              Verification Complete!
            </h2>
            <p className="lg:text-2xl text-lg lg:leading-8 lg:mb-[40px] mb-4 text-[#F5F5F3] lg:px-48 text-center">
              Your proof has been successfully verified, tokenized, and anchored
              on-chain.
            </p>

            {/* Tabs */}
            <div className="lg:px-28 px-6 w-full">
              <div className="relative flex border border-[#416455] rounded-lg overflow-hidden lg:mb-[50px] mb-6 p-3 w-full">
                {steps.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className="flex-1 relative py-3.5 px-[30px] transition-colors cursor-pointer"
                  >
                    <span
                      className={`relative z-10 text-2xl leading-[34px] font-normal font_title ${step === i ? "text-[#F5F5F3]" : "text-[#F5F5F3]"
                        }`}
                    >
                      {label}
                    </span>

                    {step === i && (
                      <motion.div
                        style={{ boxShadow: "0px 2px 2px 0px #0000000D" }}
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-md bg-[#123D2A]"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="py-5 px-[52px] border border-[#416455] flex flex-col items-center justify-center rounded-[10px]">
                <Image
                  src={"/icon/token.png"}
                  alt={"BUDS Token ID"}
                  height={70}
                  width={70}
                  className="mb-4"
                />
                <h4 className="lg:text-[28px] leading-[38px] font-bold mb-2.5 text-nowrap">
                  BUDS Token ID
                </h4>

                <div className="text-xl leading-[32px] font-normal text-center">
                  {map(budData, (val, i) => {
                    const isSelected = i === selectedId;
                    return (
                      <button
                        key={i}
                        onClick={() => handleTokenClick(val)}
                        className={`w-full text-left py-1 px-2 rounded ${isSelected ? "bg-[#123D2A]" : "bg-transparent"} hover:bg-[#0F2D21]`}
                        style={{ display: "block" }}
                      >
                        <p className="text-nowrap">{val?.buds_id ?? val?.token_id ?? `Token ${i + 1}`}</p>
                        {/* optionally show small subtitle with bud/arc */}
                        <small className="text-xs opacity-60">
                          {(() => {
                            const { bud, arc } = extractValuesFromToken(val);
                            const { budVal, arcVal } = normalize(bud, arc);
                            return `BUDS: ${budVal ?? "—"} | ARC: ${arcVal ?? "—"}`;
                          })()}
                        </small>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="py-5 px-[52px] border border-[#416455] flex flex-col items-center justify-center rounded-[10px]">
                <Image
                  src={"/icon/verifier.png"}
                  alt={"Verifier Attribution"}
                  height={70}
                  width={70}
                  className="mb-4"
                />
                <h4 className="lg:text-[28px] leading-[38px] font-bold mb-2.5 text-nowrap">
                  Verifier Attribution
                </h4>

                <div className="text-xl leading-[32px] font-normal text-center">
                  <p className="text-nowrap">{userInfo?.full_name || "—"}</p>
                </div>
              </div>

              <div className="py-5 px-[52px] border border-[#416455] flex flex-col items-center justify-center rounded-[10px]">
                <Image
                  src={"/icon/timestamp.png"}
                  alt={"Timestamp"}
                  height={70}
                  width={70}
                  className="mb-4"
                />
                <h4 className="lg:text-[28px] leading-[38px] font-bold mb-2.5 text-nowrap">
                  Timestamp
                </h4>

                <div className="text-xl leading-[32px] font-normal text-center">
                  <p className="text-nowrap">
                    {budData?.[0]?.timestamp ? formatDate(budData?.[0]?.timestamp) : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[26px] bg-[#0A1912] text-white">
            <MatrixBarChart />
            {/* pass selected values into chart */}
            <ScoreSigmoidChart avgBudRaw={selectedAvgBud} avgArcRaw={selectedAvgArc} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default VerificationCompleted;
