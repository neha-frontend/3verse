import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { HEART_ICON, MARKETPLACE_CARD } from '../../../assets/images';
import { REACT_APP_EMECH_ADDRESS, REACT_APP_MECH_ADDRESS } from '../../../config/envConfig';
import {
  BUY_SUCCESS_MSG,
  CADET_BUY_ERROR_MSG,
  CONNECT_WALLET_MSG
} from '../../../constants/modalConstant';
import { LOGIN_MODAL } from '../../../constants/modalTypeConstant';
import { useBuyNfthook } from '../../../hooks';
import { buyNftFromRentAction, likeUnlikeNftAction, showCustomModal, showModal } from '../../../store/sagaActions';
import { RenderIf } from '../../../utils';
// import AlertMessageModal from '../../modal/AlertMessageModal';

const NewNftCard = ({
  id = '',
  redirectTo = '/',
  img = MARKETPLACE_CARD,
  setLoading,
  nftId = '',
  nftName = '',
  nftType = '',
  nftInfo,
  callMechApi,
  price = null,
  likes = 0,
  screen = '',
  isLiked = false,
  sellType,
  isRentable = false,
  currentOwner = '',
  rentedBy,
  auctionOpen = true
}) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const isLogin = localStorage.getItem('authToken');
  const { handleBuy } = useBuyNfthook();
  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  const currentUser = data?._id;
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

  const buyNftOnRent = (e, listingId) => {
    e.preventDefault();
    if (!isLogin) return openLoginModal();
    const rentDetail = {
      listingId: listingId
    };
    dispatch(buyNftFromRentAction({ rentDetail, getData: callMechApi, setLoading }));
  };

  const buyNowhandler = async (e) => {
    e.preventDefault();
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
    if (!account)
      return dispatch(
        showModal({
          message: CONNECT_WALLET_MSG,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true,
          redirectURL: '/select-wallet'
        })
      );
    setLoading(true);
    const { listedId, itemId, nftType } = nftInfo;
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
            showCloseButton: true
          })
        );
        callMechApi();
      },
      (err) => {
        handleError(err);
      }
    );
  };
  return (
    <>
      <Link
        to={redirectTo}
        className="col-lg-3 col-md-3 col-sm-4 new_item_box w-100"
        state={screen === 'NEW_ITEMS' ? 'home' : ''}>
        <div className="item_box">
          <div className="relative img_container pb-0">
            <img src={img} alt="recently-added" className="new_Itm_img card_img" />
          </div>
          <div className="d-flex justify-content-between mt-1 new_item_details">
            <div className="text-decoration-none">
              <span className="nft_name">{nftName}</span>
              <br />
              <span className="mech_type text-capitalize">{nftType}</span>
            </div>
            <RenderIf isTrue={price !== null || price !== undefined}>
              <div>
                <div className="nft_cost mb-2">{price} EVE</div>
                <div className="d-flex like_count" onClick={handleLikeClick}>
                  <img
                    src={HEART_ICON}
                    alt="recently-added"
                    className={`heart_icon ${isLiked ? 'red-filter' : ''}`}
                  />
                  <span className={`likes ${isLiked ? 'text-danger' : ''}`}>{likes}</span>
                </div>
              </div>
            </RenderIf>
          </div>
          <div className="display_btn">
            <RenderIf isTrue={sellType == 'fixed' && currentOwner !== currentUser}>
              <button className="buy_btn" type="button" onClick={buyNowhandler}>
                Buy Now
              </button>
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
              <button className="rent_btn" type="button" onClick={(e) => buyNftOnRent(e, id)}>
                Rent Now
              </button>
            </RenderIf>
          </div>
        </div>
      </Link>
      {/* <AlertMessageModal /> */}
    </>
  );
};

export default NewNftCard;
