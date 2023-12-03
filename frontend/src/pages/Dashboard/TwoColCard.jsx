import React from "react";
import { GoChevronRight } from "react-icons/go";

const TwoColCard = ({ name, value, isCandidate, clickHandler = () => {} }) => {
  return (
    <div className="border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <div className="w-1/2 flex justify-center items-center">{name}</div>
      {isCandidate ? (
        <div className="w-1/2 flex justify-center items-center">{value}</div>
      ) : (
        <div className="w-1/2 flex justify-center items-center relative">
          <div className="flex justify-center items-center">{value}</div>
          <button
            className="w-6 h-6 absolute left-44 flex justify-center items-center rounded-full border shadow-md hover:bg-gray-200 active:bg-gray-300 transition-all"
            onClick={() => {
              clickHandler;
            }}
          >
            <GoChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default TwoColCard;
