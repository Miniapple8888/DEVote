import React, { useState } from 'react'
import FlashMsg from '../../components/FlashMsg'
import Header from '../../components/Header'
import FindElection from '../../components/FindElection'
import VoteForm from './VoteForm'

const CastVote = () => {
    const [electionAddress, setElectionAddress] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('')
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
        setAlertMsg("Successfully casted vote")
        setAlertSeverity("success")
    }

    return (
    <div>
        {alertMsg && <FlashMsg message={alertMsg} severity={alertSeverity} duration={3000} />}
        <Header>1. Cast vote</Header>
        {electionAddress == "" ?
         <FindElection handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} /> :
         <VoteForm electionAddr={electionAddress} candidates={randData} date="12/03/2024" handleCastedVote={handleCastedVote} />
        }
    </div>
    )
}

export default CastVote;
