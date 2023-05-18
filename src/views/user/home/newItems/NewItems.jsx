import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { newItemsSetting } from './newItemsData';
import { getNewNftAction } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';
import { NewNftCard, NoDataFound, Spinner } from '../../../../components';
import isInThePast from '../../../../utils/isInPast';

import './newItems.css';

const NewItems = ({ setLoading }) => {
  const dispatch = useDispatch();
  const { newNFtDataLoading: isLoading, newNftData } = useSelector(
    (state) => state.nft.marketplaceNftList
  );
  const getdata = () => {
    dispatch(
      getNewNftAction({
        URL: generateURL({
          page: 1,
          limit: 10,
          sort: '-createdAt'
        })
      })
    );
  };
  useEffect(() => {
    getdata();
  }, []);

  const setInfinite = {
    infinite: newNftData?.list?.length > 4
  };

  const newSetting = { ...newItemsSetting, ...setInfinite };
  return (
    <>
      <div className="d-flex justify-content-between mb-2 pe-sm-5 pe-4 align-items-center">
        <div className="widget_heading ps-0">New Items</div>

        <RenderIf isTrue={newNftData?.totalItem > 10 && !isLoading}>
          <Link to="/marketplace" className="text-decoration-none">
            <div className="view_all_box">
              <span className="view_all_text">View all</span>
            </div>
          </Link>
        </RenderIf>
      </div>

      <RenderIf isTrue={newNftData?.list?.length && !isLoading}>
        <Slider {...newSetting} className="test newItemSlider">
          {newNftData?.list?.map((item) => (
            <NewNftCard
              key={item?._id}
              id={item?._id}
              redirectTo={`/nft-detail/${item?.itemId?._id}/${
                item?.listedId
                  ? `${item?.currentOwner?._id}/${item?.listedId}`
                  : `${item?.currentOwner?._id}/rent`
              }`}              
              img={item?.itemId?.previewImage}
              nftId={item?.itemId?._id}
              nftName={item?.itemId?.title}
              nftType={item?.itemId?.nftType}
              price={item?.price}
              callMechApi={getdata}
              setLoading={setLoading}
              nftInfo={item}
              likes={item?.likeCount}
              currentOwner={item?.currentOwner?._id}
              isLiked={item?.itemId?.isLiked}
              sellType={item?.sellType}
              isRentable={item?.listingType === 'rent'}
              rentedBy={item?.rentedBy}
              screen="NEW_ITEMS"
              auctionOpen={!isInThePast(item?.auctionEndDate)}
            />
          ))}
        </Slider>
      </RenderIf>

      <RenderIf isTrue={newNftData?.list?.length === 0}>
        <NoDataFound text="No new NFT found" />
      </RenderIf>

      <RenderIf isTrue={isLoading}>
        <Spinner />
      </RenderIf>
    </>
  );
};

export default NewItems;
