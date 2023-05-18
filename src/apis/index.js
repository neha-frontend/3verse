//------------------------------------------------------------------------------//
//------------------------- AUTH API"S  ----------------------------------------//
//------------------------------------------------------------------------------//

// auth
export const LOGIN_URL = '/auth/signin';
export const LOGOUT_URL = '/logout';
export const REFRESH_TOKEN_URL = '/auth/refreshToken';

export const REGISTER_URL = '/auth/signup';

export const FORGOT_PASSWORD_URL = '/auth/resetPassword';
export const RESET_PASSWORD_URL = '/auth/confirmReset';

//------------------------------------------------------------------------------//
//------------------------- USER API"S  ----------------------------------------//
//------------------------------------------------------------------------------//

// profile
export const GET_CURRENT_USER_PROFILE = '/profile/me';
export const GET_OTHER_USER_PROFILE = '/profile';
export const UPLOAD_PROFILE_PIC_URL = '/profile/profilePic';
export const GET_USER_BIDS_URL = '/nft/bids';
export const WHITELISTURL = '/whitelist';

// marketplace
export const GET_NFT_ON_SALE = '/nft/onsale';
export const GET_NFT_ON_RENT = '/nft/onrent';
export const GET_FAVOURITE_NFT_URL = '/nft/favorite';

//collection
export const GET_COLLECTION = '/collection';

//get user Mech
export const GET_USER_MECH = '/nft';
export const GET_FRESH_MINTED = '/nft?freshMinted=true&nftType[$ne]=g-mech';

//nft
export const GET_NFT_DETAILS_URL = '/dummy';
export const LIKE_NFT_URL = '/nft/like';
export const UNLIKE_NFT_URL = '/nft/dislike';
export const TRADING_HISTORY = 'nft/history';
export const LIST_FOR_RENT = 'nft/list-for-rent';
export const REMOVE_FOR_RENT = '/nft/remove-sale-item';
export const DISCONNECT_FOR_RENT = '/nft/disconnect';
export const BUY_FOR_RENT = '/nft/rent';
export const CADET_OVERVIEW = '/nft/overview';

// search
export const GLOBAL_SEARCH_URL = '/nft/search';

// newsletter
export const NEWSLETTER = '/auth/subscribe';
