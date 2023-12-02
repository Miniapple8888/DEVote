import React, { useState } from "react";
import FindElection from "../../components/FindElection";
import ElectionView from "./ElectionView";
import Header from "../../components/Header";
import { getElectionResults } from "../../contracts/devote";

const ViewResults = () => {
  const [election, setElection] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const validateSearchQuery = (searchQuery) => {
    return searchQuery.trim() === "";
  };
  const handleSearchForm = async (searchQuery) => {
    // TODO: make a backend call for election data
    try {
      setIsError(false);
      const { timestamp, candidates, candidateVotes, hasEnded } =
        await getElectionResults(searchQuery);

      const _candidateVotes = [];
      candidates.map((candidate, index) => {
        _candidateVotes.push({
          candidate: candidate,
          numVotes: parseInt(candidateVotes[index]),
        });
      });

      const electionResults = {
        timestamp: parseInt(timestamp),
        candidateVotes: _candidateVotes,
        hasEnded: hasEnded,
      };
      // @ts-ignore
      setElection(electionResults);
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <Header>View Election Results</Header>
      <FindElection
        handleSearchForm={handleSearchForm}
        validateSearchQuery={validateSearchQuery}
      />
      {!isError ? (election && <ElectionView election={election}/>) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default ViewResults;
