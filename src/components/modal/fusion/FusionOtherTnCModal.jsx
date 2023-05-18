import { useDispatch, useSelector } from 'react-redux';

import { FUSE_DETAILS__MODAL, FUSE_OTHER_TNC__MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal, showCustomModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';
import fusionModalPara from './dummyData';

const FusionOtherTnCModal = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);

  const bodyContentArray = fusionModalPara.filter(
    (item) => item.customModalType === FUSE_OTHER_TNC__MODAL
  );

  const closeOtherTnCModal = () => dispatch(hideCustomModal());
  const handleConfirm = () => dispatch(showCustomModal({ customModalType: FUSE_DETAILS__MODAL }));

  return (
    <CustomModal
      showModal={customModalType === FUSE_OTHER_TNC__MODAL}
      closeModal={closeOtherTnCModal}
      showCloseButton={false}
      mainClassName="fusionModal">
      {bodyContentArray.map((item) => (
        <p className={item.className} key={item.id}>
          {item.para}
        </p>
      ))}
      <div className="modal-btn-container d-flex flex-md-row flex-column align-items-center mt-5">
        <button className="modal-btn me-md-4 me-0 mb-md-0 mb-4" onClick={handleConfirm}>
          Next
        </button>
        <button className="modal-btn cancel-modal-btn" onClick={closeOtherTnCModal}>
          Cancel
        </button>
      </div>
    </CustomModal>
  );
};

export default FusionOtherTnCModal;
