import { useEffect, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React } from '@web3-react/core';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';

import { COINBASE_ICON, METAMASK_ICON, WALLECT_CONNECT_ICON } from '../../../assets/images';
import { SubHeaderLayout } from '../../../layout';
import WalletCard from './WalletCard';
import { injected, RenderIf, walletconnect, walletLink } from '../../../utils';
import { AlertMessageModal, TrimWallet } from '../../../components';
import { walletOptions } from './walletData';

import './wallet.css';

function SelectWallet() {
  const { activate, connector, account } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();
  const onboarding = useRef();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const location = useLocation();
  const navigate = useNavigate();
  const onLinkConnectClick = () => {
    setActivatingConnector(walletLink);
    activate(walletLink);
    sessionStorage.setItem('connectedWallet', 'coinbase');
    if (location.state.from === 'mint') navigate('/mint');
    else if (location.state.from === 'fusion') navigate('/fusion');
  };

  const onConnectWithWalletConnectClick = () => {
    if (connector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }
    setActivatingConnector(walletconnect);
    activate(walletconnect);
    sessionStorage.setItem('connectedWallet', 'walletconnect');
    sessionStorage.setItem('shouldEagerConnect', true);
    if (location.state.from === 'mint') navigate('/mint');
    else if (location.state.from === 'fusion') navigate('/fusion');
  };

  const onConnectWithMetamaskClick = () => {
    if (!window.ethereum) {
      window.open('https://metamask.app.link/dapp/stageapp.theonegame.io/');
      return;
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      // const metamaskProvider = window.ethereum.providers.find(provider => provider.isMetaMask);
      if (isMobile) {
        activate(injected);
        setActivatingConnector(injected);
        sessionStorage.setItem('connectedWallet', 'metamask');
        sessionStorage.setItem('shouldEagerConnect', true);
        if (location.state.from === 'mint') navigate('/mint');
        else if (location.state.from === 'fusion') navigate('/fusion');
      } else {
        const { ethereum } = window;
        let provider = ethereum;
        if (ethereum.providers) {
          provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        }
        provider
          .request({
            method: 'wallet_requestPermissions',
            params: [
              {
                eth_accounts: {}
              }
            ]
          })
          .then(() => {
            setActivatingConnector(injected);
            activate(injected);
            sessionStorage.setItem('connectedWallet', 'metamask');
            sessionStorage.setItem('shouldEagerConnect', true);
            if (location.state.from === 'mint') navigate('/mint');
            else if (location.state.from === 'fusion') navigate('/fusion');
          });
      }
      // setActivatingConnector(injected);
      // activate(injected);
    } else {
      onboarding.current.startOnboarding();
    }
  };
  // For Metamask OnBoarding
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  return (
    <SubHeaderLayout mainClassName="wallet-wrapper">
      <div className="wallet_main">
        <div className="wallet_head">{account ? 'Wallet Connected' : 'Connect wallet'}</div>
        <div className="wallet_desc">
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing eli nsectetur adipiscing elit. */}
        </div>
        <RenderIf isTrue={!account}>
          <div className="row">
            <div
              className="col-md-4 col-12"
              onClick={onConnectWithMetamaskClick}
              role="presentation">
              <WalletCard
                img={METAMASK_ICON}
                walletName="MetaMask"
                // walletDesc="Vivamus a magna leo. Praesent bibendum, elit sit amet."
              />
            </div>
            <div
              className="col-md-4 col-12 my-md-0 my-3"
              onClick={onConnectWithWalletConnectClick}
              role="presentation">
              <WalletCard
                img={WALLECT_CONNECT_ICON}
                walletName="Wallect Connect"
                // walletDesc="Vivamus a magna leo. Praesent bibendum, elit sit amet."
              />
            </div>
            <div className="col-md-4 col-12" onClick={onLinkConnectClick} role="presentation">
              <WalletCard
                img={COINBASE_ICON}
                walletName="Coinbase"
                // walletDesc="Vivamus a magna leo. Praesent bibendum, elit sit amet."
              />
            </div>
          </div>
        </RenderIf>
        <RenderIf isTrue={account}>
          <div className="row">
            <div className="col-md-4 col-12" role="presentation">
              {walletOptions
                .filter(
                  (data) => data.connectedWallet === sessionStorage.getItem('connectedWallet')
                )
                .map((data) => {
                  return (
                    <WalletCard
                      key={data.id}
                      img={data.img}
                      walletName={data.walletName}
                      walletDesc={TrimWallet(account)}
                      disconnect="Disconnect"
                    />
                  );
                })}
            </div>
          </div>
        </RenderIf>
        <AlertMessageModal />
      </div>
    </SubHeaderLayout>
  );
}

export default SelectWallet;
