import React from 'react';

import styles from './KeyRefresh.module.css';
import { Button } from '@/components/ui/Button';
import { CopyLogo } from '@/components/ui/Icons/Copy';
import { RefreshLogo } from '@/components/ui/Icons/Refresh';
import { Input } from '@/components/ui/Input';
import { usePatchModeratorKeyRegenerateMutation } from '@/utils/redux/apiSlices/group/groupApi';

interface KeyRefreshProps {
  currentKey: string;
  groupId?: number;
  hideLabel?: boolean;
}

export const KeyRefresh = ({ currentKey, groupId = -1, hideLabel = false }: KeyRefreshProps) => {
  const [key, setKey] = React.useState(currentKey);

  const [patchModeratorKeyRegenerate, patchModeratorKeyRegenerateState] = usePatchModeratorKeyRegenerateMutation();

  const onClickCopyText = () => {
    if (key === '') return;
    navigator.clipboard.writeText(key);
  };

  const onRefresh = async () => {
    const response = await patchModeratorKeyRegenerate({ params: { group_id: groupId } });

    if (!response.error) {
      setKey(response.data?.register_key);
    }
  };

  return (
    <div className={styles['content']}>
      <Input
        id={groupId.toString()}
        type="text"
        label={'Ключ'}
        variant={'primary'}
        name={'Ключ'}
        className={styles['group']}
        value={key}
        custom={hideLabel}
        onChange={(e) => setKey(e.target.value)}
      />
      <div className={styles['buttons']}>
        <Button variant="logo" onClick={onRefresh} disabled={patchModeratorKeyRegenerateState.isLoading}>
          <RefreshLogo className={styles['refresh']} />
        </Button>
        <Button variant="logo" onClick={onClickCopyText}>
          <CopyLogo className={styles['refresh']} />
        </Button>
      </div>
    </div>
  );
};
