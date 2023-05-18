import { COINBASE_ICON, METAMASK_ICON, WALLECT_CONNECT_ICON } from '../../../assets/images';

export const walletOptions = [
  {
    id: 1,
    img: METAMASK_ICON,
    walletName: 'MetaMask',
    connectedWallet: 'metamask'
  },
  {
    id: 2,
    img: WALLECT_CONNECT_ICON,
    walletName: 'Wallect Connect',
    connectedWallet: 'walletconnect'
  },
  { id: 3, img: COINBASE_ICON, walletName: 'Coinbase', connectedWallet: 'coinbase' }
];
