import React, { useEffect, useState } from "react";
import { endElection, hasOngoingElection } from "../../contracts/devote";
import CreateElection from "./CreateElection";
import { Button } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import Header from "../../components/Header";

const CreateEndElection = () => {
  const [loading, setLoading] = useState(true);
  const [hasOngoing, setHasOngoing] = useState(false);
  const onEndElection = async () => {
    setLoading(true);
    const result = await endElection();
    if (result) {
      console.log("Election ended");
    } else {
      console.log("Election was already ended");
    }
    setHasOngoing(false);
    setLoading(false);
  };
  useEffect(() => {
    async function checkOngoingElection() {
      setHasOngoing(await hasOngoingElection());
      setLoading(false);
    }
    checkOngoingElection();
  }, []);
  return (
    <div className="w-full h-full">
      {loading ? (
        <LoadingScreen />
      ) : hasOngoing ? (
        <div className="flex flex-col gap-4 items-center">
            <Header>You already have an on going election</Header>
            <h1>Election ID: </h1>
            <Button
            variant="contained"
            color="warning"
            onClick={onEndElection}
            >
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
