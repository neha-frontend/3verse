import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOGO_IMG, TOGGLE_ICON } from '../../assets/images';
import { LOGIN_MODAL } from '../../constants/modalTypeConstant';
import { showCustomModal } from '../../store/sagaActions';
import { PrimaryButton } from '../button';

function GuestHeader({ toggleSidebar = () => null }) {
  const dispatch = useDispatch();

  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));

  return (
    <header className="d-flex flex-wrap justify-content-end top-nav align-items-center">
      <div className="d-flex align-items-center w-100 top-nav-content-wrapper-div">
        <Link to="/" className="me-auto d-lg-none d-block">
          <img src={LOGO_IMG} alt="home-logo" className="sidebar-logo" />
        </Link>
        <div className="top-nav-btn-container d-flex align-items-center ms-auto">
          <a
            href="https://139-162-7-242.ip.linodeusercontent.com/"
            target="_blank"
            rel="noreferrer"
            className="top-nav-btn-a">
            <PrimaryButton
              type="button"
              text="Play Now"
              primaryClassName="top-nav-btn"
              className="d-lg-flex d-none"
            />
          </a>
          <PrimaryButton
            type="button"
            text="Login"
            primaryClassName="top-nav-btn top-nav-login-btn"
            handleClick={openLoginModal}
          />
          <button className="d-lg-none d-block sidebar-toggle-icon" onClick={toggleSidebar}>
            <img src={TOGGLE_ICON} alt="toggle-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default GuestHeader;
