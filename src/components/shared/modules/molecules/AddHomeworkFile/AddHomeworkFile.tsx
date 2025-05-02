import React, { ChangeEvent } from 'react';

import styles from './AddHomeworkFile.module.css';
import { Button } from '@/components/ui/Button';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { QuitLogo } from '@/components/ui/Icons/Quit';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { usePostModeratorHomeworkFileMutation } from '@/utils/redux/apiSlices/schedule';

interface AddLessonFileProps {
  homework: RestructHomeworkElement;
  onClose: () => void;
}

const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const AddHomeworkFile = ({ homework, onClose }: AddLessonFileProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [postModeratorHomeworkFile] = usePostModeratorHomeworkFileMutation();

  const deleteFile = (currentFile: File) => {
    setFiles((prev) => [...prev.filter((file) => file.name !== currentFile.name)]);
  };

  const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    if (files.length === 10) return;

    const newFile = Array.from(e.target.files)[0];

    setFiles((prev) => [...prev.filter((file) => file.name !== newFile.name), newFile]);

    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const newFiles = Array.from(e.dataTransfer.files);

    if (files.length + newFiles.length > 10) return;

    setFiles((prev) => [
      ...prev.filter((prevFile) => !newFiles.some((newFile) => newFile.name === prevFile.name)),
      ...newFiles
    ]);
  };

  const addHomeworkFile = async () => {
    const response = await postModeratorHomeworkFile({ params: { homeworkId: homework.homeworkID, files } });

    if (!response.error) {
      // eslint-disable-next-line no-console
      console.log(response.data);
    }
  };

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
              <MultiList className={styles['files']}>
                {files.map((file, index) => (
                  <MultiList.Row key={index}>
                    <MultiList.Column icons={3}>
                      <div className={styles['file-info']}>
                        <p className={styles['disc']} />
                        <Typhography tag="span" variant="thirdy" children={file.name} />
                      </div>
                    </MultiList.Column>
                    <MultiList.Column>
                      <Button
                        variant="logo"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteFile(file);
                        }}
                        children={<DeleteLogo className={styles['delete-icon']} />}
                      />
                    </MultiList.Column>
                  </MultiList.Row>
                ))}
              </MultiList>
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

        <div className={styles['footer']}>
          <Button variant="cancel" children={'Отмена'} onClick={onClose} />
          <Button variant="accept" disabled={files.length === 0} onClick={addHomeworkFile} children={'Добавить'} />
        </div>
      </div>
    </div>
  );
};
