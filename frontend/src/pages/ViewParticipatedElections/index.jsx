import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";

const ViewParticipatedElections = () => {
  const testExamples = [
    {
      electionID: "1",
      hasEnded: false,
    },
    {
      electionID: "2",
      hasEnded: true,
    },
    {
      electionID: "3",
      hasEnded: false,
    },
    {
      electionID: "4",
      hasEnded: true,
    },
    {
      electionID: "5",
      hasEnded: false,
    },
    {
      electionID: "6",
      
      hasEnded: false,
    },
    {
      electionID: "7",
      hasEnded: false,
    },
    {
      electionID: "8",
      hasEnded: false,
    },
    {
      electionID: "9",
      hasEnded: false,
    },
    {
      electionID: "10",
      hasEnded: false,
    },
    {
      electionID: "11",
      hasEnded: false,
    },
  ];
  const [elections, setElections] = useState(testExamples);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Elections you've participated in</h1>
      <div className="w-full h-[30rem] overflow-y-auto">
        <table className="w-full h-full">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-blue-500 text-white font-medium py-2">
                ID of elections
              </th>
              <th className="bg-blue-500 text-white font-medium py-2 border-x-2 border-white">
                Status
              </th>
              <th className="bg-blue-500 text-white font-medium py-2">
                Actions
              </th>
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
      </div>
    </div>
  );
};

export default ViewParticipatedElections;
