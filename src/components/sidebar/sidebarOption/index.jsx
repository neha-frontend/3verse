import { Link } from 'react-router-dom';

import { HOME_ICON } from '../../../assets/images';

const SidebarOption = ({
  text = 'Home',
  img = HOME_ICON,
  alt = 'home-img',
  isActive = false,
  to = '/',
  label = 'home-nav-icon',
  handleClick = () => null
}) => (
  <li className="nav-item" onClick={handleClick}>
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      <p className={`nav-icon ${label}`}>
        <img src={img} alt={alt} />
      </p>
      <span className="nav-link-label">{text}</span>
    </Link>
  </li>
);

export default SidebarOption;
