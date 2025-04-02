import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  data: User;
}
const initialState: UserState = {
  data: {
    role: 0,
    name: '',
    surname: '',
    email: '',
    group_name: 'ББББ-00-00'
  }
};

export const prefix = 'user';
export const userSlice = createSlice({
  name: prefix,
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<User>) {
      const user = {
        role: action.payload.role,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        group_name: action.payload.group_name
      };

      state.data = user;
    },
    logOut(state) {
      state.data = initialState.data;
    }
  }
});

export const { logIn, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
