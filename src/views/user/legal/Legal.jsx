import { useLocation } from 'react-router-dom';

import { SubHeaderLayout } from '../../../layout';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndCondition from './TermsAndCondition';

import './legal.css';
import About from './About';


const Legal = () => {
  
  const { pathname } = useLocation(); 
 
 
  const content = () => {
    switch (pathname) {
      case '/about':       
        return <About/>;
      case '/terms-and-condition':
        return <TermsAndCondition />;
      case '/privacy-policy':
        return <PrivacyPolicy />;
      default:
        return ""
    }
  };
  
  return (
    <SubHeaderLayout mainClassName="cms-container" headerClassName="marketplace-path-title">
      <div className="cms_body">{content()}</div>
    </SubHeaderLayout>
  );
};

export default Legal;
