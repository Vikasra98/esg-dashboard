"use client";

export default function ProjectsCard() {
  const projectData = [
    {
      title: "Carbon Emissions",
      subTitle: "Tons/year",
      value: "35",
    },
    {
      title: "Energy Consumption",
      subTitle: "Kilowatt-Hour",
      value: "55,000",
    },
    {
      title: "Water Management",
      subTitle: "cubic meters",
      value: "70",
    },
  ];
  return (
    <div className="bg-[#123D2A80] rounded-[10px] p-5 lg:px-[23px] lg:py-[31px] text-[#fff] border border-[#416455] lg:col-span-2">
      <h3 className="text-xl font-bold lg:mb-[27px] mb-4 text-[#F5F5F3]">
        Projects
      </h3>
      <div className="flex flex-col gap-3.5">
        {projectData.map((item: any, index: any) => (
          <div
            key={index}
            className="flex justify-between bg-[#0D2B1E] rounded-[10px] py-3 lg:px-[17px] lg:py-[20px]"
          >
            <div>
              <span className="text-xl font-medium mb-1">{item.title}</span>
              <p className="text-sm font-normal">{item.subTitle}</p>
            </div>
            <span className="text-3xl font-bold">{item.value}</span>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-between border-b border-white/20 py-3">
        <span>Energy Consumption</span>
        <span className="font-bold">55,000</span>
      </div>
      <div className="flex justify-between py-3">
        <span>Water Management</span>
        <span className="font-bold">70</span>
      </div> */}
    </div>
  );
}
