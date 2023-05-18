import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import getWeb3 from '../getWeb3';
import { useNftMarketplaceContract } from './index';

function usePutOnMarketplaceHook() {
  const marketplacecontract = useNftMarketplaceContract();
  const { account } = useWeb3React();
  const putOnsale = useCallback(async (variable, callback, handleError) => {
    const { startdate, enddate, AuctionSelected, nftAddress, tokenId, price, noOfCopies } =
      variable;
   
    try {
      const web3 = await getWeb3();     
      const marketplacecontractinstance = await marketplacecontract;
      const gasPrice = await web3.eth.getGasPrice();
      const estimateGas = await marketplacecontractinstance.methods
        .listNFTOnMarketplace(
          nftAddress,
          tokenId,
          web3.utils.toWei(price.toString(), 'ether'),
          AuctionSelected ? 1 : noOfCopies,
          startdate,
          enddate,
          AuctionSelected
        )
        .estimateGas({ from: account });
      marketplacecontractinstance.methods
        .listNFTOnMarketplace(
          nftAddress,
          tokenId,
          web3.utils.toWei(price.toString(), 'ether'),
          AuctionSelected ? 1 : noOfCopies,
          startdate,
          enddate,
          AuctionSelected
        )
        .send({ from: account, gasPrice, gas: estimateGas })
        .then((txhash) => {
          callback(txhash);
        })
        .catch((err) => {
          handleError(err);
        });
    } catch (error) {
      handleError(error);
    }
  }, []);

  return { putOnsale };
}

export default usePutOnMarketplaceHook;
