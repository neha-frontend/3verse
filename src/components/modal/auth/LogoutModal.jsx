import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LOGOUT_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal, logoutAction } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';

const LogoutModal = () => {
  const { deactivate, account } = useWeb3React();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customModalType } = useSelector((state) => state.modal);

  const closeLogoutModal = () => dispatch(hideCustomModal());
  const handleConfirm = () => {
    dispatch(
      logoutAction({
        forceLogout: true,
        disconnectwallet: deactivate,
        isConnected: account,
        navigate
      })
    );
  };

  return (
    <CustomModal
      showModal={customModalType === LOGOUT_MODAL}
      closeModal={closeLogoutModal}
      showCloseButton
      mainClassName="fusionModal logoutModal">
      <h1 className="modalTitile">Logout</h1>

      <p className="modalText text-center fs-5">Do you really want to logout?</p>

      <div className="modal-btn-container row logOut-btn-container">
        <button className="modal-btn col me-2 cancel-modal-btn" onClick={handleConfirm}>
          Yes
        </button>
        <button className="modal-btn col ms-2" onClick={closeLogoutModal}>
          No
        </button>
      </div>
    </CustomModal>
  );
};

export default LogoutModal;
