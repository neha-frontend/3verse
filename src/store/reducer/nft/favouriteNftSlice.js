import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  favouriteNftData: null,
  errorMsg: ''
};

const favouriteNftSlice = createSlice({
  name: 'favouriteNft',
  initialState,
  reducers: {
    getFavouriteNftStart: (state, { payload }) => {
      if (payload.isNew) state.isLoading = true;
    },
    getFavouriteNftSuccess: (state, { payload }) => {
      const { data, isNew, page } = payload;
      state.isLoading = false;
      state.errorMsg = '';

      const hasMore =
        data.totalItem !==
        (isNew ? data.list.length : state.favouriteNftData.list.length + data.list.length);
      state.favouriteNftData = isNew
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
              ...state.favouriteNftData.list,
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
    getFavouriteNftFail: (state, { payload }) => {
      state.isLoading = false;
      state.favouriteNftData = {
        list: [],
        totalItem: 0
      };
      state.errorMsg = payload;
    },
    resetFavouriteNft: (state) => {
      state.isLoading = false;
      state.favouriteNftData = null;
      state.errorMsg = '';
    },
    likeUnlikeMyFavouriteNFT: (state, { payload }) => {
      state.favouriteNftData = {
        ...state.favouriteNftData,
        list: state.favouriteNftData.list.map((item) => {
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

// Action creators are generated for each case reducer function
export const {
  getFavouriteNftStart,
  getFavouriteNftSuccess,
  getFavouriteNftFail,
  resetFavouriteNft,
  likeUnlikeMyFavouriteNFT
} = favouriteNftSlice.actions;

export const favouriteNftReducer = favouriteNftSlice.reducer;
