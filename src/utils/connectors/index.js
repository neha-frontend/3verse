import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// Add different connectors
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { REACT_APP_POLYGON_CHAIN} from '../../config/envConfig';

const ALL_SUPPORTED_CHAIN_IDS = [parseInt(REACT_APP_POLYGON_CHAIN)];

const INFURA_NETWORK_URLS = {
  // 1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  // 4: `https://rinkeby.infura.io/v3/d463c533cf21421ea839bb5030b39f3c`,
  // 137: `https://polygon-mainnet.g.alchemy.com/v2/S_VQA-Vef0sryhaVNIC5lK0CLuKoyqlx`,
  [parseInt(REACT_APP_POLYGON_CHAIN)]: `https://polygon-mumbai.g.alchemy.com/v2/k8eQGQDtTk8X8EyDrhxrQHeMsTXzVoUk`
};

const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS // Change according to supported Network Ids
});

const walletconnect = new WalletConnectConnector({
  rpc: INFURA_NETWORK_URLS,
  qrcode: true,
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
});

const walletLink = new WalletLinkConnector({
  url: INFURA_NETWORK_URLS[1], // Change according to supported Network Id
  appName: 'onecoin',
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
});

export { injected, walletconnect, walletLink };
