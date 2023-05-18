import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import MarketplaceSection from './marketplaceSection/MarketplaceSection';
import { SubHeaderLayout } from '../../../layout';
import { FILTER_ICON } from '../../../assets/images';
import { CustomTabs, Search } from '../../../components';
import { marketplaceTabs } from './tabsData';
import {
  AbilitiesFilter,
  ArmorFilter,
  KillFXFilter,
  LootCrateFilter,
  MechFilter,
  PoseFilter,
  SkinFilter
} from './markeplaceFilter';

import './marketplace.css';
import '../home/newItems/newItems.css';

const Marketplace = () => {
  const { pathname } = useLocation();
  const [isFilterShown, setIsFilterShown] = useState(true);
  const toggleFilter = () => setIsFilterShown((current) => !current);

  // filter component props
  const filterProps = {
    id: 'marketplaceFilterAccordion',
    mainClassName: isFilterShown ? 'col-lg-3 pe-lg-4 pe-0 filterContainer' : 'd-none',
    handleToggle: toggleFilter
  };

  // which tab should be active
  let activeTabKey = 'mech';
  let ChildComponent = (
    <MarketplaceSection
      FilterOption={<MechFilter {...filterProps} />}
      isFilterShown={isFilterShown}
      toggleFilter={toggleFilter}
      screen="MECH"
    />
  );
  marketplaceTabs.forEach((item) => {
    if (pathname.includes(item.eventKey)) {
      activeTabKey = item.eventKey;
    }
  });

  switch (activeTabKey) {
    case 'mech':
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<MechFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="MECH"
        />
      );
      break;
    case 'loot':
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<LootCrateFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="LOOT"
        />
      );
      break;
    case 'abilities':
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<AbilitiesFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="ABILITIES"
        />
      );
      break;
    case 'skins':
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<SkinFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="SKINS"
        />
      );
      break;
    case 'armor':
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<ArmorFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="ARMOR"
        />
      );
      break;
    case 'kill-fx':
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<KillFXFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="KILL_FX"
        />
      );
      break;
    case 'pose':
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<PoseFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="POSE"
        />
      );
      break;
    default:
      ChildComponent = (
        <MarketplaceSection
          FilterOption={<MechFilter {...filterProps} />}
          isFilterShown={isFilterShown}
          toggleFilter={toggleFilter}
          screen="MECH"
        />
      );
  }

  return (
    <>
      <SubHeaderLayout
        mainClassName="marketplaceWrapper-conatainer"
        headerClassName="marketplace-path-title"
        headerText="Home page . Marketplace">
        <div className="d-lg-none d-block marketplace-heading-search-container">
          <h3 className="marketplace-heading">Marketplace</h3>
          <Search className='header-search-container position-relative w-100 mb-4"' />
        </div>

        <div className="marketplaceTabsContainer">
          <img
            src={FILTER_ICON}
            alt="FILTER"
            onClick={toggleFilter}
            className="cp d-lg-block d-none marketplaceFilterImg"
          />
          <CustomTabs
            options={marketplaceTabs}
            activeTabKey={activeTabKey}
            className="marketplace-nav-tabs">
            {ChildComponent}
          </CustomTabs>
        </div>
      </SubHeaderLayout>
    </>
  );
};

export default Marketplace;
