import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  FreshMintedData: null,
  errorMsg: ''
};

const FreshMintedNFTSlice = createSlice({
  name: 'newNftItem',
  initialState,
  reducers: {
    getFreshmintedStart: (state) => {
      state.isLoading = true;
    },
    getFreshmintedSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = '';
      state.FreshMintedData = payload;
    },
    getFreshmintedFail: (state, { payload }) => {
      state.isLoading = false;
      state.FreshMintedData = { list: [], totalItem: 0 };
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getFreshmintedStart, getFreshmintedSuccess, getFreshmintedFail } =
  FreshMintedNFTSlice.actions;

export const FreshMintedNFTReducer = FreshMintedNFTSlice.reducer;
