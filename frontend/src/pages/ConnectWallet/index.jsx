import React from "react";
import { useSDK } from '@metamask/sdk-react';
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';

export default function ConnectWallet({ setProvider, setAccount }) {
    const navigate = useNavigate();
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
            setProvider(provider);
            console.log(`Set account as ${accounts?.[0]}`);
            navigate("/dashboard");
        } catch (err) {
            console.log(`failed to connect..`, err);
        }
    };

    return (
        <Button onClick={connect}>
            Connect to MetaMask Wallet
        </Button>
    );
}
