import styles from './SubjectsNote.module.css';
import { Header } from '@/components/shared/Header/Header';
import { HomeworkList } from '@/components/ui/HomeworkList/HomeworkList';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { useGetSubjectsQuery } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';

export const SubjectsNote = () => {
  const getSubjects = useGetSubjectsQuery(undefined);

  return (
    <article className={styles.container}>
      {getSubjects.isLoading && <Loader />}
      {getSubjects.isSuccess && (
        <>
          <Header />
          <div className={styles['content']}>
            <HomeworkList>
              {getSubjects.data.map((subject) => (
                <HomeworkList.Row key={subject.subject_id}>
                  <HomeworkList.Column>
                    <Typhography
                      tag="p"
                      variant="secondary"
                      className={styles['subject']}
                      children={`${subject.subject_id}. ${subject.subject_name}`}
                    />
                  </HomeworkList.Column>
                </HomeworkList.Row>
              ))}
            </HomeworkList>
          </div>
        </>
      )}
    </article>
  );
};
