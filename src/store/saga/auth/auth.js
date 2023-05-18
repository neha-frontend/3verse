import { put } from 'redux-saga/effects';

import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  REFRESH_TOKEN_URL
} from '../../../apis';
import { axios } from '../../../http';
import { errorHandler } from '../../../utils';
import {
  loginFail,
  loginStart,
  loginSuccess,
  logoutAction,
  registerStart,
  registerSuccess,
  registerFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
  showModal,
  hideModal,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFail,
  hideCustomModal,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFail,
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFail
} from '../../sagaActions';

export function* loginSaga(action) {
  yield put(loginStart());
  const { data, navigate } = action.payload;

  //  import errorHandler from utils here to make api calls
  yield errorHandler({
    endpoint: LOGIN_URL,
    successHandler: yield function* (response) {
      const authToken = response?.data?.token;
      const refreshToken = response?.data?.refreshToken;
      const roleType = response?.data?.user?.userType;
      // store authToken in localStorage
      yield localStorage.setItem('authToken', authToken);
      yield localStorage.setItem('refreshToken', refreshToken);
      yield localStorage.setItem('roleType', roleType);
      if (navigate) navigate('/');
      yield put(loginSuccess({ data: response.data, authToken, roleType }));
      yield put(hideCustomModal());
    },

    failHandler: loginFail,
    payload: data,
    apiType: 'post'
  });
}

export function* logoutSaga(action) {
  const forceLogout = action?.payload?.forceLogout;
  const disconnect = action?.payload?.disconnectwallet;
  const account = action?.payload?.isConnected;
  const navigate = action?.payload?.navigate;
  if (forceLogout) {
    if (account && disconnect) {
      yield disconnect();
    }
    yield localStorage.clear();
    yield sessionStorage.clear();
    yield put(hideCustomModal());
    if (navigate) navigate('/');
    yield put(logoutSuccess());
  } else {
    yield put(logoutStart());
    yield errorHandler({
      endpoint: LOGOUT_URL,
      successHandler: yield function* () {
        yield put(hideCustomModal());
        yield localStorage.removeItem('authToken');
        if (navigate) navigate('/');
        yield put(logoutSuccess());
      },
      failHandler: yield function* (response) {
        yield put(logoutFail(response));
      },
      failHandlerType: 'CUSTOM',
      apiType: 'post'
    });
  }
}

export function* refreshTokenSaga() {
  yield put(refreshTokenStart());
  const refreshToken = yield localStorage.getItem('refreshToken');

  try {
    const response = yield axios.post(REFRESH_TOKEN_URL, { refreshToken });
    if (
      response.status === 200 &&
      response?.data?.data?.freshCustomToken &&
      response.data?.data?.refresh_token
    ) {
      const authToken = response?.data?.data?.freshCustomToken;
      const refreshToken = response?.data?.data?.refresh_token;
      yield localStorage.setItem('authToken', authToken);
      yield localStorage.setItem('refreshToken', refreshToken);
      window.location.reload();
      yield put(refreshTokenSuccess({ authToken, refreshToken }));
    } else {
      yield put(logoutAction({ forceLogout: true }));
      yield put(refreshTokenFail(response));
    }
  } catch (err) {
    yield put(logoutAction({ forceLogout: true }));
    yield put(refreshTokenFail(err));
  }
}

export function* authenticationValidatorSaga() {
  yield put(loginStart());
  const authToken = yield localStorage.getItem('authToken');
  const roleType = yield localStorage.getItem('roleType');
  if (authToken && roleType) {
    yield put(loginSuccess({ authToken, roleType }));
  } else {
    yield put(logoutAction({ forceLogout: true }));
  }
}

// Register Saga
export function* registerSaga(action) {
  yield put(registerStart());
  const { data, dispatch, openLoginModal } = action.payload;
  yield errorHandler({
    endpoint: REGISTER_URL,
    successHandler: yield function* (response) {
      yield put(registerSuccess(response.data));
      yield put(
        showModal({
          message: response.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true,
          handleClick: () => {
            dispatch(hideModal());
            openLoginModal();
          }
        })
      );

      yield setTimeout(() => {
        dispatch(hideModal());
        openLoginModal();
      }, 2000);
    },
    failHandler: registerFail,
    //  TODO: remove emailVerified after register api is fixed.
    payload: { ...data, emailVerified: false },
    apiType: 'post'
  });
}

// forgot-password Saga
export function* forgotPasswordSaga(action) {
  yield put(forgotPasswordStart());
  const { data, dispatch, openLoginModal } = action.payload;
  yield errorHandler({
    endpoint: FORGOT_PASSWORD_URL,
    successHandler: yield function* (response) {
      yield put(forgotPasswordSuccess(response.data));
      yield put(
        showModal({
          message: response.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true,
          handleClick: () => {
            dispatch(hideModal());
            openLoginModal();
          }
        })
      );
      yield setTimeout(() => {
        dispatch(hideModal());
        openLoginModal();
      }, 2000);
    },
    failHandler: yield function* (response) {
      yield put(forgotPasswordFail(response));
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post'
  });
}

// forgot-password Saga
export function* resetPasswordSaga(action) {
  yield put(resetPasswordStart());
  const { data, dispatch, openLoginModal } = action.payload;
  yield errorHandler({
    endpoint: RESET_PASSWORD_URL,
    successHandler: yield function* (response) {
      yield put(resetPasswordSuccess(response.data));
      yield put(
        showModal({
          message: response.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true,
          handleClick: () => {
            dispatch(hideModal());
            openLoginModal();
          }
        })
      );
      yield setTimeout(() => {
        dispatch(hideModal());
        openLoginModal();
      }, 2000);
    },
    failHandler: resetPasswordFail,
    payload: data,
    apiType: 'post'
  });
}
