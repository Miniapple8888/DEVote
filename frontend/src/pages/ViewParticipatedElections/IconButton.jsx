import React from "react";

function IconButton({ text, onClick, disabled }) {
  return (
    <button
      className={`px-1 ${
        !disabled
          ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          : "bg-gray-400 "
      }  text-white rounded flex justify-center items-center `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default IconButton;
