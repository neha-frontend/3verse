import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  nftData: null,
  errorMsg: ''
};

const profileNftSlice = createSlice({
  name: 'profileNft',
  initialState,
  reducers: {
    getNftListStart: (state, { payload }) => {
      if (payload.isNew) state.isLoading = true;
    },
    getNftListSuccess: (state, { payload }) => {
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
              likeCount: item?.likedByUserIds?.length ?? 0
            })),
            page: page,
            hasMore
          }
        : {
            list: [
              ...state.nftData.list,
              ...payload.data.list.map((item) => ({
                ...item,
                likeCount: item?.likedByUserIds?.length ?? 0
              }))
            ],
            isMarkAsRead: data.isMarkAsRead,
            totalItem: data.totalItem,
            page: page,
            hasMore
          };
    },
    getNftListFail: (state, { payload }) => {
      state.isLoading = false;
      state.nftData = { list: [], totalItem: 0 };
      state.errorMsg = payload;
    },
    resetNftListFail: (state) => {
      state.isLoading = false;
      state.nftData = null;
      state.errorMsg = '';
    },
    likeUnlikeMyNFT: (state, { payload }) => {
      state.nftData = {
        ...state.nftData,
        list: state.nftData.list.map((item) => {
          if (item?._id === payload.key) {
            return {
              ...item,
              likeCount: payload.isLiked ? item?.likeCount - 1 : item?.likeCount + 1,              
              isLiked: !item?.isLiked
            };
          }
          return { ...item };
        })
      };
    }
  }
});

export const {
  getNftListStart,
  getNftListSuccess,
  getNftListFail,
  resetNftListFail,
  likeUnlikeMyNFT
} = profileNftSlice.actions;

export const profileNftReducer = profileNftSlice.reducer;
