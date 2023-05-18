import { useWeb3React } from '@web3-react/core';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { DOWN_ARROW } from '../../assets/images';
import { LOGOUT_MODAL } from '../../constants/modalTypeConstant';
import { showCustomModal } from '../../store/sagaActions';
import ProfileImage from '../profileImage/ProfileImage';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { data: currentUserProfile } = useSelector((state) => state.profile.currentUserProfile);
  const { account } = useWeb3React();
  const handleDropdownItemClick = (eventKey) => {
    switch (eventKey) {
      case 'connect-wallet':
        navigate('/select-wallet');
        break;
      case 'account-setting':
        navigate('/notification-settings');
        break;

      case 'logout':
        return dispatch(showCustomModal({ customModalType: LOGOUT_MODAL }));

      default:
        return null;
    }
  };

  return (
    <Dropdown className="top-header-profile-dropdown" onSelect={handleDropdownItemClick}>
      <div className="top-nav-profile">
        <Link to={`/profile/${currentUserProfile._id}/gmech`}>
          <ProfileImage
            img={currentUserProfile?.profilePic?.link}
            className="top-nav-profile-img"
          />
        </Link>
        <Dropdown.Toggle className="w-auto">
          <img src={DOWN_ARROW} className="cp down-arrow" alt="down-arrow" />
        </Dropdown.Toggle>
      </div>
      <Dropdown.Menu>
        <Dropdown.Item
          eventKey="connect-wallet"
          className={pathname === '/select-wallet' ? 'active' : ''}>
          {account ? 'Disconnect wallet' : 'Connect wallet'}
        </Dropdown.Item>
        <Dropdown.Item eventKey="account-setting">Accounts & Settings</Dropdown.Item>
        <Dropdown.Item eventKey="logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
