import { Accordion } from 'react-bootstrap';

import { SubHeaderLayout } from '../../../layout';

import './faq.css';
import faqData from './faqData';

const FAQ = () => {
  return (
    <SubHeaderLayout mainClassName="cms-container" headerClassName="marketplace-path-title">
      <div className="cms_body">
        <div className="cms_title">Frequently asked questions</div>
        <div className="cms_content faq-body-container">
          <Accordion>
            {faqData.map((item) => (
              <Accordion.Item eventKey={item.id} key={item.id}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>{item.body}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </SubHeaderLayout>
  );
};

export default FAQ;
