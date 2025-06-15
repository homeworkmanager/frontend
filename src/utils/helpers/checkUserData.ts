import { getUserData } from '../api/requests/user/get';
import { STORE_USER } from '../configs/db.config';
import { OFFLINE_ROLE } from '../constants/userRoles';
import dbRepositories from '../db/UniHelper';

export const checkUserData = async () => {
  const cacheKey = STORE_USER;
  const userRepo = await dbRepositories.user;

  try {
    const response = await getUserData();

    await userRepo.set(cacheKey, { ...response.data, role: OFFLINE_ROLE });
    return { data: response.data };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const cached = await userRepo.get(cacheKey);

    if (cached) return { data: cached?.data };

    return {
      error: {
        status: error.response?.status,
        data: error.response.data || error.message
      },
      data: { role: OFFLINE_ROLE, name: '', surname: '', email: '', group_name: '' }
    };
  }
};
