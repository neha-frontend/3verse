/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import getWeb3 from '../../../getWeb3';

import { showCustomModal, showModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';
import {
  REACT_APP_EMECH_ADDRESS,
  REACT_APP_MARKETPLACE_ADDRESS,
  REACT_APP_MECH_ADDRESS
} from '../../../config/envConfig';
import { CONNECT_WALLET_MSG, LIST_SUCCESS_MSG } from '../../../constants/modalConstant';
import { putOnSaleValidator } from '../../../validations/putOnSaleValidator';
import { LOGIN_MODAL } from '../../../constants/modalTypeConstant';
// import { CALENDAR_ICON, DOWN_ARROW } from '../../../assets/images';
import { COPIES_REGEX } from '../../../constants/regexConstants';
import {
  useEmechContract,
  useEveContract,
  useMechContract,
  usePutOnMarketplaceHook,
  useSetApprovalForAll,
  useTokenApprove
} from '../../../hooks';
import { RenderIf } from '../../../utils';
import Spinner from '../../spinner';

const NftSaleModal = ({
  getData = null,
  copies = 0,
  closeModal = () => null,
  tokenId,
  nftType,
  userId
}) => {
  const mechcontract = useMechContract();
  const emechcontract = useEmechContract();
  const [activeTab, setActiveTab] = useState('fixed');
  const [isLoading, setIsLoading] = useState(false);
  const [auctionStartDate, setAuctionStartDate] = useState(new Date());
  const { account } = useWeb3React();
  const eveContract = useEveContract();
  const dispatch = useDispatch();
  const { approveTOken } = useTokenApprove();
  const { putOnsale } = usePutOnMarketplaceHook();
  const { setApprovalforall } = useSetApprovalForAll(REACT_APP_MARKETPLACE_ADDRESS);
  const isLogin = localStorage.getItem('authToken');
  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));

  const handleError = (er) => {
    console.error(er);
    setIsLoading(false);
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
    price: '',
    noOfCopies: '',
    auctionPrice: '',
    startDate: '',
    endDate: ''
  };

  const handleList = async (web3, values, AuctionSelected, resetForm) => {
    const epochdate = (date) => {
      return Math.floor(new Date(date).getTime() / 1000);
    };
    const startdate = AuctionSelected ? epochdate(values.startDate) : 0;
    const enddate = AuctionSelected ? epochdate(values.endDate) : 0;
    try {
      setIsLoading(true);
      putOnsale(
        {
          nftAddress: nftType === 'g-mech' ? REACT_APP_EMECH_ADDRESS : REACT_APP_MECH_ADDRESS,
          tokenId,
          price: values.price || values.auctionPrice,
          noOfCopies: nftType === 'g-mech' ? 1 : values.noOfCopies,
          startdate,
          enddate,
          AuctionSelected
        },
        () => {
          setIsLoading(false);
          resetForm();
          closeModal();
          dispatch(
            showModal({
              message: LIST_SUCCESS_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: false,
              redirectURL: `/profile/${userId}/sale`
            })
          );
          getData();
        },
        (error) => {
          handleError(error);
        }
      );
    } catch (error) {
      handleError(error);
    }
  };
  const handleSubmitData = async (values, resetForm, AuctionSelected) => {
    try {
      if (!isLogin) return openLoginModal();
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
      setIsLoading(true);
      const web3 = await getWeb3();
      let nftcontractinstance;
      if (nftType === 'g-mech') {
        nftcontractinstance = await emechcontract;
      } else {
        nftcontractinstance = await mechcontract;
      }
      const isapproved = await nftcontractinstance.methods
        .isApprovedForAll(account, REACT_APP_MARKETPLACE_ADDRESS)
        .call();
      if (isapproved) {
        handleList(web3, values, (AuctionSelected = activeTab === 'auction'), resetForm);
      } else {
        setApprovalforall(
          web3,
          nftcontractinstance,
          () => {
            handleList(web3, values, (AuctionSelected = activeTab === 'auction'), resetForm);
          },
          (error) => {
            handleError(error);
          }
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCopiesInput = (e, setFieldValue) => {
    const reg = COPIES_REGEX;
    if (reg.test(e.target.value)) {
      setFieldValue('noOfCopies', parseInt(e.target.value));
    } else {
      setFieldValue('noOfCopies', 0);
    }
  };

  return (
    <CustomModal
      showModal={showModal}
      closeModal={closeModal}
      showCloseButton={true}
      mainClassName={`nftModal ${isLoading ? 'overflow-hidden' : ''}`}>
      <div className={` ${isLoading ? 'hidesection' : ''} nftModal-content-container`}>
        <RenderIf isTrue={isLoading}>
          <Spinner className="loader_pos" />
        </RenderIf>
        <h3 className="modalTitle">List NFT For Sale</h3>
        <p className="nftlabel">Type</p>
        <Formik
          initialValues={createInitialValue}
          validationSchema={putOnSaleValidator(nftType, activeTab, copies, auctionStartDate)}
          // enableReinitialize={true}
          // validationSchema={() => Validation(AuctionSelected, NFTdetail.numberOfCopies)}
          onSubmit={(values, { resetForm }) => {
            handleSubmitData(values, resetForm);
          }}>
          {({ values, errors, handleChange, touched, setFieldValue }) => (
            <Form>
              <Tabs defaultActiveKey="fixed" className="nft-tabs">
                <Tab eventKey="fixed" title="Fixed Price" onClick={() => setActiveTab('fixed')}>
                  <p className="nftlabel">Price</p>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      name="price"
                      className="form-control modal-form-control"
                      placeholder="Enter Amount"
                      onChange={(e) => setFieldValue('price', parseFloat(e.target.value))}
                    />
                    <div className="error-message">
                      {errors.price && touched.price && errors.price}
                    </div>
                  </div>
                  <RenderIf isTrue={nftType !== 'g-mech'}>
                    <p className="nftlabel">Enter number of copies to be listed</p>
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        name="noOfCopies"
                        value={values.noOfCopies}
                        className="form-control modal-form-control"
                        placeholder="Enter NO of Copies"
                        step="any"
                        min={1}
                        onChange={(e) => {
                          handleCopiesInput(e, setFieldValue);
                        }}
                      />
                      <div className="error-message">
                        {errors.noOfCopies && touched.noOfCopies && errors.noOfCopies}
                      </div>
                    </div>
                  </RenderIf>
                  <p className="nftlabel">Fees</p>
                  <div className="d-flex align-items-center justify-content-between mb-5">
                    <p className="fee-text">Service Fee</p>
                    <p className="fee-text">2.5%</p>
                  </div>
                  <button type="submit" className="auth-btn">
                    List NFT
                  </button>
                </Tab>
                <Tab eventKey="timed" title="Timed Auction" onClick={() => setActiveTab('auction')}>
                  {/* <div className="form-group mb-4">
                    <label className="modal-form-label">Method</label>
                    <div className="nft-select position-relative">
                      <select size="lg" className="form-control modal-form-control">
                        <option>Select Method</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <img src={DOWN_ARROW} className="arrow" />
                    </div>
                  </div> */}
                  <div className="form-group mb-4">
                    <label className="modal-form-label">Starting Price</label>
                    <input
                      type="text"
                      name="auctionPrice"
                      className="form-control modal-form-control"
                      placeholder="Enter Amount"
                      onChange={(e) => setFieldValue('auctionPrice', parseFloat(e.target.value))}
                    />
                    <div className="error-message">
                      {errors.auctionPrice && touched.auctionPrice && errors.auctionPrice}
                    </div>
                  </div>
                  {/* <p className="nftlabel">Duration</p>
                  <div className="form-group mb-4">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control modal-form-control text-white duration-input"
                        value="5 days"
                      />
                      <img src={CALENDAR_ICON} alt="calendar" className="calendar" />
                    </div>
                  </div> */}
                  {/* <div className="mb-4"> */}
                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-6 col-12 ">
                      <div className="d-flex flex-column align-items-start">
                        <p className="title-primary">Start Date & Time</p>
                        <input
                          value={values.startDate}
                          name="startDate"
                          className="datepickcer form-control modal-form-control"
                          type="datetime-local"
                          onChange={(e) => {
                            setFieldValue('startDate', e.target.value);
                            if (e.target.value !== '') setAuctionStartDate(e.target.value);
                          }}
                        />
                      </div>
                      <div className="error-message">
                        {errors.startDate && touched.startDate && errors.startDate}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="d-flex flex-column align-items-start">
                        <p className="title-primary">End Date & Time</p>
                        <input
                          value={values.endDate}
                          name="endDate"
                          className="datepickcer form-control modal-form-control"
                          onChange={(e) => {
                            setFieldValue('endDate', e.target.value);
                          }}
                          type="datetime-local"
                        />
                      </div>
                      <div className="error-message">
                        {errors.endDate && touched.endDate && errors.endDate}
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* <p className="nftlabel">Enter number of copies to be listed</p>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      name="noOfCopies"
                      value={values.noOfCopies}
                      className="form-control modal-form-control"
                      placeholder="Enter NO of Copies"
                      step="any"
                      min={1}
                      onChange={(e) => {
                        handleCopiesInput(e, setFieldValue);
                      }}
                    />
                    <div className="error-message">
                      {errors.noOfCopies && touched.noOfCopies && errors.noOfCopies}
                    </div>
                  </div> */}
                  <p className="nftlabel">Fees</p>
                  <div className="d-flex align-items-center justify-content-between mb-5">
                    <p className="fee-text">Service Fee</p>
                    <p className="fee-text">2.5%</p>
                  </div>
                  <button type="submit" className="auth-btn">
                    List NFT
                  </button>
                </Tab>
              </Tabs>
            </Form>
          )}
        </Formik>
      </div>
    </CustomModal>
  );
};

export default NftSaleModal;
