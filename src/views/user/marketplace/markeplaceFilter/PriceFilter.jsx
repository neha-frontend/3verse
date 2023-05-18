import { useEffect } from 'react';
import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { Range } from 'react-range';

// eslint-disable-next-line no-unused-vars
const PriceFilter = ({ handleChange = () => null, handleToggle = () => null, reset = '' }) => {
  const [price, setPrice] = useState([100]);

  // Custome Distance slider details
  const STEP = 1;
  const MIN = 1;
  const MAX = 100;

  const handleApply = () => {
    handleChange('price[lte]', price[0]);
    // handleToggle();
  };

  useEffect(() => {
    setPrice([100]);
  }, [reset]);

  return (
    <>
      <Accordion.Header className="borderless-accordion-header">Price</Accordion.Header>
      <Accordion.Body className="px-0">
        <div className="form-check px-0 price-filter-form-check">
          {/* <Form.Range
            className="price-filter-range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          /> */}

          <Range
            values={price}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => setPrice(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '100%'
                }}>
                <div
                  ref={props.ref}
                  style={{
                    height: '7px',
                    width: '100%',
                    borderRadius: '4px',
                    background: '#3c82f8',
                    alignSelf: 'center'
                  }}>
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  height: '17px',
                  width: '17px',
                  borderRadius: '50%',
                  border: '1px solid #0d6efd',
                  backgroundColor: '#0d6efd'
                }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-25px',
                    color: '#fff',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    width: 'max-content'
                  }}>
                  {`${price[0]}`}
                </div>
              </div>
            )}
          />
          <label className="d-flex justify-content-between" htmlFor="mech">
            <span className="price-label-range">Min</span>
            <span className="price-label-range">Max</span>
          </label>
          <button className="price-filter-range-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </Accordion.Body>
    </>
  );
};

export default PriceFilter;
