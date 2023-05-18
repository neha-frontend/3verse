import { useWeb3React } from '@web3-react/core';

function WalletCard({ img = '', walletName = '', walletDesc = '', disconnect = '' }) {
  const { deactivate } = useWeb3React();

  return (
    <div className="wallet_card">
      <img src={img} alt="wallet" />
      <div className="wallet-card-title">{walletName}</div>
      <div className="wallet-card-text">{walletDesc}</div>
      <div className="wallet-card-text wallet_diconnect" onClick={() => deactivate()}>
        {disconnect}
      </div>
    </div>
  );
}

export default WalletCard;
