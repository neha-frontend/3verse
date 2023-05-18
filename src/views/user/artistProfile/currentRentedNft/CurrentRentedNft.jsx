import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { MARKETPLACE_CARD } from '../../../../assets/images';
import { MarketPlaceCard, NoDataFound, Spinner } from '../../../../components';
import { getUserOnSaleNftAction } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';
import ProfileStats from '../profileStats/ProfileStats';

const CurrentRentedNft = ({ userStat = {} }) => {
  const dispatch = useDispatch();
  const { isLoading, onSaleNftList } = useSelector((state) => state.nft.userNFtOnSaleAndRent);
  const callNftOnSaleApi = (isNew = false) =>
    dispatch(
      getUserOnSaleNftAction({
        page: isNew ? 1 : onSaleNftList.page + 1,
        limit: 9,
        URL: generateURL({
          page: isNew ? 1 : onSaleNftList.page + 1,
          limit: 9,
          'rentedBy.userId': userStat?._id,
          listingType: 'rent',
          removeNull: true
        }),
        isNew
      })
    );

  const fetchMoreData = () => callNftOnSaleApi();

  useEffect(() => {
    callNftOnSaleApi(true);
  }, []);

  return (
    <>
      <RenderIf isTrue={isLoading}>
        <Spinner className="mt-5" />
      </RenderIf>
      <RenderIf isTrue={!isLoading && onSaleNftList?.list?.length > 0}>
        <InfiniteScroll
          className="overflow-hidden"
          dataLength={onSaleNftList && onSaleNftList?.list?.length}
          next={fetchMoreData}
          hasMore={onSaleNftList?.hasMore}
          loader={<Spinner />}>
          <div className="row mt-5">
            {onSaleNftList?.list?.map((detail) => (
              <MarketPlaceCard
                screen="sale"
                key={detail?.id}
                redirectTo={`/nft-detail/${detail?.currentOwner?._id}/rent`}
                // redirectTo={`/nft-detail/${detail?.itemId?._id}/${detail?.currentOwner?._id}`}
                mainClass="sale_card"
                img={detail?.itemId?.previewImage || MARKETPLACE_CARD}
                nftName={detail?.itemId?.title}
                nftType={detail?.nftType}
                price={detail?.price}
                showLike={false}
                // likes={detail?.itemId?.likedByUserIds?.length}
                ownerId={detail?.currentOwner?._id}
                nftId={detail?.id}
                // isLiked={detail?.isLiked}
                id={detail?._id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </RenderIf>

      <RenderIf isTrue={!isLoading && !onSaleNftList?.list?.length}>
        <NoDataFound text="No rented NFT found" className="mt-5" withImage={false} />
      </RenderIf>
      <ProfileStats rentedNft={true} onRent={onSaleNftList?.list?.length} userStat={userStat} />
    </>
  );
};

export default CurrentRentedNft;
