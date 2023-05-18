import { useState } from 'react';
import { Accordion } from 'react-bootstrap';

import { CROSS_FILTER_MOB_ICON } from '../../../../assets/images';
import PriceFilter from './PriceFilter';

const AbilitiesFilter = ({
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
          <Accordion.Header className="borderless-accordion-header">Affinity</Accordion.Header>
          <Accordion.Body>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="ruby"
                value="ruby"
                onChange={(e) => handleChange('ability.affinity1', e.target.value)}
                checked={!!(filterOptions[`ability.affinity1`] === 'ruby')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="ruby">
                Ruby
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="ion"
                value="ion"
                onChange={(e) => handleChange('ability.affinity2', e.target.value)}
                checked={!!(filterOptions[`ability.affinity2`] === 'ion')}
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
                value="volt"
                onChange={(e) => handleChange('ability.affinity3', e.target.value)}
                checked={!!(filterOptions[`ability.affinity3`] === 'volt')}
              />
              <label className="marketPlace-filter-checkbox-label" htmlFor="volt">
                Volt
              </label>
            </div>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                  <div className="form-check d-flex align-items-center p-0">
                    <label className="marketPlace-filter-checkbox-label">Energy cost</label>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="pt-0 px-0">
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="energycost1"
                      value="1"
                      onChange={(e) => handleChange('ability.energyCost1', e.target.value)}
                      checked={!!(filterOptions[`ability.energyCost1`] === '1')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="energycost1">
                      1 energy cost
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="energycost2"
                      value="2"
                      onChange={(e) => handleChange('ability.energyCost2', e.target.value)}
                      checked={!!(filterOptions[`ability.energyCost2`] === '2')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="energycost2">
                      2 energy cost
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="energycost3"
                      value="3"
                      onChange={(e) => handleChange('ability.energyCost3', e.target.value)}
                      checked={!!(filterOptions[`ability.energyCost3`] === '3')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="energycost3">
                      3 energy cost
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="energycost4"
                      value="4"
                      onChange={(e) => handleChange('ability.energyCost4', e.target.value)}
                      checked={!!(filterOptions[`ability.energyCost4`] === '4')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="energycost4">
                      4 energy cost
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="energycost5"
                      value="5"
                      onChange={(e) => handleChange('ability.energyCost5', e.target.value)}
                      checked={!!(filterOptions[`ability.energyCost5`] === '5')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="energycost5">
                      5 energy cost
                    </label>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                  <div className="form-check d-flex align-items-center p-0">
                    <label className="marketPlace-filter-checkbox-label">Type</label>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="pt-0 px-0">
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="attack"
                      value="attack"
                      onChange={(e) => handleChange('ability.abilityType1', e.target.value)}
                      checked={!!(filterOptions[`ability.abilityType1`] === 'attack')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="attack">
                      Attack
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="buff"
                      value="buff"
                      onChange={(e) => handleChange('ability.abilityType2', e.target.value)}
                      checked={!!(filterOptions[`ability.abilityType2`] === 'buff')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="buff">
                      Buff
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="debuff"
                      value="debuff"
                      onChange={(e) => handleChange('ability.abilityType3', e.target.value)}
                      checked={!!(filterOptions[`ability.abilityType3`] === 'debuff')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="debuff">
                      Debuff
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="power"
                      value="power"
                      onChange={(e) => handleChange('ability.abilityType4', e.target.value)}
                      checked={!!(filterOptions[`ability.abilityType4`] === 'power')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="power">
                      Power
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="support"
                      value="support"
                      onChange={(e) => handleChange('ability.abilityType5', e.target.value)}
                      checked={!!(filterOptions[`ability.abilityType5`] === 'support')}
                    />
                    <label className="marketPlace-filter-checkbox-label" htmlFor="support">
                      Support
                    </label>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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

export default AbilitiesFilter;
