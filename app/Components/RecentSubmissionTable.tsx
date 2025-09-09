"use client";

import { FaCalendar, FaCheckSquare, FaUser } from "react-icons/fa";

const submissions = [
  {
    company: "Company A",
    date: "Jan 30, 2025",
    status: "Verified",
    score: "80.50",
  },
  {
    company: "Company B",
    date: "Jan 27, 2025",
    status: "Active",
    score: "81.25",
  },
  {
    company: "Company C",
    date: "Jan 21, 2025",
    status: "Verified",
    score: "82.75",
  },
  {
    company: "Company D",
    date: "Jan 18, 2025",
    status: "Pending",
    score: "89.44",
  },
];

export default function RecentSubmissionTable() {
  return (
    <div className="bg-[#123D2A80] border border-[#416455] rounded-[10px] p-5 text-white lg:col-span-1 lg:px-[17px] lg:py-[24px]">
      <h3 className="text-xl font-bold text-[#F5F5F3] mb-3">
        Recent Submission
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#fff] text-left border-b border-[#416455]">
            <th className="pb-2">
              <div className="flex items-center gap-1.5">
                <span>
                  <FaUser className="text-[#D99A70]" />
                </span>
                <span className="text-[10px] font-semibold">Company</span>
              </div>
            </th>
            <th className="pb-2">
              <div className="flex items-center gap-1.5">
                <span>
                  <FaCalendar className="text-[#D99A70]" />
                </span>
                <span className="text-[10px] font-semibold">Date</span>
              </div>
            </th>
            <th className="pb-2">
              <div className="flex items-center gap-1.5">
                <span>
                  <FaCheckSquare className="text-[#D99A70]" />
                </span>
                <span className="text-[10px] font-semibold">Status</span>
              </div>
            </th>
            <th className="pb-2">
              <div className="flex items-center gap-1.5">
                {/* <span>
                  <FaUser className="text-[#D99A70]" />
                </span> */}
                <span className="text-[10px] font-semibold">Bud Score</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="gap-[22px]">
          {submissions.map((item, i) => (
            <tr key={i} className="">
              <td className="py-2 text-[10px] leading-3.5 font-medium">
                {item.company}
              </td>
              <td className="py-2 text-[10px] leading-3.5 font-medium">
                {item.date}
              </td>
              <td className="py-2">
                <span
                  className={`px-1.5 ps-[13px] py-0.5 rounded text-[10px] border leading-3.5 font-medium relative after:absolute after:h-[3px] after:w-[3px] after:rounded-full  after:left-1.5 after:top-[calc(50%-1.5px)] ${
                    item.status === "Verified"
                      ? "bg-[#05C16833] text-[#F5F5F3] after:bg-[#05C168] border-[#05C16833]"
                      : item.status === "Pending"
                      ? "bg-yellow-500/20 text-[#FDB52A] after:bg-[#FDB52A] border-[#FFB01633]"
                      : "bg-[#00C2FF33] text-[#00C2FF] after:bg-[#00C2FF] border-[#00C2FF33]"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-2 text-[10px] leading-3.5 font-medium">
                {item.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
