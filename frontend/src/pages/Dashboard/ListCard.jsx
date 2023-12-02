import React from "react";
import StatusText from "../../components/StatusText";
import { GoChevronRight } from "react-icons/go";

const ListCard = ({ id, status, clickHandler }) => {
  return (
    <div className="first:border-t border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <p>ID: {id}</p>
      <div className="flex justify-end items-center gap-3">
        <StatusText status={status} />
        <button
          className="w-6 h-6 flex justify-center items-center rounded-full border shadow-md hover:bg-gray-200 active:bg-gray-300 transition-all"
          onClick={() => {
            clickHandler
          }}
        >
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListCard;
