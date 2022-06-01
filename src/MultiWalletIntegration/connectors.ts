import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const infuraId = process.env.INFURA_ID;
const supportedChainIds = [1, 3, 4, 5, 42, 56, 97];

const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${infuraId}`,
  4: `https://rinkeby.infura.io/v3/${infuraId}`,
};

// metamask connector
const injected = new InjectedConnector({
  supportedChainIds,
});

// wallet connecor
const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    4: RPC_URLS[4],
  },
  qrcode: true,
  infuraId: infuraId,
  supportedChainIds,
});

// coinbase connector
const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${infuraId}`,
  appName: "react-with-typescript",
  supportedChainIds,
});

//for error msg
export const resetWalletConnector = (connector: any) => {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
};

export const connector = {
  injected: injected,
  walletconnect: walletconnect,
  coinbaseWallet: walletlink,
};
