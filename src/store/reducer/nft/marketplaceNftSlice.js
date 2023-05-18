import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  nftData: null,
  newNFtDataLoading: false,
  newNftData: null,
  errorMsg: ''
};

const marketplaceNftSlice = createSlice({
  name: 'marketplaceNft',
  initialState,
  reducers: {
    getMarketplaceNftStart: (state, { payload }) => {
      if (payload.isNew) state.isLoading = true;
    },
    getMarketplaceNftSuccess: (state, { payload }) => {
      const { data, isNew, page } = payload;
      state.isLoading = false;
      state.errorMsg = '';

      const hasMore =
        data.totalItem !==
        (isNew ? data.list.length : state.nftData.list.length + data.list.length);
      state.nftData = isNew
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
              ...state.nftData.list,
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
    getMarketplaceNftFail: (state, { payload }) => {
      state.isLoading = false;
      state.nftData = {
        list: [],
        totalItem: 0
      };
      state.errorMsg = payload;
    },
    likeUnlikeMarketplaceNftItem: (state, { payload }) => {
      state.nftData = {
        ...state.nftData,
        list: state.nftData.list.map((item) => {
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
    resetMarketplaceNft: (state) => {
      state.isLoading = false;
      state.nftData = null;
      state.errorMsg = '';
    },

    // new NFT
    getNewNftItemStart: (state) => {
      state.newNFtDataLoading = true;
    },
    getNewNftItemSuccess: (state, { payload }) => {
      state.newNFtDataLoading = false;
      state.errorMsg = '';
      state.newNftData = {
        ...payload,
        list: payload?.list?.map((item) => ({
          ...item,
          likeCount: item?.itemId?.likedByUserIds?.length ?? 0
        }))
      };
    },
    getNewNftItemFail: (state, { payload }) => {
      state.newNFtDataLoading = false;
      state.newNftData = { list: [], totalItem: 0 };
      state.errorMsg = payload;
    },
    likeUnlikeNewNftItem: (state, { payload }) => {
      state.newNftData = {
        ...state.newNftData,
        list: state.newNftData.list.map((item) => {
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

// Action creators are generated for each case reducer function
export const {
  getMarketplaceNftStart,
  getMarketplaceNftSuccess,
  getMarketplaceNftFail,
  likeUnlikeMarketplaceNftItem,
  resetMarketplaceNft,
  getNewNftItemStart,
  getNewNftItemSuccess,
  getNewNftItemFail,
  likeUnlikeNewNftItem
} = marketplaceNftSlice.actions;

export const marketplaceNftReducer = marketplaceNftSlice.reducer;
