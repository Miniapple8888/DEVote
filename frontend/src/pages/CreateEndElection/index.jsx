import React, { useEffect, useState } from "react";
import { endElection, getOngoingElectionID } from "../../contracts/devote";
import CreateElection from "./CreateElection";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";

// @ts-ignore
const NO_ONGOING_ELECTION = -1n;

const CreateEndElection = () => {
  const [loading, setLoading] = useState(true);
  const [electionID, setElectionID] = useState(NO_ONGOING_ELECTION);
  const onEndElection = async () => {
    setLoading(true);
    const result = await endElection();
    if (result) {
      console.log("Election ended");
    } else {
      console.log("Election was already ended");
    }
    setElectionID(NO_ONGOING_ELECTION);
    setLoading(false);
  };
  useEffect(() => {
    async function checkOngoingElection() {
      setElectionID(await getOngoingElectionID());
      setLoading(false);
    }
    checkOngoingElection();
  }, []);
  return (
    <div className="w-full h-full">
      {loading ? (
        <LoadingScreen />
      ) : electionID !== NO_ONGOING_ELECTION ? (
        <div className="flex flex-col gap-4 items-center">
          <Header>You already have an ongoing election</Header>
          <h1>Election ID: {electionID.toString()}</h1>
          <Button variant="contained" color="warning" onClick={onEndElection}>
            End Current Election
          </Button>
        </div>
      ) : (
        <CreateElection />
      )}
    </div>
  );
};

export default CreateEndElection;
