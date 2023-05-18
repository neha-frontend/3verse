import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { REACT_APP_INFURAURL, REACT_APP_POLYGON_CHAIN } from './config/envConfig';

const INFURA_NETWORK_URLS = {
  [parseInt(REACT_APP_POLYGON_CHAIN)]: REACT_APP_INFURAURL
};

const getWeb3 = async () => {
  let web3;
  const connectedWallet = sessionStorage.getItem('connectedWallet');
  if (connectedWallet === 'walletconnect') {
    const provider = new WalletConnectProvider({
      rpc: INFURA_NETWORK_URLS
    });
    await provider.enable();
    web3 = new Web3(provider);
  } else if (connectedWallet === 'metamask') {
    const { ethereum } = window;
    let provider = ethereum;
    web3 = new Web3(provider);
  } else {
    const provider = new Web3.providers.HttpProvider(
      'https://polygon-mumbai.g.alchemy.com/v2/ihkSLgfY_BraYV4I6sJJ5tMBgpiaV7g9'
    );
    web3 = new Web3(provider);
  }
  return web3;
};

export default getWeb3;
