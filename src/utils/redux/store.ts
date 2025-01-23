import { useDispatch } from 'react-redux';

import { adminApi } from './apiSlices/adminApiSlice/adminApi';
import { groupApi } from './apiSlices/groupApiSlice/groupApi';
import { scheduleApi } from './apiSlices/scheduleApiSlice/scheduleApi';
import { userApi } from './apiSlices/userApiSlice/userApi';
import { prefix as userPrefix, userReducer } from './storeSlices/userSlice/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [userPrefix]: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, groupApi.middleware, adminApi.middleware, scheduleApi.middleware)
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
