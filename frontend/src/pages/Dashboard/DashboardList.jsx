import React from "react";

const DashboardList = ({ children }) => {
  return (
    <>

      <div className="w-full h-56 flex flex-col overflow-y-auto">
        <div>{children}</div>
      </div>
    </>
  );
};

export default DashboardList;
