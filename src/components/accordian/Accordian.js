import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import { ARROW } from '../../assets/images';

import './accordian.css';

const FAQsData = (props) => {
  const { data, titleClassName, mainClassName = '' } = props;
  // const [accordianObject, setAccordianObject] = useState({});
  const [SelectedID, setSelectedId] = useState('');
  function CustomToggle({ children, eventKey, itemId }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      if (SelectedID === itemId) {
        setSelectedId('');
      } else {
        setSelectedId(itemId);
      }
    });
    return (
      <button type="button" className="plus-btn" onClick={decoratedOnClick}>
        {children}
      </button>
    );
  }
  return (
    <div className={`${mainClassName}`}>
      <Accordion defaultActiveKey="0">
        {data.map((items, index) => (
          <div key={items.id} className={SelectedID === items.id ? 'active' : ''}>
            <div>
              <div className="d-flex justify-content-between">
                <div className=" mt-3">
                  <p className={titleClassName}>{items.title}</p>
                </div>
                <CustomToggle eventKey={index + 1} itemId={items.id} id={index + 1}>
                  {SelectedID === items.id ? (
                    <img src={ARROW} alt="arrow" />
                  ) : (
                    <img src={ARROW} alt="arrow" className="expand_arrow" />
                  )}
                </CustomToggle>
              </div>
              <Accordion.Collapse
                eventKey={index + 1}
                // onClick={() => console.log('accordian opened')}
              >
                <Card.Body className="faqinfo p-0">
                  <items.body />
                </Card.Body>
              </Accordion.Collapse>
            </div>
            <hr className='mt-0'/>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQsData;
