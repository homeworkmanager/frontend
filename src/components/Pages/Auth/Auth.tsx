import styles from './Auth.module.css';
import { useAuthView } from './hooks/useAuthView';
import { Button } from '@/components/ui/Button';
import { QuitLogo } from '@/components/ui/Icons/Quit';
import { UniHelperLogo } from '@/components/ui/Icons/UniHelper';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Typhography } from '@/components/ui/Typhography';
import { useDropdown } from '@/utils/hooks/useDropdown';
import { AnimatePresence, motion } from 'framer-motion';

export const Auth = () => {
  const { form, stage, groups, func, state } = useAuthView();
  const { menuRef, isOpen, action } = useDropdown();

  const acceptButtonText = {
    profile: 'Далее',
    register: 'Зарегистрироваться',
    login: 'Войти'
  };

  const stageButtonText = stage === 'login' ? ' Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти';

  type groupType = CurrentGroup;

  const chooseGroup = (currentGroup: groupType) => {
    form.setFieldValue('groupName', currentGroup.name);
    action.close();
  };

  const getGroups = () => {
    func.getAllGroupsTrigger(undefined, true);
    action.toggle();
  };

  return (
    <article className={styles.container}>
      <UniHelperLogo className={styles.logo} />
      <form onSubmit={form.handleSubmit} className={styles.form}>
        {(stage === 'profile' || stage === 'register') && (
          <>
            <Input
              name="name"
              label="Имя"
              type="text"
              variant="primary"
              autoComplete="name"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.name}
              {...(form.touched.name && {
                error: form.errors.name
              })}
            />
            <Input
              name="surname"
              label="Фамилия"
              type="text"
              variant="primary"
              autoComplete="family-name"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.surname}
              {...(form.touched.surname && {
                error: form.errors.surname
              })}
            />
            <div style={{ position: 'relative' }} ref={menuRef}>
              <Input
                name="group_Id"
                label="Группа"
                type="text"
                variant="primary"
                autoComplete="off"
                readOnly={true}
                onClick={getGroups}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.groupName}
                {...(form.touched.groupName && {
                  error: form.errors.groupName
                })}
              />
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={styles['group-list']}
                  >
                    {groups?.map((group) => (
                      <li className={styles['group-name']} key={group.group_id} onClick={() => chooseGroup(group)}>
                        {group.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        <Input
          name="email"
          label="Почта"
          type="text"
          variant="primary"
          autoComplete="email"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
          {...(form.touched.email && { error: form.errors.email })}
        />
        <Input
          name="password"
          label="Пароль"
          type="password"
          variant="primary"
          autoComplete="current-password"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.password}
          {...(form.touched.password && { error: form.errors.password })}
        />

        <Modal showInfo={stage === 'register'} showDetails={() => func.changeStage('profile')}>
          <form onSubmit={form.handleSubmit} className={styles['modal-key']}>
            <header className={styles['modal-header']}>
              <Button variant="logo" type="button" onClick={() => func.changeStage('profile')}>
                <QuitLogo />
              </Button>
            </header>
            <Input
              name="registerKey"
              label="Ключ"
              type="text"
              variant="primary"
              autoComplete="off"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.registerKey}
              {...(form.touched.registerKey && { error: form.errors.registerKey })}
            />
            <Button
              type="submit"
              variant="accept"
              className={styles['submit']}
              disabled={state.isLoading}
              children={state.isLoading ? <Loader /> : acceptButtonText[stage]}
            />
          </form>
        </Modal>

        {state.isError && (
          <Typhography
            tag="h1"
            variant="secondary"
            className={styles['error']}
            children={'Ошибка, повторите попытку позже!'}
          />
        )}
        {stage !== 'register' && (
          <Button
            type="submit"
            variant="accept"
            className={styles['submit']}
            disabled={state.isLoading}
            children={state.isLoading ? <Loader /> : acceptButtonText[stage]}
          />
        )}
        <Button
          type="reset"
          variant="question"
          onClick={() => func.changeStage(stage === 'login' ? 'profile' : 'login')}
          children={stageButtonText}
        />
      </form>
    </article>
  );
};
