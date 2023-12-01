import React, { useEffect, useState } from 'react';
import { endElection, hasElectionGoing } from '../../contracts/devote';
import CreateElection from './CreateElection';
import { Button, CircularProgress } from '@mui/material';

const CreateEndElection = () => {
    const [loading, setLoading] = useState(true);
    const [hasOngoing, setHasOngoing] = useState(false);
    useEffect(() => {
        async function hasOngoingElection() {
            setHasOngoing(await hasElectionGoing());
            setLoading(false);
        }
        hasOngoingElection()
    }, []);
    return (
        <>
            {
                loading
                    ? <><CircularProgress /><p>This could take a while</p></>
                    : (hasOngoing
                        ? <Button variant='contained' color='warning' onClick={async () => endElection()}>End Current Election</Button>
                        : <CreateElection />)
            }
        </>);
}

export default CreateEndElection;