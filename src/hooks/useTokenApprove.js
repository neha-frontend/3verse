import { useWeb3React } from '@web3-react/core';
import { REACT_APP_MARKETPLACE_ADDRESS } from '../config/envConfig';

function useTokenApprove() {
  const { account } = useWeb3React();
  const approveTOken = async (web3, nftContract, callback, handlEerror) => {
    try {
      const gasPriceapprove = await web3.eth.getGasPrice();
      const allowance = await nftContract.methods
        .allowance(account, REACT_APP_MARKETPLACE_ADDRESS)
        .call();
      if (+allowance > 0) {
        callback();
      } else {
        const estimateGasapprove = await nftContract.methods
          .approve(
            REACT_APP_MARKETPLACE_ADDRESS,
            '115792089237316195423570985008687907853269984665640564039457584007913129639935'
          )
          .estimateGas({ from: account });
        await nftContract.methods
          .approve(
            REACT_APP_MARKETPLACE_ADDRESS,
            '115792089237316195423570985008687907853269984665640564039457584007913129639935'
          )
          .send({ from: account, gas: estimateGasapprove, gasPrice: gasPriceapprove })
          .on('receipt', (txhash) => {
            callback(txhash);
          });
      }
    } catch (error) {
      handlEerror(error);
    }
  };
  return { approveTOken };
}

export default useTokenApprove;
