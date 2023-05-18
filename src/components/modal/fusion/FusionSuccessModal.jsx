import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FUSE_SUCCESS__MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';
import fusionModalPara from './dummyData';

const FusionSuccessModal = () => {
  const dispatch = useDispatch();

  const { customModalType, redirectURL } = useSelector((state) => state.modal);

  const bodyContentArray = fusionModalPara.filter(
    (item) => item.customModalType === FUSE_SUCCESS__MODAL
  );

  const closeModal = () => {
    dispatch(hideCustomModal());
  };

  return (
    <CustomModal
      showModal={customModalType === FUSE_SUCCESS__MODAL}
      closeModal={closeModal}
      showCloseButton={false}
      mainClassName="fusionModal text-center">
      <h1 className="modalTitile">Congratulations !!</h1>

      {bodyContentArray.map((item) => (
        <p className={item.className} key={item.id}>
          {item.para}
        </p>
      ))}

      <div className="modal-btn-container d-flex flex-md-row flex-column align-items-center mt-5 justify-content-center">
        <Link to={redirectURL} className="modal-btn me-md-0 me-0 mb-md-0 mb-4" onClick={closeModal}>
          Continue
        </Link>
      </div>
    </CustomModal>
  );
};

export default FusionSuccessModal;
