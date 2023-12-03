import React from "react";
import StatusText from "../../components/StatusText";
import { GoChevronRight } from "react-icons/go";
import IconButton from "./IconButton";

const ListCard = ({ id, status, clickHandler }) => {
  return (
    <div className="border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <div className="w-1/2 flex justify-center items-center">{id}</div>
      <div className="w-1/2 flex justify-center items-center relative">
        <StatusText status={status} />
        <IconButton clickHandler={clickHandler} isAbsolute={true} leftValue="left-64">
          <GoChevronRight />
        </IconButton>
      </div>
    </div>
  );
};

export default ListCard;
