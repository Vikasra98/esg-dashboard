import React from "react";
import JoinUsContent from "../Components/JoinUsContent";
import Image from "next/image";

const page = () => {
  return (
    <>
      <section className="w-full min-h-screen bg-[#12291E] p">
        <div className="h-[87px] w-full bg-[#103826] flex items-center justify-center">
          <Image alt="" src={"/Logo/logo_White.png"} height={59} width={186} />
        </div>
        <div className="px-6 lg:px-36 h-[calc(100vh-87px)]">
          <JoinUsContent />
        </div>
      </section>
    </>
  );
};

export default page;
