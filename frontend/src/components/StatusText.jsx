import React from "react";

const StatusText = ({ status }) => {
  return (
    <div
      className={`border px-1 w-20 flex justify-center items-center rounded-full ${
        status
          ? "text-green-500 border-green-500 bg-green-100"
          : "text-yellow-500 border-yellow-500 bg-yellow-100"
      }`}
    >
      <h1>{status ? "Ended" : "On going"}</h1>
    </div>
  );
};

export default StatusText;
