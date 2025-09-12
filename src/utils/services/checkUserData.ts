import { getUserData } from '../api/requests/user/get';
import { STORE_USER } from '../constants/dbStores';
import { USER_ROLES } from '../constants/userRoles';
import dbRepositories from '../db/UniHelper';

import { AxiosError } from 'axios';

export const checkUserData = async () => {
  const cacheKey = STORE_USER;
  const userRepo = await dbRepositories.user;

  try {
    const response = await getUserData();

    await userRepo.set(cacheKey, { ...response.data, role: USER_ROLES.OFFLINE });
    return { data: response.data };
  } catch (error) {
    const cached = await userRepo.get(cacheKey);

    if (cached) return { data: cached?.data };

    const err = error as AxiosError;

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message
      },
      data: { role: USER_ROLES.OFFLINE, name: '', surname: '', email: '', group_name: '' }
    };
  }
};
