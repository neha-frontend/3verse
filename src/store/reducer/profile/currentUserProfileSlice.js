import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: null,
  errorMsg: '',
  editProfileLoading: false,
  editProfileErrorMsg: '',
  uploadProfilePicLoading: false,
  editAccountSettingLoading: false,
  uploadProfilePicErrorMsg: ''
};

const currentUserProfileSlice = createSlice({
  name: 'currentUserProfile',
  initialState,
  reducers: {
    getCurrentUserProfileStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    getCurrentUserProfileSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    getCurrentUserProfileFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },

    // edit current user profile
    editUserProfileStart: (state) => {
      state.editProfileLoading = true;
      state.editProfileErrorMsg = '';
    },
    editUserProfileSuccess: (state, { payload }) => {
      state.editProfileLoading = false;
      state.data = payload;
    },
    editUserProfileFail: (state, { payload }) => {
      state.editProfileLoading = false;
      state.editProfileErrorMsg = payload;
    },

    // upload current user profile
    uploadProfilePicStart: (state) => {
      state.uploadProfilePicLoading = true;
      state.uploadProfilePicErrorMsg = '';
    },
    uploadProfilePicSuccess: (state, { payload }) => {
      state.uploadProfilePicLoading = false;
      state.data = payload;
    },
    uploadProfilePicFail: (state, { payload }) => {
      state.uploadProfilePicLoading = false;
      state.uploadProfilePicErrorMsg = payload;
    },

    // connect wallet
    connectWalletStart: (state) => {
      state.connectWalletLoading = true;
      state.connectWalletErrorMsg = '';
    },
    connectWalletSuccess: (state, { payload }) => {
      state.connectWalletLoading = false;
      state.data = payload;
    },
    connectWalletFail: (state, { payload }) => {
      state.connectWalletLoading = false;
      state.connectWalletErrorMsg = payload;
    },

    // account settings
    accountSettingStart: (state, { payload }) => {
      state.editAccountSettingLoading = true;
      if (payload.type === 'notificationSetting')
        state.data = { ...state.data, notificationSetting: { ...payload?.data } };
      else if (payload.type === 'privacySettings')
        state.data = { ...state.data, privacySettings: { ...payload?.data } };
      state.errorMsg = '';
    },
    accountSettingSuccess: (state) => {
      state.editAccountSettingLoading = false;
    },
    accountSettingFail: (state, { payload }) => {
      state.editAccountSettingLoading = false;
      state.data = { ...state.data, notificationSetting: { ...payload } };
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  getCurrentUserProfileStart,
  getCurrentUserProfileSuccess,
  getCurrentUserProfileFail,
  editUserProfileStart,
  editUserProfileSuccess,
  editUserProfileFail,
  uploadProfilePicStart,
  uploadProfilePicSuccess,
  uploadProfilePicFail,
  connectWalletStart,
  connectWalletSuccess,
  connectWalletFail,
  accountSettingStart,
  accountSettingSuccess,
  accountSettingFail
} = currentUserProfileSlice.actions;

export const currentUserProfileReducer = currentUserProfileSlice.reducer;
