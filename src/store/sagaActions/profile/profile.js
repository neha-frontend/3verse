import { createAction } from '@reduxjs/toolkit';

export const getCurrentUserProfileAction = createAction('GET_CURRENT_USER_PROFILE_ACTION');
export const getOtherUserProfileAction = createAction('GET_OTHER_USER_PROFILE_ACTION');
export const editUserProfileAction = createAction('EDIT_USER_PROFILE_ACTION');
export const uploadUserProfilePicAction = createAction('UPLOAD_USER_PROFILE_PIC_ACTION');
export const updateAccountSettingAction = createAction('UPDATE_ACCOUNT_SETTING_ACTION');
export const getUserBidsAction = createAction('GET_USER_BIDS_ACTION');
export const whiteListUser = createAction('WHITELIST_USER_ACTION');
export const connectWalletAction = createAction('CONNECT_WALLET_ACTION');
