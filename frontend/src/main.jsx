import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MetaMaskProvider } from '@metamask/sdk-react';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MetaMaskProvider sdkOptions={{
        dappMetadata: {
          name: "DEVote",
        }
      }}>
        <App />
      </MetaMaskProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
