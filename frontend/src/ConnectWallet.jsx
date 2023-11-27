import React, { useState } from "react";
import { useSDK } from '@metamask/sdk-react';

export default function ConnectWallet({ setProvider, setAccount }) {
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
            setProvider(provider);
        } catch (err) {
            console.log(`failed to connect..`, err);
        }
    };

    return (
        <button style={{ padding: 10, margin: 10 }} onClick={connect}>
            Connect
        </button>
    );
}