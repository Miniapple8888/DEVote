import React from "react";

const DashboardCard = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center md:col-span-1 col-span-2 border shadow-md rounded-lg bg-slate-50 px-8 py-2">
      {children}
    </div>
  );
};

export default DashboardCard;
