import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import getWeb3 from '../getWeb3';
import { useNftMarketplaceContract } from './index';

const useRemoveFromSalehook = () => {
  const marketplacecontract = useNftMarketplaceContract();
  const { account } = useWeb3React();
  const removeFromSale = useCallback(async (variable, callback, handleError) => {
    const { tokenId, listId, nftAddress } = variable;
    try {
      const web3 = await getWeb3();
      const marketplacecontractinstance = await marketplacecontract;
      const gasPrice = await web3.eth.getGasPrice();
      const estimateGas = await marketplacecontractinstance.methods
        .removeNFTFromMarketplace(nftAddress, tokenId, listId - 1)
        .estimateGas({ from: account });
      marketplacecontractinstance.methods
        .removeNFTFromMarketplace(nftAddress, tokenId, listId - 1)
        .send({ from: account, gasPrice, gas: estimateGas })
        .then((txhash) => {
          callback(txhash);
        })
        .catch((error) => {
          handleError(error);
        });
    } catch (error) {
      handleError(error);
    }
  }, []);
  const removeFromAuction = useCallback(async (variable, callback, handleError) => {
    const { tokenId, listId, nftAddress } = variable;
    try {
      const web3 = await getWeb3();
      const marketplacecontractinstance = await marketplacecontract;
      const gasPrice = await web3.eth.getGasPrice();
      const estimateGas = await marketplacecontractinstance.methods
        .cancelAuction(nftAddress, tokenId, listId - 1)
        .estimateGas({ from: account });
      marketplacecontractinstance.methods
        .cancelAuction(nftAddress, tokenId, listId - 1)
        .send({ from: account, gasPrice, gas: estimateGas })
        .then((txhash) => {
          callback(txhash);
        })
        .catch((error) => {
          handleError(error);
        });
    } catch (error) {
      handleError(error);
    }
  }, []);

  return { removeFromSale, removeFromAuction };
};
export default useRemoveFromSalehook;
