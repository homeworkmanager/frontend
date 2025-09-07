import React, { useRef } from 'react';

import styles from './Users.module.css';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Typhography } from '@/shared/ui/Typhography';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { useDropdown } from '@/utils/hooks/useDropdown';
import { useGetAdminUsersQuery, usePatchAdminRoleMutation } from '@/utils/redux/apiSlices/user/userApi';
import clsx from 'clsx';

const roles = [
  {
    name: 'Стандарт',
    role: USER_ROLES.BASE
  },
  {
    name: 'Модератор',
    role: USER_ROLES.MODERATOR
  },
  {
    name: 'Администратор',
    role: USER_ROLES.ADMIN
  }
];

export const Users = () => {
  const getAdminUserResponse = useGetAdminUsersQuery(undefined);

  const [patchAdminRole] = usePatchAdminRoleMutation();

  const allUsers = React.useMemo(() => getAdminUserResponse.data ?? [], [getAdminUserResponse.data]);

  const [initialUsers, setInitialUsers] = React.useState<UserOrigin[]>(allUsers);
  const [users, setUsers] = React.useState<UserOrigin[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState<UserOrigin>({} as UserOrigin);
  const currentUserRole = useRef(1);
  const usersList = useDropdown();

  const pushUserFIO = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInputValue(userInput);
    const filtered = initialUsers.filter((item) =>
      `${item.surname} ${item.name}`.toLowerCase().slice(0, userInput.length).includes(userInput.toLowerCase())
    );

    setUsers(filtered);

    if (filtered.length === 1 && userInput === `${filtered[0].surname} ${filtered[0].name}`) {
      setCurrentUser(filtered[0]);
      currentUserRole.current = filtered[0].role;
      return;
    }
    setCurrentUser({} as UserOrigin);
  };

  const onFioCLick = (user: UserOrigin) => {
    currentUserRole.current = user.role;
    setCurrentUser(user);
    setInputValue(`${user.surname} ${user.name}`);
    setUsers([user]);
    usersList.action.close();
  };

  const onRoleClick = async () => {
    const response = await patchAdminRole({
      params: {
        user_id: currentUser.user_id,
        role: currentUser.role
      }
    });

    if (!response.error) {
      currentUserRole.current = currentUser.role;
      setInitialUsers((prev) =>
        prev.map((user) => {
          if (user.user_id === currentUser.user_id) return { ...user, role: currentUser.role };
          return user;
        })
      );
    }
  };

  React.useEffect(() => {
    if (allUsers.length > 0 && !inputValue) {
      setUsers(allUsers);
      setInitialUsers(allUsers);
    }
  }, [allUsers, inputValue]);

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
      {currentUser.name && (
        <div className={styles['role']}>
          <Button
            type="button"
            variant="accept"
            disabled={currentUser.role === currentUserRole.current}
            onClick={onRoleClick}
            children="Выбрать роль"
          />
          <ul className={styles['role-content']}>
            {roles.map((item) => (
              <p
                key={item.role}
                className={clsx(styles['role-name'], item.role === currentUser.role && styles['active'])}
                onClick={() => setCurrentUser((prev) => ({ ...prev, role: item.role }))}
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
