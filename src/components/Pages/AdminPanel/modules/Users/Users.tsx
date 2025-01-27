import React from 'react';

import styles from './Users.module.css';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { AdminRole, BaseRole, ModeratorRole } from '@/utils/constants/userRoles';
import { useDropdown } from '@/utils/hooks/useDropdown';
import { useGetAdminUsersQuery } from '@/utils/redux/apiSlices/adminApiSlice/adminApi';
import clsx from 'clsx';

const roles = [
  {
    name: 'Стандарт',
    role: BaseRole
  },
  {
    name: 'Модератор',
    role: ModeratorRole
  },
  {
    name: 'Администратор',
    role: AdminRole
  }
];

export const Users = () => {
  const getAdminUserResponse = useGetAdminUsersQuery(undefined);

  const allUsers = getAdminUserResponse?.data;

  const [users, setUsers] = React.useState<UserOrigin[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState<UserOrigin>();
  const usersList = useDropdown();
  const userRoles = useDropdown();

  const pushUserFIO = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInputValue(userInput);
    const filtered = userInput
      ? getAdminUserResponse.data?.filter((item) =>
          `${item.surname} ${item.name}`.toLowerCase().slice(0, userInput.length).includes(userInput.toLowerCase())
        )
      : allUsers;

    setUsers(filtered ?? []);
    console.log(filtered);

    if (filtered?.length !== 1) {
      return;
    }

    if (filtered?.length > 0 && userInput === `${filtered[0].surname} ${filtered[0]?.name}`) {
      setCurrentUser(filtered[0]);
      return;
    }

    setCurrentUser(undefined);
  };

  const onFioCLick = (user: UserOrigin) => {
    setCurrentUser(user);
    setInputValue(`${user.surname} ${user.name}`);
    setUsers([user]);
    usersList.action.close();
  };

  React.useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  return (
    <div>
      <Typhography tag="h3" variant="primary" children="Роли" className={styles['title']} />
      <div className={styles['users']} ref={usersList.menuRef}>
        <Input
          type="text"
          placeholder="фио"
          variant="primary"
          label="Пользователь"
          name={'role'}
          onChange={(e) => pushUserFIO(e)}
          onClick={usersList.action.open}
          value={inputValue}
        />
        {users.length > 0 && usersList.isOpen && (
          <ul className={styles['users-content']}>
            {users.map((user) => (
              <li key={user.user_id} className={styles['users-item']}>
                <p onClick={() => onFioCLick(user)}>{`${user.surname} ${user.name}`}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {currentUser && (
        <div className={styles['role']} ref={userRoles.menuRef}>
          <header className={styles['role-header']}>
            <Typhography tag="h4" variant="thirdy" children="Роль пользователя:" />
            <p className={clsx(styles['role-name'], styles['active'])}>{roles[currentUser.role - 1].name}</p>
          </header>
          <ul className={styles['role-content']}>
            {roles.map((item) => (
              <p
                key={item.role}
                className={clsx(styles['role-name'], item.role === currentUser.role && styles['active'])}
              >
                {item.name}
              </p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
