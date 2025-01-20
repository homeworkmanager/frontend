import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface TodosState {
  readonly data: User;
}
const initialState: TodosState = {
  data: {
    role: 1,
    name: '',
    surname: '',
    email: '',
    group_name: ''
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
      state.data = {} as User;
    }
  }
});

export const { logIn, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
