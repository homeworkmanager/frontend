import styles from './DeleteFile.module.css';
import { Button } from '@/components/ui/Button';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Loader } from '@/components/ui/Loader';
import { useDeleteModeratorFileMutation } from '@/utils/redux/apiSlices/schedule';

interface DeleteFileProps {
  file: FileElem;
  deleteHomeworkFile: (file: FileElem) => void;
}

export const DeleteFile = ({ file, deleteHomeworkFile }: DeleteFileProps) => {
  const [deleteModeratorFile, deleteModeratorFileState] = useDeleteModeratorFileMutation();

  const deleteFile = async (file: FileElem) => {
    const response = await deleteModeratorFile({ params: { fileID: file.FileID } });

    if (!response.error) {
      deleteHomeworkFile(file);
    }
  };

  return (
    <Button
      variant="logo"
      onClick={() => deleteFile(file)}
      children={
        deleteModeratorFileState.isLoading || deleteModeratorFileState.isSuccess ? (
          <Loader spinnerSize={28} className={styles['loader']} />
        ) : (
          <DeleteLogo className={styles['delete-icon']} />
        )
      }
    />
  );
};
