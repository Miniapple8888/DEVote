import React from "react";
import IconButton from "./IconButton";
import { GoChevronRight } from "react-icons/go";
import StatusText from "../../components/StatusText";

function FourColCard({ name, candidate, votes, status, clickHandler }) {
  return (
    <div className="border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <div className="w-1/4 flex justify-center items-center">{name}</div>
      <div className="w-1/4 flex justify-center items-center">{candidate}</div>
      <div className="w-1/4 flex justify-center items-center">{votes}</div>
      <div className="w-1/4 flex justify-center items-center relative">
        <StatusText status={status}/>
        <div className="flex justify-center items-center"></div>
        <IconButton clickHandler={clickHandler} isAbsolute={true}>
          <GoChevronRight />
        </IconButton>
      </div>
    </div>
  );
}

export default FourColCard;
