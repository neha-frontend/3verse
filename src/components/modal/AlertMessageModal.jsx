import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MODAL_CROSS_PNG, SUCCESS_ICON } from '../../assets/images';
import { hideModal, resetModal } from '../../store/sagaActions';
import { RenderIf } from '../../utils';
import { PrimaryButton } from '../button';
import CustomModal from './CustomModal';

const AlertMessageModal = () => {
  const dispatch = useDispatch();
  const {
    message,
    open,
    geolocationModalOpen,
    showPrimaryButton,
    showCloseButton,
    notifyType,
    redirectURL,
    FooterComponent,
    handleClick
  } = useSelector((state) => state.modal);

  const handleCloseModal = () => {
    if (handleClick) handleClick();
    else {
      dispatch(hideModal());
      setTimeout(() => dispatch(resetModal()), 1000);
    }
  };
  return (
    <CustomModal
      showModal={open || geolocationModalOpen}
      closeModal={handleCloseModal}
      showCloseButton={showCloseButton}
      className="pad-10 text-center"
      mainClassName="successModal">
      <div className="success-modal-content-container">
        <img
          src={notifyType === 1 ? SUCCESS_ICON : MODAL_CROSS_PNG}
          className="d-flex mx-auto success-icon"
          alt='notify-icon'
        />
        <p className="success-text">{message}</p>

        <RenderIf isTrue={showPrimaryButton}>
          <PrimaryButton text="OK" className="fw-bold" handleClick={handleCloseModal} />
        </RenderIf>

        <RenderIf isTrue={redirectURL}>
          <Link
            to={redirectURL}
            className="btn btn-primary fw-bold"
            onClick={handleCloseModal}>
            OK
          </Link>
        </RenderIf>

        <RenderIf isTrue={FooterComponent}>
          <FooterComponent />
        </RenderIf>
      </div>
    </CustomModal>
  );
};

export default AlertMessageModal;
