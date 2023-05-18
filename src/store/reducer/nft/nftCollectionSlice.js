import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  collectionData: null,
  errorMsg: ''
};

const nftCollectionSlice = createSlice({
  name: 'nftCollection',
  initialState,
  reducers: {
    getCollectionStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    getCollectionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.collectionData = payload;
    },
    getCollectionFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
      state.collectionData = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const { getCollectionStart, getCollectionSuccess, getCollectionFail } =
  nftCollectionSlice.actions;

export const nftCollectionReducer = nftCollectionSlice.reducer;
