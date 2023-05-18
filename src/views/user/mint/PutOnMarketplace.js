/* eslint-disable no-unused-vars */
import { useWeb3React } from '@web3-react/core';
import { FormCheck } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BACK_ICON, HEART_ICON } from '../../../assets/images';
import getWeb3 from '../../../getWeb3';
import { CustomInput, NoDataFound, Spinner } from '../../../components';
import { RenderIf } from '../../../utils';
import { COPIES_REGEX } from '../../../constants/regexConstants';
import { Validation } from '../../../validations/putOnmarketplaceValidator';
import {
  REACT_APP_EMECH_ADDRESS,
  REACT_APP_MARKETPLACE_ADDRESS,
  REACT_APP_MECH_ADDRESS
} from '../../../config/envConfig';
import { showModal } from '../../../store/sagaActions';
import { CONNECT_WALLET_MSG, LIST_SUCCESS_MSG } from '../../../constants/modalConstant';
import {
  useEveContract,
  useMechContract,
  useSetApprovalForAll,
  usePutOnMarketplaceHook
} from '../../../hooks';

const PutOnMarketplace = ({ TabSelected, setLoading, Loading }) => {
  const [displayType, setDisplayType] = useState('selectNft');
  const mechcontract = useMechContract();
  const dispatch = useDispatch();
  const eveContract = useEveContract();
  const { putOnsale } = usePutOnMarketplaceHook();
  const { setApprovalforall } = useSetApprovalForAll(REACT_APP_MARKETPLACE_ADDRESS);
  const { account } = useWeb3React();
  const [NFTdetail, setNFTdetail] = useState({});
  const [AuctionSelected, setAuctionSelected] = useState(false);
  const { isLoading, FreshMintedData } = useSelector((state) => state.nft.freshMinted);
  const [auctionStartDate, setAuctionStartDate] = useState(new Date());

  const handleSelectClick = (detail) => {
    setNFTdetail(detail);
    setDisplayType('putonsale');
  };
  useEffect(() => {
    if (TabSelected === 'nft') {
      setAuctionSelected(false);
      setNFTdetail({});
      setDisplayType('selectNft');
    }
  }, [TabSelected]);
  const createInitialValue = {
    price: '',
    noOfCopies: NFTdetail?.numberOfCopies,
    startDate: '',
    endDate: ''
  };

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
  const handleList = async (web3, values, resetForm) => {
    const epochdate = (date) => {
      return Math.floor(new Date(date).getTime() / 1000);
    };
    const startdate = AuctionSelected ? epochdate(values.startDate) : 0;
    const enddate = AuctionSelected ? epochdate(values.endDate) : 0;
    try {
      const evecontract = await eveContract;
      putOnsale(
        {
          nftAddress:
            NFTdetail?.nftType === 'g-mech' ? REACT_APP_EMECH_ADDRESS : REACT_APP_MECH_ADDRESS,
          tokenId: NFTdetail.tokenId,
          price: values.price,
          noOfCopies: values.noOfCopies,
          startdate,
          enddate,
          AuctionSelected
        },
        () => {
          setLoading(false);
          resetForm();
          dispatch(
            showModal({
              message: LIST_SUCCESS_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              redirectURL: `/marketplace`,
              showCloseButton: true
            })
          );
        },
        (error) => {
          handleError(error);
        }
      );
    } catch (error) {
      handleError(error);
    }
  };
  const handleSubmitData = async (values, resetForm) => {
    try {
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
      const web3 = await getWeb3();
      const nftcontract = await mechcontract;
      const isapproved = await nftcontract.methods
        .isApprovedForAll(account, REACT_APP_MARKETPLACE_ADDRESS)
        .call();
      if (isapproved) {
        handleList(web3, values, resetForm);
      } else {
        setApprovalforall(
          web3,
          nftcontract,
          () => {
            handleList(web3, values, resetForm);
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
    <>
      <RenderIf isTrue={displayType == 'selectNft'}>
        <>
          <h1 className="mint-sub-title">Select NFT For Marketplace</h1>
          <div className="row">
            <RenderIf isTrue={isLoading}>
              <Spinner className="mt-5" />
            </RenderIf>
            <RenderIf isTrue={!FreshMintedData?.list?.length && !isLoading}>
              <NoDataFound text="No NFT found" />
            </RenderIf>
            {FreshMintedData?.list?.map((details) => (
              <div
                key={details.title}
                onClick={() => handleSelectClick(details)}
                className=" selectnft-box col-lg-4 mt-3 col-md-6 col-12">
                <div className=" marketplace_box sale_box gmech_box">
                  <div className="gmechImgContainer">
                    <img
                      src={details.previewImage}
                      alt="recently-added"
                      className="w-100 sale_img gmech_img"
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-3 ">
                    <span className="nft_name">{details.title}</span>
                    {/* <div className="nft_cost">1 EVE</div> */}
                  </div>
                  <div className="d-flex justify-content-between mt-1 ">
                    <span className="mech_type text-capitalize">{details.nftType}</span>
                    {/* <div className="d-flex">
                      <img src={HEART_ICON} alt="recently-added" className="market_heart_icon" />
                      <span className="likes">23</span>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </RenderIf>
      <RenderIf isTrue={displayType == 'putonsale'}>
        <>
          <Formik
            initialValues={createInitialValue}
            enableReinitialize={true}
            validationSchema={() =>
              Validation(AuctionSelected, NFTdetail.numberOfCopies, auctionStartDate)
            }
            onSubmit={(values, { resetForm }) => {
              handleSubmitData(values, resetForm);
            }}>
            {({ values, errors, handleChange, touched, setFieldValue }) => (
              <Form>
                <div className={` ${Loading ? 'hidesection' : ''} row nft-row`}>
                  <p>
                    <img
                      src={BACK_ICON}
                      alt="backIcon"
                      onClick={() => setDisplayType('selectNft')}
                      className="cp back_icon"
                    />
                    Back
                  </p>
                  <div className="col-lg-7 col-12">
                    <p className="nft-title-text">{NFTdetail?.title}</p>
                    <p className="nft-text">{NFTdetail?.nftType}</p>
                    <p className="nft-title-text">Description</p>
                    <p className="nft-text nft-w-text">{NFTdetail?.description}</p>
                    <p className="nft-title-text">Properties</p>
                    <p className="nft-text nft-w-text text-white">Affinity : NA</p>
                  </div>
                  <div className="col-lg-5 col-12">
                    <div className="img-container d-flex align-items-center justify-content-center">
                      <img src={NFTdetail?.previewImage} className="mint-img" alt="nft-preview"/>
                    </div>
                  </div>
                </div>
                <RenderIf isTrue={!AuctionSelected}>
                  <div className="form-group">
                    <label className="mint-form-label">Enter number of copies to be listed</label>
                    <input
                      type="text"
                      name="noOfCopies"
                      value={values.noOfCopies}
                      className="form-control mint-form-control mb-4"
                      placeholder="Enter number of copies to be listed"
                      min={0}
                      onChange={(e) => {
                        handleCopiesInput(e, setFieldValue);
                      }}
                      step="any"
                    />
                    {errors.noOfCopies && touched.noOfCopies && (
                      <div className="invalid-feedback">{errors.noOfCopies}</div>
                    )}
                  </div>
                </RenderIf>

                <div className="form-group ">
                  <label className="mint-form-label">Enter Price for the NFT</label>
                  <Field
                    component={CustomInput}
                    type="text"
                    inputClassName="form-control mint-form-control"
                    step="any"
                    name="price"
                    placeholder="Enter Price for one Piece"
                  />
                </div>
                <div className="mt-3">
                  <FormCheck
                    onChange={(e) => setAuctionSelected(e.target.checked)}
                    type="checkbox"
                    id="auctioncheckbox"
                    label="Auction"
                  />
                  {AuctionSelected && (
                    <div className="row mt-4">
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="d-flex flex-column align-items-start">
                          <label className="title-primary mint-form-label">Start Date & Time</label>
                          <input
                            value={values.startDate}
                            name="startDate"
                            className="datepickcer form-control mint-form-control"
                            type="datetime-local"
                            onChange={(e) => {
                              handleChange(e);
                              setAuctionStartDate(e.target.value);
                            }}
                          />
                        </div>
                        {errors.startDate && touched.startDate && (
                          <div className="invalid-feedback mt-2">{errors.startDate}</div>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="d-flex flex-column align-items-start">
                          <label className="title-primary mint-form-label">End Date & Time</label>
                          <input
                            value={values.endDate}
                            name="endDate"
                            className="datepickcer form-control mint-form-control"
                            onChange={(e) => {
                              setFieldValue('endDate', e.target.value);
                            }}
                            type="datetime-local"
                          />
                        </div>
                        {errors.endDate && touched.endDate && (
                          <div className="invalid-feedback mt-2">{errors.endDate}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="mint-btn mx-auto d-flex align-items-center justify-content-center">
                  List NFT for {AuctionSelected ? 'Auction' : 'Sale'}
                </button>
              </Form>
            )}
          </Formik>
        </>
      </RenderIf>
    </>
  );
};

export default React.memo(PutOnMarketplace);
