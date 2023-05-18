import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { COLLECTION_CARD } from '../../../../assets/images';
import { NoDataFound, Spinner } from '../../../../components';
import { getCollectionAction } from '../../../../store/sagaActions';
import { collectionSliderSettings } from './collectionSectiondata';
import { RenderIf } from '../../../../utils';

import './collectionSection.css';

const CollectionSection = () => {
  const dispatch = useDispatch();
  const { collectionData, isLoading } = useSelector((state) => state.nft.nftCollection);

  useEffect(() => {
    dispatch(getCollectionAction());
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 pe-5">
        <div className="widget_heading ps-0">Collections</div>
        <RenderIf isTrue={collectionData?.length}>
          <Link to="/collections"
            className="text-decoration-none">
            <div className="view_all_box">
              <span className="view_all_text">View all</span>
            </div>
          </Link>
        </RenderIf>
      </div>

      <RenderIf isTrue={isLoading}>
        <Spinner />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <RenderIf isTrue={collectionData?.length === 0}>
          <NoDataFound text="No collection found" />
        </RenderIf>

        <RenderIf isTrue={collectionData?.length}>
          <Slider {...collectionSliderSettings}>
            {collectionData?.map((data, index) => (
              <div className="col-lg-6 col-md-6 col-sm-8" key={index}>
                <a
                  href={`https://opensea.io/collection/${data?.collection?.slug}`}
                  target="_blank"
                  rel="noreferrer">
                  <div className="collection_image_box">
                    <div className="relative collectionData-img-details-container">
                      <img
                        src={data?.collection?.image_url || COLLECTION_CARD}
                        alt="recently-added"
                        className="collection_img"
                      />
                      <div className="collection_details">
                        <div>{data?.collection?.name}</div>

                        <RenderIf isTrue={data?.collection?.description}>
                          <RenderIf isTrue={data?.collection?.description?.length > 100}>
                            <div>{data?.collection?.description?.slice(0, 100)}...</div>
                          </RenderIf>
                          <RenderIf isTrue={data?.collection?.description?.length <= 100}>
                            <div>{data?.collection?.description}</div>
                          </RenderIf>
                        </RenderIf>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </RenderIf>
      </RenderIf>
    </>
  );
};

export default CollectionSection;
