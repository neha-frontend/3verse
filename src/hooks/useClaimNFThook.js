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

function useClaimNFThook() {
  const { account } = useWeb3React();
  const { setApprovalforall } = useSetApprovalForAll(REACT_APP_MARKETPLACE_ADDRESS);
  const mechcontract = useMechContract();
  const eveContract = useEveContract();
  const { approveTOken } = useTokenApprove();
  const Emechcontract = useEmechContract();
  const marketplacecontract = useNftMarketplaceContract();
  const claimnft = async (
    web3,
    contractinstance,
    callback,
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
              .finalizeTheAuction(nftAddress, tokenId, listId - 1)
              .estimateGas({ from: account });
            const hash = await contractinstance.methods
              .finalizeTheAuction(nftAddress, tokenId, listId - 1)
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
  const claimNFT = useCallback(
    async (tokenId, listId, nftAddress, nftContract, callback, handleError) => {
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
          claimnft(web3, contractinstance, callback, tokenId, listId, nftAddress, handleError);
        } else {
          setApprovalforall(
            web3,
            nftcontractinstance,
            () => {
              claimnft(web3, contractinstance, callback, tokenId, listId, nftAddress, handleError);
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

  return { claimNFT };
}

export default useClaimNFThook;
