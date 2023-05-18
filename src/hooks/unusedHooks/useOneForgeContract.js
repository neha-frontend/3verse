import useContract from './useContract';
import ONEFORGEABI from '../abi/oneforgeabi.json';

function useOneForgeContract() {
  return useContract(process.env.REACT_APP_ONEFORGE_ADDRESS, ONEFORGEABI, true);
}

export default useOneForgeContract;
