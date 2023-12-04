import React from "react";

const DashboardCard = ({ children, span = false }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${
        span ? "col-span-2" : "md:col-span-1 col-span-2"
      } border shadow-md rounded-lg bg-slate-50 px-8 py-2`}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
