import { put } from 'redux-saga/effects';

import { GLOBAL_SEARCH_URL } from '../../../apis';
import { errorHandler } from '../../../utils';
import {
  getGlobalSearchDataFail,
  getGlobalSearchDataStart,
  getGlobalSearchDataSuccess
} from '../../sagaActions';

// get global search data Saga
export function* getGlobalSearchDataSaga(action) {
  yield put(getGlobalSearchDataStart());
  const { URL = '' } = action.payload;
  yield errorHandler({
    endpoint: `${GLOBAL_SEARCH_URL}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getGlobalSearchDataSuccess(response.data));
    },
    failHandler: getGlobalSearchDataFail,
    apiType: 'get'
  });
}
