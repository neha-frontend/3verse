import { lazy } from 'react';

// * *Common Routes are common for all the routes, guest, user and Admin
export const commonRoute = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: lazy(() => import('../../views/user/home/Home'))
  },
  {
    path: '/collections',
    name: 'Collections',
    exact: true,
    component: lazy(() => import('../../views/user/home/collectionSection/Collections'))
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },
  {
    path: '/marketplace/mech',
    name: 'MarketplaceMech',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },
  {
    path: '/marketplace/loot',
    name: 'MarketplaceLoot',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },
  {
    path: '/marketplace/abilities',
    name: 'MarketplaceAbilities',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },
  {
    path: '/marketplace/skins',
    name: 'MarketplaceSkins',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },

  {
    path: '/marketplace/armor',
    name: 'MarketplaceArmor',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },

  {
    path: '/marketplace/kill-fx',
    name: 'MarketplaceKillFX',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },
  {
    path: '/marketplace/pose',
    name: 'MarketplacePose',
    exact: true,
    component: lazy(() => import('../../views/user/marketplace/Marketplace'))
  },
  {
    path: '/profile/:userId/:tab',
    name: 'ArtistProfile',
    exact: true,
    component: lazy(() => import('../../views/user/artistProfile/ArtitstProfile'))
  },
  {
    path: '/faq',
    name: 'FAQ',
    exact: true,
    component: lazy(() => import('../../views/user/faq/FAQ'))
  },
  {
    path: '/community-guidelines',
    name: 'CommunityGuidelines',
    exact: true,
    component: lazy(() => import('../../views/user/legal/Legal'))
  },
  {
    path: '/about',
    name: 'About',
    exact: true,
    component: lazy(() => import('../../views/user/legal/About'))
  },
  {
    path: '/terms-and-condition',
    name: 'TermsAndCondition',
    exact: true,
    component: lazy(() => import('../../views/user/legal/Legal'))
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    exact: true,
    component: lazy(() => import('../../views/user/legal/Legal'))
  },
  {
    path: '/help-and-support',
    name: 'HelpAndSupport',
    exact: true,
    component: lazy(() => import('../../views/user/helpAndSupport/HelpAndSupport'))
  },
  {
    path: '/modal',
    name: 'Modal',
    exact: true,
    component: lazy(() => import('../../views/user/3dModal/ModalView'))
  },
  {
    path: '/nft-detail/:id/:owner',
    name: 'TabDetails',
    exact: true,
    component: lazy(() => import('../../views/user/nftDetails/TabDetails/TabDetails'))
  },
  {
    path: '/nft-detail/:id/:owner/:listingId',
    name: 'TabDetails',
    exact: true,
    component: lazy(() => import('../../views/user/nftDetails/TabDetails/TabDetails'))
  }
];

export const guestRoutes = [
  {
    redirectRoute: true,
    name: 'Home',
    path: '/'
  }
];

export const userRoutes = [
  {
    path: '/select-wallet',
    name: 'SelectWallet',
    exact: true,
    component: lazy(() => import('../../views/user/wallet/Wallet'))
  },
  {
    path: '/fusion',
    name: 'Fusion',
    exact: true,
    component: lazy(() => import('../../views/user/fusion/SelectFusion'))
  },
  {
    path: '/fusion/select-mech',
    name: 'FusionSelectMech',
    exact: true,
    component: lazy(() => import('../../views/user/fusion/SelectFusion'))
  },
  {
    path: '/fusion/fuse',
    name: 'FusionFuse',
    exact: true,
    component: lazy(() => import('../../views/user/fusion/fuse/Fuse'))
  },
  {
    path: '/fusion/fuse-success',
    name: 'FusionFuseSucess',
    exact: true,
    component: lazy(() => import('../../views/user/fusion/fuse/FuseSuccess'))
  },

  {
    path: '/notification',
    name: 'Notification',
    exact: true,
    component: lazy(() => import('../../views/user/notification/Notification'))
  },
  {
    path: '/notification-settings',
    name: 'NotificationSettings',
    exact: true,
    component: lazy(() => import('../../views/user/notification/NotificationSettings'))
  },
  {
    path: '/mint',
    name: 'Mint',
    exact: true,
    component: lazy(() => import('../../views/user/mint/Mint'))
  },
  {
    redirectRoute: true,
    name: 'Home',
    path: '/'
  }
];

export const adminRoutes = [
  {
    path: '/mint',
    name: 'Mint',
    exact: true,
    component: lazy(() => import('../../views/user/mint/Mint'))
  },
  {
    path: '/whitelist',
    name: 'Modal',
    exact: true,
    component: lazy(() => import('../../views/user/WhiteList/Whitelist'))
  },
  {
    redirectRoute: true,
    name: 'Home',
    path: '/'
  }
];
