import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";
import TableHeader from "./TableHeader";
import { getElectionsForUser } from "../../contracts/devote";
import Header from "../../components/Header";

const ViewParticipatedElections = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function getElections() {
      const { electionIDs, electionStatuses } = await getElectionsForUser();
      let elections = [];
      for (let i = 0; i < electionIDs.length; i++) {
        elections.push({
          electionID: electionIDs[i],
          hasEnded: electionStatuses[i],
        });
      }
      setElections(elections);
    }
    getElections();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <Header>Elections you've participated in</Header>
      <div className="w-full h-[40rem] overflow-y-auto border rounded-lg shadow-sm bg-slate-100">
        {elections.length > 0 ? (
          <table className="w-full h-full">
            <thead className="sticky top-0">
              <tr>
                <TableHeader header={"ID of election"} />
                <TableHeader header={"Status"} />
                <TableHeader header={"Actions"} />
              </tr>
            </thead>
            <tbody>
              {elections.map((election) => (
                <tr
                  key={election.electionID}
                  className="bg-gray-100 last:border-0 border-b-2 border-white hover:bg-gray-200"
                >
                  <td className="py-3">
                    <div className="flex justify-center items-center">
                      {election.electionID}
                    </div>
                  </td>
                  <td className="w-1/6 border-x-2 border-white">
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-28 border rounded-full ${
                          election.hasEnded
                            ? "text-green-800 border-green-800 bg-green-200"
                            : "text-yellow-800 border-yellow-800 bg-yellow-100"
                        }`}
                      >
                        {`${election.hasEnded ? "Ended" : "On going"}`}
                      </div>
                    </div>
                  </td>
                  <td className="w-1/4">
                    <div className="flex justify-center items-center gap-4">
                      <IconButton
                        text={"Election Results"}
                        onClick={() => {}}
                        disabled={!election.hasEnded}
                      />
                      <IconButton
                        text={"Recast vote"}
                        onClick={() => {}}
                        disabled={election.hasEnded}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-lg ">You haven't participated in any elections</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewParticipatedElections;
