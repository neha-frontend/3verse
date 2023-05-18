import useContract from './useContract';
import abi from '../abi/MarketplaceAbi.json';
import { REACT_APP_MARKETPLACE_ADDRESS } from '../../config/envConfig';

function useNftMarketplaceContract() {
  return useContract(REACT_APP_MARKETPLACE_ADDRESS, abi, true);
}

export default useNftMarketplaceContract;
