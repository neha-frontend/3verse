import { combineReducers } from '@reduxjs/toolkit';

import { currentUserProfileReducer } from './currentUserProfileSlice';
import { otherUserProfileReducer } from './otherUserProfileSlice';
import { userBidsReducer } from './userBidsSlice';
import { whitelistReducer } from './whitelistSlice';

const profileRootReducer = combineReducers({
  currentUserProfile: currentUserProfileReducer,
  otherUserProfile: otherUserProfileReducer,
  userBids: userBidsReducer,
  WhitelistUser: whitelistReducer
});
export default profileRootReducer;
