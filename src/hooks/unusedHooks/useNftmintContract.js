import useContract from './useContract';
import MINTABI from '../abi/Mintcontrat.json';

function useNftmintContract() {
  return useContract(process.env.REACT_APP_NFT_MINT_ADDRESS, MINTABI, true);
}

export default useNftmintContract;
