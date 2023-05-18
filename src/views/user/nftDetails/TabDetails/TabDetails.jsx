import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import NftDetails from '../NftDetails';
import { ABILITY_IMG } from '../../../../assets/images';
import { SubHeaderLayout } from '../../../../layout';
import { getNftDetailsAction } from '../../../../store/sagaActions';
import { RenderIf } from '../../../../utils';
import { Spinner } from '../../../../components';
import NftData from './NftData';

import './Details.css';

const TabDetails = () => {
  const dispatch = useDispatch();
  const { id, owner, listingId } = useParams();
  const { isLoading, nftData } = useSelector((state) => state.nft.nftDetail);
  const [Loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  const nftOwnerId = localStorage.getItem('nftOwnerId');
  const currentUser = data?._id;
  const location = useLocation();
  const getNftData = () =>
    dispatch(getNftDetailsAction({ id: id, ownerId: owner, list: listingId }));

  useEffect(() => {    
    getNftData();
  }, [id, nftOwnerId]);

  const newar = [];
  nftData?.onsaleNft?.bidInfo.map((detail) => {
    newar.push(detail?.price);
  });

  const nftLabel = (tabs) => {
    switch (tabs) {
      case 'armor':
        return 'Armor';
      case 'skin':
        return 'Skin';
      case 'ability':
        return 'Abilities';
      case 'mech':
        return 'Mech pod';
      case 'g-mech':
        return 'G-Mech';
      default:
        return 'Mech';
    }
  };

  return (
    <>
      <RenderIf isTrue={isLoading || Loading}>
        <Spinner className="nft_spinner" />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <SubHeaderLayout
          mainClassName={`Wrapper-container ${
            isLoading || Loading ? 'hidesection' : ''
          } nftDetailsWrapper`}
          headerText={`Home page${
            location.state === null || location.state === 'home'
              ? ''
              : location.state === 'marketplace'
              ? '  .   MarketPlace'
              : '  .   Profile'
          }  .  NFT Details`}>
          <NftDetails
            nftImage={nftData?.nft?.mediaUrl || nftData?.nft?.previewImage || ABILITY_IMG}
            nftImageLabel={nftLabel(nftData?.nft?.nftType)}
            nftDetailsName={nftData?.nft?.nftType === 'g-mech' ? 'G-mech' : 'skins'}
            nftImageViewLabel={nftData?.nft?.nftType === 'g-mech' ? '3D View' : ''}
            nftData={NftData({ nftData, currentUser, nftOwnerId })}
            nftName={nftData?.nft?.title}
            nftDesc={nftData?.nft?.description}
            nftType={nftData?.nft?.nftType}
            setLoading={(val) => setLoading(val)}
            tokenId={nftData?.nft?.tokenId}
            listId={nftData?.onsaleNft?.listedId}
            endDate={nftData?.onsaleNft?.auctionEndDate}
            startDate={nftData?.onsaleNft?.auctionStartDate}
            nftPrice={nftData?.onsaleNft?.price}
            nftOwnerId={
              nftData?.nft?.multipleOwners?.userId?._id ||
              nftData?.nft?.multipleOwners[0]?.userId?._id
            }
            ownerName={
              nftData?.nft?.multipleOwners?.userId?.username ||
              nftData?.nft?.multipleOwners[0]?.userId?.username
            }
            ownerWallet={
              nftData?.nft?.multipleOwners?.userId?.walletAddress ||
              nftData?.nft?.multipleOwners[0]?.userId?.walletAddress
            }
            ownerPic={
              nftData?.nft?.multipleOwners?.userId?.profilePic?.link ||
              nftData?.nft?.multipleOwners[0]?.userId?.profilePic?.link
            }
            noOfCopies={nftData?.nft?.multipleOwners?.sellQuantity}
            nftHolded={nftData?.nft?.multipleOwners?.copiesHolded}
            sellType={nftData?.onsaleNft?.sellType}
            listingType={nftData?.onsaleNft?.listingType}
            currentUserId={currentUser}
            nftId={id}
            yourBid={nftData?.onsaleNft?.bidInfo.filter((detail) => {
              if (detail.userId === currentUser) return detail.price;
            })}
            highestbidDetail={nftData?.onsaleNft?.bidInfo}
            highestBid={newar.length ? Math.max(...newar) : nftData?.onsaleNft?.price}
            getData={getNftData}
            rentedBy={nftData?.onsaleNft?.rentedBy}
            isRented={nftData?.onsaleNft?.rentedBy?.filter((detail) => {
              if (detail.userId?._id === currentUser) return detail.userId?._id;
            })}
            listingId={nftData?.onsaleNft?._id}
            gmechImage={nftData?.nft?.gmech?.openSeaImage}
          />
        </SubHeaderLayout>
      </RenderIf>
    </>
  );
};

export default TabDetails;
