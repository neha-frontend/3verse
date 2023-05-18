import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';
import {
  modalRootReducer,
  authRootReducer,
  fusionRootReducer,
  notificationRootReducer,
  nftRootReducer,
  profileRootReducer
} from './reducer';
import searchRootReducer from './reducer/search';
import newsletterRootReducer from './reducer/newsletter';

// setup saga middleware
const sagaMiddleware = createSagaMiddleware();

// create root reducer
const rootReducer = {
  auth: authRootReducer,
  fusion: fusionRootReducer,
  modal: modalRootReducer,
  profile: profileRootReducer,
  notification: notificationRootReducer,
  nft: nftRootReducer,
  search: searchRootReducer,
  newsletter: newsletterRootReducer
};

// setup store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENV_STATUS !== 'production',
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
