import React from 'react'
import { useNavigate } from 'react-router-dom'

const Brand = () => {
    const navigate = useNavigate()
    // Combine Tailwind CSS heading classes with any additional custom classes
    const headingClasses = `text-4xl font-bold text-blue-500 mb-5 hover:cursor-pointer`

    const dashboard = () => {
      navigate("/dashboard")
    }
  
    return <a onClick={dashboard}><h1 className={headingClasses}>DEVote</h1></a>
  }
  
export default Brand
