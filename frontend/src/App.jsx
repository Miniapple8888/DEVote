import "./App.css";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateElection from "./pages/CreateElection";
import CastVote from "./pages/CastVote";
import ViewResults from "./pages/ViewResults";
import RequireAuth from "./RequireAuth";
import ConnectWallet from "./pages/ConnectWallet";
import Brand from "./components/Brand";

const App = () => {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  // make transactions and stuff using provider.request()
  return (
    <>
      <Brand />
      <Routes>
        <Route
          path="/"
          element={
            <ConnectWallet setProvider={setProvider} setAccount={setAccount} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/createElection"
          element={
            <RequireAuth>
              <CreateElection />
            </RequireAuth>
          }
        />
        <Route
          path="/castVote"
          element={
            <RequireAuth>
              <CastVote />
            </RequireAuth>
          }
        />
        <Route
          path="/viewResults"
          element={
            <RequireAuth>
              <ViewResults />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
