import React, { useState } from 'react';
import Button from '../../components/Button';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const OptionsForm = ({ options, handleSubmitForm }) => {
    const [selectedOption, setSelectedOption] = useState('')

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleSubmit = () => {
        handleSubmitForm(selectedOption)
    }

    return (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {options?.map((item, index) => (
                <RadioOption key={index} selectedOption={selectedOption} handleRadioChange={handleRadioChange}>{item}</RadioOption>
            ))}
            <Button type="submit">Cast Vote</Button>
        </form>
    )
}

const RadioOption = ({ key, selectedOption, handleRadioChange, children }) => {
    return (
        <label className="flex items-center space-x-2">
            <input
            type="radio"
            value={children}
            checked={selectedOption === children}
            onChange={handleRadioChange}
            className="form-radio text-blue-500 h-5 w-5"
            />
            <span className="text-gray-700">{children}</span>
        </label>
    )
}

export default OptionsForm