import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const ElectionView = ({ election }) => {
    const { timestamp, candidates, candidateVotes, hasEnded } = election;
    const winner = Object.keys(candidateVotes).reduce((a, b) => candidateVotes[a] >= candidateVotes[b] ? a : b);
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center'>
            <h1 className='text-2xl' >Results for {hasEnded ? "completed" : "ongoing"} election started at {new Date(timestamp * 1000).toISOString().slice(0, -5)}:</h1>
            {hasEnded && <h3 className='text-xl' >The winner of the election is: <b>{winner}</b></h3>}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Candidate Name</b></TableCell>
                            <TableCell align='right'><b>Vote Count</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            candidates.map((candidate) => (
                                <TableRow key={candidate} sx={{ background: (candidate === winner ? "snow" : "") }} >
                                    <TableCell>{candidate}</TableCell>
                                    <TableCell align='right'>{candidateVotes[candidate]}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ElectionView;
