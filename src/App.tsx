import React, { useState } from "react";
import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import MultiWallet from "./MultiWalletIntegration/MultiWallet";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getProvider = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

function App() {
  return (
    <>
       <Web3ReactProvider getLibrary={getProvider}>
        <MultiWallet />
        <ToastContainer />
      </Web3ReactProvider>
    </>
  );
}

export default App;
