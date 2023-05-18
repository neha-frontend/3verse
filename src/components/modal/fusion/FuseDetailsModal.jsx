// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FUSE_DETAILS__MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';
// import { RenderIf } from '../../../utils';
import CustomModal from '../CustomModal';
import fusionModalPara from './dummyData';

const FuseDetailsModal = ({handleSubmit = () => null }) => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const { customModalType } = useSelector((state) => state.modal);

  const bodyContentArray = fusionModalPara.filter(
    (item) => item.customModalType === FUSE_DETAILS__MODAL
  );

  const closeFuseDetailsModal = () => dispatch(hideCustomModal());
  const handleFuseClick = () => {
    // if (isLoading === false) {
    //   setIsLoading(true);
    // } else {
      handleSubmit();
      closeFuseDetailsModal();    
    // }
  };

  return (
    <CustomModal
      showModal={customModalType === FUSE_DETAILS__MODAL}
      closeModal={closeFuseDetailsModal}
      showCloseButton={false}
      mainClassName="fusionModal">
      {bodyContentArray.map((item) => (
        <p className={item.className} key={item.id}>
          {item.para}
        </p>
      ))}
      <div className="modal-btn-container d-flex flex-md-row flex-column align-items-center mt-5 justify-content-center">
        <button className="modal-btn me-md-4 me-0 mb-md-0 mb-4" onClick={handleFuseClick}>
          Fuse
        </button>

        {/* <RenderIf isTrue={!isLoading}> */}
        <button className="modal-btn cancel-modal-btn" onClick={closeFuseDetailsModal}>
          Cancel
        </button>
        {/* </RenderIf> */}
      </div>
    </CustomModal>
  );
};

export default FuseDetailsModal;
