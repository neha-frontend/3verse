/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Countdown from 'react-countdown';
import { useWeb3React } from '@web3-react/core';
import {
  REACT_APP_EMECH_ADDRESS,
  REACT_APP_EVE_CONTRACT,
  REACT_APP_MARKETPLACE_ADDRESS,
  REACT_APP_MECH_ADDRESS
} from '../../../config/envConfig';
import {
  useBuyNfthook,
  useClaimNFThook,
  useRemoveFromSalehook,
  useGetEveTokenBalance
} from '../../../hooks';
import {
  Accordian,
  AlertMessageModal,
  NftSaleModal,
  NoDataFound,
  Spinner,
  TrimWallet
} from '../../../components';

import { generateURL, RenderIf } from '../../../utils';
import {
  buyNftFromRentAction,
  disconnectNftFromRentAction,
  getCadetOverviewAction,
  getNftTradingHistoryAction,
  putNftOnRentAction,
  removeNftFromRentAction,
  showCustomModal,
  showModal
} from '../../../store/sagaActions';
import ModalView from '../3dModal/ModalView';
import {
  BID_CLOCK,
  BUY,
  DEAFULT_PROFILE_PIC,
  FILTER,
  MINT_ICON,
  RENTAL_SLOT,
  SALE,
  THREE_D_IMG
} from '../../../assets/images';
import {
  BUY_SUCCESS_MSG,
  CONNECT_WALLET_MSG,
  NFT_REMOVEFROMSELL_MSG,
  CLAIM_SUCCESS_MSG,
  INSUFFICIENT_BALANCE,
  CADET_BUY_ERROR_MSG,
  CADET_BID_ERROR_MSG,
  CADET_CLAIM_ERROR_MSG,
  CADET_REMOVE_ERROR_MSG,
  CADET_AUCTION_ERROR_MSG,
  REMOVE_FROM_AUCTION
} from '../../../constants/modalConstant';
import isInThePast from '../../../utils/isInPast';
import { LOGIN_MODAL } from '../../../constants/modalTypeConstant';
import PlaceBidModal from '../../../components/modal/nftModal/PlaceBid';

import './nftDetails.css';
import moment from 'moment/moment';

