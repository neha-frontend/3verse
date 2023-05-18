import { put } from 'redux-saga/effects';
import { NEWSLETTER } from '../../../apis';

import { errorHandler } from '../../../utils';
import {
  newsletterFail,
  newsletterStart,
  newsletterSuccess
} from '../../reducer/newsletter/newsletterSlice';
import { showModal } from '../../sagaActions';

export function* newsletterSaga(action) {
  yield put(newsletterStart());
  const { data } = action.payload;
  yield errorHandler({
    endpoint: NEWSLETTER,
    successHandler: yield function* (response) {
      yield put(newsletterSuccess(response.data));
      yield put(
        showModal({
          message: response?.msg,
          notifyType: 1,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );      
    },
    failHandler: yield function* (response) {
      yield put(newsletterFail(response));
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
    apiType: 'post'
  });
}
