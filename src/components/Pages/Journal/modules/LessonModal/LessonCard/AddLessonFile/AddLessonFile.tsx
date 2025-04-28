import React, { ChangeEvent } from 'react';

import styles from './AddLessonFile.module.css';
import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';
import { QuitLogo } from '@/components/ui/Icons/Quit';
import { Typhography } from '@/components/ui/Typhography';

interface AddLessonFileProps {
  homeworkId: number;
  onClose: () => void;
}

const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const AddLessonFile = ({ onClose }: AddLessonFileProps) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
  };

  const handleDrop = React.useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['modal-container']}>
        <div className={styles['header']}>
          <Typhography tag="h2" variant="secondary" children="Добавить файл" />
          <Button variant="logo" children={<QuitLogo />} onClick={onClose} />
        </div>
        <div className={styles['body']}>
          <label
            htmlFor="file-upload"
            typeof="file"
            className={styles['file-upload-label']}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {files.length === 0 && (
              <Typhography tag="span" variant="thirdy" className={styles['empty']}>
                Выберите файлы
              </Typhography>
            )}

            {files.length > 0 && (
              <ul className={styles['files']}>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
            <input
              multiple={true}
              id="file-upload"
              type="file"
              className={styles['file-input']}
              onChange={uploadFiles}
            />
          </label>
        </div>

        {/* <div className={styles['form-group']}>
          <Input label="Введите название файла" name="file-name" variant="primary" />
        </div> */}

        <div className={styles['footer']}>
          <Button variant="cancel" children={'Отмена'} onClick={onClose} />
          <Button variant="accept" children={'Добавить'} />
        </div>
      </div>
    </div>
  );
};
