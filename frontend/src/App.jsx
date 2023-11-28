import './App.css'
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateElection from './components/CreateElection';
import CastVote from './components/CastVote';
import ViewResults from './components/ViewResults';


const App = () => {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  // make transactions and stuff using provider.request()
  return (
    <>
      <Routes>
        <Route path="/" element={<ConnectWallet setProvider={setProvider} setAccount={setAccount} />} />
        <Route path="/dashboard" element={<Dashboard account={account} />} />
        <Route path="/createElection" element={<CreateElection />} />
        <Route path="/castVote" element={<CastVote />} />
        <Route path="/viewResults" element={<ViewResults />} />
      </Routes>
    </>
  );
};

export default App;
