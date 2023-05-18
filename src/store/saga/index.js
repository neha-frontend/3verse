import { all, takeLatest } from 'redux-saga/effects';

import {
  authenticationValidatorAction,
  loginAction,
  registerAction,
  logoutAction,
  forgotPasswordAction,
  getCurrentUserProfileAction,
  editUserProfileAction,
  getMarketplaceNftAction,
  getNewNftAction,
  getUserOnSaleNftAction,
  getNftDetailsAction,
  getCollectionAction,
  getUserFreshMintedNFT,
  updateAccountSettingAction,
  getUserNftListAction,
  getUserOnRentNftAction,
  getFavouriteNftAction,
  getUserBidsAction,
  getOtherUserProfileAction,
  uploadUserProfilePicAction,
  whiteListUser,
  likeUnlikeNftAction,
  resetPasswordAction,
  connectWalletAction,
  getNftTradingHistoryAction,
  putNftOnRentAction,
  removeNftFromRentAction,
  disconnectNftFromRentAction,
  getPFPNFT,
  buyNftFromRentAction,
  getGlobalSearchAction,
  refreshTokenAction,
  newsletterAction,
  getCadetOverviewAction,
  putNftMetadata
} from '../sagaActions';

import {
  authenticationValidatorSaga,
  loginSaga,
  registerSaga,
  logoutSaga,
  forgotPasswordSaga,
  resetPasswordSaga,
  refreshTokenSaga
} from './auth/auth';

import {
  editUserProfileSaga,
  getCurrentUserProfileSaga,
  updateAccountSettingSaga,
  getUserBidsSaga,
  getOtherUserProfileSaga,
  uploadProfilePicSaga,
  whitelistuserSaga,
  connectWalletSaga
} from './profile/profile';

import {
  getCollectionSaga,
  getFavouriteNftSaga,
  getMarketplaceNftSaga,
  getNewNftItemSaga,
  getNftDetailsSaga,
  getUserFreshMintedNFTSaga,
  getNftOnRentSaga,
  getPFPnftSaga,
  getNftOnSaleSaga,
  getUserNftListSaga,
  likeUnlikeNftSaga,
  getNftTradingHistorySaga,
  putNftOnRentSaga,
  removeNftFromRentSaga,
  disconnectNftFromRentSaga,
  BuyNftFromRentSaga,
  getCadetOverviewSaga
} from './nft/nft';
import { getGlobalSearchDataSaga } from './search/search';
import { newsletterSaga } from './newsletter/newsletter';
import { putNftMetadataSaga } from './fusion/fusion';

function* watchAuthentication() {
  yield takeLatest(loginAction.type, loginSaga);
  yield takeLatest(refreshTokenAction.type, refreshTokenSaga);
  yield takeLatest(logoutAction.type, logoutSaga);
  yield takeLatest(authenticationValidatorAction.type, authenticationValidatorSaga);
  yield takeLatest(registerAction.type, registerSaga);
  yield takeLatest(forgotPasswordAction.type, forgotPasswordSaga);
  yield takeLatest(resetPasswordAction.type, resetPasswordSaga);
}

function* watchUser() {
  yield takeLatest(getCurrentUserProfileAction.type, getCurrentUserProfileSaga);
  yield takeLatest(getOtherUserProfileAction.type, getOtherUserProfileSaga);
  yield takeLatest(editUserProfileAction.type, editUserProfileSaga);
  yield takeLatest(uploadUserProfilePicAction.type, uploadProfilePicSaga);
  yield takeLatest(updateAccountSettingAction.type, updateAccountSettingSaga);
  yield takeLatest(getUserBidsAction.type, getUserBidsSaga);
  yield takeLatest(whiteListUser.type, whitelistuserSaga);
  yield takeLatest(connectWalletAction.type, connectWalletSaga);
}

function* watchNft() {
  yield takeLatest(getNftDetailsAction.type, getNftDetailsSaga);
  yield takeLatest(getMarketplaceNftAction.type, getMarketplaceNftSaga);
  yield takeLatest(getNewNftAction.type, getNewNftItemSaga);
  yield takeLatest(getCollectionAction.type, getCollectionSaga);
  yield takeLatest(getUserFreshMintedNFT.type, getUserFreshMintedNFTSaga);
  yield takeLatest(getPFPNFT.type, getPFPnftSaga);
  yield takeLatest(getUserNftListAction.type, getUserNftListSaga);
  yield takeLatest(getUserOnSaleNftAction.type, getNftOnSaleSaga);
  yield takeLatest(getUserOnRentNftAction.type, getNftOnRentSaga);
  yield takeLatest(getFavouriteNftAction.type, getFavouriteNftSaga);
  yield takeLatest(likeUnlikeNftAction.type, likeUnlikeNftSaga);
  yield takeLatest(getNftTradingHistoryAction.type, getNftTradingHistorySaga);
  yield takeLatest(putNftOnRentAction.type, putNftOnRentSaga);
  yield takeLatest(removeNftFromRentAction.type, removeNftFromRentSaga);
  yield takeLatest(disconnectNftFromRentAction.type, disconnectNftFromRentSaga);
  yield takeLatest(buyNftFromRentAction.type, BuyNftFromRentSaga);
  yield takeLatest(getCadetOverviewAction.type, getCadetOverviewSaga);
}

function* watchSearch() {
  yield takeLatest(getGlobalSearchAction.type, getGlobalSearchDataSaga);
}

function* watchNewsletter() {
  yield takeLatest(newsletterAction.type, newsletterSaga);
}

function* watchFusion() {
  yield takeLatest(putNftMetadata.type, putNftMetadataSaga);
}
// function* watchNotification() {
//   yield takeLatest(getNotificationAction.type, getNotificationSaga);
// }

export default function* rootSaga() {
  yield all([
    watchAuthentication(),
    watchUser(),
    watchNft(),
    watchSearch(),
    watchNewsletter(),
    watchFusion()
  ]);
}
