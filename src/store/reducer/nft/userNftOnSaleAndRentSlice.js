import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  onSaleNftList: null,
  onRentNftList: null,
  errorMsg: ''
};

const userNftOnSaleAndRentNftSlice = createSlice({
  name: 'userNftOnSaleAndRent',
  initialState,
  reducers: {
    // sale nft
    getNftOnSaleStart: (state, { payload }) => {
      if (payload.isNew) state.isLoading = true;
    },
    getNftOnSaleSuccess: (state, { payload }) => {
      const { data, isNew, page } = payload;
      state.isLoading = false;
      state.errorMsg = '';

      const hasMore =
        data.totalItem !==
        (isNew ? data.list.length : state.onSaleNftList.list.length + data.list.length);
      state.onSaleNftList = isNew
        ? {
            ...payload.data,
            list: payload?.data?.list?.map((item) => ({
              ...item,
              likeCount: item?.itemId?.likedByUserIds?.length ?? 0
            })),
            page: page,
            hasMore
          }
        : {
            list: [
              ...state.onSaleNftList.list,
              ...payload.data.list.map((item) => ({
                ...item,
                likeCount: item?.itemId?.likedByUserIds?.length ?? 0
              }))
            ],
            isMarkAsRead: data.isMarkAsRead,
            totalItem: data.totalItem,
            page: page,
            hasMore
          };
    },
    getNftOnSaleFail: (state, { payload }) => {
      state.isLoading = false;
      state.onSaleNftList = { list: [], totalItem: 0 };
      state.errorMsg = payload;
    },

    likeUnlikeonSaleNFT: (state, { payload }) => {
      state.onSaleNftList = {
        ...state.onSaleNftList,
        list: state.onSaleNftList.list.map((item) => {
          if (item?._id === payload.key) {
            return {
              ...item,
              likeCount: payload.isLiked ? item?.likeCount - 1 : item?.likeCount + 1,
              itemId: {
                ...item?.itemId,
                isLiked: !item?.itemId?.isLiked
              }
            };
          }
          return { ...item };
        })
      };
    },  

    // rent nft
    getNftOnRentStart: (state, { payload }) => {
      if (payload.isNew) state.isLoading = true;
    },
    getNftOnRentSuccess: (state, { payload }) => {
      const { data, isNew, page } = payload;
      state.isLoading = false;
      state.errorMsg = '';

      const hasMore =
        data.totalItem !==
        (isNew ? data.list.length : state.onRentNftList.list.length + data.list.length);
      state.onRentNftList = isNew
        ? {
            ...payload.data,
            list: payload?.data?.list?.map((item) => ({
              ...item,
              likeCount: item?.itemId?.likedByUserIds?.length
            })),
            page: page,
            hasMore
          }
        : {
            list: [
              ...state.onRentNftList.list,
              ...payload.data.list.map((item) => ({
                ...item,
                likeCount: item?.itemId?.likedByUserIds?.length
              }))
            ],
            isMarkAsRead: data.isMarkAsRead,
            totalItem: data.totalItem,
            page: page,
            hasMore
          };
    },
    getNftOnRentFail: (state, { payload }) => {
      state.isLoading = false;
      state.onRentNftList = { list: [], totalItem: 0 };
      state.errorMsg = payload;
    },

    // reset list
    resetNftList: (state) => {
      state.isLoading = false;
      state.onSaleNftList = null;
      state.onRentNftList = null;
      state.errorMsg = '';
    },

    likeUnlikeonRentNFT: (state, { payload }) => {
      state.onRentNftList = {
        ...state.onRentNftList,
        list: state.onRentNftList.list.map((item) => {
          if (item?._id === payload.key) {
            return {
              ...item,
              likeCount: payload.isLiked ? item?.likeCount - 1 : item?.likeCount + 1,
              itemId: {
                ...item?.itemId,
                isLiked: !item?.itemId?.isLiked
              }
            };
          }
          return { ...item };
        })
      };
    }
  }
});

export const {
  getNftOnSaleStart,
  getNftOnSaleSuccess,
  getNftOnSaleFail,
  getNftOnRentStart,
  getNftOnRentSuccess,
  getNftOnRentFail,
  resetNftList,
  likeUnlikeonRentNFT,
  likeUnlikeonSaleNFT
} = userNftOnSaleAndRentNftSlice.actions;

export const userNftOnSaleAndRentNftReducer = userNftOnSaleAndRentNftSlice.reducer;
