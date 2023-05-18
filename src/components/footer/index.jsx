import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { EMAIL_ICON, LOGO_IMG, TWITTER_ICON } from '../../assets/images';
import { newsletterAction } from '../../store/sagaActions';
import { footerValidator } from '../../validations/footer';
import { CustomInput } from '../formikComponent';

function Footer() {
  const initalFooterFormValue = {
    email: ''
  };
  const dispatch = useDispatch();
  //TODO: Add api call on submit
  const handleSubmit = (data,resetForm) => {   
    dispatch(newsletterAction({data}));
    resetForm()
  }

  return (
    <footer className="container-fluid px-0">
      <div className="row footer-container">
        <div className="col-lg-3 w-30 col-md-12 mb-lg-0 mb-5 footer-col">
          <img src={LOGO_IMG} className="footer-logo" alt="logo" />
          <p className="footer-text pe-lg-5 pe-0 text-justify">hello@newmoonstudios.xyz</p>
          <div className="footer-icon-container d-flex align-items-center">
            {/* <p className="footer-icon">
              <img src={FB_ICON} className="footer-icon-img" alt="fb" />
            </p> */}
            <p className="footer-icon">
              <a href="https://twitter.com/3verseGame" target="_blank" rel="noopener noreferrer">
                <img src={TWITTER_ICON} className="footer-icon-img" alt="twitter" />
              </a>
            </p>
            {/* <p className="footer-icon">
              <img src={LINKDIN_ICON} className="footer-icon-img" alt="linkdin" />
            </p> */}
          </div>
        </div>
        <div className="col-lg-3 ps-lg-4 w-20 col-6 footer-col">
          <p className="footer-title">Company</p>
          <Link to="/terms-and-condition" className="footer-general-text">
            Terms and Conditions
          </Link>
          <Link to="/privacy-policy" className="footer-general-text">
            Privacy Policy
          </Link>
          <Link to="marketplace/mech" className="footer-general-text">
            All NFTs
          </Link>
          <a
            href="https://opensea.io/collection/ununicornsofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-general-text">
            Unicorns
          </a>
          <a
            href="https://opensea.io/collection/projectgodjiragenesis"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-general-text">
            Godjiras
          </a>
        </div>
        <div className="col-lg-3 w-20 ps-3 col-6 footer-col">
          <p className="footer-title">Quick links</p>
          {/* <Link to="/community-guidelines" className="footer-general-text">
            Community Guidelines
          </Link> */}
          <Link to="/faq" className="footer-general-text">
            FAQ
          </Link>
          <Link to="/help-and-support" className="footer-general-text">
            Help Center
          </Link>
          <a
            href="https://discord.com/invite/fwYrYBC5AD"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-general-text">
            Discord
          </a>
          {/* <Link to="/" className="footer-general-text">
            Newsletter
          </Link> */}
        </div>
        <div className="col-lg-3 w-30 col-md-12 mt-lg-0 mt-5 footer-col">
          <p className="footer-title">Newsletter</p>
          <p className="footer-text">Sign up for newsletter to get the latest news</p>
          <Formik
            initialValues={initalFooterFormValue}
            validationSchema={footerValidator}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm )}>
            <Form className="footer-input-container footer-email-input position-relative d-flex flex-column align-items-center">
              <Field
                type="email"
                placeholder="Enter your email"
                name="email"
                inputClassName="footer-input"
                component={CustomInput}
                withOutLabel
              />
              <img src={EMAIL_ICON} className="email-icon" alt="email-icon" />
              <button type="submit" className="footer-mail-send-btn">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <div>
        <hr className="footer-hr" />
        <p className="copyright-text text-center py-3 mb-0">
          ©Copyright 2022 - 3Verse Metaverse NFTs
        </p>
      </div>
    </footer>
  );
}

export default Footer;
