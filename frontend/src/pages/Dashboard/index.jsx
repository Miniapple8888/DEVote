import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [account, setAccount] = useState('');
  const navigate = useNavigate();
  const createElection = () => {
    navigate("/createEndElection");
  }

  const viewResults = () => {
    navigate("/viewResults");
  };

  const castVote = () => {
    navigate("/castVote");
  };

  const viewParticipatedElections = () => {
    navigate("/participatedElections");
  };
  useEffect(() => {
    async function getAccount() {
      setAccount(
        (await window.ethereum.request({ method: "eth_accounts" }))[0]
      );
    }
    getAccount();
  }, []);
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <p>Logged in as: {account}</p>
      <div className="flex justify-center items-center gap-5">
        <Button onClick={createElection}>Create/End Election</Button>
        <Button onClick={castVote}>Cast votes</Button>
        <Button onClick={viewParticipatedElections}>
          View Participated Elections
        </Button>
        <Button onClick={viewResults}>View Election Results</Button>
      </div>
    </div>
  );
};

export default Dashboard;
