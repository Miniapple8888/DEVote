import React, { useState } from 'react';
import FindElection from '../../components/FindElection';
import ElectionView from './ElectionView';
import Header from '../../components/Header';

const ViewResults = () => {
    const [election, setElection] = useState();
    const validateSearchQuery = ((searchQuery) => {
        return searchQuery.trim() === ''
    })
    const handleSearchForm = ((searchQuery) => {
        // TODO: make a backend call for election data
        const testElection = {
            timestamp: 10, candidates: ["mike", "mark", "james", "other"], candidateVotes: { "mike": 10, "mark": 2000, "james": 2000, "other": 10 }, hasEnded: true
        }
        // @ts-ignore
        setElection(testElection)
    })
    return (
        <div className='w-full h-full flex flex-col items-center gap-4'>
            <Header>View Election Results</Header>
            <FindElection handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} />
            {election && <ElectionView election={election} />}
        </div>
    )
}

export default ViewResults;
