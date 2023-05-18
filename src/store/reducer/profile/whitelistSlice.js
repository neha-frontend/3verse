import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  status: null,
  errorMsg: ''
};

const whitelistSlice = createSlice({
  name: 'whitelist',
  initialState,
  reducers: {
    // user bid
    whitelistuserStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    whitelistuserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },
    whitelistuserFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { whitelistuserStart, whitelistuserSuccess, whitelistuserFail } =
  whitelistSlice.actions;

export const whitelistReducer = whitelistSlice.reducer;
