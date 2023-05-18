import { useDispatch, useSelector } from 'react-redux';

import { FUSE_OTHER_TNC__MODAL, FUSE_TNC_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal, showCustomModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';
import fusionModalPara from './dummyData';

const FusionTnCModal = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);

  const bodyContentArray = fusionModalPara.filter(
    (item) => item.customModalType === FUSE_TNC_MODAL
  );

  const closeTnCModal = () => dispatch(hideCustomModal());
  const handleConfirm = () => dispatch(showCustomModal({ customModalType: FUSE_OTHER_TNC__MODAL }));

  return (
    <CustomModal
      showModal={customModalType === FUSE_TNC_MODAL}
      closeModal={closeTnCModal}
      showCloseButton={false}
      mainClassName="fusionModal">
      <h1 className="modalTitile">Terms and Conditions</h1>

      {bodyContentArray.map((item) => (
        <p className={item.className} key={item.id}>
          {item.para}
        </p>
      ))}

      <div className="modal-btn-container d-flex flex-md-row flex-column align-items-center mt-5">
        <button className="modal-btn me-md-4 me-0 mb-md-0 mb-4" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="modal-btn cancel-modal-btn" onClick={closeTnCModal}>
          Cancel
        </button>
      </div>
    </CustomModal>
  );
};

export default FusionTnCModal;
