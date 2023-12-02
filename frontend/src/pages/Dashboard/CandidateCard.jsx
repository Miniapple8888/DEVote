import React from "react";

const CandidateCard = ({ candidateName, numVotes }) => {
  return (
    <div className="first:border-t border-b border-gray-400 w-full h-12 px-3 py-3 flex justify-between items-center text-sm hover:bg-slate-100">
      <p>{candidateName}</p>
      <p>{numVotes} votes</p>
    </div>
  );
};

export default CandidateCard;
