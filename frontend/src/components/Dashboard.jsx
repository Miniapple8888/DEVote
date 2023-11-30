import React, { useEffect, useState } from 'react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [account, setAccount] = useState('');
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
    useEffect(() => {
        async function getAccount() {
            setAccount((await window.ethereum.request({ method: 'eth_accounts' }))[0]);
        }
        getAccount()
    }, []);
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
