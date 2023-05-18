/* eslint-disable no-unused-vars */
/* eslint-disable require-yield */
import { put } from 'redux-saga/effects';

import {
  BUY_FOR_RENT,
  CADET_OVERVIEW,
  DISCONNECT_FOR_RENT,
  GET_COLLECTION,
  GET_FAVOURITE_NFT_URL,
  // GET_NFT_DETAILS_URL,
  GET_FRESH_MINTED,
  GET_NFT_ON_SALE,
  GET_USER_MECH,
  LIKE_NFT_URL,
  LIST_FOR_RENT,
  REMOVE_FOR_RENT,
  TRADING_HISTORY,
  UNLIKE_NFT_URL
} from '../../../apis';
import { errorHandler } from '../../../utils';
import {
  getFreshmintedFail,
  getFreshmintedStart,
  getFreshmintedSuccess
} from '../../reducer/nft/freshMintedNFt';
import {
  buyNftFromRentFail,
  buyNftFromRentStart,
  buyNftFromRentSuccess,
  disconnectNftFromRentFail,
  disconnectNftFromRentStart,
  disconnectNftFromRentSuccess,
  putNftOnRentFail,
  // putNftOnRentFail,
  putNftOnRentStart,
  putNftOnRentSuccess,
  removeNftFromRentFail,
  removeNftFromRentStart,
  removeNftFromRentSuccess
} from '../../reducer/nft/putNftOnRentSlice';
import {
  getCollectionFail,
  getCollectionStart,
  getCollectionSuccess,
  getFavouriteNftFail,
  getFavouriteNftStart,
  getFavouriteNftSuccess,
  getMarketplaceNftFail,
  getMarketplaceNftStart,
  getMarketplaceNftSuccess,
  getNewNftItemFail,
  getNewNftItemStart,
  getNewNftItemSuccess,
  getNftDetailsFail,
  getNftDetailsStart,
  getNftDetailsSuccess,
  getNftListFail,
  getNftListStart,
  getNftListSuccess,
  getNftOnRentFail,
  getNftOnRentStart,
  getNftOnRentSuccess,
  getNftOnSaleFail,
  getNftOnSaleStart,
  getNftOnSaleSuccess,
  getNftTradingHistoryFail,
  getNftTradingHistoryStart,
  getNftTradingHistorySuccess,
  getPFPnftstart,
  getPFPnftsuccess,
  likeUnlikeMarketplaceNftItem,
  likeUnlikeMyFavouriteNFT,
  likeUnlikeMyNFT,
  likeUnlikeNewNftItem,
  likeUnlikeNftFail,
  likeUnlikeNftStart,
  likeUnlikeNftSuccess,
  likeUnlikeonRentNFT,
  likeUnlikeonSaleNFT,
  showModal,
  setFuseUrl,
  getCurrentUserProfileSuccess,
  getCurrentUserProfileAction,
  getCadetOverviewStart,
  getCadetOverviewSuccess,
  getCadetOverviewFail
} from '../../sagaActions';

export function* getNftDetailsSaga(action) {
  yield put(getNftDetailsStart());
  const { id, ownerId, list = null } = action.payload;
  yield errorHandler({
    endpoint:
      list === null
        ? `${GET_USER_MECH}/${id}?currentOwner=${ownerId}`
        : `${GET_USER_MECH}/${id}?currentOwner=${ownerId}&listingId=${list}`,
    successHandler: yield function* (response) {
      yield put(getNftDetailsSuccess(response.data));
    },
    failHandler: getNftDetailsFail,
    apiType: 'get'
  });
}

export function* getMarketplaceNftSaga(action) {
  yield put(getMarketplaceNftStart({ isNew: action?.payload?.isNew }));
  const { page, limit, isNew = false, URL = '' } = action.payload;
  let newURL = URL.replace('nftType1', 'nftType')
    .replace('nftType2', 'nftType')
    .replace('sellType1', 'sellType')
    .replace('sellType2', 'sellType')
    .replace('gmechType1', 'listingType')
    .replace('gmechType2', 'gmech.affinity')
    .replace('gmechType3', 'gmech.affinity')
    .replace('gmechType4', 'gmech.affinity')
    .replace('ability.affinity1', 'ability.affinity')
    .replace('ability.affinity2', 'ability.affinity')
    .replace('ability.affinity3', 'ability.affinity')
    .replace('ability.energyCost1', 'ability.energyCost')
    .replace('ability.energyCost2', 'ability.energyCost')
    .replace('ability.energyCost3', 'ability.energyCost')
    .replace('ability.energyCost4', 'ability.energyCost')
    .replace('ability.energyCost5', 'ability.energyCost')
    .replace('ability.abilityType1', 'ability.abilityType')
    .replace('ability.abilityType2', 'ability.abilityType')
    .replace('ability.abilityType3', 'ability.abilityType')
    .replace('ability.abilityType4', 'ability.abilityType')
    .replace('ability.abilityType5', 'ability.abilityType')
    .replace('skin1', 'skin')
    .replace('skin2', 'skin')
    .replace('skin3', 'skin')
    .replace('skin4', 'skin')
    .replace('skin5', 'skin')
    .replace('skin6', 'skin')
    .replace('armor1', 'armor')
    .replace('armor2', 'armor')
    .replace('armor3', 'armor');

  yield errorHandler({
    endpoint: `${GET_NFT_ON_SALE}?${newURL}`,
    successHandler: yield function* (response) {
      yield put(getMarketplaceNftSuccess({ data: response.data, page, limit, isNew }));
    },
    failHandler: getMarketplaceNftFail,
    apiType: 'get'
  });
}

