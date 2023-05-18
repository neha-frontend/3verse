import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { MARKETPLACE_CARD } from '../../../../assets/images';
import { MarketPlaceCard, NoDataFound, Spinner } from '../../../../components';
import { getUserOnSaleNftAction } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';

const NftForSale = ({ userStat = {} }) => {
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
          currentOwner: userStat?._id,
          listingType: 'sell',
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
          <div className="row mt-sm-5 mt-2">
            {onSaleNftList?.list?.map((detail) => (
              <MarketPlaceCard
                screen="sale"
                key={detail?.id}
                redirectTo={`/nft-detail/${detail?.itemId?._id}/${userStat?._id}/${detail?.listedId}`}
                mainClass="sale_card"
                img={detail?.itemId?.previewImage || MARKETPLACE_CARD}
                nftName={detail?.itemId?.title}
                nftType={detail?.nftType}
                price={detail?.price}
                likes={detail?.likeCount}
                ownerId={userStat?._id}
                isLiked={detail?.itemId?.isLiked}
                nftId={detail?.itemId?._id}
                id={detail?._id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </RenderIf>

      <RenderIf isTrue={!isLoading && !onSaleNftList?.list?.length}>
        <NoDataFound text="No NFT for sale found" className="mt-5" withImage={false} />
      </RenderIf>
    </>
  );
};

export default NftForSale;
