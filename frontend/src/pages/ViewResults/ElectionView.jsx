import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const ElectionView = ({ election }) => {
  const { timestamp, candidateVotes, hasEnded } = election;
  const winner = candidateVotes.reduce((a, b) =>
    a.numVotes >= b.numVotes ? a : b
  );

  const date = new Date(timestamp * 1000).toISOString().slice(0, -5).split("T")[0];
  const time = new Date(timestamp * 1000).toISOString().slice(0, -5).split("T")[1]

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <h1 className="text-2xl">
        Results for election started at{" "}
        {`${date} ${time}`}
      </h1>
      {hasEnded && (
        <h3 className="text-xl">
          The winner of the election is: <b>{winner.candidate}</b>
        </h3>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Candidate Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Vote Count</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidateVotes.map((results) => (
              <TableRow
                key={results.candidate}
                sx={{ background: results === winner ? "snow" : "" }}
              >
                <TableCell>{results.candidate}</TableCell>
                <TableCell align="right">{results.numVotes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ElectionView;
