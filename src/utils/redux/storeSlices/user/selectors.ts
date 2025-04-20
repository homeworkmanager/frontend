import { StoreState } from '../../store';

export const getUser = (state: StoreState) => state.user.data;
export const getUserRole = (state: StoreState) => state.user.data.role;

export type UserRole = typeof getUserRole;
export type UserData = typeof getUser;
