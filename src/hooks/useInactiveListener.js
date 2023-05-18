/* eslint-disable no-console */
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../utils/connectors';

const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React();
  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        activate(injected, undefined, true).catch(err => {
          console.error('Failed to activate after chain changed', err);
        });
      };
      const handleAccountsChanged = accounts => {
        if (accounts.length > 0) {
          activate(injected, undefined, true).catch(err => {
            console.error('Failed to activate after accounts changed', err);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
};

export default useInactiveListener;
