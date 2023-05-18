import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';

import { WALLET_REGISTER_MODAL } from '../../constants/modalTypeConstant';
import { connectWalletAction, hideCustomModal } from '../../store/sagaActions';
import TrimWallet from '../trimWallet/TrimWallet';
import CustomModal from './CustomModal';

import './index.css';

const WalletRegister = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);
  const { account, deactivate } = useWeb3React();
  const data = { walletAddress: account };
  const closeOtherTnCModal = () => {
    deactivate();
    dispatch(hideCustomModal());
  };
  const handleConfirm = () => {
    dispatch(connectWalletAction({ data, deactivate }));
    dispatch(hideCustomModal());
  }

  return (
    <CustomModal
      showModal={customModalType === WALLET_REGISTER_MODAL}
      closeModal={closeOtherTnCModal}
      showCloseButton={false}
      mainClassName="fusionModal">
      <p className="link_wallet">
        Linking {TrimWallet(account)} wallet to your account.
        <br />
        Note: Once a wallet is linked with your account it cannot be unlinked
      </p>

      <div className="modal-btn-container d-flex flex-md-row flex-column align-items-center mt-5">
        <button className="modal-btn me-md-4 me-0 mb-md-0 mb-4" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="modal-btn cancel-modal-btn" onClick={closeOtherTnCModal}>
          Cancel
        </button>
      </div>
    </CustomModal>
  );
};

export default WalletRegister;
