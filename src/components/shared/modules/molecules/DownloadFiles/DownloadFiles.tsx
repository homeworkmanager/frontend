import { useSelector } from 'react-redux';

import { DeleteFile } from './DeleteFile/DeleteFile';
import styles from './DonwloadFiles.module.css';
import { Button } from '@/components/ui/Button';
import { QuitLogo } from '@/components/ui/Icons/Quit';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { MODERATOR_ROLE } from '@/utils/constants/userRoles';
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
              <MultiList.Column icons={userRole >= MODERATOR_ROLE ? 1 : 0}>
                <div className={styles['file-name']}>
                  <a href={file.FileURL} className={styles['download']}>
                    {file.FileName}
                  </a>
                </div>
              </MultiList.Column>
              {userRole >= MODERATOR_ROLE && (
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
