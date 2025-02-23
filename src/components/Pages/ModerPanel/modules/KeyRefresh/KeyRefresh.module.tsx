import React from 'react';

interface KeyRefreshProps {
  currentKey: string;
}

import styles from './KeyRefresh.module.css';
import { Button } from '@/components/ui/Button';
import { CopyLogo } from '@/components/ui/Icons/Copy';
import { Input } from '@/components/ui/Input';
import { RefreshLogo } from '@/components/ui/Icons/Refresh';
import { getModeratorKeyRegenerate } from '@/utils/api/requests/moderator/key/regenerate';

export const KeyRefresh = ({ currentKey }: KeyRefreshProps) => {
  const [key, setKey] = React.useState(currentKey);

  const onClickCopyText = () => {
    if (key === '') return;
    navigator.clipboard.writeText(key);
    setKey('');
  };

  const onRefresh = async () => { //ждём фикс ручки 
    try {
      const response = await getModeratorKeyRegenerate();
      setKey(response.data.register_key);
    } catch (error) {
      console.log(error);
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
      <Button variant='slide' onClick={onRefresh}>
        <RefreshLogo className={styles['refresh']} />
      </Button>
      <Button variant="slide" onClick={onClickCopyText}>
        <CopyLogo className={styles['refresh']} />
      </Button>
    </div>
  );
};
