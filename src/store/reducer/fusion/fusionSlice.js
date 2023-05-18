import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  selectedPFPnft: null,
  selectedMech: null,
  errorMsg: '',
  pfpnft: [],
  fuseImage: '',
  fuseUrl: '',
  metadata: ''
};

const fusionSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setSelectPFPnft: (state, { payload }) => {
      state.selectedPFPnft = payload;
    },
    setSelectMech: (state, { payload }) => {
      state.selectedMech = payload;
    },
    resetSelectedPFPnft: (state) => {
      state.selectedPFPnft = null;
    },
    resetSelectedMech: (state) => {
      state.selectedMech = null;
    },
    getPFPnftstart: (state) => {
      state.isLoading = true;
    },
    getPFPnftsuccess: (state, action) => {
      state.pfpnft = action.payload;
      state.isLoading = false;
    },
    getPFPnftfail: (state) => {
      state.isLoading = false;
    },
    setFuseUrl: (state, action) => {
      state.isLoading = false;
      state.fuseUrl = action.payload.url;
      state.fuseImage = action.payload.fuseFile;
    },
    setFuseStart: (state) => {
      state.isLoading = true;
    },
    putNftMetadataStart: (state) => {
      state.isLoading = true;
    },
    putNftMetadataSuccess: (state, action) => {
      state.metadata = action.payload;
      state.isLoading = false;
    },
    putNftMetadataFail: (state) => {
      state.isLoading = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setSelectPFPnft,
  setSelectMech,
  resetSelectedPFPnft,
  resetSelectedMech,
  setFuseImage,
  getPFPnftstart,
  getPFPnftsuccess,
  setFuseStart,
  getPFPnftfail,
  setFuseUrl,
  putNftMetadataStart,
  putNftMetadataSuccess,
  putNftMetadataFail
} = fusionSlice.actions;

export const fusionReducer = fusionSlice.reducer;
