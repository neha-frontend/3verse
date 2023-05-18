import { useState } from 'react';
import { Accordion } from 'react-bootstrap';

import { CROSS_FILTER_MOB_ICON } from '../../../../assets/images';
import { RenderIf } from '../../../../utils';
import PriceFilter from './PriceFilter';

const MechFilter = ({
  mainClassName = '',
  id = '',
  filterOptions = {},
  setFilterOptions = () => null,
  handleToggle = () => null,
  resetFilterOptions = () => null
}) => {
  const handleChange = (type, value) =>
    setFilterOptions((prev) => {
      const temp = { ...prev };

      if (prev[type] === value) delete temp[type];
      else temp[type] = value;

      return { ...temp };
    });
  
     const [reset, setReset] = useState(false);

     const resetHandler = () => {
       resetFilterOptions();
       setReset(!reset);
     };

  return (
    <div className={mainClassName}>
      <div className="filterContainer-m-title d-lg-none d-flex align-items-center">
        <h2 className="mx-auto filter-title mb-0">Filters</h2>
        <img
          src={CROSS_FILTER_MOB_ICON}
          onClick={handleToggle}
          className="cp cross"
          alt="toggle-filter"
        />
      </div>
      <button className="clear-filter d-lg-flex d-none" onClick={resetHandler}>
        Clear all
      </button>
      <Accordion id={id}>
        <Accordion.Item eventKey="0" className="borderless-accordion-item">
          <Accordion.Header>Type</Accordion.Header>
          <Accordion.Body className="px-0">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="mech"
                value="mech"
                onChange={(e) => handleChange('nftType1', e.target.value)}
                checked={!!(filterOptions?.nftType1 === 'mech')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="mech">
                Mech Pods
              </label>
            </div>
            <Accordion>
              <Accordion.Item
                eventKey="0"
                className={`bordered-accordion-item ${
                  filterOptions?.nftType2 !== 'g-mech' ? 'v-none' : ''
                }`}>
                <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gmech"
                      value="g-mech"
                      onChange={(e) => handleChange('nftType2', e.target.value)}
                      checked={!!(filterOptions?.nftType2 === 'g-mech')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="gmech">
                      G-Mech
                    </label>
                  </div>
                </Accordion.Header>
                <RenderIf isTrue={filterOptions?.nftType2 === 'g-mech'}>
                  <Accordion.Body className="pt-0">
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="roby"
                        value="Ruby"
                        onChange={(e) => handleChange('gmechType2', e.target.value)}
                        checked={!!(filterOptions?.gmechType2 === 'Ruby')}
                      />
                      <label className="marketPlace-filter-checkbox-label" htmlFor="roby">
                        Ruby
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="ion"
                        value="Ion"
                        onChange={(e) => handleChange('gmechType3', e.target.value)}
                        checked={!!(filterOptions?.gmechType3 === 'Ion')}
                      />
                      <label className="marketPlace-filter-checkbox-label" htmlFor="ion">
                        Ion
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="volt"
                        value="Volt"
                        onChange={(e) => handleChange('gmechType4', e.target.value)}
                        checked={!!(filterOptions?.gmechType4 === 'Volt')}
                      />
                      <label className="marketPlace-filter-checkbox-label" htmlFor="volt">
                        Volt
                      </label>
                    </div>
                  </Accordion.Body>
                </RenderIf>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>Rentable</Accordion.Header>
          <Accordion.Body className="px-0">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="rentable"
                value="rent"
                onChange={(e) => handleChange('gmechType1', e.target.value)}
                checked={!!(filterOptions?.gmechType1 === 'rent')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="rentable">
                Rentable
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Origins</Accordion.Header>
          <Accordion.Body className="px-0">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="unicorns"
                name="origin"
                value="UninterestedUnicorns"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'UninterestedUnicorns')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="unicorns">
                Uninterested Unicorns
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="unicornsV2"
                name="origin"
                value="UninterestedUnicornsV2"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'UninterestedUnicornsV2')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="unicornsV2">
                UninterestedUnicornsV2
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="genesis"
                name="origin"
                value="PG: GENESIS"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'PG: GENESIS')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="genesis">
                PG: GENESIS
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="gen2"
                name="origin"
                value="PG: GEN 2"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'PG: GEN 2')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="gen2">
                PG: GEN 2
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="gen2"
                name="origin"
                value="The Doge Pound"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'The Doge Pound')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="gen2">
                The Doge Pound
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="gen2"
                name="origin"
                value="Karafuru"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'Karafuru')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="gen2">
                Karafuru
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="gen2"
                name="origin"
                value="Project Atama Genesis"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'Project Atama Genesis')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="gen2">
                Atama
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="gen2"
                name="origin"
                value="Roo Troop"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'Roo Troop')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="gen2">
                Roo Troop
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="gen2"
                name="origin"
                value="BBRC - IVY BOYS"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'BBRC - IVY BOYS')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="gen2">
                BBRC- Ivy Boys
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <PriceFilter handleChange={handleChange} handleToggle={handleToggle} reset={reset} />
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Buying Options</Accordion.Header>
          <Accordion.Body className="px-0">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="fixed"
                value="fixed"
                onChange={(e) => handleChange('sellType1', e.target.value)}
                checked={!!(filterOptions?.sellType1 === 'fixed')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="fixed">
                Fixed
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="auction"
                value="auction"
                onChange={(e) => handleChange('sellType2', e.target.value)}
                checked={!!(filterOptions?.sellType2 === 'auction')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="auction">
                Auction
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header className="borderless-accordion-header">Level</Accordion.Header>
          <Accordion.Body className="px-0">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                name="level"
                id="level1"
                value="1&level[lt]=10"
                checked={!!(filterOptions[`level[gt]`] === '1&level[lt]=10')}
                onChange={(e) => handleChange('level[gt]', e.target.value)}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="level1">
                Level 1-10
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                name="level"
                id="level2"
                value="11&level[lt]=20"
                checked={!!(filterOptions[`level[gt]`] === '11&level[lt]=20')}
                onChange={(e) => handleChange('level[gt]', e.target.value)}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="level2">
                Level 11-20
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                name="level"
                id="level3"
                value="21&level[lt]=30"
                checked={!!(filterOptions[`level[gt]`] === '21&level[lt]=30')}
                onChange={(e) => handleChange('level[gt]', e.target.value)}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="level3">
                Level 21-30
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                name="level"
                id="level4"
                value="31&level[lt]=40"
                checked={!!(filterOptions[`level[gt]`] === '31&level[lt]=40')}
                onChange={(e) => handleChange('level[gt]', e.target.value)}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="level4">
                Level 31-40
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                name="level"
                id="level5"
                value="41&level[lt]=50"
                checked={!!(filterOptions[`level[gt]`] === '41&level[lt]=50')}
                onChange={(e) => handleChange('level[gt]', e.target.value)}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="level5">
                Level 41-50
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <div className="filter-buttons-container mt-5 d-block d-lg-none">
          <button className="clear-btn" onClick={resetHandler}>
            Clear All
          </button>
        </div>
      </Accordion>
    </div>
  );
};

export default MechFilter;
