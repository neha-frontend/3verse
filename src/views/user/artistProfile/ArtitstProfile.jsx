import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SubHeaderLayout } from '../../../layout';
import { myProfileTabs, otherProfileTabs } from './profileTabs';
import { RenderIf } from '../../../utils';
import NftForSale from './nftForSale/NftforSale';
import NftOnRent from './nftOnRent/NftOnRent';
import FavouriteTab from './favouriteTab/Favourite';
import BidTab from './bidTab/BidTab';
import { DEAFULT_PROFILE_PIC, DISCORD_ICON, EDIT } from '../../../assets/images';
import CurrentRentedNft from './currentRentedNft/CurrentRentedNft';
import { getOtherUserProfileAction, showCustomModal } from '../../../store/sagaActions';
import { EDIT_PROFILE_MODAL } from '../../../constants/modalTypeConstant';
import { EditProfileModal, Spinner } from '../../../components';
import ProfileTab from './profileTab/ProfileTab';
import MechGmech from './mechGmech/MechGmech';

import './artistProfile.css';

const ArtistProfile = () => {
  const [showMore, setShowMore] = useState(false);
  const { tab, userId } = useParams();
  const dispatch = useDispatch();
  const openEditProfileModal = () =>
    dispatch(showCustomModal({ customModalType: EDIT_PROFILE_MODAL }));
  const { isLoading, data } = useSelector((state) => state.profile.otherUserProfile);
  const { data: currentUser } = useSelector((state) => state.profile.currentUserProfile);
  const content = (tabs) => {
    switch (tabs) {
      case 'gmech':
        return <MechGmech type="gmech" screen="gmech" mainClass="gmech_card" userStat={data} />;

      case 'mech':
        return <MechGmech type="mech" screen="mech" mainClass="mech_card" userStat={data} />;

      case 'ability':
        return <ProfileTab type="ability" userStat={data} />;

      case 'armor':
        return <ProfileTab type="armor" userStat={data} />;

      case 'skin':
        return <ProfileTab type="skin" userStat={data} />;

      case 'sale':
        return <NftForSale userStat={data} />;

      case 'rent':
        return <NftOnRent userStat={data} />;

      case 'bid':
        {
          if (isMyProfile) return <BidTab userStat={data} />;
        }
        break;
      case 'favourite':
        {
          if (isMyProfile) return <FavouriteTab userStat={data} />;
        }

        break;

      case 'rentedNFT':
        return <CurrentRentedNft userStat={data} />;

      default:
        return 'Comming Soon';
    }
  };

  const isMyProfile = userId === currentUser?._id;

  useEffect(() => {
    dispatch(getOtherUserProfileAction({ userId: userId }));
  }, [userId]);

  return (
    <>
      <RenderIf isTrue={isLoading}>
        <Spinner className="nft_spinner" />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <SubHeaderLayout
          mainClassName="marketplaceWrapper-conatainer"
          headerClassName="marketplace-path-title"
          headerText="Home page . Profile">
          <>
            {!data?.privacySettings?.profileVisiblity && !isMyProfile ? (
              <div className="no-data-found-label border-0 hidden_collection">
                User profile is hidden
              </div>
            ) : (
              <>
                <div className="d-flex flex-lg-row flex-column justify-content-between">
                  <div className="d-flex">
                    <img
                      src={data?.profilePic?.link || DEAFULT_PROFILE_PIC}
                      alt="profile"
                      className="artist_profile"
                    />
                    <div>
                      {/* <div className="artist_name">{data?.fullname || 'N/A'}</div> */}
                      <div className="artist_username">@{data?.username || 'N/A'}</div>
                      <div className="artist_desc">{data?.walletAddress}</div>
                      <div className="artist_desc mt-lg-1">
                        {data?.bio.slice(0, 200) || 'N/A'}
                        {data?.bio?.length > 200 ? (
                          <span>
                            {showMore ? (
                              <>
                                {data?.bio.slice(200, 500)}
                                <span
                                  className="read_more cp ms-1"
                                  onClick={() => setShowMore(!showMore)}>
                                  Show less
                                </span>
                              </>
                            ) : (
                              <span
                                className="read_more cp ms-2"
                                onClick={() => setShowMore(!showMore)}>
                                ...Read More
                              </span>
                            )}
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="chat-edit-btn-container">
                    <button className="chat_btn" type="button">
                      <img src={DISCORD_ICON} alt="chat" className="chat_img" />{' '}
                      {data?.discordId || 'N/A'}
                    </button>
                    <RenderIf isTrue={isMyProfile}>
                      <button
                        className="chat_btn mt-lg-2 mt-3"
                        type="button"
                        onClick={openEditProfileModal}>
                        <img src={EDIT} alt="edit" className="edit_img" /> Edit Profile
                      </button>
                    </RenderIf>
                  </div>
                </div>
                {/* <RenderIf isTrue={data?.userType === 'General' || data?.userType === 'Admin'}> */}
                <div className="profile-tab-container">
                  <div className="profile_tab">
                    <RenderIf isTrue={isMyProfile}>
                      {myProfileTabs.map((tabData, index) => (
                        // <>
                        //   {tabData?.isAdmin
                        //     ? data?.userType === 'Admin' && (
                        <Link
                          key={index}
                          to={`${tabData.redirect}/${userId}/${tabData.currentTab}`}
                          className={`${tabData.className} ${
                            tab === tabData.currentTab ? 'active' : ''
                          }`}>
                          {tabData.text}
                        </Link>
                        // )
                        //     : null}
                        //   {tabData?.isAdmin === false ? (
                        //     <Link
                        //       to={`${tabData.redirect}/${userId}/${tabData.currentTab}`}
                        //       className={`${tabData.className} ${
                        //         tab === tabData.currentTab ? 'active' : ''
                        //       }`}>
                        //       {tabData.text}
                        //     </Link>
                        //   ) : null}
                        // </>
                      ))}
                      {content(tab)}
                    </RenderIf>
                    <RenderIf isTrue={!isMyProfile}>
                      {otherProfileTabs.map((tabData) => (
                        <>
                          <Link
                            to={`${tabData.redirect}/${userId}/${tabData.currentTab}`}
                            className={`${tabData.className} ${
                              tab === tabData.currentTab ? 'active' : ''
                            }`}>
                            {tabData.text}
                          </Link>
                        </>
                      ))}
                      <RenderIf isTrue={!data?.privacySettings?.collectionVisiblity}>
                        <div className="no-data-found-label border-0 hidden_collection">
                          User collection is hidden
                        </div>
                      </RenderIf>
                      <RenderIf isTrue={data?.privacySettings?.collectionVisiblity}>
                        {content(tab)}
                      </RenderIf>
                    </RenderIf>
                  </div>
                </div>
                {/* </RenderIf> */}
                {/* <RenderIf isTrue={data?.userType === 'Cadet'}>
                  <div className="profile-tab-container">
                    <div className="cadet_profile_tab">Current Rented NFTs</div>
                    <RenderIf isTrue={isMyProfile}>                     
                        <CurrentRentedNft userStat={data} />             
                    </RenderIf>
                    <RenderIf isTrue={!isMyProfile}>
                      <RenderIf isTrue={!data?.privacySettings?.collectionVisiblity}>
                        <div className="no-data-found-label border-0 hidden_collection">
                          User collection is hidden
                        </div>
                      </RenderIf>
                      <RenderIf isTrue={data?.privacySettings?.collectionVisiblity}>
                        <CurrentRentedNft userStat={data} />
                      </RenderIf>
                    </RenderIf>
                  </div>
                </RenderIf> */}
              </>
            )}
          </>
          <EditProfileModal />
        </SubHeaderLayout>
      </RenderIf>
    </>
  );
};

export default ArtistProfile;
