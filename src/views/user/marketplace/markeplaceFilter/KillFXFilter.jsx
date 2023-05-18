import { Accordion } from 'react-bootstrap';

import { CROSS_FILTER_MOB_ICON } from '../../../../assets/images';

const KillFXFilter = ({ mainClassName = '', id = '', handleToggle = () => null }) => (
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
    <Accordion id={id}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Type</Accordion.Header>
        <Accordion.Body className="px-0">
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="checkbox" id="mech" />
            <label className="marketPlace-filter-checkbox-label" htmlFor="mech">
              Mech
            </label>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="gmech" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="gmech">
                    G-Mech
                  </label>
                </div>
              </Accordion.Header>
              <Accordion.Body className="pt-0">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="rentable" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="rentable">
                    Rentable
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="roby" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="roby">
                    Roby
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="ion" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="ion">
                    Ion
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="volt" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="volt">
                    Volt
                  </label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Origins</Accordion.Header>
        <Accordion.Body className="px-0">
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="checkbox" id="mech" />
            <label className="marketPlace-filter-checkbox-label" htmlFor="mech">
              Mech
            </label>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="gmech" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="gmech">
                    G-Mech
                  </label>
                </div>
              </Accordion.Header>
              <Accordion.Body className="pt-0">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="rentable" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="rentable">
                    Rentable
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="roby" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="roby">
                    Roby
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="ion" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="ion">
                    Ion
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="volt" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="volt">
                    Volt
                  </label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Price</Accordion.Header>
        <Accordion.Body className="px-0">
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="checkbox" id="mech" />
            <label className="marketPlace-filter-checkbox-label" htmlFor="mech">
              Mech
            </label>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="gmech" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="gmech">
                    G-Mech
                  </label>
                </div>
              </Accordion.Header>
              <Accordion.Body className="pt-0">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="rentable" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="rentable">
                    Rentable
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="roby" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="roby">
                    Roby
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="ion" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="ion">
                    Ion
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="volt" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="volt">
                    Volt
                  </label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Buying Options</Accordion.Header>
        <Accordion.Body className="px-0">
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="checkbox" id="mech" />
            <label className="marketPlace-filter-checkbox-label" htmlFor="mech">
              Mech
            </label>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="gmech" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="gmech">
                    G-Mech
                  </label>
                </div>
              </Accordion.Header>
              <Accordion.Body className="pt-0">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="rentable" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="rentable">
                    Rentable
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="roby" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="roby">
                    Roby
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="ion" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="ion">
                    Ion
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="volt" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="volt">
                    Volt
                  </label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Level</Accordion.Header>
        <Accordion.Body className="px-0">
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="checkbox" id="mech" />
            <label className="marketPlace-filter-checkbox-label" htmlFor="mech">
              Mech
            </label>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="innerMarketplaceFilter-accordionHeader">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="gmech" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="gmech">
                    G-Mech
                  </label>
                </div>
              </Accordion.Header>
              <Accordion.Body className="pt-0">
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="rentable" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="rentable">
                    Rentable
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="roby" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="roby">
                    Roby
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="ion" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="ion">
                    Ion
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" id="volt" />
                  <label className="marketPlace-filter-checkbox-label" htmlFor="volt">
                    Volt
                  </label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <div className="filter-buttons-container mt-5 d-block d-lg-none">
        <button className="done-btn">Done</button>
        <button className="clear-btn">Clear All</button>
      </div>
    </Accordion>
  </div>
);

export default KillFXFilter;
