import React from 'react';
import Header from '../../components/Header';
import OptionsForm from './OptionsForm';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const VoteForm = ({ electionAddr, candidates, date, handleCastedVote }) => {
    return (
    <div className='flex flex-col items-center gap-4'>
        <Header>Cast Vote for Election {electionAddr}</Header>
        <p>Election started on {date}</p>
        <OptionsForm options={candidates} handleSubmitForm={handleCastedVote} />
    </div>
    )
}
  
export default VoteForm;
