import React from "react";
import { GoChevronRight } from "react-icons/go";
import IconButton from "./IconButton";

const TwoColCard = ({ name, value, isCandidate, clickHandler = () => {} }) => {
  return (
    <div className="border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <div className="w-1/2 flex justify-center items-center">{name}</div>
      {isCandidate ? (
        <div className="w-1/2 flex justify-center items-center">{value}</div>
      ) : (
        <div className="w-1/2 flex justify-center items-center relative">
          <div className="flex justify-center items-center">{value}</div>
          <IconButton clickHandler={clickHandler} isAbsolute={true}>
            <GoChevronRight />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TwoColCard;
