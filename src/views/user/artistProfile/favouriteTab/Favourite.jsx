import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { MarketPlaceCard, NoDataFound, Spinner } from '../../../../components';
import { getFavouriteNftAction } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';
import { MARKETPLACE_CARD } from '../../../../assets/images';

const FavouriteTab = ({userStat = {}}) => {
  const dispatch = useDispatch();
  const { isLoading, favouriteNftData } = useSelector((state) => state.nft.favouriteNft);

  const callFavouriteNftApi = (isNew = false) =>
    dispatch(
      getFavouriteNftAction({
        page: isNew ? 1 : favouriteNftData.page + 1,
        limit: 9,
        userId: userStat?._id,
        URL: generateURL({
          page: isNew ? 1 : favouriteNftData.page + 1,
          limit: 9,          
          removeNull: true
        }),
        isNew
      })
    );

  const fetchMoreData = () => callFavouriteNftApi();

  useEffect(() => {
    callFavouriteNftApi(true);
  }, []);

  return (
    <>
      <RenderIf isTrue={isLoading}>
        <Spinner className="mt-5" />
      </RenderIf>
      <RenderIf isTrue={!isLoading && favouriteNftData?.list?.length > 0}>
        <InfiniteScroll
          className="overflow-hidden"
          dataLength={favouriteNftData && favouriteNftData?.list?.length}
          next={fetchMoreData}
          hasMore={favouriteNftData?.hasMore}
          loader={<Spinner />}>
          <div className="row mt-sm-5 mt-3">
            {favouriteNftData?.list?.map((detail) => (
              <MarketPlaceCard
                screen="favourite"
                key={detail?.id}
                redirectTo={`/nft-detail/${detail?.id}/${detail?.currentOwner}`}
                mainClass="sale_card"
                img={detail?.previewImage || MARKETPLACE_CARD}
                nftName={detail?.title}
                nftType={detail?.nftType}
                price={detail?.price}
                likes={detail?.likeCount}
                ownerId={detail?.currentOwner}
                nftId={detail?.id}
                isLiked={detail?.isLiked}
                id={detail?._id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </RenderIf>

      <RenderIf isTrue={!isLoading && !favouriteNftData?.list?.length}>
        <NoDataFound text="No favourite nft found" className="mt-5" withImage={false} />
      </RenderIf>
    </>
  );
};

export default FavouriteTab;
