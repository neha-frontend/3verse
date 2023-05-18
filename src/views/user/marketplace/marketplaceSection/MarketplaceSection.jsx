import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { DOWN_ARROW, MOB_FILTER_ICON, MOB_SORT_ICON } from '../../../../assets/images';
import {
  AlertMessageModal,
  ComingSoonCard,
  MarketPlaceCard,
  MarketplaceSortingDropdown,
  NoDataFound,
  Spinner
} from '../../../../components';
import { getMarketplaceNftAction, resetMarketplaceNft } from '../../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../../utils';
import { marketplaceFilters } from '../tabsData';
import { AbilitiesFilter, ArmorFilter, MechFilter, SkinFilter } from '../markeplaceFilter';
import isInThePast from '../../../../utils/isInPast';

const MarketplaceSection = ({ screen = '', isFilterShown = false, toggleFilter = () => null }) => {
  const dispatch = useDispatch();
  const initalFilterOptions =
    screen === 'MECH'
      ? { nftType1: 'mech', nftType2: 'g-mech' }
      : screen === 'ABILITIES'
      ? { nftType: 'ability' }
      : screen === 'SKINS'
      ? { nftType: 'skin' }
      : screen === 'ARMOR'
      ? { nftType: 'armor' }
      : { nftType1: 'mech', nftType2: 'g-mech' };
  const [filterOptions, setFilterOptions] = useState({ ...initalFilterOptions });
  const [dropdownOption, setDropdownOption] = useState('null');
  const { isLoading, nftData } = useSelector((state) => state.nft.marketplaceNftList);
  const { isLoading: rentLoader } = useSelector((state) => state.nft.putNftOnRent);
  const [Loading, setLoading] = useState(false);
  // TODO: Remove below varible after all makeplace api intehration is complete.

  // filter component props
  const filterProps = {
    id: 'marketplaceFilterAccordion',
    mainClassName: isFilterShown ? 'col-lg-3 pe-lg-4 pe-0 filterContainer' : 'd-none',
    handleToggle: toggleFilter
  };
  const renderFilter =
    screen === 'MECH' ? (
      <MechFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        resetFilterOptions={() => setFilterOptions({ ...initalFilterOptions })}
        {...filterProps}
      />
    ) : screen === 'ABILITIES' ? (
      <AbilitiesFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        resetFilterOptions={() => setFilterOptions({ ...initalFilterOptions })}
        {...filterProps}
      />
    ) : screen === 'SKINS' ? (
      <SkinFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        resetFilterOptions={() => setFilterOptions({ ...initalFilterOptions })}
        {...filterProps}
      />
    ) : screen === 'ARMOR' ? (
      <ArmorFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        resetFilterOptions={() => setFilterOptions({ ...initalFilterOptions })}
        {...filterProps}
      />
    ) : (
      <MechFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        resetFilterOptions={() => setFilterOptions({ ...initalFilterOptions })}
        {...filterProps}
      />
    );

  const handleDropdownSelect = (eventKey) => setDropdownOption(eventKey);

  const callMechApi = (isNew = false) =>
    dispatch(
      getMarketplaceNftAction({
        page: isNew ? 1 : nftData.page + 1,
        limit: 12,
        URL: generateURL({
          ...filterOptions,
          page: isNew ? 1 : nftData.page + 1,
          limit: 12,
          sort: dropdownOption,
          removeNull: true
        }),
        isNew
      })
    );

  const fetchMoreData = () => callMechApi();

  useEffect(() => {
    if (!(screen === 'LOOT' || screen === 'KILL_FX' || screen === 'POSE')) callMechApi(true);
  }, [dropdownOption, filterOptions]);

  useEffect(() => () => dispatch(resetMarketplaceNft()), [screen]);

  if (screen === 'LOOT' || screen === 'KILL_FX' || screen === 'POSE')
    return (
      <div className="row  text-light text-center">
        <ComingSoonCard />
      </div>
    );

  useEffect(() => {
    if (Loading || rentLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [Loading, rentLoader]);

  return (
    <>
      <RenderIf isTrue={Loading || rentLoader}>
        <Spinner className="global-spinner" />
      </RenderIf>
      <div className={` ${Loading || rentLoader ? 'hidesection' : ''} row`}>
        {renderFilter}
        <div className={isFilterShown ? 'col-lg-9 mechRecords' : 'col-md-12 four_card_col'}>
          {/* responsive desgin start */}
          <div className="d-flex d-lg-none mb-4 mt-2 marketplace-filter-sort-btn-container">
            <button className="filter-btn filter-sort-btn" onClick={toggleFilter}>
              <img src={MOB_FILTER_ICON} alt="filter" className="me-3" />
              Filters
            </button>
            <MarketplaceSortingDropdown
              handleSelect={handleDropdownSelect}
              dropdownOptionSelected={dropdownOption}
              options={marketplaceFilters}
              dropDownElement={
                <button className="sort-btn filter-sort-btn">
                  <img src={MOB_SORT_ICON} alt="sort" className="me-3" />
                  Sort by
                </button>
              }
            />
          </div>
          {/* responsive desgin end */}
          <div className="d-flex align-items-center justify-content-between marketplace-tab-content-title-container">
            <p className="record-title">
              {nftData?.totalItem ?? '...'} Record{nftData?.totalItem > 1 ? 's' : ''} Found{' '}
            </p>
            <MarketplaceSortingDropdown
              handleSelect={handleDropdownSelect}
              dropdownOptionSelected={dropdownOption}
              options={marketplaceFilters}
              dropDownElement={
                <p className="sort d-lg-block d-none mb-0 me-4">
                  Sort by <img src={DOWN_ARROW} alt="sort-arrow" className="sort-arrow" />
                </p>
              }
            />
          </div>

          <RenderIf isTrue={!isLoading}>
            <RenderIf isTrue={nftData?.list?.length > 0}>
              <InfiniteScroll
                className="overflow-hidden marketplace-scroll"
                dataLength={nftData && nftData?.list?.length}
                next={fetchMoreData}
                hasMore={nftData?.hasMore}
                loader={<Spinner />}>
                <div className="marketplace-tab-marketCard">
                  {nftData?.list?.map((item) => (
                    <MarketPlaceCard
                      key={item._id}
                      id={item._id}
                      callMechApi={callMechApi}
                      screen="marketplace"
                      nftInfo={item}
                      setLoading={(val) => setLoading(val)}
                      mainClass="marketplace_card"
                      redirectTo={`/nft-detail/${item?.itemId?._id}/${
                        item?.listedId
                          ? `${item?.currentOwner?._id}/${item?.listedId}`
                          : `${item?.currentOwner?._id}/rent`
                      }`}
                      img={item?.itemId?.previewImage}
                      marketplaceTab={screen === 'ABILITIES' ? 'ability' : ''}
                      nftId={item?.itemId?._id}
                      nftName={item?.itemId?.title}
                      nftType={item?.nftType}
                      price={item?.price}
                      likes={item?.likeCount}
                      isLiked={item?.itemId?.isLiked}
                      isBoughtabel={item?.listingType === 'sell'}
                      isRentable={item?.listingType === 'rent'}
                      ownerId={item?.currentOwner?._id}
                      rentedBy={item?.rentedBy}
                      auctionOpen={!isInThePast(item?.auctionEndDate)}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            </RenderIf>

            <RenderIf isTrue={(!nftData && nftData !== null) || nftData?.list?.length === 0}>
              <NoDataFound text="No NFT found" />
            </RenderIf>
          </RenderIf>

          <RenderIf isTrue={isLoading || Loading}>
            <Spinner className="mt-5" />
          </RenderIf>
        </div>
        <AlertMessageModal />
      </div>
    </>
  );
};

export default MarketplaceSection;
