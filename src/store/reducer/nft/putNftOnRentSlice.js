import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: null,
  errorMsg: ''
};

const putNftOnRentSlice = createSlice({
  name: 'putNftOnRent',
  initialState,
  reducers: {
    putNftOnRentStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    putNftOnRentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    putNftOnRentFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    removeNftFromRentStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    removeNftFromRentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    removeNftFromRentFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    disconnectNftFromRentStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    disconnectNftFromRentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    disconnectNftFromRentFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    buyNftFromRentStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    buyNftFromRentSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    buyNftFromRentFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  putNftOnRentStart,
  putNftOnRentSuccess,
  putNftOnRentFail,
  removeNftFromRentStart,
  removeNftFromRentSuccess,
  removeNftFromRentFail,
  disconnectNftFromRentStart,
  disconnectNftFromRentSuccess,
  disconnectNftFromRentFail,
  buyNftFromRentStart,
  buyNftFromRentSuccess,
  buyNftFromRentFail
} = putNftOnRentSlice.actions;

export const putNftOnRentReducer = putNftOnRentSlice.reducer;
