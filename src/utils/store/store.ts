import { useDispatch } from 'react-redux';

import { middlewareSlice } from './middleware';
import { prefix as userPrefix, userReducer } from './slices/user/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  devTools: false,
  reducer: {
    [userPrefix]: userReducer,
    [middlewareSlice.reducerPath]: middlewareSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareSlice.middleware)
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
