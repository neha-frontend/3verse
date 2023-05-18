import Modal from 'react-bootstrap/Modal';

import ReactPortal from '../portal';
import { CROSS_FILTER_MOB_ICON } from '../../assets/images';
import { RenderIf } from '../../utils';

import "./index.css"

const CustomModal = (props) => {
  const {
    mainClassName = '',
    className = '',
    modalSize = 'md',
    showModal = false,
    showCloseButton = true,
    closeModal,
    children,
    FooterComponent = ''
  } = props;

  return (
    <ReactPortal wrapperId="root">
      <Modal
        show={showModal}
        size={modalSize}
        aria-labelledby="contained-modal-title-vcenter"
        className={mainClassName}
        centered>
        <RenderIf isTrue={showCloseButton}>
          <div className="w-100 d-flex justify-content-end cp">
            <img src={CROSS_FILTER_MOB_ICON} alt="crossicon" onClick={closeModal} className="modal-cross-icon" />
          </div>
        </RenderIf>
        <div className={`${className} ${!showCloseButton ? 'pt-0' : ''}`}>{children}</div>
        <RenderIf isTrue={FooterComponent}>
          <Modal.Footer>
            <FooterComponent />
          </Modal.Footer>
        </RenderIf>
      </Modal>
    </ReactPortal>
  );
};

export default CustomModal;