// get new nft items
export function* getNewNftItemSaga(action) {
  yield put(getNewNftItemStart());
  const { URL = '' } = action.payload;
  yield errorHandler({
    endpoint: `${GET_NFT_ON_SALE}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getNewNftItemSuccess(response.data));
    },
    failHandler: getNewNftItemFail,
    apiType: 'get'
  });
}

// get collection saga
export function* getCollectionSaga() {
  yield put(getCollectionStart());
  yield errorHandler({
    endpoint: GET_COLLECTION,
    successHandler: yield function* (response) {
      yield put(getCollectionSuccess(response.data));
    },
    failHandler: getCollectionFail,
    apiType: 'get'
  });
}

export function* getUserFreshMintedNFTSaga(action) {
  yield put(getFreshmintedStart());
  const { owner = '' } = action.payload;
  yield errorHandler({
    endpoint: `${GET_FRESH_MINTED}&createdBy=${owner}`,
    successHandler: yield function* (response) {
      yield put(getFreshmintedSuccess(response.data));
    },
    failHandler: getFreshmintedFail,
    apiType: 'get'
  });
}
export function* getPFPnftSaga(action) {
  const { account } = action.payload;
  yield put(getPFPnftstart());
  yield errorHandler({
    endpoint: `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20&include_orders=false`,
    successHandler: yield function* (response) {
      yield put(getPFPnftsuccess(response.assets));
    },
    apiType: 'get'
  });
}

export function* getUserNftListSaga(action) {
  yield put(getNftListStart({ isNew: action?.payload?.isNew }));
  const { page, limit, isNew = false, URL = '' } = action.payload;
  yield errorHandler({
    endpoint: `${GET_USER_MECH}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getNftListSuccess({ data: response.data, page, limit, isNew }));
    },
    failHandler: getNftListFail,
    apiType: 'get'
  });
}

// get user nft on sale saga
export function* getNftOnSaleSaga(action) {
  yield put(getNftOnSaleStart({ isNew: action?.payload?.isNew }));
  const { page, limit, isNew = false, URL = '' } = action.payload;
  yield errorHandler({
    endpoint: `${GET_NFT_ON_SALE}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getNftOnSaleSuccess({ data: response.data, page, limit, isNew }));
    },
    failHandler: getNftOnSaleFail,
    apiType: 'get'
  });
}

// get user nft on rent saga
export function* getNftOnRentSaga(action) {
  yield put(getNftOnRentStart({ isNew: action?.payload?.isNew }));
  const { page, limit, isNew = false, URL = '' } = action.payload;
  yield errorHandler({
    endpoint: `${GET_NFT_ON_SALE}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getNftOnRentSuccess({ data: response.data, page, limit, isNew }));
    },
    failHandler: getNftOnRentFail,
    apiType: 'get'
  });
}

