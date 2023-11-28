import React from 'react'
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ account }) => {
    const navigate = useNavigate();
    const createElection = () => {
        navigate("/createElection");
    }

    const viewResults = () => {
        navigate("/viewResults");
    }

    const castVote = () => {
        navigate("/castVote");
    }
    return (
        <div>
            <p>Logged in as: {account}</p>
            <Button onClick={createElection}>Create Election</Button>
            <Button onClick={viewResults}>View Election Results</Button>
            <Button onClick={castVote}>Cast votes</Button>
        </div>
    )
}

export default Dashboard;
