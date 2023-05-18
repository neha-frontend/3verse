import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  currentBidsList: null,
  errorMsg: ''
};

const userBidsSlice = createSlice({
  name: 'userBids',
  initialState,
  reducers: {
    // user bid
    getUserBidsStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    getUserBidsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.currentBidsList = payload;
    },
    getUserBidsFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getUserBidsStart, getUserBidsSuccess, getUserBidsFail } = userBidsSlice.actions;

export const userBidsReducer = userBidsSlice.reducer;
