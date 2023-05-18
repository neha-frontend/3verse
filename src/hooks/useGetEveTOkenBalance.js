import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import getWeb3 from '../getWeb3';
import useEveContract from './useEveContract';

function useGetEveTOkenBalance() {
  const { account } = useWeb3React();
  const [userBalance, setUserBalance] = useState(0);
  const evetokencontract = useEveContract();
  const getUserBalance = async () => {
    const web3 = await getWeb3();
    const evecontract = await evetokencontract;
    const balance = await evecontract.methods.balanceOf(account).call();
    setUserBalance(parseFloat(web3?.utils?.fromWei(balance)));
  };
  return { userBalance, getUserBalance };
}

export default useGetEveTOkenBalance;
