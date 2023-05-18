import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import * as Yup from 'yup';
import { useState } from 'react';
import { getNftDetailsAction, showCustomModal, showModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';
import { REACT_APP_EMECH_ADDRESS, REACT_APP_MECH_ADDRESS } from '../../../config/envConfig';
import {
  BID_SUCCESS_MSG,
  CADET_BUY_ERROR_MSG,
  CONNECT_WALLET_MSG
} from '../../../constants/modalConstant';
import { LOGIN_MODAL } from '../../../constants/modalTypeConstant';
import { usePlaceBidHook } from '../../../hooks';
import { Spinner } from '../../../components';
import { RenderIf } from '../../../utils';
import {
  PRICE_REQUIRE,
  PRICE_GREATER_MSG,
  GREATER_THAN_PERCENT
} from '../../../constants/validationMessages';

const PlaceBidModal = ({
  listId = '',
  id = '',
  owner = '',
  closeModal = () => null,
  tokenId,
  highestBid,
  nftType,
  currentBid
}) => {
  const [Loading, setLoading] = useState(false);
  const { handleplaceBid } = usePlaceBidHook();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem('authToken');
  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  const handleError = (er) => {
    console.error(er);
    setLoading(false);
    const errMsg = er?.message?.split(':');
    dispatch(
      showModal({
        // eslint-disable-next-line no-useless-escape
        message: er?.message?.split('error')[1]?.split('message')[1]?.split(`\"`)[2] || errMsg,
        notifyType: 0,
        showPrimaryButton: false,
        showCloseButton: true
      })
    );
  };
  const createInitialValue = {
    price: ''
  };

  const handleSubmitData = async (values) => {
    try {
      if (!isLogin) return openLoginModal();
      if (data?.userType === 'Cadet')
        return dispatch(
          showModal({
            message: CADET_BUY_ERROR_MSG,
            notifyType: 2,
            showPrimaryButton: false,
            showCloseButton: true,            
          })
        );
      if (!account) {
        return dispatch(
          showModal({
            message: CONNECT_WALLET_MSG,
            notifyType: 2,
            showPrimaryButton: false,
            showCloseButton: true,
            redirectURL: '/select-wallet'
          })
        );
      }
      setLoading(true);
      handleplaceBid(
        tokenId,
        listId,
        values.price,
        nftType === 'g-mech' ? REACT_APP_EMECH_ADDRESS : REACT_APP_MECH_ADDRESS,
        nftType === 'g-mech' ? 'g-mech' : 'mech',
        () => {
          setLoading(false);
          dispatch(
            showModal({
              message: BID_SUCCESS_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: true
            })
          );
          dispatch(getNftDetailsAction({ id: id, ownerId: owner }));
        },
        (err) => handleError(err)
      );
    } catch (error) {
      handleError(error);
    }
  };
  const placeBidValidator = () =>
    Yup.object().shape({
      price: highestBid
        ? Yup.number()
            .min(
              (10 / 100) * parseFloat(highestBid) + parseFloat(highestBid),
              `${GREATER_THAN_PERCENT} ${
                (10 / 100) * parseFloat(highestBid) + parseFloat(highestBid)
              }`
            )
            .typeError('Enter a valid value')
            .test(
              'price-check',
              PRICE_GREATER_MSG,
              async (value) => value > 0 && value > currentBid
            )
            .required(PRICE_REQUIRE)
        : Yup.number()
            .typeError('Enter a valid value')
            .test(
              'price-check',
              PRICE_GREATER_MSG,
              async (value) => value > 0 && value > currentBid
            )
            .required(PRICE_REQUIRE)
    });

  return (
    <CustomModal
      showModal={showModal}
      closeModal={closeModal}
      showCloseButton={true}
      mainClassName="nftModal">
      <div className={` ${Loading ? 'hidesection' : ''} nftModal-content-container`}>
        {/* <h3 className="modalTitle">List NFT For Sale</h3>
        <p className="nftlabel">Type</p> */}
        <RenderIf isTrue={Loading}>
          <Spinner className="placebid-modal" />
        </RenderIf>
        <Formik
          initialValues={createInitialValue}
          validationSchema={placeBidValidator()}
          onSubmit={(values, { resetForm }) => {
            handleSubmitData(values, resetForm);
          }}>
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <p className="nftlabel">Place Bid</p>
              <div className="form-group mb-4">
                <input
                  type="text"
                  name="price"
                  className="form-control modal-form-control"
                  placeholder="Enter Amount"
                  onChange={(e) => setFieldValue('price', parseFloat(e.target.value))}
                />
                <div className="error-message">{errors.price && touched.price && errors.price}</div>
              </div>
              <p className="nftlabel">Fees</p>
              <div className="d-flex align-items-center justify-content-between mb-5">
                <p className="fee-text">Service Fee</p>
                <p className="fee-text">2.5%</p>
              </div>
              <button type="submit" className="auth-btn">
                Place Bid
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </CustomModal>
  );
};

export default PlaceBidModal;
