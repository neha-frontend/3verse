import { useEffect, useRef } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { RenderIf } from '../../utils';

const CustomTabs = ({ children, options = [], activeTabKey = '', className = '' }) => {
  const activeRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [activeRef.current]);

  return (
    <Tabs
      defaultActiveKey={activeTabKey}
      className={className}
      onSelect={(eventKey) => navigate(`/marketplace/${eventKey}`)}>
      {options.map((tab) => (
        <Tab
          eventKey={tab.eventKey}
          title={<div ref={tab.eventKey === activeTabKey ? activeRef : null}>{tab.title}</div>}
          key={tab.eventKey}>
          <RenderIf isTrue={tab.eventKey === activeTabKey}>{children}</RenderIf>
        </Tab>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
