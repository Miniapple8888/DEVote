import React from 'react'
import Button from './components/Button';
import './index.css'

function createElection() {
    console.log("Election created");
}

function viewResults() {
    console.log("View Election Results");
}

function castVote() {
    console.log("Cast Election Vote");
}

const Dashboard = () => {
    return (
        <div>
            <Button onClick={createElection}>Create Election</Button>
            <Button onClick={viewResults}>View Election Results</Button>
            <Button onClick={castVote}>Cast votes</Button>
        </div>
    )
}

export default Dashboard;
