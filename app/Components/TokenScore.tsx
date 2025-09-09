"use client";

export default function TokenScore() {
  return (
    <div className="bg-[#123D2A80] border border-[#416455] rounded-[10px] lg:px-[27px] lg:py-[51px] p-5 text-white flex flex-col items-start justify-start">
      <h3 className="text-xl font-bold lg:mb-[37px] mb-4">Token Score</h3>
      <p className="text-[50px] font-bold mt-2 lg:mb-[37px] mb-4">
        <span className="text-white">82</span>
        <span className="text-[#00DC6A] mr-4">/100</span>
        <span className="mt-2 text-[#00DC6A] font-bold text-4xl">GOOD</span>
      </p>
      <p className="text-sm lg:text-2xl text-[#F5F5F3] font-bold">
        65% Token Remaining
      </p>
    </div>
  );
}