function NftDetails({
  nftImage,
  nftImageLabel = '',
  nftDetailsName = '',
  tokenId,
  listId,
  // setLoading,
  nftImageViewLabel = null,
  nftData = [],
  nftType = '',
  nftName = '',
  nftDesc = '',
  startDate = '',
  endDate = '',
  nftPrice = '',
  nftOwnerId = '',
  listingType = '',
  sellType = '',
  currentUserId = '',
  ownerName = '',
  ownerWallet = '',
  ownerPic = '',
  noOfCopies = null,
  yourBid = [],
  nftId = '',
  getData = '',
  highestBid = '',
  rentedBy = '',
  listingId = '',
  isRented = '',
  nftHolded = '',
  highestbidDetail = '',
  gmechImage = ''
}) {
  const isLogin = localStorage.getItem('authToken');
  const [TimeoutCompleted, setTimeoutCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actvityTab, setActivityTab] = useState('activity');
  const [show3dModal, setShow3dModal] = useState(false);
  const [ListModal, setListModal] = useState(false);
  const [bidModal, setBidModal] = useState(false);
  const [event, setEvent] = useState('null');
  // const [rangeValue, setRangeValue] = useState(0);
  const [canvas, setCanvas] = useState('');
  const [count, setcount] = useState(0);

  const { account } = useWeb3React();
  const dispatch = useDispatch();

  const { handleBuy } = useBuyNfthook();
  const { claimNFT } = useClaimNFThook();

  const { removeFromSale, removeFromAuction } = useRemoveFromSalehook();
  const { getUserBalance, userBalance } = useGetEveTokenBalance();
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  const { tradingHistoryLoader, tradingHistory, cadetOverview, cadetOverviewLoader } = useSelector(
    (state) => state.nft.nftDetail
  );
  const { isLoading } = useSelector((state) => state.nft.putNftOnRent);

  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));

  const callNftTradingApi = (isNew = false) =>
    dispatch(
      getNftTradingHistoryAction({
        page: isNew ? 1 : tradingHistory.page + 1,
        limit: 9,
        id: nftId,
        URL: generateURL({
          page: isNew ? 1 : tradingHistory.page + 1,
          limit: 9,
          event: event,
          removeNull: true
        }),
        isNew
      })
    );

  const callCadetOverviewApi = (isNew = false) =>
    dispatch(
      getCadetOverviewAction({
        page: isNew ? 1 : cadetOverview.page + 1,
        limit: 9,
        id: nftId,
        URL: generateURL({
          page: isNew ? 1 : cadetOverview.page + 1,
          limit: 9,
          event: event,
          removeNull: true
        }),
        isNew
      })
    );

  const fetchMoreData = () => callNftTradingApi();

  const fetchMoreCadetData = () => callCadetOverviewApi();

  const putNftOnRent = () => {
    const rentDetail = {
      id: currentUserId,
      nftId: nftId
    };
    dispatch(putNftOnRentAction({ rentDetail, getData , userId: currentUserId }));
  };

  const buyNftOnRent = (listingId) => {
    if (!isLogin) return openLoginModal();
    const rentDetail = {
      listingId: listingId
    };
    dispatch(buyNftFromRentAction({ rentDetail, getData }));
  };

  const removeFromRent = (listingId) => {
    const rentDetail = {
      listingId: listingId
    };
    dispatch(removeNftFromRentAction({ rentDetail, getData }));
  };

  const disconnectFromRent = (listingId) => {
    const rentDetail = {
      listingId: listingId
    };
    dispatch(disconnectNftFromRentAction({ rentDetail, getData }));
  };

  const Renderer = ({ hours, minutes, seconds, days, completed, startdate }) => {
    if (completed) {
      if (startdate) {
        setcount(count + 1);
      }
      if (!startdate) {
        setTimeoutCompleted(true);
      }
      return <div>Auction Closed </div>;
    }
    if (days) {
      return <div>{`${days}d: ${hours}h: ${minutes}m: ${seconds}s`}</div>;
    }
    if (days === 0 && hours > 0) {
      return (
        <>
          <div></div>
          {`${hours}h: ${minutes}m: ${seconds}s`}
        </>
      );
    }
    if (days === 0 && hours === 0) {
      return (
        <>
          <div>{`${minutes}m: ${seconds}s`} </div>
        </>
      );
    }
    return null;
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

  const removefromsalehandler = async () => {
    try {
      if (!isLogin) return openLoginModal();
      if (data?.userType === 'Cadet')
        return dispatch(
          showModal({
            message: CADET_REMOVE_ERROR_MSG,
            notifyType: 2,
            showPrimaryButton: false,
            showCloseButton: true
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
      removeFromSale(
        {
          tokenId,
          listId,
          nftAddress: nftType == 'g-mech' ? REACT_APP_EMECH_ADDRESS : REACT_APP_MECH_ADDRESS
        },
        () => {
          setLoading(false);
          dispatch(
            showModal({
              message: NFT_REMOVEFROMSELL_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: true
            })
          );
          getData();
        },
        (error) => {
          handleError(error);
        }
      );
      // setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const removefromAuctionhandler = async () => {
    try {
      if (!isLogin) return openLoginModal();
      if (data?.userType === 'Cadet')
        return dispatch(
          showModal({
            message: CADET_AUCTION_ERROR_MSG,
            notifyType: 2,
            showPrimaryButton: false,
            showCloseButton: true
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
      removeFromAuction(
        {
          tokenId,
          listId,
          nftAddress: nftType == 'g-mech' ? REACT_APP_EMECH_ADDRESS : REACT_APP_MECH_ADDRESS
        },
        () => {
          setLoading(false);
          dispatch(
            showModal({
              message: REMOVE_FROM_AUCTION,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: true
            })
          );
          getData();
        },
        (er) => {
          handleError(er);
        }
      );
    } catch (error) {
      handleError(error);
    }
  };
  const buynftHandler = async () => {
    try {
      if (!isLogin) return openLoginModal();
      if (data?.userType === 'Cadet')
        return dispatch(
          showModal({
            message: CADET_BUY_ERROR_MSG,
            notifyType: 2,
            showPrimaryButton: false,
            showCloseButton: true
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
      if (parseFloat(userBalance) <= parseFloat(nftPrice)) {
        setLoading(false);
        return dispatch(
          showModal({
            message: INSUFFICIENT_BALANCE,
            notifyType: 0,
            showPrimaryButton: false,
            showCloseButton: true
          })
        );
      }
      setLoading(true);
      handleBuy(
        tokenId,
        listId,
        nftType == 'g-mech' ? REACT_APP_EMECH_ADDRESS : REACT_APP_MECH_ADDRESS,
        nftType === 'g-mech' ? 'g-mech' : 'mech',
        () => {
          setLoading(false);
          dispatch(
            showModal({
              message: BUY_SUCCESS_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: true,
              redirectURL: `/profile/${currentUserId}/${nftType == 'g-mech' ? 'gmech' : nftType}`
            })
          );
          getData();
        },
        (err) => {
          handleError(err);
        }
      );
    } catch (error) {
      handleError(error);
    }
  };
  const ClaimnftHandler = async () => {
    try {
      if (!isLogin) return openLoginModal();
      if (data?.userType === 'Cadet')
        return dispatch(
          showModal({
            message: CADET_CLAIM_ERROR_MSG,
            notifyType: 2,
            showPrimaryButton: false,
            showCloseButton: true
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
      if (parseFloat(userBalance) <= parseFloat(nftPrice)) {
        setLoading(false);
        return dispatch(
          showModal({
            message: INSUFFICIENT_BALANCE,
            notifyType: 0,
            showPrimaryButton: false,
            showCloseButton: true
          })
        );
      }
      setLoading(true);
      claimNFT(
        tokenId,
        listId,
        nftType == 'g-mech' ? REACT_APP_EMECH_ADDRESS : REACT_APP_MECH_ADDRESS,
        nftType == 'g-mech' ? 'g-mech' : 'mech',
        () => {
          setLoading(false);
          dispatch(
            showModal({
              message: CLAIM_SUCCESS_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: true,
              redirectURL: `/profile/${currentUserId}/${nftType == 'g-mech' ? 'gmech' : nftType}`
            })
          );
          getData();
        },
        (err) => {
          handleError(err);
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleputonsaleClick = () => {
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
    setListModal(true);
  };
  const handleplacebidClick = () => {
    if (!isLogin) return openLoginModal();
    if (data?.userType === 'Cadet')
      return dispatch(
        showModal({
          message: CADET_BID_ERROR_MSG,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true
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
    setBidModal(true);
  };

  const content = (div) => {
    switch (div) {
      case 'armor':
      case 'skin':
      case 'ability':
      case 'mech':
        return (
          <>
            <RenderIf isTrue={noOfCopies !== 0 && sellType === ''}>
              {nftOwnerId === currentUserId ? (
                <button
                  type="button"
                  onClick={handleputonsaleClick}
                  className="nft_buy_btn mt-lg-0 mt-3">
                  Put NFT on Sale
                </button>
              ) : (
                ''
              )}
            </RenderIf>
            <RenderIf isTrue={sellType === 'fixed'}>
              <div className="d-flex justify-content-between flex-md-row flex-column mt-5">
                <div>
                  <div className="nft_price">{nftPrice} EVE</div>
                  <div className="sub_head">Current Price</div>
                </div>
                {nftOwnerId === currentUserId ? (
                  <button
                    type="button"
                    onClick={removefromsalehandler}
                    className="nft_buy_btn mt-lg-0 mt-3">
                    Remove From sale
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={buynftHandler}
                    className="nft_buy_btn mt-lg-0 mt-3">
                    Buy Now
                  </button>
                )}
              </div>
            </RenderIf>
            <RenderIf isTrue={sellType === 'auction'}>
              <>
                <div className="row">
                  <div className="col">
                    <div className="activity_label">
                      {!isInThePast(startDate) ? 'Auction will start in' : 'Time left for auction'}
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex sub_head">
                      <img src={BID_CLOCK} alt="clock" className="pe-2" />
                      {!isInThePast(startDate) ? (
                        <>
                          {'Starting In : '}
                          <Countdown
                            date={new Date(startDate).toUTCString()}
                            renderer={(props) => <Renderer {...props} startdate={true} />}
                          />
                        </>
                      ) : (
                        <>
                          <Countdown
                            date={new Date(endDate).toUTCString()}
                            renderer={(props) => <Renderer {...props} startdate={false} />}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <div className="nft_price">{highestBid} EVE</div>
                    <div className="sub_head">Highest Bid</div>
                  </div>
                  <div className="current_bid col ms-0">
                    <div className="nft_price">{nftPrice} EVE</div>
                    <div className="sub_head">Current Bid</div>
                  </div>
                </div>
                {nftOwnerId === currentUserId ? (
                  <>
                    <RenderIf
                      isTrue={
                        TimeoutCompleted && isInThePast(endDate) && highestbidDetail.length === 0
                      }>
                      <button
                        type="button"
                        onClick={removefromAuctionhandler}
                        className="nft_buy_btn mt-4">
                        Remove From Auction
                      </button>
                    </RenderIf>
                    <RenderIf isTrue={!isInThePast(startDate)}>
                      <button
                        type="button"
                        onClick={removefromAuctionhandler}
                        className="nft_buy_btn mt-4">
                        Remove From Auction
                      </button>
                    </RenderIf>
                  </>
                ) : yourBid?.length ? (
                  <div className="current_bid col ms-0 mt-4">
                    <div className="nft_price">{yourBid[0]?.price} EVE</div>
                    <div className="sub_head">Your Bid</div>
                  </div>
                ) : (
                  isInThePast(startDate) &&
                  !isInThePast(endDate) &&
                  !TimeoutCompleted && (
                    <button
                      type="button"
                      onClick={handleplacebidClick}
                      className="nft_buy_btn mt-4">
                      Place New Bid
                    </button>
                  )
                )}
                {TimeoutCompleted &&
                  isInThePast(endDate) &&
                  [...highestbidDetail].sort((a, b) => a.price + b.price)[0]?.userId ===
                    currentUserId && (
                    <button type="button" onClick={ClaimnftHandler} className="nft_buy_btn mt-4">
                      Claim NFT
                    </button>
                  )}
              </>
            </RenderIf>
          </>
        );
      case 'g-mech':
        return (
          <>
            <RenderIf isTrue={sellType === '' && listingType === ''}>
              {nftOwnerId === currentUserId ? (
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={() => setListModal(true)}
                    className="nft_buy_btn mt-lg-0 mt-3 me-4">
                    Put NFT on Sale
                  </button>
                  <button type="button" onClick={putNftOnRent} className="nft_buy_btn mt-lg-0 mt-3">
                    Put NFT on Rent
                  </button>
                </div>
              ) : (
                ''
              )}
            </RenderIf>
            <RenderIf isTrue={sellType !== '' || listingType !== ''}>
              <div className="d-flex justify-content-between">
                <RenderIf isTrue={sellType === 'fixed'}>
                  <div>
                    <div className="nft_price">{nftPrice} EVE</div>
                    <div className="sub_head">Current Price</div>
                  </div>
                </RenderIf>
                <div className="nft_price lvl">LVL : N/A</div>
              </div>
              <RenderIf isTrue={sellType === 'fixed'}>
                <div className="row mt-4 text-white nft-details-exp-row">
                  <div className="col-6">
                    <p className="mech-exp mb-0">EXP</p>
                    <p className="range-value">{1200}</p>
                    <input
                      type="range"
                      className="price-filter-range form-range"
                      value={1200}
                      min="500"
                      max="1900"
                    />
                    <div className="d-flex justify-content-between">
                      <span className="price-label-range">Level 1</span>
                      <span className="price-label-range">Level 2</span>
                    </div>
                  </div>
                </div>
              </RenderIf>
              <RenderIf isTrue={listingType === 'rent'}>
                <div className="row mt-4 text-white nft-details-exp-row">
                  <div className="col">
                    <p className="mech-exp mb-0">EXP</p>
                    <p className="range-value">{1200}</p>
                    <input
                      type="range"
                      className="price-filter-range form-range"
                      value={1200}
                      min="500"
                      max="1900"
                    />
                    <div className="d-flex justify-content-between">
                      <span className="price-label-range">Level 1</span>
                      <span className="price-label-range">Level 2</span>
                    </div>
                  </div>

                  <div className="col d-flex justify-content-sm-center justify-content-start mt-sm-0 mt-4">
                    <img src={RENTAL_SLOT} alt="rental" className="rental-img" />
                    <p className="rental-text ms-2">
                      Rental slot available : {2 - rentedBy?.length}
                    </p>
                  </div>
                </div>
              </RenderIf>
              <div className="row mt-4">
                <RenderIf isTrue={sellType === 'fixed'}>
                  {nftOwnerId === currentUserId ? (
                    <button
                      type="button"
                      onClick={removefromsalehandler}
                      className="nft_buy_btn mt-lg-0 mt-3">
                      Remove From sale
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={buynftHandler}
                      className="nft_buy_btn mt-lg-0 mt-3">
                      Buy Now
                    </button>
                  )}
                </RenderIf>
                <RenderIf isTrue={listingType === 'rent'}>
                  <RenderIf isTrue={nftOwnerId === currentUserId}>
                    <div className="col">
                      <button className="mech-btn" onClick={() => removeFromRent(listingId)}>
                        Remove from Rent
                      </button>
                    </div>
                  </RenderIf>
                  <RenderIf
                    isTrue={
                      nftOwnerId !== currentUserId && currentUserId !== isRented[0]?.userId?._id
                    }>
                    <div className="col">
                      <button
                        className={`mech-btn rent ${rentedBy?.length === 2 ? 'disable_rent' : ''}`}
                        onClick={() => buyNftOnRent(listingId)}
                        disabled={rentedBy?.length === 2}>
                        {rentedBy?.length === 2 ? 'Rent slot not available' : 'Rent'}
                      </button>
                    </div>
                  </RenderIf>
                  <RenderIf isTrue={currentUserId === isRented[0]?.userId?._id}>
                    <div className="col">
                      <button
                        type="button"
                        className="disconnect_btn mt-4"
                        onClick={() => disconnectFromRent(listingId)}>
                        Disconnect from Rent
                      </button>
                    </div>
                  </RenderIf>
                </RenderIf>
                <RenderIf isTrue={sellType === 'auction'}>
                  <>
                    <div className="row">
                      <div className="col">
                        <div className="activity_label">
                          {!isInThePast(startDate)
                            ? 'Auction will start in'
                            : 'Time left for auction'}
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-flex sub_head">
                          <img src={BID_CLOCK} alt="clock" className="pe-2" />
                          {!isInThePast(startDate) ? (
                            <>
                              {'Starting In : '}
                              <Countdown
                                date={new Date(startDate).toUTCString()}
                                renderer={(props) => <Renderer {...props} startdate={true} />}
                              />
                            </>
                          ) : (
                            <>
                              <Countdown
                                date={new Date(endDate).toUTCString()}
                                renderer={(props) => <Renderer {...props} startdate={false} />}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <div className="nft_price">{highestBid} EVE</div>
                        <div className="sub_head">Highest Bid</div>
                      </div>
                      <div className="current_bid col ms-0">
                        <div className="nft_price">{nftPrice} EVE</div>
                        <div className="sub_head">Current Bid</div>
                      </div>
                    </div>
                    {nftOwnerId === currentUserId ? (
                      <>
                        <RenderIf
                          isTrue={
                            TimeoutCompleted &&
                            isInThePast(endDate) &&
                            highestbidDetail.length === 0
                          }>
                          <button
                            type="button"
                            onClick={removefromAuctionhandler}
                            className="nft_buy_btn mt-4">
                            Remove From Auction
                          </button>
                        </RenderIf>
                        <RenderIf isTrue={!isInThePast(startDate)}>
                          <button
                            type="button"
                            onClick={removefromAuctionhandler}
                            className="nft_buy_btn mt-4">
                            Remove From Auction
                          </button>
                        </RenderIf>
                      </>
                    ) : yourBid?.length ? (
                      <div className="current_bid col ms-0 mt-4">
                        <div className="nft_price">{yourBid[0]?.price} EVE</div>
                        <div className="sub_head">Your Bid</div>
                      </div>
                    ) : (
                      isInThePast(startDate) &&
                      !isInThePast(endDate) &&
                      !TimeoutCompleted && (
                        <button
                          type="button"
                          onClick={handleplacebidClick}
                          className="nft_buy_btn mt-4">
                          Place New Bid
                        </button>
                      )
                    )}
                    {TimeoutCompleted &&
                      isInThePast(endDate) &&
                      [...highestbidDetail].sort((a, b) => a.price + b.price)[0]?.userId ===
                        currentUserId && (
                        <button
                          type="button"
                          onClick={ClaimnftHandler}
                          className="nft_buy_btn mt-4">
                          Claim NFT
                        </button>
                      )}
                  </>
                </RenderIf>
              </div>
            </RenderIf>
          </>
        );
      case 'rented':
        return (
          <>
            <div className="d-flex flex-md-row flex-column">
              <div>
                <div className="nft_price">4.953 EVE</div>
                <div className="sub_head">Current Price</div>
              </div>
              <div className="current_bid">
                <div className="nft_price">1000 EXP</div>
                <div className="sub_head">Total EXP</div>
              </div>
            </div>
            <div className="d-flex flex-md-row flex-column mt-3">
              <div className="activity_label">Time left for rental period</div>
              <div className="d-flex sub_head ms-5">
                <img src={BID_CLOCK} alt="clock" className="pe-2" />
                <div>5d : 48h : 11m : 20s </div>
              </div>
            </div>
            <button
              type="button"
              className="disconnect_btn mt-4"
              onClick={() => disconnectFromRent(listingId)}>
              Disconnect from Rent
            </button>
          </>
        );
      default:
        return '';
    }
  };

  const showModalHandler = () => {
    setShow3dModal(true);
    setCanvas('3dmodalCanvas');
  };

  const hideModalHandler = () => {
    setShow3dModal(false);
    setCanvas('');
  };

  useEffect(() => {
    callNftTradingApi(true);
  }, [event]);

  useEffect(() => {
    callCadetOverviewApi(true);
  }, [actvityTab]);

  useEffect(() => {
    if (account) {
      getUserBalance();
    }
  }, [account]);

  useEffect(() => {
    if (isLoading || loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading, loading]);
  return (
    <>
      <RenderIf isTrue={isLoading || loading}>
        <Spinner className="loader_pos" />
      </RenderIf>
      <div className={`${isLoading || loading ? 'hidesection' : ''}`}>
        <div className="row">
          <div className="col-lg-5 col-md-6  d-flex flex-column  mb-lg-0 mb-5 nft-details-img-col">
            <div className="d-flex justify-content-center">
              <div
                className={`position-relative nft-img-container ${show3dModal ? 'show_modal' : ''}`}
                id="3dmodalCanvas">
                <RenderIf isTrue={!show3dModal}>
                  <img src={nftImage} alt="nft" className="detail_nft contain" />
                </RenderIf>
                <ModalView canvasId={canvas} image={gmechImage} />
                {nftImageViewLabel ? (
                  <div className="nftdetails-image-view-label cp" onClick={showModalHandler}>
                    <img src={THREE_D_IMG} alt="3d" className="view_icon" />
                    {nftImageViewLabel}
                  </div>
                ) : null}
                <span
                  className={`nftdetails-image-label cp ${nftDetailsName}`}
                  onClick={hideModalHandler}>
                  {nftImageLabel}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="owner_shrink me-2 mt-lg-4 mt-md-2 mt-4">
                <div className="sub_head">Current Owner</div>
                <Link to={`/profile/${nftOwnerId}/gmech`} className="text-decoration-none">
                  <div className="owner_detail d-flex">
                    <img
                      src={ownerPic || DEAFULT_PROFILE_PIC}
                      alt="profile"
                      className="owner_profile"
                    />
                    {ownerName || 'N/A'}
                  </div>
                </Link>
              </div>
              <div className="me-2 mt-lg-4 mt-md-2 mt-4">
                <div className="sub_head">Wallet Address</div>
                <div className="owner_detail">{ownerWallet ? TrimWallet(ownerWallet) : 'N/A'}</div>
              </div>
              <RenderIf isTrue={noOfCopies !== nftHolded}>
                <div>
                  <div className="sub_head me-2 mt-lg-4 mt-md-2 mt-4">NFT on sale</div>
                  <div className="owner_detail justify-content-center d-flex">
                    {nftHolded - noOfCopies}
                  </div>
                </div>
              </RenderIf>
              <RenderIf isTrue={nftHolded}>
                <div>
                  <div className="sub_head me-2 mt-lg-4 mt-md-2 mt-4">NFT Held</div>
                  <div className="owner_detail justify-content-center d-flex">
                    {nftHolded || 'N/A'}
                  </div>
                </div>
              </RenderIf>
            </div>
            <RenderIf isTrue={rentedBy.length > 0}>
              <div className="rented_by mt-lg-4 mt-md-2 mt-4">
                <div className="sub_head">Rented By</div>
                <div className="owner_detail">
                  {TrimWallet(rentedBy[0]?.userId?.walletAddress)}
                  {rentedBy[1]?.userId?.walletAddress ? ' , ' : ''}
                  {TrimWallet(rentedBy[1]?.userId?.walletAddress)}
                </div>
              </div>
            </RenderIf>
          </div>
          <div className="col-lg-7 col-md-6 pt-2 ps-lg-5 pe-lg-3 px-md-3 nft-details-col">
            <div className="nft_heading">{nftName || 'N/A'}</div>
            <div className="nft_desc">{nftDesc || 'N/A'}</div>
            <Accordian data={nftData} titleClassName="accord_title" />
            {content(nftType)}
          </div>
        </div>
        <div className="d-flex justify-content-between mt-5">
          <div className="d-flex">
            <div
              className={`activity_label me-sm-5 me-3 cp ${
                actvityTab === 'activity' ? 'active' : ''
              }`}
              onClick={() => setActivityTab('activity')}>
              Activities
            </div>
            {nftType === 'g-mech' && (
              <div
                className={`activity_label cp ${actvityTab === 'cadet' ? 'active' : ''}`}
                onClick={() => setActivityTab('cadet')}>
                Cadet Overview
              </div>
            )}
          </div>
          {actvityTab === 'activity' && (
            <Dropdown className="filter-dropdown">
              <Dropdown.Toggle className="w-auto">
                <div className="activity_label">
                  Filter
                  <img src={FILTER} alt="filter" className="ms-2 filter_icon" />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="all" onClick={() => setEvent('null')}>
                  All
                </Dropdown.Item>
                <Dropdown.Item eventKey="list" onClick={() => setEvent('list')}>
                  List
                </Dropdown.Item>
                <Dropdown.Item eventKey="sale" onClick={() => setEvent('sale')}>
                  Sale
                </Dropdown.Item>
                <Dropdown.Item eventKey="mint" onClick={() => setEvent('mint')}>
                  Mint
                </Dropdown.Item>
                <RenderIf isTrue={nftType === 'g-mech'}>
                  <Dropdown.Item eventKey="mint" onClick={() => setEvent('rent')}>
                    Rent
                  </Dropdown.Item>
                </RenderIf>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        {actvityTab === 'activity' ? (
          <div className="res-table mt-3 nft-details-table-div">
            <InfiniteScroll
              className="overflow-hidden"
              dataLength={tradingHistory?.list?.length || 0}
              next={fetchMoreData}
              hasMore={tradingHistory?.hasMore}
              loader={<Spinner />}>
              <table className="table table-borderless activity_table">
                <thead>
                  <tr className="activity_head">
                    <th scope="col" className="w-25">
                      Event
                    </th>
                    <th scope="col" className="w-25">
                      Price
                    </th>
                    <th scope="col" className="w-25">
                      From
                    </th>
                    <th scope="col" className="w-25">
                      To
                    </th>
                    <th scope="col" className="w-25">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="activity_tb">
                  <RenderIf isTrue={!tradingHistoryLoader && !tradingHistory?.list?.length}>
                    <tr className="mt-5">
                      <td colSpan={5}>
                        <NoDataFound text="No activity found" />
                      </td>
                    </tr>
                  </RenderIf>
                  <RenderIf isTrue={tradingHistoryLoader && tradingHistory?.list?.length}>
                    <tr className="mt-5">
                      <td colSpan={5}>
                        <Spinner />
                      </td>
                    </tr>
                  </RenderIf>
                  <RenderIf isTrue={!tradingHistoryLoader && tradingHistory?.list?.length > 0}>
                    {tradingHistory?.list?.map((detail) => (
                      <tr key={detail?._id}>
                        <td className="activity_sale">
                          <img
                            src={
                              detail?.event === 'sale'
                                ? SALE
                                : detail?.event === 'list'
                                ? BUY
                                : MINT_ICON
                            }
                            alt="sale"
                            className="sale_icon"
                          />
                          {detail?.event}
                        </td>
                        <td className="activity_price">{detail?.price || 0} EVE</td>
                        <td className="activity_trade">
                          {TrimWallet(detail?.sellerId?.walletAddress)}
                        </td>
                        <td className="activity_trade">
                          {detail?.event === 'mint'
                            ? TrimWallet(REACT_APP_EVE_CONTRACT)
                            : detail?.event === 'list'
                            ? TrimWallet(REACT_APP_MARKETPLACE_ADDRESS)
                            : TrimWallet(detail?.buyerId?.walletAddress)}
                        </td>
                        <td className="activity_date">
                          {moment(detail?.updatedAt).format('DD/MM/YYYY')}
                        </td>
                      </tr>
                    ))}
                  </RenderIf>
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        ) : (
          <div className="res-table mt-3 nft-details-table-div">
            <InfiniteScroll
              className="overflow-hidden"
              dataLength={cadetOverview?.list?.length || 0}
              next={fetchMoreCadetData}
              hasMore={cadetOverview?.hasMore}
              loader={<Spinner />}>
              <table className="table table-borderless activity_table">
                <thead>
                  <tr className="activity_head">
                    <th scope="col" className="w-25">
                      Cadet
                    </th>
                    <th scope="col" className="w-25">
                      From Date
                    </th>
                    <th scope="col" className="w-25">
                      To Date
                    </th>
                    <th scope="col" className="w-25 pe-0">
                      EXP Contribution
                    </th>
                  </tr>
                </thead>
                <tbody className="activity_tb">
                  <RenderIf isTrue={!cadetOverviewLoader && !cadetOverview?.list?.length}>
                    <tr className="mt-5">
                      <td colSpan={5}>
                        <NoDataFound text="No activity found" />
                      </td>
                    </tr>
                  </RenderIf>
                  <RenderIf isTrue={cadetOverviewLoader && cadetOverview?.list?.length}>
                    <tr className="mt-5">
                      <td colSpan={5}>
                        <Spinner />
                      </td>
                    </tr>
                  </RenderIf>
                  <RenderIf isTrue={!cadetOverviewLoader && cadetOverview?.list?.length > 0}>
                    {cadetOverview?.list?.map((detail) => (
                      <tr key={detail?._id}>
                        <td className="activity_sale">{detail.cadetId._id}</td>
                        <td className="activity_price">
                          {moment(detail?.fromDate).format('DD/MM/YYYY')}
                        </td>
                        <td className="activity_trade">
                          {moment(detail?.toDate).format('DD/MM/YYYY')}
                        </td>
                        <td className="activity_date">N/A</td>
                      </tr>
                    ))}
                  </RenderIf>
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        )}
      </div>
      {ListModal && (
        <NftSaleModal
          showModal={ListModal}
          closeModal={() => setListModal(false)}
          tokenId={tokenId}
          copies={noOfCopies}
          nftType={nftType}
          getData={getData}
          userId={currentUserId}
        />
      )}
      {bidModal && (
        <PlaceBidModal
          showModal={bidModal}
          closeModal={() => setBidModal(false)}
          tokenId={tokenId}
          copies={noOfCopies}
          nftType={nftType}
          listId={listId}
          id={nftId}
          owner={nftOwnerId}
          // id={id}
          highestBid={highestBid}
          // owner={owner}
          currentBid={nftPrice}
        />
      )}
      <AlertMessageModal />
    </>
  );
}

export default NftDetails;
