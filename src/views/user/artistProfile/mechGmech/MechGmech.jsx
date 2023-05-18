import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { MarketPlaceCard, NoDataFound, Spinner } from '../../../../components';
import { getUserNftListAction } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';
import ProfileStats from '../profileStats/ProfileStats';

import './mechGmech.css';

const MechGmech = ({
  type = 'mech',
  screen = 'gmech',
  mainClass = 'gmech_card',
  userStat = {}
}) => {
  const dispatch = useDispatch();
  const { isLoading, nftData } = useSelector((state) => state.nft.profileNftList);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const callMechApi = (isNew = false) =>
    dispatch(
      getUserNftListAction({
        page: isNew ? 1 : nftData.page + 1,
        limit: 9,
        URL: generateURL({
          page: isNew ? 1 : nftData.page + 1,
          limit: 9,
          nftType: type === 'gmech' ? 'g-mech' : type,
          'multipleOwners.userId': userStat?._id,
          removeNull: true
        }),
        isNew
      })
    );

  const fetchMoreData = (slide) => {
    if (slide % 6 === 0) {
      callMechApi();
    }
  };

  const redirectHandler = (id) => {
    navigate(`/nft-detail/${id}/${userStat?._id}`, { state: screen });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: nftData?.list?.length < 3 ? nftData?.list?.length : 3,
    slidesToScroll: 1,
    initialSlide: 0,
    // centerMode: nftData?.list?.length >= 3,
    centerPadding: '0px',
    beforeChange: (current, next) => {
      setActiveIndex(next);
      fetchMoreData(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 601,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  useEffect(() => {
    callMechApi(true);
  }, [type]);

  return (
    <>
      <RenderIf isTrue={isLoading}>
        <Spinner className="mt-5" />
      </RenderIf>
      <RenderIf isTrue={!isLoading && nftData?.list?.length > 0}>
        <div className={`${type === 'mech' ? 'gmech_body' : ''}`}>
          <div
            className={`${
              type === 'gmech'
                ? 'gmech_body gmech_screen'
                : 'd-flex flex-lg-row flex-column justify-content-between'
            }`}>
            <Slider {...settings} className="slider_body">
              {nftData?.list?.map((detail) =>
                detail?.multipleOwners.map((details) =>
                  details?.userId?._id === userStat?._id && details?.sellQuantity > 0 ? (
                    <MarketPlaceCard
                      key={detail?._id}
                      screen={screen}
                      redirectTo={`/nft-detail/${detail?._id}/${userStat?._id}`}
                      mainClass={mainClass}
                      token={detail?.title}
                      // likes={detail?.likedByUserIds?.length}
                      nftType={detail?.nftType}
                      nftName={detail?.title}
                      img={detail?.previewImage}
                      ownerId={userStat?._id}
                      isLiked={detail?.isLiked}
                      nftId={detail?._id}
                      id={detail?._id}
                      likes={detail?.likeCount}
                    />
                  ) : null
                )
              )}
            </Slider>
            <RenderIf isTrue={type === 'mech'}>
              <div className="select-nft-btn-container d-lg-none d-block">
                <button
                  className="select-nft-btn ms-auto"
                  onClick={() => redirectHandler(nftData?.list[activeIndex]?._id)}>
                  Select NFT
                </button>
              </div>
              {/* <div className="mech_stat">
                <div className="total_mech">Total Mech NFT</div>
                <div className="mech_amt">{nftData?.totalItem}</div>
              </div> */}
            </RenderIf>
            <RenderIf isTrue={type === 'gmech' && nftData?.list?.length > 3}>
              <div className="select-nft-btn-container">
                <button
                  className="select-nft-btn ms-auto"
                  onClick={() => redirectHandler(nftData?.list[activeIndex]?._id)}>
                  Select NFT
                </button>
              </div>
            </RenderIf>
          </div>
        </div>
        <RenderIf isTrue={type === 'mech' && nftData?.list?.length > 3}>
          <div className="select-nft-btn-container d-lg-block d-none">
            <button
              className="select-nft-btn ms-auto"
              onClick={() => redirectHandler(nftData?.list[activeIndex]?._id)}>
              Select NFT
            </button>
          </div>
        </RenderIf>
      </RenderIf>
      <RenderIf isTrue={!isLoading && !nftData?.list?.length}>
        <NoDataFound
          text={type === 'mech' ? 'No Mech found' : 'No G-Mech found'}
          withImage={false}
          className="mt-5 mb-5"
        />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <ProfileStats userStat={userStat} mainClassName="mechGmechStat" />
      </RenderIf>
    </>
  );
};
export default MechGmech;
