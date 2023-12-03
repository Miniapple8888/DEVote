import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import ListCard from "./ListCard";
import DashboardList from "./DashboardList";
import TwoColCard from "./TwoColCard";
import ElectionResultsCard from "./ElectionResultsCard";
import StatusText from "../../components/StatusText";
// import masterpiece from "./masterpiece.png";

const Dashboard = () => {
  const [account, setAccount] = useState("");
  const [userElection, setUserElection] = useState();
  const [allUserElections, setAllUserElections] = useState();
  const [userParticipatedElections, setUserParticipatedElections] = useState();
  const [userParticipatedElectionWinners, setUserParticipatedElectionWinners] =
    useState();

  const navigate = useNavigate();
  const createElection = () => {
    navigate("/createEndElection");
  };

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
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <p>Logged in as: {account}</p>
      <div className="flex justify-center items-center gap-5">
        <Button onClick={createElection}>Create/End Election</Button>
        <Button onClick={castVote}>Cast votes</Button>
        <Button onClick={viewParticipatedElections}>
          View All Participated Elections
        </Button>
        <Button onClick={viewResults}>Search Election Results</Button>
      </div>
      <div className="w-full h-full grid grid-cols-2 gap-4 p-4 grid-rows-2">
        {/* Your current election */}
        <DashboardCard>
          {!userElection ? (
            <div className="w-full h-full flex flex-col items-center gap-2">
              <h1 className="text-sm">Your Current Election Statistics</h1>
              <div className="w-full h-full flex justify-between gap-4">
                <div className="w-full flex flex-col">
                  <div className="w-full h-8 flex justify-between items-center p-3 border-b border-gray-400 bg-slate-50">
                    <div className="w-1/2 flex justify-center items-center font-semibold">
                      Candidate
                    </div>
                    <div className="w-1/2 flex justify-center items-center font-semibold">
                      Votes
                    </div>
                  </div>
                  <DashboardList>
                    <TwoColCard
                      name={"Miguel"}
                      value={`${2} votes`}
                      isCandidate={true}
                    />
                  </DashboardList>
                </div>
                <div className="w-0 h-full border-r border-gray-300"></div>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <h1 className="font-bold">Current Winner: </h1>
                  <p className=" font-bold border w-36 py-1 rounded-full flex items-center justify-center bg-blue-100 text-blue-500 border-blue-500">
                    Miguel
                  </p>
                  <p>Votes: 2</p>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-sm text-gray-700">
              You don't have an on going election
            </h1>
          )}
        </DashboardCard>

        {/* PARTICIPATED ELECTION WINNERS */}
        <DashboardCard>
          {!userParticipatedElectionWinners ? (
            <div className="w-full h-full flex flex-col items-center">
              <h1 className="text-sm mb-2">
                Winners of the elections you've participated
              </h1>
              <div className="w-full h-8 flex justify-between items-center p-3 border-b border-gray-400 bg-slate-50">
                <div className="w-1/3 flex justify-center items-center font-semibold">
                  Election ID
                </div>
                <div className="w-1/3 flex justify-center items-center font-semibold">
                  Winner
                </div>
                <div className="w-1/3 flex justify-center items-center font-semibold">
                  Votes
                </div>
              </div>
              <DashboardList>
                <ElectionResultsCard
                  candidateName={"Miguel"}
                  electionID={1}
                  numVotes={75}
                />
              </DashboardList>
            </div>
          ) : (
            <h1 className="text-sm text-gray-700">
              There are no final results for your participated elections
            </h1>
          )}
        </DashboardCard>

        {/* PARTICIPATED ON GOING ELECTIONS Participated On Going Elections*/}
        <DashboardCard>
          {!userParticipatedElections ? (
            <div className="w-full h-full flex flex-col items-center gap-2">
              <h1 className="text-sm">Participated Elections</h1>
              <div className="w-full h-full flex justify-between gap-4">
                <div className="w-full flex flex-col">
                  <div className="w-full h-8 flex justify-between items-center p-3 border-b border-gray-400 bg-slate-50">
                    <div className="w-1/2 flex justify-center items-center font-semibold">
                      Election ID
                    </div>
                    <div className="w-1/2 flex justify-center items-center font-semibold">
                      Status
                    </div>
                  </div>
                  <DashboardList>
                    <TwoColCard
                      name={1}
                      value={<StatusText status={true} />}
                      isCandidate={false}
                      clickHandler={() => {}}
                    />
                    <TwoColCard
                      name={1}
                      value={<StatusText status={true} />}
                      isCandidate={false}
                      clickHandler={() => {}}
                    />
                  </DashboardList>
                </div>
                <div className="w-0 h-full border-r border-gray-300"></div>
                <div className="w-1/3 flex flex-col items-center justify-center gap-4">
                  <h1 className="text-lg text-center">On Going Elections</h1>
                  <p className="text-center text-4xl font-semibold">2</p>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-sm text-gray-700">
              You haven't participated in any election
            </h1>
          )}
        </DashboardCard>

        {/* All your created elections */}
        <DashboardCard>
          {!allUserElections ? (
            <div className="w-full h-full flex flex-col items-center mb-2">
              <h1 className="text-sm">Created Elections</h1>
              <div className="w-full h-8 flex justify-between items-center p-3 border-b border-gray-400 bg-slate-50">
                <div className="w-1/2 flex justify-center items-center font-semibold">
                  Election ID
                </div>
                <div className="w-1/2 flex justify-center items-center font-semibold">
                  Status
                </div>
              </div>
              <DashboardList>
                <ListCard id={1} status={true} clickHandler={() => {}} />
              </DashboardList>
            </div>
          ) : (
            <h1 className="text-sm text-gray-700">
              You haven't created any elections
            </h1>
          )}
        </DashboardCard>
      </div>
      {/* <div className="w-full h-[38rem]">
        <img className="w-full h-full object-contain" src={masterpiece} alt="masterpiece" />
      </div> */}
    </div>
  );
};

export default Dashboard;
