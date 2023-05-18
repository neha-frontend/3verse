import { useMemo } from 'react';
import getWeb3 from '../getWeb3';

const useContract = (address = undefined, ABI) =>
  useMemo(async () => {
    if (!address || !ABI) return null;
    try {
      const web3 = await getWeb3();
      const contractInstance = new web3.eth.Contract(ABI, address);
      return contractInstance;
    } catch (error) {
      // console.error('Failed to get contract', error);
      return null;
    }
  }, [ABI, address]);
export default useContract;
