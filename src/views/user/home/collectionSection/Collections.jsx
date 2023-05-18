import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLLECTION_CARD } from '../../../../assets/images';
import { NoDataFound, Spinner } from '../../../../components';
import { SubHeaderLayout } from '../../../../layout';
import { getCollectionAction } from '../../../../store/sagaActions';
import { RenderIf } from '../../../../utils';

import './collectionSection.css'

const Collections = () => {
  const dispatch = useDispatch();
  const { collectionData, isLoading } = useSelector((state) => state.nft.nftCollection);

  useEffect(() => {
    dispatch(getCollectionAction());
  }, []);
  return (
    <SubHeaderLayout headerClassName='mb-0' mainClassName='collection-container'>
      <h2 className="cms_title mb-4 mt-2">Collections</h2>
      <RenderIf isTrue={isLoading}>
        <Spinner className='global-spinner'/>
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <RenderIf isTrue={collectionData?.length === 0}>
          <NoDataFound text="No collection found" />
        </RenderIf>
        <RenderIf isTrue={collectionData?.length}>
          <div className="collection-grid-container">
            {collectionData?.map((data, index) => (
              <div className="collection-grid-item" key={index}>
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
          </div>
        </RenderIf>
      </RenderIf>
    </SubHeaderLayout>
  );
};

export default Collections;
