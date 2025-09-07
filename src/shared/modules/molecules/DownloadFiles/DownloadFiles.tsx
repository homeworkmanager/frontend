import { useSelector } from 'react-redux';

import { DeleteFile } from './DeleteFile/DeleteFile';
import styles from './DonwloadFiles.module.css';
import { QuitLogo } from '@/shared/Icons/Quit';
import { Button } from '@/shared/ui/Button';
import { MultiList } from '@/shared/ui/MultiList';
import { Typhography } from '@/shared/ui/Typhography';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { getUserRole } from '@/utils/redux/storeSlices/user/selectors';

interface DownloadFilesProps {
  files: FileElem[];
  deleteHomeworkFile: (file: FileElem) => void;
  onClose: () => void;
}

export const DownloadFiles = ({ files, deleteHomeworkFile, onClose }: DownloadFilesProps) => {
  const userRole = useSelector(getUserRole);

  return (
    <div className={styles['env']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <Typhography tag="h2" variant="secondary" children="Файлы" />
          <Button variant="logo" children={<QuitLogo />} onClick={onClose} />
        </div>
        <MultiList>
          {files.map((file) => (
            <MultiList.Row key={file.FileID}>
              <MultiList.Column icons={userRole >= USER_ROLES.MODERATOR ? 1 : 0}>
                <div className={styles['file-name']}>
                  <a href={file.FileURL} className={styles['download']}>
                    {file.FileName}
                  </a>
                </div>
              </MultiList.Column>
              {userRole >= USER_ROLES.MODERATOR && (
                <MultiList.Column>
                  <DeleteFile file={file} deleteHomeworkFile={deleteHomeworkFile} />
                </MultiList.Column>
              )}
            </MultiList.Row>
          ))}
        </MultiList>
      </div>
    </div>
  );
};
