import { useDispatch } from 'react-redux';

import { groupApi } from './apiSlices/group';
import { noteApi } from './apiSlices/note';
import { scheduleApi } from './apiSlices/schedule';
import { userApi } from './apiSlices/user';
import { prefix as userPrefix, userReducer } from './storeSlices/user/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  devTools: false,
  reducer: {
    [userPrefix]: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, groupApi.middleware, scheduleApi.middleware, noteApi.middleware)
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
