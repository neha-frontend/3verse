import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  registerData: null,
  errorMsg: ''
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    registerSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.registerData = payload;
    },
    registerFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetRegisterErrorMsg: (state) => {
      state.errorMsg = '';
    }
  }
});

// Action creators are generated for each case reducer function
export const { registerStart, registerSuccess, registerFail, resetRegisterErrorMsg } =
  registerSlice.actions;

export const registerReducer = registerSlice.reducer;
