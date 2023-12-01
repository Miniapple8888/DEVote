import React from 'react'
import Header from './common/Header'
import SearchForm from './common/SearchForm'
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const FindElection = ({ handleSearchForm, validateSearchQuery }) => {
    return (
        <div>
            <Header>Enter election address</Header>
            <SearchForm handleSearchForm={handleSearchForm} validateSearchQuery={validateSearchQuery} />
        </div>
    )
}

export default FindElection
