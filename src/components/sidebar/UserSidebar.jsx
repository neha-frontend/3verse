import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SidebarOption from './sidebarOption';
import ProfileDropdown from '../header/ProfileDropdown';
import { LOGO_IMG, SIDEBAR_CROSS_ICON, NOTIFICATION_ICON } from '../../assets/images';
import sidebarData from './sidebarData';
import { PrimaryButton } from '../button';

function UserSidebar({ showHeaderDropdown = false, toggleHeaderDropdown = () => null }) {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const { roleType } = useSelector((state) => state.auth.login);
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  // Find if homeIcon need to be active or not.
  let homeIconActive = false;
  (() => {
    if (
      pathname.includes('/marketplace') ||
      pathname.includes('/fusion') ||
      pathname.includes('/profile') ||
      pathname.includes('/mint') ||
      pathname.includes('/about') ||
      pathname.includes('/nft-detail')
    ) {
      homeIconActive = false;
    } else {
      homeIconActive = true;
    }
  })();

  // render userRoute sidebar options only
  const userSidebarOptionArray =
    roleType === 'Admin'
      ? sidebarData.filter((option) => option.isAdminRoute)
      : sidebarData.filter((option) => option.isUserRoute);

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 side-nav ${
        showHeaderDropdown ? '' : ' side-nav-hide'
      }`}>
      <Link to="/" className="mx-auto d-lg-block d-none">
        <img src={LOGO_IMG} alt="home-logo" className="sidebar-logo" />
      </Link>
      <div className="sidebar-header d-lg-none d-flex align-items-center">
        <div
          className="me-auto"
          onClick={() => {
            toggleHeaderDropdown();
            navigate('/');
          }}>
          <img src={LOGO_IMG} alt="home-logo" className="sidebar-logo" />
        </div>
        <div className="d-flex align-items-center">
          <Link to="/notification" className="top-nav-notification-icon mx-lg-4 mx-2 cp">
            <img
              src={NOTIFICATION_ICON}
              alt="Notification"
              className="top-nav-notification-icon-img"
              onClick={toggleHeaderDropdown}
            />
          </Link>
          <ProfileDropdown />
          <button
            className="d-lg-none d-flex align-items-center justify-content-center cross-sidebar-icon ms-2"
            onClick={toggleHeaderDropdown}>
            <img src={SIDEBAR_CROSS_ICON} alt="sidebar-toggle" />
          </button>
        </div>
      </div>      
      <ul className="nav flex-column text-center">
        {userSidebarOptionArray.map((option) =>
          option?.isMintedRoute ? (
            data?.isWhitelisted && data?.isWhitelisted !== null ? (
              <SidebarOption
                key={option.id}
                text={option.text}
                img={option.img}
                alt={option.alt}
                to={option.to === '/profile/g-mech' ? `/profile/${data._id}/gmech` : option.to}
                label={option.label}
                isActive={
                  pathname.includes('/nft-detail')
                    ? state === 'home' || state === 'null'
                      ? option.to === '/'
                      : state === 'marketplace'
                      ? option.to === '/marketplace'
                      : option.alt === 'profile'
                    : option.to === '/'
                    ? homeIconActive
                    : pathname.split('/')[1] === option.to.split('/')[1]
                }
                handleClick={toggleHeaderDropdown}
              />
            ) : null
          ) : (
            <SidebarOption
              key={option.id}
              text={option.text}
              img={option.img}
              alt={option.alt}
              to={option.to === '/profile/g-mech' ? `/profile/${data._id}/gmech` : option.to}
              label={option.label}
              isActive={
                pathname.includes('/nft-detail')
                  ? state === 'home' || state === 'null'
                    ? option.to === '/'
                    : state === 'marketplace'
                    ? option.to === '/marketplace'
                    : option.alt === 'profile'
                  : option.to === '/'
                  ? homeIconActive
                  : pathname.split('/')[1] === option.to.split('/')[1]
              }
              handleClick={toggleHeaderDropdown}
            />
          )
        )}
        <div className="d-lg-none d-block play-login-btn-container">
          <PrimaryButton
            type="button"
            text={
              <a
                href="https://139-162-7-242.ip.linodeusercontent.com/"
                target="_blank"
                rel="noreferrer"
                className="top-nav-btn-a">
                Play Now
              </a>
            }
            primaryClassName="top-nav-btn"
            className="w-100"
          />
        </div>
      </ul>
    </div>
  );
}

export default UserSidebar;
