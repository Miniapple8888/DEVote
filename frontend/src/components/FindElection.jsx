import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const FindElection = ({ handleSearchForm, validateSearchQuery }) => {
    return (
        <div>
            <Header>Enter election ID</Header>
            <SearchForm handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} />
        </div>
    )
}

export default FindElection
