import React, { useEffect, useState } from "react";
import "../App.css";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "../App.css";
import { connector } from "./connectors";
import { Modal, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import metalogo from "../assets/mm.png";
import coinlogo from "../assets/cbw.png";
import walletlogo from "../assets/wc.jpg";

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000/");
declare var window: any;
console.log("web3 property", web3);

let flag: boolean = false;

const MultiWallet = () => {
  const { active, activate, deactivate, account, chainId } = useWeb3React();
  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<any>("");
  const [chainID, setChainID] = useState<any>();
  const [state, setState] = useState<boolean>(false);

  const setProvider = (type: any) => {
    window.localStorage.setItem("provider", type);
  };

 

  const getUserAddress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const accountAddress = accounts[0];
    return accountAddress;
  };

  const getMainBalance = async () => {
    let address = await getUserAddress();
    let balance = await web3.eth.getBalance(address);
    let mainBalance = web3.utils.fromWei(balance);
    setBalance(mainBalance);
  };

  useEffect(() => {
    if (active) {
      getMainBalance();
    }
  }, [chainId]);

  const handleClose = () => {
    setOpen(false);
  };

  const disconnect = async () => {
    flag = false;
    try {
      await deactivate();
      setBalance("");
    } catch (err) {
      console.log("err is disconnect section", err);
    }
  };

  return (
    <>
      <div className="mainDisplay">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "8vh",
            background: "gray",
          }}
        >
          <h3>Multi-Wallet Integration</h3>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh",
            textOverflow: "break-word",
          }}
        >
          <div style={{ border: "2px solid gray", borderRadius: "8px" }}>
            <div style={{ textAlign: "center", margin: "10px" }}>
              {flag === false ? (
                <button
                  style={{
                    background: "blue",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Wallet-Connect
                </button>
              ) : (
                <button
                  style={{
                    background: "blue",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={disconnect}
                >
                  Disconnect
                </button>
              )}

              <div>
                <h3>Connection Status:</h3>
                {active ? (
                  <span style={{ color: "green" }}>Active</span>
                ) : (
                  <span style={{ color: "red" }}>Non-Active</span>
                )}
              </div>

              {flag === false ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p>Account:-</p>
                  <p>chainId:-</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p>Account:{account}</p>
                  <p>ChainId:{chainId}</p>
                </div>
              )}
            </div>
          </div>

          <Modal show={open} onHide={handleClose} centered>
            <Modal.Header>
              <Modal.Title>Multi Wallet Available</Modal.Title>
              <h3 style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
                X
              </h3>
            </Modal.Header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <div
                style={{ padding: "8px", textAlign: "center", margin: "5px" }}
              >
                <Image
                  src={metalogo}
                  alt="metamask logo"
                  width={25}
                  height={25}
                />
                <button
                  style={{
                    padding: "8px",
                    borderRadius: "2px solid pink",
                    border: "8px",
                  }}
                  onClick={() => {
                    flag = true;
                    activate(connector.injected);
                    handleClose();
                  }}
                >
                  Metamask Wallet
                </button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <div
                style={{ padding: "8px", textAlign: "center", margin: "5px" }}
              >
                <Image
                  src={coinlogo}
                  alt="metamask logo"
                  width={25}
                  height={25}
                />
                <button
                  style={{
                    padding: "8px",
                    borderRadius: "2px solid pink",
                    border: "5px",
                  }}
                  onClick={() => {
                    flag = true;
                    activate(connector.walletconnect);
                    handleClose();
                  }}
                >
                  Wallet Connector
                </button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <div
                style={{ padding: "8px", textAlign: "center", margin: "5px" }}
              >
                <Image
                  src={walletlogo}
                  alt="metamask logo"
                  width={25}
                  height={25}
                />
                <button
                  style={{
                    padding: "12px",
                    border: "5px",
                    borderRadius: "5px dotted green",
                  }}
                  onClick={() => {
                    flag = true;
                    activate(connector.coinbaseWallet);
                    handleClose();
                  }}
                >
                  Coinbase Wallet
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default MultiWallet;
