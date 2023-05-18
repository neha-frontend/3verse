// import { Link } from 'react-router-dom';

import { SubHeaderLayout } from '../../../layout';
// import { DOWN_ARROW } from '../../../assets/images';
// import helpAndSupportData from './dummuData';

import './helpAndSupport.css';

const HelpAndSupport = () => {
  return (
    <div>
      <SubHeaderLayout mainClassName="cms-container" headerClassName="marketplace-path-title">
        <div className="cms_help_body">
          {/* <div className="cms_help_title">Hello, How can we help?</div> */}
          <div className="cms_help_title">Help Center</div>
          <div className="cms_help_content">
            Please visit our discord channel and open a ticket if you have any queries.
          </div>
          {/* <div className="help-support-input">
            <input type="text" placeholder="Type your question here..." />
            <img src={DOWN_ARROW} alt="down-arrow" className="help-support-input-img" />
          </div>

          <div className="cms_help_content">
            {helpAndSupportData.map((item) => (
              <div key={item.id} className="help-support-card">
                <div className="help-support-card-title">{item.title}</div>
                <div className="help-support-card-body">{item.body}</div>
                <Link to={item.redirectTo} className="help-support-card-footer">
                  Read More
                </Link>
              </div>
            ))}
          </div> */}
        </div>
      </SubHeaderLayout>
    </div>
  );
};

export default HelpAndSupport;
