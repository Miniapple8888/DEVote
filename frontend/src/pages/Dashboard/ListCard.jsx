import React from "react";
import StatusText from "../../components/StatusText";
import { GoChevronRight } from "react-icons/go";
import IconButton from "./IconButton";

const ListCard = ({ id, status, clickHandler }) => {
  return (
    <div className="first:border-t border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <p>Election ID: {id}</p>
      <div className="flex justify-end items-center gap-3">
        <StatusText status={status} />
        <IconButton clickHandler={clickHandler}>
          <GoChevronRight />
        </IconButton>
      </div>
    </div>
  );
};

export default ListCard;
