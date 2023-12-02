import "./App.css";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateEndElection from "./pages/CreateEndElection";
import CastVote from "./pages/CastVote";
import ViewResults from "./pages/ViewResults";
import RequireAuth from "./RequireAuth";
import ConnectWallet from "./pages/ConnectWallet";
import Brand from "./components/Brand";
import ViewParticipatedElections from "./pages/ViewParticipatedElections";

const App = () => {
  // make transactions and stuff using provider.request()
  return (
    <div className="w-full h-full flex items-center flex-col py-8 px-20 gap-4">
      <Brand />
      <Routes>
        <Route
          path="/"
          element={
            <ConnectWallet />
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
          path="/createEndElection"
          element={
            <RequireAuth>
              <CreateEndElection />
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
        <Route
          path="/participatedElections"
          element={
            <RequireAuth>
              <ViewParticipatedElections />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
