import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPages: null,
  totalItem: null,
  unReadCount: null,
  notificationDetail: []
};

const getNotificationSlice = createSlice({
  name: 'getNotification',
  initialState,
  reducers: {
    getNotification: (state, { payload }) => {
      state.totalPages = payload.totalPages;
      state.totalItem = payload.totalItem;
      // state.notificationDetail =
      //   state?.notificationDetail?.length < payload.totalItem
      //     ? [...state.notificationDetail, ...payload.notificationDetail].reduce((res, data) => {
      //         if (res.findIndex((item) => item.createdAt === data.createdAt) < 0) {
      //           res.push(data);
      //         }
      //         return res;
      //       }, [])
      //     : state?.list;
      state.notificationDetail =
        state?.notificationDetail?.length !== 0 && state.unReadCount === payload.unReadCount
          ? [...state.notificationDetail, ...payload.notificationDetail].reduce((res, data) => {
              if (res.findIndex((item) => item.createdAt === data.createdAt) < 0) {
                res.push(data);
              }
              return res;
            }, [])
          : payload.notificationDetail;
      state.unReadCount = payload.unReadCount;
    }
  }
});

export const { getNotification ,resetNotification} = getNotificationSlice.actions;

export const getNotificationReducer = getNotificationSlice.reducer;
