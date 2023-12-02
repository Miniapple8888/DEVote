import React, { useState } from 'react'
import FlashMsg from '../../components/FlashMsg'
import Header from '../../components/Header'
import FindElection from '../../components/FindElection'
import VoteForm from './VoteForm'
import { getElection, castVoteOnElection } from "../../contracts/devote";

const CastVote = () => {
    const [electionAddress, setElectionAddress] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('')
    const [candidates, setCandidates] = useState([])
    const [timestamp, setTimestamp] = useState('')

    const handleSearchForm = (async (searchQuery) => {
        try {
            getElection(BigInt(electionAddress))
                .then(({ _timestamp, _candidates }) => {
                    setCandidates([...candidates, ..._candidates])
                    console.log(candidates)
                    const timestampInMilliseconds = parseInt(_timestamp) * 1000;
                    const date = new Date(timestampInMilliseconds);
                    setTimestamp(date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: 'UTC', // Adjust the timezone as needed
                    }))
                    setElectionAddress(searchQuery);
                }).catch(err => {
                    console.log(err)
                    throw(err)
                })
            
        } catch (err) {
            console.log(err)
            setAlertMsg("Election id is invalid!")
            setAlertSeverity("error")
            setElectionAddress('')
        }
    })

    const validateSearchQuery = ((searchQuery) => {
        return searchQuery.trim() === ''
    })

    const handleCastedVote = async (vote) => {
        try {
            await castVoteOnElection(electionAddress, vote)
            setAlertMsg("Successfully casted vote")
            setAlertSeverity("success")
        } catch (err) {
            console.log(err)
            setAlertMsg("Vote is invalid. Try again!")
            setAlertSeverity("error")
        }
    }

    return (
        <div>
            {alertMsg && <FlashMsg message={alertMsg} severity={alertSeverity} duration={3000} />}
            <Header>1. Cast vote</Header>
            {electionAddress == "" ?
                <FindElection handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} /> :
                <VoteForm electionAddr={electionAddress} candidates={candidates} date={timestamp} handleCastedVote={handleCastedVote} />
            }
        </div>
    )
}

export default CastVote;
