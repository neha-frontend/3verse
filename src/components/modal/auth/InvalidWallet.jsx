import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CROSS_PNG } from '../../../assets/images';

import { INVALID_WALLET_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';

import CustomModal from '../CustomModal';

const InvalidWallet = ({ wallet = '' }) => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);

  const hideModal = () => dispatch(hideCustomModal());

  return (
    <CustomModal
      showModal={customModalType === INVALID_WALLET_MODAL}
      showCloseButton={true}
      closeModal={hideModal}      
      className="pad-10 text-center"
      mainClassName="successModal">
      <div className="success-modal-content-container">
        <img src={MODAL_CROSS_PNG} className="d-flex mx-auto success-icon" alt="cross-icon"/>
        <p className="success-text">{`Please connect with your registered wallet: ${wallet}`}</p>
      </div>
    </CustomModal>
  );
};

export default InvalidWallet;
