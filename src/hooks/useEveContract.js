import useContract from './useContract';
import EVEABI from '../abi/eveABI.json';
import { REACT_APP_EVE_CONTRACT } from '../config/envConfig';

function useEveContract() {
  return useContract(REACT_APP_EVE_CONTRACT, EVEABI, true);
}

export default useEveContract;
