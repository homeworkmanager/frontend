import styles from './AddGroupForm.module.css';
import { useAdminForm } from './hooks/useAdminForm';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { Typhography } from '@/shared/ui/Typhography';

export const AddGroupForm = () => {
  const { form, state } = useAdminForm();

  return (
    <form onSubmit={form.handleSubmit}>
      <Typhography tag="h3" variant="primary" children="Добавление групп" className={styles['title']} />
      <Input
        type="text"
        placeholder="название"
        label={'Группа'}
        variant={'primary'}
        name={'adminGroup'}
        className={styles['group']}
        value={form.values.adminGroup.replace(' ', '').toUpperCase()}
        onChange={form.handleChange}
        {...(form.errors.adminGroup && { error: form.errors.adminGroup })}
      />
      <Input
        type="text"
        maxLength={1}
        placeholder="курс"
        label={'Курс'}
        variant={'primary'}
        name={'adminCourse'}
        className={styles['group']}
        value={form.values.adminCourse.replace(' ', '').replace(/\D/g, '')}
        onChange={form.handleChange}
        {...(form.errors.adminCourse && { error: form.errors.adminGroup })}
      />
      <Input
        type="text"
        placeholder="ссылка"
        label={'Ссылка на ical'}
        variant={'primary'}
        name={'adminIcal'}
        className={styles['ical']}
        value={form.values.adminIcal.replace(' ', '').replace('webcal', 'http')}
        onChange={form.handleChange}
        {...(form.errors.adminIcal && { error: form.errors.adminIcal })}
      />
      <Button
        variant="accept"
        type="submit"
        disabled={state.isLoading}
        children={state.isLoading ? <Loader /> : 'Добавить группу'}
      />
      {state.isError && <p className={styles['error']}>Произошла ошибка</p>}
    </form>
  );
};
