import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: null,
  errorMsg: ''
};

const otherUserProfileSlice = createSlice({
  name: 'otherUserProfile',
  initialState,
  reducers: {
    getOtherUserProfileStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    getOtherUserProfileSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    getOtherUserProfileFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    updateOtherUserProfile: (state, { payload }) => {
      state.data = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  getOtherUserProfileStart,
  getOtherUserProfileSuccess,
  getOtherUserProfileFail,
  updateOtherUserProfile
} = otherUserProfileSlice.actions;

export const otherUserProfileReducer = otherUserProfileSlice.reducer;
