import { createAction } from '@reduxjs/toolkit';

export const getMarketplaceNftAction = createAction('GET_MARKETPLACE_NFT_ACTION');
export const getNewNftAction = createAction('GET_NEW_NFT_ACTION');

export const getNftDetailsAction = createAction('GET_NFT_DETAILS_ACTION');

export const getCollectionAction = createAction('GET_COLLECTION_ACTION');

export const getUserFreshMintedNFT = createAction('GET_FERSH_MINTEDNFT_ACTION');
export const getPFPNFT = createAction('GET_PFP_NFT_ACTION');
export const getUserNftListAction = createAction('GET_USER_NFT_LIST_ACTION');
export const getUserOnSaleNftAction = createAction('GET_USER_ONSALE_NFT_ACTION');
export const getUserOnRentNftAction = createAction('GET_USER_ONRENT_NFT_ACTION');
export const getFavouriteNftAction = createAction('GET_FAVOURITE_NFT_ACTION');

export const likeUnlikeNftAction = createAction('LIKE_UNLIKE_NFT_ACTION');

export const getNftTradingHistoryAction = createAction('GET_NFT_TRADING_HISTORY_ACTION');
export const getCadetOverviewAction = createAction('GET_CADET_OVERVIEW_ACTION');

export const putNftOnRentAction = createAction('PUT_NFT_ON_RENT_ACTION');
export const removeNftFromRentAction = createAction('REMOVE_NFT_FROM_RENT_ACTION');
export const disconnectNftFromRentAction = createAction('DISCONNECT_NFT_FROM_RENT_ACTION');
export const buyNftFromRentAction = createAction('BUY_NFT_FROM_RENT_ACTION');


