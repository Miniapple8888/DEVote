import React, { useState } from 'react';
import Button from './Button';
import { TextField } from '@mui/material';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const SearchForm = ({ handleSearchForm, validateSearchQuery }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        // check if it's a valid election id
        if (validateSearchQuery(searchQuery)) {
            setError(true)
            setErrorMsg("Invalid election address")
        } else {
            setError(false)
            setErrorMsg("")
            handleSearchForm(searchQuery)
        }
    }

    return (
        <form className="w-full flex flex-col items-center gap-3" onSubmit={handleSubmit}>
            <div className='flex justify-center items-center gap-3'>
                <TextField
                    label="Enter election ID..."
                    error={error}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setError(false) // Reset error when typing
                    }}
                    size='small'
                />
                <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
                    onClick={() => {
                        
                    }}
                >
                    Search
                </Button>
            </div>
            {error && <p className="text-red-500">{errorMsg}</p>}
        </form>
    )
}

export default SearchForm