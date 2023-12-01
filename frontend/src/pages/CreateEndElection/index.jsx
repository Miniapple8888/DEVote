import React, { useEffect, useState } from 'react';
import { endElection, hasOngoingElection } from '../../contracts/devote';
import CreateElection from './CreateElection';
import { Button, CircularProgress } from '@mui/material';

const CreateEndElection = () => {
    const [loading, setLoading] = useState(true);
    const [hasOngoing, setHasOngoing] = useState(false);
    const onEndElection = async () => {
        const result = await endElection();
        if (result) {
            console.log("Election ended");
        } else {
            console.log("Election was already ended")
        }
        setHasOngoing(false);
    }
    useEffect(() => {
        async function checkOngoingElection() {
            setHasOngoing(await hasOngoingElection());
            setLoading(false);
        }
        checkOngoingElection()
    }, []);
    return (
        <>
            {
                loading
                    ? <><CircularProgress /><p>This could take a while</p></>
                    : (hasOngoing
                        ? <Button variant='contained' color='warning' onClick={onEndElection}>End Current Election</Button>
                        : <CreateElection />)
            }
        </>);
}

export default CreateEndElection;