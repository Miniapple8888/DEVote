import React, { useState } from 'react';
import FindElection from './FindElection';
import ElectionView from './ElectionView';

const ViewResults = () => {
    const [election, setElection] = useState();
    const validateSearchQuery = ((searchQuery) => {
        return searchQuery.trim() === ''
    })
    const handleSearchForm = ((searchQuery) => {
        // TODO: make a backend call for election data
        const testElection = {
            timestamp: 10, candidates: ["mike", "mark", "james", "other"], candidateVotes: { "mike": 10, "mark": 2000, "james": 30, "other": 10 }, hasEnded: true
        }
        // @ts-ignore
        setElection(testElection)
    })
    return (
        <div>
            <FindElection handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} />
            {election && <ElectionView election={election} />}
        </div>
    )
}

export default ViewResults;
