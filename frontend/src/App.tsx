import './App.css';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateElection from './components/CreateElection';
import CastVote from './components/CastVote';
import ViewResults from './components/ViewResults';
import RequireAuth from './RequireAuth';
import ConnectWallet from './components/ConnectWallet';

const App = () => {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  // make transactions and stuff using provider.request()
  return (
    <Routes>
      <Route path="/" element={
        <ConnectWallet setProvider={setProvider} setAccount={setAccount} />
      } />
      <Route path="/dashboard" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />
      <Route path="/createElection" element={
        <RequireAuth>
          <CreateElection provider={provider} />
        </RequireAuth>} />
      <Route path="/castVote" element={
        <RequireAuth>
          <CastVote />
        </RequireAuth>} />
      <Route path="/viewResults" element={
        <RequireAuth>
          <ViewResults />
        </RequireAuth>} />
    </Routes>
  );
};

export default App;
