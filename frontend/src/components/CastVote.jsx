import React, { useState } from 'react'
import Header from './common/Header';
import FindElection from './FindElection';
import VoteForm from './VoteForm';

const CastVote = () => {
    const [electionAddress, setElectionAddress] = useState('')
    const randData = ["John Doe", "Jane Doe"];

    const handleSearchForm = ((searchQuery) => {
        setElectionAddress(searchQuery);
        // retrieve candidates data from election id
        // maybe retrieve election expiration as well
    })

    const validateSearchQuery = ((searchQuery) => {
        return searchQuery.trim() === ''
    })

    const handleCastedVote = (vote) => {
        // do something with the vote (change smart contract)
        // ensure election Address exists
    }

    return (
    <div>
        <Header>1. Cast your vote</Header>
        {electionAddress == "" ?
         <FindElection handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} /> :
         <VoteForm electionAddr={electionAddress} candidates={randData} date="12/03/2024" handleCastedVote={handleCastedVote} />
        }
    </div>
    )
}

export default CastVote;
