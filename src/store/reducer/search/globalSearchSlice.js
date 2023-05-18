import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  searchData: null,
  errorMsg: ''
};

const globalSearchSlice = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {
    // user bid
    getGlobalSearchDataStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    getGlobalSearchDataSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.searchData = payload;
    },
    getGlobalSearchDataFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetGlobalSearchData: (state) => {
      state.isLoading = false;
      state.searchData = null;
      state.errorMsg = '';
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  getGlobalSearchDataStart,
  getGlobalSearchDataSuccess,
  getGlobalSearchDataFail,
  resetGlobalSearchData
} = globalSearchSlice.actions;

export const globalSearchReducer = globalSearchSlice.reducer;
