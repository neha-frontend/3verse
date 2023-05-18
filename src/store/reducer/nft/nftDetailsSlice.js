import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  nftData: null,
  tradingHistory: null,
  tradingHistoryLoader: false,
  cadetOverview: null,
  cadetOverviewLoader: false,
  likeUnlikeNftLoading: false,
  likeUnlikeNftError: '',
  errorMsg: ''
};

const nftDetailsSlice = createSlice({
  name: 'nftDetails',
  initialState,
  reducers: {
    getNftDetailsStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    getNftDetailsSuccess: (state, { payload }) => {
      state.errorMsg = '';
      state.isLoading = false;
      state.nftData = payload;
    },
    getNftDetailsFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },

    // like/unlike nft
    likeUnlikeNftStart: (state) => {
      state.likeUnlikeNftLoading = true;
      state.likeUnlikeNftError = '';
    },
    likeUnlikeNftSuccess: (state) => {
      state.likeUnlikeNftError = '';
      state.likeUnlikeNftLoading = false;
    },
    likeUnlikeNftFail: (state, { payload }) => {
      state.likeUnlikeNftLoading = false;
      state.likeUnlikeNftError = payload;
    },

    //trading History

    getNftTradingHistoryStart: (state, { payload }) => {
      if (payload.isNew) state.tradingHistoryLoader = true;
      state.errorMsg = '';
    },
    getNftTradingHistorySuccess: (state, { payload }) => {
      const { data, isNew, page } = payload;
      state.tradingHistoryLoader = false;
      state.errorMsg = '';
      const hasMore =
        data.totalItem !==
        (isNew ? data.list.length : state.tradingHistory.list.length + data.list.length);
      state.tradingHistory = isNew
        ? { ...data, page: page, hasMore }
        : {
            list: [...state.tradingHistory.list, ...data.list],
            isMarkAsRead: data.isMarkAsRead,
            totalItem: data.totalItem,
            page: page,
            hasMore
          };
    },
    getNftTradingHistoryFail: (state, { payload }) => {
      state.tradingHistoryLoader = false;
      state.errorMsg = payload;
    },
    getCadetOverviewStart: (state, { payload }) => {
      if (payload.isNew) state.cadetOverviewLoader = true;
      state.errorMsg = '';
    },
    getCadetOverviewSuccess: (state, { payload }) => {
      const { data, isNew, page } = payload;
      state.cadetOverviewLoader = false;
      state.errorMsg = '';
      const hasMore =
        data.totalItem !==
        (isNew ? data.list.length : state.cadetOverview.list.length + data.list.length);
      state.cadetOverview = isNew
        ? { ...data, page: page, hasMore }
        : {
            list: [...state.cadetOverview.list, ...data.list],
            totalItem: data.totalItem,
            page: page,
            hasMore
          };
    },
    getCadetOverviewFail: (state, { payload }) => {
      state.cadetOverviewLoader = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  getNftDetailsStart,
  getNftDetailsSuccess,
  getNftDetailsFail,
  likeUnlikeNftStart,
  likeUnlikeNftSuccess,
  likeUnlikeNftFail,
  getNftTradingHistoryStart,
  getNftTradingHistorySuccess,
  getNftTradingHistoryFail,
  getCadetOverviewStart,
  getCadetOverviewSuccess,
  getCadetOverviewFail
} = nftDetailsSlice.actions;

export const nftDetailsReducer = nftDetailsSlice.reducer;
