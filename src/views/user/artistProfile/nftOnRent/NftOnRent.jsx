import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { MARKETPLACE_CARD } from '../../../../assets/images';
import { MarketPlaceCard, NoDataFound, Spinner } from '../../../../components';
import { getUserOnRentNftAction } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';

const NftOnRent = ({ userStat = {} }) => {
  const dispatch = useDispatch();
  const { isLoading, onRentNftList } = useSelector((state) => state.nft.userNFtOnSaleAndRent);
  const callNftOnRentApi = (isNew = false) =>
    dispatch(
      getUserOnRentNftAction({
        page: isNew ? 1 : onRentNftList.page + 1,
        limit: 9,
        URL: generateURL({
          page: isNew ? 1 : onRentNftList.page + 1,
          limit: 9,
          currentOwner: userStat?._id,
          listingType: 'rent',
          removeNull: true
        }),
        isNew
      })
    );

  const fetchMoreData = () => callNftOnRentApi();

  useEffect(() => {
    callNftOnRentApi(true);
  }, []);

  return (
    <>
      <RenderIf isTrue={isLoading}>
        <Spinner className="mt-5" />
      </RenderIf>
      <RenderIf isTrue={!isLoading && onRentNftList?.list?.length > 0}>
        <InfiniteScroll
          className="overflow-hidden"
          dataLength={onRentNftList && onRentNftList?.list?.length}
          next={fetchMoreData}
          hasMore={onRentNftList?.hasMore}
          loader={<Spinner />}>
          <div className="row mt-sm-5 mt-2">
            {onRentNftList?.list?.map((detail) => (
              <MarketPlaceCard
                screen="rent"
                key={detail?.id}
                redirectTo={`/nft-detail/${detail?.itemId?._id}/${userStat?._id}/rent`}
                mainClass="sale_card"
                img={detail?.itemId?.previewImage || MARKETPLACE_CARD}
                nftName={detail?.itemId?.title}
                nftType={detail?.nftType}
                price={detail?.price}
                likes={detail?.likeCount}
                isLiked={detail?.itemId?.isLiked}
                nftId={detail?.itemId?._id}
                id={detail?._id}
                ownerId={userStat?._id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </RenderIf>

      <RenderIf isTrue={!isLoading && !onRentNftList?.list?.length}>
        <NoDataFound text="No NFT for rent found" className="mt-5" withImage={false} />
      </RenderIf>
    </>
  );
};

export default NftOnRent;
