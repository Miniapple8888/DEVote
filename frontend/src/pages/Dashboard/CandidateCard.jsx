import React from "react";

const CandidateCard = ({ candidateName, numVotes }) => {
  return (
    <div className="border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <p className="w-1/2 text-center">{candidateName}</p>
      <p className="w-1/2 text-center">{numVotes} votes</p>
    </div>
  );
};

export default CandidateCard;
