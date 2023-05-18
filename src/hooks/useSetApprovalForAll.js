import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

function useSetApprovalForAll(address) {
  const { account } = useWeb3React();
  const setApprovalforall = useCallback(async (web3, nftcontract, callback, handleError) => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const estimateGas = await nftcontract.methods.setApprovalForAll(address, true).estimateGas({
        from: account
      });
      nftcontract.methods
        .setApprovalForAll(address, true)
        .send({
          from: account,
          gasPrice,
          gas: estimateGas
        })
        .then(() => {
          callback();
        })
        .catch((error) => {
          handleError(error);
        });
      // .on('receipt', () => {
      //   callback();
      // });
    } catch (error) {
      handleError(error);
    }
  }, []);

  return { setApprovalforall };
}

export default useSetApprovalForAll;