// get user nft on rent saga
export function* getFavouriteNftSaga(action) {
  yield put(getFavouriteNftStart({ isNew: action?.payload?.isNew }));
  const { URL = '', isNew = false, userId = '', page, limit } = action.payload;
  yield errorHandler({
    endpoint: `${GET_FAVOURITE_NFT_URL}/${userId}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getFavouriteNftSuccess({ data: response.data, page, limit, isNew }));
    },
    failHandler: getFavouriteNftFail,
    apiType: 'get'
  });
}

// like-unlike saga
export function* likeUnlikeNftSaga(action) {
  yield put(likeUnlikeNftStart());
  const { data, isLiked = false, screen, key } = action.payload;
  if (screen === 'NEW_ITEMS') yield put(likeUnlikeNewNftItem({ key, isLiked }));
  else if (screen === 'marketplace') yield put(likeUnlikeMarketplaceNftItem({ key, isLiked }));
  else if (screen === 'ability') yield put(likeUnlikeMyNFT({ key, isLiked }));
  else if (screen === 'sale') yield put(likeUnlikeonSaleNFT({ key, isLiked }));
  else if (screen === 'favourite') yield put(likeUnlikeMyFavouriteNFT({ key, isLiked }));
  else if (screen === 'rent') yield put(likeUnlikeonRentNFT({ key, isLiked }));
  else if (screen === 'gmech') yield put(likeUnlikeMyNFT({ key, isLiked }));

  yield errorHandler({
    endpoint: isLiked ? UNLIKE_NFT_URL : LIKE_NFT_URL,
    successHandler: yield function* (response) {
      yield put(likeUnlikeNftSuccess({ data: response.data, screen, key }));
    },
    failHandler: likeUnlikeNftFail,
    payload: data,
    apiType: 'post'
  });
}

//get Trading History
export function* getNftTradingHistorySaga(action) {
  yield put(getNftTradingHistoryStart({ isNew: action?.payload?.isNew }));
  const { URL = '', isNew = false, page, limit, id } = action.payload;
  yield errorHandler({
    endpoint: `${TRADING_HISTORY}/${id}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getNftTradingHistorySuccess({ data: response.data, page, limit, isNew }));
    },
    failHandler: getNftTradingHistoryFail,
    apiType: 'get'
  });
}

//PUT NFT ON RENT
export function* putNftOnRentSaga(action) {
  yield put(putNftOnRentStart());
  const { rentDetail, getData, userId } = action.payload;
  yield errorHandler({
    endpoint: LIST_FOR_RENT,
    successHandler: yield function* (response) {
      yield put(putNftOnRentSuccess(response.data));
      yield put(
        showModal({
          message: response?.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: false,
          redirectURL: `/profile/${userId}/rent`
          
        })
      );
      getData();
    },
    failHandler: yield function* (response) {
      yield put(putNftOnRentFail(response));
      yield put(
        showModal({
          message: response,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
    },
    failHandlerType: 'CUSTOM',
    payload: rentDetail,
    apiType: 'post'
  });
}

//REMOVE NFT FROM Rent
export function* removeNftFromRentSaga(action) {
  yield put(removeNftFromRentStart());
  const { rentDetail, getData } = action.payload;
  yield errorHandler({
    endpoint: REMOVE_FOR_RENT,
    successHandler: yield function* (response) {
      yield put(removeNftFromRentSuccess(response.data));
      yield put(
        showModal({
          message: response?.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
      getData();
    },
    failHandler: yield function* (response) {
      yield put(removeNftFromRentFail(response));
      yield put(
        showModal({
          message: response || response?.msg,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
    },
    failHandlerType: 'CUSTOM',
    payload: rentDetail,
    apiType: 'post'
  });
}

//Disconnect NFT From Rent
export function* disconnectNftFromRentSaga(action) {
  yield put(disconnectNftFromRentStart());
  const { rentDetail, getData } = action.payload;
  yield errorHandler({
    endpoint: DISCONNECT_FOR_RENT,
    successHandler: yield function* (response) {
      yield put(disconnectNftFromRentSuccess(response.data));
      yield put(
        showModal({
          message: response.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
      getData();
      yield put(getCurrentUserProfileAction());
    },
    failHandler: yield function* (response) {
      yield put(disconnectNftFromRentFail(response));
      yield put(
        showModal({
          message: response,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
    },
    failHandlerType: 'CUSTOM',
    payload: rentDetail,
    apiType: 'post'
  });
}

//Buy from Rent
export function* BuyNftFromRentSaga(action) {
  yield put(buyNftFromRentStart());
  const { rentDetail, getData } = action.payload;
  yield errorHandler({
    endpoint: BUY_FOR_RENT,
    successHandler: yield function* (response) {
      yield put(buyNftFromRentSuccess(response.data));
      yield put(
        showModal({
          message: response?.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
      getData();
      yield put(getCurrentUserProfileAction());
    },
    failHandler: yield function* (response) {
      yield put(buyNftFromRentFail(response));
      yield put(
        showModal({
          message: response,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
    },
    failHandlerType: 'CUSTOM',
    payload: rentDetail,
    apiType: 'post'
  });
}

//Get Cadet Overview

export function* getCadetOverviewSaga(action) {
  yield put(getCadetOverviewStart({ isNew: action?.payload?.isNew }));
  const { URL = '', isNew = false, page, limit, id } = action.payload;
  yield errorHandler({
    endpoint: `${CADET_OVERVIEW}?itemId=${id}&${URL}`,
    successHandler: yield function* (response) {
      yield put(getCadetOverviewSuccess({ data: response.data, page, limit, isNew }));
    },
    failHandler: getCadetOverviewFail,
    apiType: 'get'
  });
}
