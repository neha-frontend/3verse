import {
  COINBASE_COIN_LOGO,
  METAMASK_IMG,
  PROFILE_IMG,
  WALLET_CONNECT_LOGO
} from '../../../assets/images';

import './WalletRightSidebar.css';

function WalletRightSidebar() {
  return (
    <div className="walletSidebar-wrapper">
      <div className="walletSidebar-header d-flex align-items-center">
        <img src={PROFILE_IMG} className="walletSidebar-header-profile-img" alt="Profile-Img" />
        <p className="walletSidebar-header-title">My Wallet</p>
      </div>
      <div className="walletSidebar-content">
        <p className="walletSidebar-content-text">
          Please connect with any of the wallet to continue with the services.
        </p>
        <button className="walletSidebar-content-button d-flex align-items-center">
          <p className="walletSidebar-content-button-img mb-0">
            <img src={METAMASK_IMG} alt="metamask-icon"/>
          </p>
          <span className="walletSidebar-content-button-label">Metamask</span>
        </button>
        <button className="walletSidebar-content-button d-flex align-items-center">
          <p className="walletSidebar-content-button-img mb-0">
            <img src={WALLET_CONNECT_LOGO} alt="wallet-connect-icon"/>
          </p>
          <span className="walletSidebar-content-button-label">WalletConnect</span>
        </button>
        <button className="walletSidebar-content-button d-flex align-items-center">
          <p className="walletSidebar-content-button-img mb-0">
            <img src={COINBASE_COIN_LOGO} alt="coinbase-icon"/>
          </p>
          <span className="walletSidebar-content-button-label">Coinbase</span>
        </button>
      </div>
    </div>
  );
}

export default WalletRightSidebar;
