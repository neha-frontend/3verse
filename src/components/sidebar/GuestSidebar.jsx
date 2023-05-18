import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SidebarOption from './sidebarOption';
import { LOGO_IMG, SIDEBAR_CROSS_ICON } from '../../assets/images';
import sidebarData from './sidebarData';
import { PrimaryButton } from '../button';
import { LOGIN_MODAL } from '../../constants/modalTypeConstant';
import { showCustomModal } from '../../store/sagaActions';

function GuestSidebar({ sidebar = false, toggleSidebar = () => null }) {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  // render guestRoute sidebar options only
  const guestSidebarOptionArray = sidebarData.filter((option) => option.isGuestRoute);

  const dispatch = useDispatch();

  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));

  return (
    <div
      className={`d-flex flex-column guest-sidebar flex-shrink-0 side-nav ${
        sidebar ? '' : ' side-nav-hide'
      }`}>
      <Link to="/" className="mx-auto d-lg-block d-none">
        <img src={LOGO_IMG} alt="home-logo" className="sidebar-logo" />
      </Link>
      <div className="sidebar-header d-lg-none d-flex align-items-center">
        <div
          className="me-auto"
          onClick={() => {
            toggleSidebar(false);
            navigate('/');
          }}>
          <img src={LOGO_IMG} alt="home-logo" className="sidebar-logo" />
        </div>
        <div className="d-flex align-items-center">
          <button
            className="d-lg-none d-flex align-items-center justify-content-center cross-sidebar-icon ms-2"
            onClick={() => toggleSidebar(false)}>
            <img src={SIDEBAR_CROSS_ICON} alt="sidebar-close"/>
          </button>
        </div>
      </div>
      <ul className="nav flex-column text-center">
        {guestSidebarOptionArray.map((option) => {
          return (
            <SidebarOption
              key={option.id}
              text={option.text}
              img={option.img}
              alt={option.alt}
              to={option.to}
              label={option.label}
              isActive={
                pathname.includes('/nft-detail')
                  ? state === option.alt
                  : `/${pathname.split('/')[1]}` === option.to
              }
            />
          );
        })}
        <div className="d-lg-none d-block play-login-btn-container">
          <a
            href="https://139-162-7-242.ip.linodeusercontent.com/"
            target="_blank"
            rel="noreferrer"
            className="top-nav-btn-a">
            <PrimaryButton
              type="button"
              text="Play Now"
              primaryClassName="top-nav-btn"
              className="w-100 mb-3"
            />
          </a>
          <PrimaryButton
            type="button"
            text="Login"
            primaryClassName="top-nav-btn top-nav-login-btn"
            handleClick={openLoginModal}
            className="w-100 ms-0"
          />
        </div>
      </ul>
    </div>
  );
}

export default GuestSidebar;
