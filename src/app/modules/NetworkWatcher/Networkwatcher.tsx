import { useNetworkStatusState } from '@/utils/hooks/useNetworkStatus';

export const NetworkWatcher = () => {
  const isOnline = useNetworkStatusState();
  // eslint-disable-next-line no-console
  console.log(isOnline);

  return null;
};
