import React from "react";

const IconButton = ({ clickHandler, children }) => {
  return (
    <button
      className="w-6 h-6 flex justify-center items-center rounded-full border shadow-md hover:bg-gray-200 active:bg-gray-300 transition-all"
      onClick={() => {
        clickHandler;
      }}
    >
      {children}
    </button>
  );
};

export default IconButton;
