import { v4 as uuidv4 } from 'uuid';

import {
  ABOUT_ICON,
  FUSION_ICON,
  HOME_ICON,
  MARKETPLACE_ICON,
  MINT_ICON,
  PROFILE_ICON
} from '../../assets/images';

const sidebarData = [
  {
    id: uuidv4(),
    text: 'Home',
    img: HOME_ICON,
    alt: 'home',
    to: '/',
    label: 'home-nav-icon',
    isGuestRoute: true,
    isUserRoute: true,
    isAdminRoute: true,
    isMintedRoute: false
  },
  {
    id: uuidv4(),
    text: 'Marketplace',
    img: MARKETPLACE_ICON,
    alt: 'marketplace',
    to: '/marketplace',
    label: 'marketplace-nav-icon',
    isGuestRoute: true,
    isUserRoute: true,
    isAdminRoute: true,
    isMintedRoute: false
  },
  {
    id: uuidv4(),
    text: 'Fusion',
    img: FUSION_ICON,
    alt: 'fusion',
    to: '/fusion',
    label: 'fusion-nav-icon',
    isGuestRoute: false,
    isUserRoute: true,
    isAdminRoute: true,
    isMintedRoute: false
  },
  {
    id: uuidv4(),
    text: 'Profile',
    img: PROFILE_ICON,
    alt: 'profile',
    to: '/profile/g-mech',
    label: 'profile-nav-icon',
    isGuestRoute: false,
    isUserRoute: true,
    isAdminRoute: true,
    isMintedRoute: false
  },
  {
    id: uuidv4(),
    text: 'Mint',
    img: MINT_ICON,
    alt: 'mint-icon',
    to: '/mint',
    label: 'profile-nav-icon',
    isGuestRoute: false,
    isUserRoute: true,
    isAdminRoute: true,
    isMintedRoute: true
  },
  {
    id: uuidv4(),
    text: 'WhiteList',
    img: MINT_ICON,
    alt: 'whitelist-icon',
    to: '/whitelist',
    label: 'profile-nav-icon',
    isGuestRoute: false,
    isUserRoute: false,
    isAdminRoute: true,
    isMintedRoute: false
  },
  {
    id: uuidv4(),
    text: 'About',
    img: ABOUT_ICON,
    alt: 'about',
    to: '/about',
    label: 'about-nav-icon',
    isGuestRoute: true,
    isUserRoute: true,
    isAdminRoute: true,
    isMintedRoute: false
  }
];

export default sidebarData;
