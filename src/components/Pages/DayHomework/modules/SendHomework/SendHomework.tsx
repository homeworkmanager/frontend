import styles from './SendHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';

interface SendHomeworkProps {
  isLoading: boolean;
  isError: boolean;
  homeworkText: string;
  addHomework: () => void;
}

export const SendHomework = ({ isLoading, isError, homeworkText, addHomework }: SendHomeworkProps) => {
  return (
    <div className={styles['container']}>
      <Button variant="accept" disabled={isLoading || !homeworkText} onClick={addHomework}>
        {isLoading ? <Loader /> : 'Добавить'}
      </Button>
      {isError && (
        <Typhography tag="p" variant="thirdy">
          Ошибка
        </Typhography>
      )}
    </div>
  );
};
