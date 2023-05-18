/* eslint-disable no-unused-vars */
import { put } from 'redux-saga/effects';

import {
  GET_CURRENT_USER_PROFILE,
  GET_OTHER_USER_PROFILE,
  GET_USER_BIDS_URL,
  UPLOAD_PROFILE_PIC_URL,
  WHITELISTURL
} from '../../../apis';
import { EMAIL_CHANGE_LOGOUT_MSG } from '../../../constants/modalConstant';
import { errorHandler } from '../../../utils';
import { whitelistuserStart, whitelistuserSuccess } from '../../reducer/profile/whitelistSlice';
import {
  editUserProfileFail,
  editUserProfileStart,
  editUserProfileSuccess,
  getCurrentUserProfileFail,
  getCurrentUserProfileStart,
  getCurrentUserProfileSuccess,
  accountSettingStart,
  accountSettingSuccess,
  accountSettingFail,
  getUserBidsFail,
  getUserBidsStart,
  getUserBidsSuccess,
  logoutAction,
  getOtherUserProfileStart,
  getOtherUserProfileSuccess,
  getOtherUserProfileFail,
  hideCustomModal,
  showModal,
  hideModal,
  uploadProfilePicStart,
  uploadProfilePicSuccess,
  uploadProfilePicFail,
  updateOtherUserProfile,
  connectWalletStart,
  connectWalletSuccess,
  connectWalletFail,
  resetModal,
  getCurrentUserProfileAction
} from '../../sagaActions';

// get current user profile Saga
export function* getCurrentUserProfileSaga() {
  yield put(getCurrentUserProfileStart());
  yield errorHandler({
    endpoint: GET_CURRENT_USER_PROFILE,
    successHandler: yield function* (response) {
      if (response?.data?.userType !== localStorage.getItem('roleType')) {
        localStorage.setItem('roleType', response?.data?.userType);
        yield put(getCurrentUserProfileAction());
      }
      yield put(getCurrentUserProfileSuccess(response.data));
    },
    failHandler: getCurrentUserProfileFail,
    apiType: 'get'
  });
}

// edit user profile Saga
export function* editUserProfileSaga(action) {
  yield put(editUserProfileStart());
  const { data, isEmailChanged, dispatch, navigate } = action.payload;
  yield errorHandler({
    endpoint: GET_OTHER_USER_PROFILE,
    successHandler: yield function* (response) {
      yield put(editUserProfileSuccess(response.data));
      yield put(getOtherUserProfileSuccess(response.data));
      yield put(
        showModal({
          message: isEmailChanged ? EMAIL_CHANGE_LOGOUT_MSG : response.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true,
          handleClick: () => {
            dispatch(hideModal());
            setTimeout(() => dispatch(resetModal()), 1000);
            dispatch(hideCustomModal());
            if (isEmailChanged) dispatch(logoutAction({ forceLogout: true, navigate }));
          }
        })
      );
    },
    failHandler: yield function* (response) {
      yield put(editUserProfileFail(response));
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
    payload: data,
    apiType: 'put'
  });
}

// upload profile pic
export function* uploadProfilePicSaga(action) {
  yield put(uploadProfilePicStart());
  const { data } = action.payload;
  yield errorHandler({
    endpoint: UPLOAD_PROFILE_PIC_URL,
    successHandler: yield function* (response) {
      yield put(uploadProfilePicSuccess(response.data));
      yield put(updateOtherUserProfile(response.data));
    },
    failHandler: yield function* (response) {
      yield put(uploadProfilePicFail(response));
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
    payload: data,
    apiType: 'put'
  });
}

//update account setting saga
export function* updateAccountSettingSaga(action) {
  const { data, originalSetting, email, type } = action.payload;
  const apiPayload = { email };
  apiPayload[type] = { ...data };
  yield put(accountSettingStart({ data, type }));
  yield errorHandler({
    endpoint: GET_OTHER_USER_PROFILE,
    successHandler: yield function* (response) {
      yield put(accountSettingSuccess(response.data));
    },
    failHandler: yield function* () {
      yield put(accountSettingFail(originalSetting));
    },
    failHandlerType: 'CUSTOM',
    payload: apiPayload,
    apiType: 'put'
  });
}

// get user bids Saga
export function* getUserBidsSaga(action) {
  yield put(getUserBidsStart());
  const { userId } = action.payload;
  yield errorHandler({
    endpoint: `${GET_USER_BIDS_URL}/${userId}`,
    successHandler: yield function* (response) {
      yield put(getUserBidsSuccess(response.data));
    },
    failHandler: getUserBidsFail,
    apiType: 'get'
  });
}

export function* whitelistuserSaga(action) {
  yield put(whitelistuserStart());
  const { address } = action.payload;
  yield errorHandler({
    endpoint: `${WHITELISTURL}`,
    successHandler: yield function* (response) {
      yield put(whitelistuserSuccess(response.data));
    },
    payload: { walletAddress: address },
    failHandler: getUserBidsFail,
    apiType: 'post'
  });
}

// get other user profile Saga
export function* getOtherUserProfileSaga(action) {
  yield put(getOtherUserProfileStart());
  const { userId = '' } = action.payload;
  yield errorHandler({
    endpoint: `${GET_OTHER_USER_PROFILE}/${userId}`,
    successHandler: yield function* (response) {
      yield put(getOtherUserProfileSuccess(response.data));
    },
    failHandler: getOtherUserProfileFail,

    apiType: 'get'
  });
}

//wallet connect
export function* connectWalletSaga(action) {
  yield put(connectWalletStart());
  const { data, deactivate } = action.payload;
  yield errorHandler({
    endpoint: '/profile/connectWallet',
    successHandler: yield function* (response) {
      yield put(connectWalletSuccess(response.data));
    },
    failHandler: yield function* (response) {
      yield put(connectWalletFail(response));
      yield put(
        showModal({
          message: response,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
      deactivate();
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'put'
  });
}
