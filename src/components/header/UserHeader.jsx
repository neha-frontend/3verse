import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProfileDropdown from './ProfileDropdown';
import { LOGO_IMG, NOTIFICATION_ICON, PLAY_BTN, TOGGLE_ICON } from '../../assets/images';
import { RenderIf } from '../../utils';
import { PrimaryButton } from '../button';
import Search from '../search';
import { useEffect } from 'react';
import socketConfig from '../../SocketConfig';
import { getNotification } from '../../store/sagaActions';

const UserHeader = ({ toggleHeaderDropdown = () => null }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  const { unReadCount } = useSelector((state) => state.notification);

  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  let headerText = '';
  let pathHeaderTitle = '';
  switch (path) {
    case 'marketplace':
      headerText = 'Marketplace';
      break;
    case 'notification-settings':
      pathHeaderTitle = 'notificationHeaderTitle';
      break;
    default:
      headerText = '';
  }

  useEffect(() => {
    const socket = socketConfig(data?._id);
    socket.on('notification', (notfication) => {
      dispatch(
        getNotification({
          totalPages: notfication?.list?.totalPage,
          totalItem: notfication?.list?.totalItem,
          unReadCount: notfication?.unReadCount,
          notificationDetail: notfication?.list?.list
        })
      );
    });
  }, []);

  return (
    <header className="d-flex top-nav user-top-nav align-items-center">
      <div className="d-flex align-items-center w-100 top-nav-content-wrapper-div">
        <RenderIf isTrue={headerText !== ''}>
          <div className="text-white d-lg-flex align-items-center d-none title-search-container">
            <h2 className={`header-title ${pathHeaderTitle}`}>{headerText}</h2>
            <Search className="header-search-container w-100" />
            {/* <div className="header-search-container position-relative w-100">
              <input
                type="search"
                placeholder="Search"
                className="header-search-input"
                onChange={handleSearchChange}
              />
              <img src={SEARCH_ICON} alt="search" className="header-search-icon" />
            </div> */}
          </div>
        </RenderIf>
        <Link to="/" className="me-auto d-lg-none d-block">
          <img src={LOGO_IMG} alt="home-logo" className="sidebar-logo" />
        </Link>
        <div className="top-nav-btn-container d-flex align-items-center justify-content-end ms-auto">
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
            <button className="top-nav-m-play-btn d-lg-none d-flex">
              <img src={PLAY_BTN} alt="play" />
            </button>
          </a>
          <Link
            to="/notification"
            className={` position-relative ${
              pathname === '/notification' ? 'top-nav-notification-icon' : ''
            } mx-lg-4 mx-2 cp`}>
            <RenderIf isTrue={unReadCount}>
              <span className="unread_not">{unReadCount}</span>
            </RenderIf>
            <img
              src={NOTIFICATION_ICON}
              alt="Notification"
              className="top-nav-notification-icon-img"
            />
          </Link>
          <button className="d-lg-none d-block sidebar-toggle-icon" onClick={toggleHeaderDropdown}>
            <img src={TOGGLE_ICON} alt="toggle-icon" />
          </button>

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
