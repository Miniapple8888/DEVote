import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Form, useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import ListCard from "./ListCard";
import DashboardList from "./DashboardList";
import TwoColCard from "./TwoColCard";
import ElectionResultsCard from "./ElectionResultsCard";
import StatusText from "../../components/StatusText";
import {
  getElectionResults,
  getElectionsForUser,
  getOngoingElectionID,
} from "../../contracts/devote";
import FourColCard from "./FourColCard";
// import masterpiece from "./masterpiece.png";

const Dashboard = () => {
  const [account, setAccount] = useState("");
  const [userElection, setUserElection] = useState();
  // @ts-ignore
  const [userParticipatedElections, setUserParticipatedElections] = useState();
  // @ts-ignore
  const [userParticipatedElectionWinners, setUserParticipatedElectionWinners] =
    useState();
  const [currentElectionWinner, setCurrentElectionWinner] = useState();
  const [currentElectionID, setCurrentElectionID] = useState();

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

    async function getUserOnGoingElection() {
      const electionID = await getOngoingElectionID();
      if (electionID != -1) {
        const { candidateVotes, candidates } = await getElectionResults(
          parseInt(electionID)
        );
        const electionResults = [];

        candidates.map((candidate, index) => {
          electionResults.push({
            candidate: candidate,
            numVotes: parseInt(candidateVotes[index]),
          });
        });

        setCurrentElectionWinner(
          electionResults.reduce((a, b) => (a.numVotes > b.numVotes ? a : b))
        );
        // @ts-ignore
        setCurrentElectionID(parseInt(electionID));

        // @ts-ignore
        setUserElection(electionResults);
      }
    }

    async function getParticipatedElectionResults() {
      const { electionIDs } = await getElectionsForUser();
      const elections = [];
      const winners = [];
      await Promise.all(
        electionIDs.map(async (election) => {
          elections.push(await getElectionResults(parseInt(election)));
        })
      );

      elections.map((election, index) => {
        const winnerVotes = election.candidateVotes.reduce((a, b) =>
          parseInt(a) >= parseInt(b) ? a : b
        );

        const candidate =
          election.candidates[election.candidateVotes.indexOf(winnerVotes)];

        const winner = {
          electionID: parseInt(electionIDs[index]),
          candidate: candidate,
          votes: parseInt(winnerVotes),
          hasEnded: election.hasEnded,
        };
        winners.push(winner);
      });
      // @ts-ignore
      setUserParticipatedElectionWinners(winners);
    }

    try {
      getAccount();
      getUserOnGoingElection();
      getParticipatedElectionResults();
    } catch (err) {
      console.log(err);
    }
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
          {userElection ? (
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
                    {userElection
                      // @ts-ignore
                      .map((candidateVotes) => (
                        <TwoColCard
                          name={candidateVotes.candidate}
                          value={`${candidateVotes.numVotes} votes`}
                          isCandidate={true}
                        />
                      ))}
                  </DashboardList>
                </div>
                <div className="w-0 h-full border-r border-gray-300"></div>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <p className="text-lg font-semibold">
                    Election ID: {currentElectionID}
                  </p>
                  <h1 className="font-semibold">Current Winner</h1>
                  <p className=" font-bold text-2xl w-36 flex items-center justify-center text-blue-500">
                    {
                      // @ts-ignore
                      currentElectionWinner.candidate
                    }
                  </p>
                  <p>
                    Votes:{" "}
                    {
                      // @ts-ignore
                      currentElectionWinner.numVotes
                    }
                  </p>
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
          {userParticipatedElectionWinners ? (
            <div className="w-full h-full flex flex-col items-center">
              <h1 className="text-sm mb-2">
                Statistics of participated elections
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

        {/* PARTICIPATED ENDED ELECTIONS */}
        <DashboardCard span={true}>
          {userParticipatedElectionWinners ? (
            <div className="w-full h-full flex flex-col items-center gap-2">
              <h1 className="text-sm">Winner of your participated elections</h1>
              <div className="w-full flex flex-col">
                <div className="w-full h-8 flex justify-between items-center p-3 border-b border-gray-400 bg-slate-50">
                  <div className="w-1/4 flex justify-center items-center font-semibold">
                    Election ID
                  </div>
                  <div className="w-1/4 flex justify-center items-center font-semibold">
                    Winner
                  </div>
                  <div className="w-1/4 flex justify-center items-center font-semibold">
                    Votes
                  </div>
                  <div className="w-1/4 flex justify-center items-center font-semibold">
                    Status
                  </div>
                </div>
                <DashboardList>
                  {
                    // @ts-ignore
                    userParticipatedElectionWinners.map((election) => (
                      <FourColCard
                        candidate={election.candidate}
                        clickHandler={() => {
                          navigate(`/viewResults?electionID=${election.electionID}`)
                        }}
                        name={election.electionID}
                        status={election.hasEnded}
                        votes={election.votes}
                      />
                    ))
                  }
                </DashboardList>
              </div>
            </div>
          ) : (
            <h1 className="text-sm text-gray-700">
              There are no ended elections that you have participated in
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
