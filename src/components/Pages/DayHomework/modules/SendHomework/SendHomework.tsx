import styles from './SendHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';

interface SendHomeworkProps {
  responseState: { isLoading: boolean; isSuccess: boolean; isError: boolean };
  homeworkText: string;
  addHomework: () => Promise<void>;
}
export const SendHomework = ({ responseState, homeworkText, addHomework }: SendHomeworkProps) => {
  return (
    <div className={styles['container']}>
      <Button variant="accept" disabled={responseState.isLoading || !homeworkText} onClick={addHomework}>
        {responseState.isLoading ? <Loader /> : 'Добавить'}
      </Button>
      {responseState.isSuccess && <Typhography tag="p" variant="thirdy" children={'Задание добавлено'} />}
      {responseState.isError && <Typhography tag="p" variant="thirdy" children={'ошибка'} />}
    </div>
  );
};
