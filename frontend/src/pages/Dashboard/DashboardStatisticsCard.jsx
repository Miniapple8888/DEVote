import React from "react";

const DashboardStatisticsCard = ({ title, counter }) => {
  return (
    <div className="w-1/3 h-full flex flex-col justify-center items-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-3xl font-light">
        {
          // @ts-ignore
          counter
        }
      </p>
    </div>
  );
};

export default DashboardStatisticsCard;
