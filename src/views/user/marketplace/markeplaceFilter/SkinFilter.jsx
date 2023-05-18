import { useState } from 'react';
import { Accordion } from 'react-bootstrap';

import { CROSS_FILTER_MOB_ICON } from '../../../../assets/images';
import PriceFilter from './PriceFilter';

const SkinFilter = ({
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
        <Accordion.Item eventKey="0">
          <Accordion.Header>Skins</Accordion.Header>
          <Accordion.Body className="px-0">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="sandstone"
                value="White"
                onChange={(e) => handleChange('skin1', e.target.value)}
                checked={!!(filterOptions[`skin1`] === 'White')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="sandstone">
                White
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="onyx"
                value="Blue"
                onChange={(e) => handleChange('skin2', e.target.value)}
                checked={!!(filterOptions[`skin2`] === 'Blue')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="onyx">
                Blue
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="pearl"
                value="Red"
                onChange={(e) => handleChange('skin3', e.target.value)}
                checked={!!(filterOptions[`skin3`] === 'Red')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="pearl">
                Red
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="red"
                value="Mint"
                onChange={(e) => handleChange('skin4', e.target.value)}
                checked={!!(filterOptions[`skin4`] === 'Mint')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="red">
                Mint
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="blue"
                value="Purple"
                onChange={(e) => handleChange('skin5', e.target.value)}
                checked={!!(filterOptions[`skin5`] === 'Purple')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="blue">
                Purple
              </label>
            </div>
            {/* <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="yellow"
                value="yellow"
                onChange={(e) => handleChange('skin6', e.target.value)}
                checked={!!(filterOptions[`skin6`] === 'yellow')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="yellow">
                Yellow
              </label>
            </div> */}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <PriceFilter handleChange={handleChange} handleToggle={handleToggle} reset={reset} />
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header className="borderless-accordion-header">Origins</Accordion.Header>
          <Accordion.Body className="px-0">
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                id="unicorns"
                name="origin"
                value="uninterested-unicorns"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'uninterested-unicorns')}
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
                value="uninterested-unicornsV2"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'uninterested-unicornsV2')}
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
                value="pg-genesis"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'pg-genesis')}
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
                value="pg-genesis2"
                onChange={(e) => handleChange('origin', e.target.value)}
                checked={!!(filterOptions?.origin === 'pg-genesis2')}
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

        <div className="filter-buttons-container mt-5 d-block d-lg-none">
          <button className="clear-btn" onClick={resetHandler}>
            Clear All
          </button>
        </div>
      </Accordion>
    </div>
  );
};

export default SkinFilter;
