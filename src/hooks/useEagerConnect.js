/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, walletLink } from '../utils/connectors';

const useEagerConnect = () => {
  const { active, error, activate } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const connectedWallet = sessionStorage.getItem('connectedWallet');
    if (connectedWallet === 'metamask') {
      injected
        .isAuthorized()
        .then((isAuthorized) => {
          setTried(true);
          activate(injected);
        })
        .catch(() => {
          setTried(true);
        });
    }
    if (connectedWallet === 'walletconnect') {
      activate(walletconnect, undefined, true).catch((err) => {
        setTried(true);
        walletconnect.walletConnectProvider = undefined;
      });
    } else if (connectedWallet === 'coinbase') {
      activate(walletLink, undefined, true).catch((err) => {
        setTried(true);
      });
    } else {
      return;
    }
  }, [activate]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export default useEagerConnect;
