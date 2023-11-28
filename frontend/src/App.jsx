import './App.css'
import Brand from './components/Brand'
import Dashboard from './dashboard'
import { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import React from 'react';


export default function App() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  // make transactions and stuff using provider.request()
  return (
    <div>
      <Brand />
      {provider
        ? <div>
            <h1>User is authenticated, can redirect, address: {account}</h1>
            <Dashboard />
          </div>
        : <ConnectWallet setProvider={setProvider} setAccount={setAccount} />
      }
    </div>
  )
}
