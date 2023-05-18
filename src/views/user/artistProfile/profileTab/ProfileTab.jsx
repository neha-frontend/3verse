import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { MARKETPLACE_CARD } from '../../../../assets/images';
import { MarketPlaceCard, NoDataFound, Spinner } from '../../../../components';
import { getUserNftListAction } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';
import ProfileStats from '../profileStats/ProfileStats';

const ProfileTab = ({ type = '', userStat = {} }) => {
  const dispatch = useDispatch();
  const { isLoading, nftData } = useSelector((state) => state.nft.profileNftList);

  const callUserNftListApi = (isNew = false) =>
    dispatch(
      getUserNftListAction({
        page: isNew ? 1 : nftData.page + 1,
        limit: 9,
        URL: generateURL({
          page: isNew ? 1 : nftData.page + 1,
          limit: 9,
          nftType: type,
          'multipleOwners.userId': userStat?._id,
          removeNull: true
        }),
        isNew
      })
    );

  const fetchMoreData = () => {
    callUserNftListApi();
  };

  useEffect(() => {
    callUserNftListApi(true);
  }, [type]);

  return (
    <>
      <div className="ability_body">
        <RenderIf isTrue={isLoading}>
          <Spinner className="mt-5" />
        </RenderIf>
        <RenderIf isTrue={!isLoading && nftData?.list?.length > 0}>
          <InfiniteScroll
            className="overflow-hidden"
            dataLength={nftData && nftData?.list?.length}
            next={fetchMoreData}
            hasMore={nftData?.hasMore}
            loader={<Spinner />}>
            <div className="row mt-sm-5 mt-2">
              {nftData?.list?.map((details) =>
                details?.multipleOwners.map((detail) =>
                  detail?.userId?._id === userStat?._id && detail?.sellQuantity > 0 ? (
                    <MarketPlaceCard
                      screen="ability"
                      key={details?.id}
                      redirectTo={`/nft-detail/${details?._id}/${userStat?._id}`}
                      mainClass="ability_card"
                      img={details?.previewImage || MARKETPLACE_CARD}
                      nftName={details?.title}
                      nftType={details?.nftType}
                      ownerId={userStat?._id}
                      nftId={details?._id}
                      id={details?._id}
                      likes={details?.likeCount}
                      isLiked={details?.isLiked}
                    />
                  ) : null
                )
              )}
            </div>
          </InfiniteScroll>
        </RenderIf>

        <RenderIf isTrue={!isLoading && !nftData?.list?.length}>
          <NoDataFound text={`No ${type} Found`} className="mt-sm-5 mt-2" withImage={false} />
        </RenderIf>

        <RenderIf isTrue={!isLoading}>
          <ProfileStats userStat={userStat} />
        </RenderIf>
      </div>
    </>
  );
};

export default ProfileTab;
