import React from 'react';
import styles from './KeyRefresh.module.css';
import { Button } from '@/components/ui/Button';
import { CopyLogo } from '@/components/ui/Icons/Copy';
import { Input } from '@/components/ui/Input';
import { RefreshLogo } from '@/components/ui/Icons/Refresh';
import { usePatchModeratorKeyRegenerateMutation } from '@/utils/redux/apiSlices/keyApiSlice/keyApi';

interface KeyRefreshProps {
  currentKey: string;
}

export const KeyRefresh = ({ currentKey }: KeyRefreshProps) => {
  const [key, setKey] = React.useState(currentKey);

  const [patchModeratorKeyRegenerate, patchModeratorKeyRegenerateState] = usePatchModeratorKeyRegenerateMutation();

  const onClickCopyText = () => {
    if (key === '') return;
    navigator.clipboard.writeText(key);
  };

  const onRefresh = async () => {
    const response = await patchModeratorKeyRegenerate({ params: {} });

    if (!response.error) {
      setKey(response.data?.register_key);
    }
  }

  return (
    <div className={styles['content']}>
      <Input
        type="text"
        label={'Ключ'}
        variant={'primary'}
        name={'Ключ'}
        className={styles['group']}
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <div className={styles['buttons']}>
        <Button variant='slide' onClick={onRefresh} disabled={patchModeratorKeyRegenerateState.isLoading}>
          <RefreshLogo className={styles['refresh']} />
        </Button>
        <Button variant="slide" onClick={onClickCopyText}>
          <CopyLogo className={styles['refresh']} />
        </Button>
      </div>
    </div>
  );
};
