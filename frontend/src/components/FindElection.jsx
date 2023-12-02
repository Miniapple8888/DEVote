import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const FindElection = ({ handleSearchForm, validateSearchQuery }) => {
    return (
        <div className='w-full h-full flex flex-col items-center gap-4'>
            <SearchForm handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} />
        </div>
    )
}

export default FindElection
