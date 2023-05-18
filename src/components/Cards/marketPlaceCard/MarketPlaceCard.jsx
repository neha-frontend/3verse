/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import { HEART_ICON, MARKETPLACE_CARD, RENT_ICON } from '../../../assets/images';
import { RenderIf } from '../../../utils';
import { useBuyNfthook, useGetEveTokenBalance } from '../../../hooks';
import { REACT_APP_EMECH_ADDRESS, REACT_APP_MECH_ADDRESS } from '../../../config/envConfig';
import { useDispatch, useSelector } from 'react-redux';
import {
  buyNftFromRentAction,
  likeUnlikeNftAction,
  showCustomModal,
  showModal
} from '../../../store/sagaActions';
import {
  BUY_SUCCESS_MSG,
  CADET_BUY_ERROR_MSG,
  CONNECT_WALLET_MSG,
  INSUFFICIENT_BALANCE
} from '../../../constants/modalConstant';
import AlertMessageModal from '../../modal/AlertMessageModal';
import { LOGIN_MODAL } from '../../../constants/modalTypeConstant';

import './marketPlaceCard.css';

const MarketPlaceCard = ({
  id = '',
  setLoading,
  mainClass = 'marketplace_card',
  screen = 'marketplace',
  redirectTo = '/',
  img = MARKETPLACE_CARD,
  nftId = '',
  nftName = 'NFT Name',
  nftType = 'C-Mech',
  price = '',
  callMechApi,
  nftInfo,
  likes = 0,
  isLiked = false,
  isBoughtabel = false,
  isRentable = false,
  token = '',
  marketplaceTab = '',
  ownerId = '',
  showLike = true,
  rentedBy = [],
  auctionOpen = true
}) => {
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { handleBuy } = useBuyNfthook();
  const { getUserBalance, userBalance } = useGetEveTokenBalance();
  const isLogin = localStorage.getItem('authToken');
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  const currentUser = data?._id;

  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));

  const handleLikeClick = (e) => {
    e.preventDefault();
    if (!isLogin) return openLoginModal();

    dispatch(likeUnlikeNftAction({ data: { nftId }, isLiked, screen, key: id }));
  };

  const handleError = (er) => {
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

  useEffect(() => {
    if (account) {
      getUserBalance();
    }
  }, [account]);
  
  const buyNowhandler = async (e) => {
    e.preventDefault();
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
      if (parseFloat(userBalance) <= parseFloat(price)) {
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
      const { listedId, itemId } = nftInfo;
      handleBuy(
        itemId.tokenId,
        listedId,
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
              redirectURL: `/profile/${currentUser}/${nftType == 'g-mech' ? 'gmech' : nftType}`
            })
          );
          callMechApi();
        },
        (err) => {
          handleError(err);
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const buyNftOnRent = (e, listingId) => {
    e.preventDefault();
    if (!isLogin) return openLoginModal();
    const rentDetail = {
      listingId: listingId
    };
    dispatch(buyNftFromRentAction({ rentDetail, getData: callMechApi, setLoading }));
  };

  return (
    <>
      <div
        className={`${
          screen === 'marketplace'
            ? 'col-lg-4 col-md-6 col-12 mt-2 mb-2 marketplace'
            : 'col-lg-3 col-md-4 col-sm-4'
        } ${mainClass} gmech_tab`}>
        <Link to={redirectTo} state={screen}>
          <div className="marketplace_box sale_box gmech_box">
            <RenderIf isTrue={screen === 'marketplace'}>
              <div
                className={`${
                  marketplaceTab === 'ability'
                    ? 'abilityImgContainer marketplaceImgContainer'
                    : 'marketplaceImgContainer'
                }`}>
                <img src={img} alt="recently-added" className="marketplaceImg" />
              </div>
            </RenderIf>
            <RenderIf isTrue={screen !== 'marketplace' && screen !== 'gmech'}>
              <div className="gmechImgContainer">
                <img src={img} alt="recently-added" className="sale_img gmech_img" />
              </div>
            </RenderIf>
            <RenderIf isTrue={screen === 'gmech'}>
              <div className="position-relative">
                <div className="gmechImgContainer">
                  <img src={img} alt="recently-added" className="sale_img gmech_img" />
                </div>
                <div className="d-flex rent_icon">
                  <img src={RENT_ICON} width={20} height={20} alt="rent-icon"/>
                  <span className="rent_slot">2</span>
                </div>
              </div>
            </RenderIf>
            <RenderIf isTrue={screen === 'mech'}>
              <div className="d-flex justify-content-between nftDetails mech_detail">
                <span className="nft_name">{token}</span>
              </div>
            </RenderIf>
            <RenderIf
              isTrue={
                screen === 'gmech' ||
                screen === 'marketplace' ||
                screen === 'sale' ||
                screen === 'favourite' ||
                screen === 'rent'
              }>
              <div
                className={`d-flex justify-content-between mt-2 nftDetails ${
                  screen === 'marketplace' ? 'marketplaceDetailsW' : ''
                }`}>
                <span className="nft_name">{nftName}</span>
                <RenderIf isTrue={price !== ''}>
                  <div className="nft_cost">{price} EVE</div>
                </RenderIf>
              </div>
              <div
                className={`d-flex justify-content-between mt-1 mechType ${
                  screen === 'marketplace' ? 'marketplaceDetailsW' : ''
                }`}>
                <span className="mech_type text-capitalize">{nftType}</span>
                <RenderIf isTrue={showLike}>
                  <div className="d-flex align-items-center" onClick={handleLikeClick}>
                    <img
                      src={HEART_ICON}
                      alt="recently-added"
                      className={`market_heart_icon  ${isLiked ? 'red-filter' : ''}`}
                    />
                    <span className={`likes ${isLiked ? 'text-danger' : ''}`}>{likes}</span>
                  </div>
                </RenderIf>
              </div>
              <RenderIf isTrue={screen === 'marketplace'}>
                <div
                  className={`display_btn row ${
                    screen === 'marketplace' ? 'marketplaceDetailsW' : ''
                  }`}>
                  <RenderIf
                    isTrue={
                      nftInfo?.sellType !== 'auction' && nftInfo?.currentOwner?._id !== currentUser
                    }>
                    <RenderIf isTrue={isBoughtabel}>
                      <button onClick={buyNowhandler} className="buy_btn col" type="button">
                        Buy Now
                      </button>
                    </RenderIf>
                  </RenderIf>
                  <RenderIf
                    isTrue={
                      nftInfo?.sellType === 'auction' && nftInfo?.currentOwner?._id !== currentUser
                    }>
                    <button className="rent_btn col" type="button">
                      {auctionOpen ? 'Place Bid' : 'Auction Closed'}
                    </button>
                  </RenderIf>                 
                  <RenderIf
                    isTrue={
                      isRentable &&
                      rentedBy?.length < 2 &&
                      nftInfo?.currentOwner?._id !== currentUser &&
                      !rentedBy.filter((detail) => detail?.userId === currentUser).length
                    }>
                    <button
                      className="rent_btn col"
                      type="button"
                      onClick={(e) => buyNftOnRent(e, id)}>
                      Rent Now
                    </button>
                  </RenderIf>
                </div>
              </RenderIf>
            </RenderIf>
            <RenderIf isTrue={screen === 'ability'}>
              <div className="d-flex justify-content-between mt-1">
                <span className="nft_name">{nftName}</span>
                <div className="d-flex" onClick={handleLikeClick}>
                  <img
                    src={HEART_ICON}
                    alt="recently-added"
                    className={`market_heart_icon  ${isLiked ? 'red-filter' : ''}`}
                  />
                  <span className={`likes ${isLiked ? 'text-danger' : ''}`}>{likes}</span>
                </div>
              </div>
            </RenderIf>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MarketPlaceCard;
