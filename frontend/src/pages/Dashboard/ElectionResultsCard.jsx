import React from "react";

const ElectionResultsCard = ({ electionID, candidateName, numVotes }) => {
  return (
    <div className="border-b border-gray-400 w-full h-12 p-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <div className="w-1/3 flex justify-center items-center">{electionID}</div>
      <div className="w-1/3 flex justify-center items-center">
        {candidateName}
      </div>
      <div className="w-1/3 flex justify-center items-center">{numVotes}</div>
    </div>
  );
};

export default ElectionResultsCard;
