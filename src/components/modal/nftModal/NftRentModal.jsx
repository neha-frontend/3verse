import { Form } from 'react-bootstrap';

import CustomModal from '../CustomModal';
import { DOWN_ARROW } from '../../../assets/images';

const NftSaleModal = ({ showModal = false, closeModal = () => null }) => {
  return (
    <CustomModal
      showModal={showModal}
      closeModal={closeModal}
      showCloseButton={true}
      mainClassName="nftModal">
      <div className="nftModal-content-container">
        <h3 className="modalTitle">List NFT For Rent</h3>
        <div className="form-group mb-4">
          <label className="modal-form-label">Rental Slot</label>
          <div className="nft-select position-relative">
            <Form.Select size="lg" className="form-control modal-form-control">
              <option>Rental Slot</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <img src={DOWN_ARROW} className="arrow" alt="down-arrow"/>
          </div>
        </div>
        <button className="auth-btn mt-5">List NFT</button>
      </div>
    </CustomModal>
  );
};

export default NftSaleModal;
