import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

export default function ConnectWallet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      setLoading(true);
      const accounts = await sdk?.connect();
      console.log(`Set account as ${accounts?.[0]}`);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.log(`failed to connect..`, err);
    }
  };

  if (connected) {
    navigate("/dashboard");
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Button onClick={connect}>Connect to MetaMask Wallet</Button>
      )}
    </>
  );
}
