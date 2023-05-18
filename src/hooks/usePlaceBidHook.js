import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { REACT_APP_MARKETPLACE_ADDRESS } from '../config/envConfig';
import getWeb3 from '../getWeb3';
import {
  useSetApprovalForAll,
  useMechContract,
  useTokenApprove,
  useNftMarketplaceContract,
  useEmechContract,
  useEveContract
} from './index';

function usePlaceBidHook() {
  const { account } = useWeb3React();
  const { setApprovalforall } = useSetApprovalForAll(REACT_APP_MARKETPLACE_ADDRESS);
  const mechcontract = useMechContract();
  const eveContract = useEveContract();
  const { approveTOken } = useTokenApprove();
  const Emechcontract = useEmechContract();
  const marketplacecontract = useNftMarketplaceContract();
  const placeBid = async (
    web3,
    contractinstance,
    callback,
    price,
    tokenId,
    listId,
    nftAddress,
    handleError
  ) => {
    try {
      const evecontract = await eveContract;
      approveTOken(
        web3,
        evecontract,
        async () => {
          try {
            const gasPrice = await web3.eth.getGasPrice();
            const estimateGas = await contractinstance.methods
              .participateInAuction(
                nftAddress,
                tokenId,
                listId - 1,
                web3.utils.toWei(price.toString(), 'ether')
              )
              .estimateGas({ from: account });
            const hash = await contractinstance.methods
              .participateInAuction(
                nftAddress,
                tokenId,
                listId - 1,
                web3.utils.toWei(price.toString(), 'ether')
              )
              .send({ from: account, gasPrice, gas: estimateGas });
            callback(hash);
          } catch (error) {
            handleError(error);
          }
        },
        (er) => {
          handleError(er);
        }
      );
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };
  const handleplaceBid = useCallback(
    async (tokenId, listId, price, nftAddress, nftContract, callback, handleError) => {
      try {
        const web3 = await getWeb3();
        let nftcontractinstance;
        if (nftContract === 'mech') {
          nftcontractinstance = await mechcontract;
        } else {
          nftcontractinstance = await Emechcontract;
        }
        const isapproved = await nftcontractinstance.methods
          .isApprovedForAll(account, REACT_APP_MARKETPLACE_ADDRESS)
          .call();
        const contractinstance = await marketplacecontract;
        if (isapproved) {
          placeBid(
            web3,
            contractinstance,
            callback,
            price,
            tokenId,
            listId,
            nftAddress,
            handleError
          );
        } else {
          setApprovalforall(
            web3,
            nftcontractinstance,
            () => {
              placeBid(
                web3,
                contractinstance,
                callback,
                price,
                tokenId,
                listId,
                nftAddress,
                handleError
              );
            },
            (error) => {
              console.error(error);
              handleError(error);
            }
          );
        }
      } catch (error) {
        console.error(error);
        handleError(error);
      }
    },
    []
  );

  return { handleplaceBid };
}

export default usePlaceBidHook;
