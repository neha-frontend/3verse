import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: null,
  errorMsg: ''
};

const newsletterSlice = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {
   
    newsletterStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    newsletterSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    newsletterFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },   
  }
});

// Action creators are generated for each case reducer function
export const {
  newsletterStart,
  newsletterSuccess,
  newsletterFail,  
} = newsletterSlice.actions;

export const newsletterReducer = newsletterSlice.reducer;
