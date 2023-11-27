import './App.css'
import { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import React from 'react';


export default function App() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  // make transactions and stuff using provider.request()
  return (
    <div>
      {provider
        ? <h1>User is authenticated, can redirect, address: {account}</h1>
        : <ConnectWallet setProvider={setProvider} setAccount={setAccount} />
      }
    </div>
  )
}
