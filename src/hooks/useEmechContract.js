import useContract from './useContract';
import EMechABI from '../abi/eMechABI.json';
import { REACT_APP_EMECH_ADDRESS } from '../config/envConfig';

function useEmechContract() {
  return useContract(REACT_APP_EMECH_ADDRESS, EMechABI.abi, true);
}

export default useEmechContract;
