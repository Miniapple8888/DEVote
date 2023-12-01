import React from 'react';
import Header from '../../components/Header';
import OptionsForm from './OptionsForm';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const VoteForm = ({ electionAddr, candidates, date, handleCastedVote }) => {
    return (
    <div>
        <Header>Cast Vote for Election {electionAddr}</Header>
        <p>Election ending on {date}</p>
        <OptionsForm options={candidates} handleSubmitForm={handleCastedVote} />
    </div>
    )
}
  
export default VoteForm;
