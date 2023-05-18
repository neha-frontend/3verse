import useContract from './useContract';
import MechABI from '../abi/mechABI.json';
import { REACT_APP_MECH_ADDRESS } from '../config/envConfig';

function useMechContract() {
  return useContract(REACT_APP_MECH_ADDRESS, MechABI.abi, true);
}

export default useMechContract;
