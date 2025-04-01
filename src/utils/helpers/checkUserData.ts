import { getUserData } from '../api/requests/user/get';
import dbRepositories from '../db/UniHelper';

export const checkUserData = async () => {
  const cacheKey = 'user';
  const userRepo = await dbRepositories.user;

  try {
    const response = await getUserData();

    // if (Math.ceil(response.status / 100) === 5) throw new Error('Network Error');

    await userRepo.set(cacheKey, response.data);
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
      data: { role: 1, name: '', surname: '', email: '', group_name: '' }
    };
  }
};
