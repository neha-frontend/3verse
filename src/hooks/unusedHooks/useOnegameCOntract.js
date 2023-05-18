/* eslint-disable import/no-unresolved */
import useContract from './useContract';
import MINTABI from '../abi/ongametokenabi.json';

function useOnegameCOntract() {
  return useContract(process.env.REACT_APP_OGTOKEN_ADDRESS, MINTABI, true);
}

export default useOnegameCOntract;
