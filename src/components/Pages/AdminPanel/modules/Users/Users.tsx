import React from 'react';

import styles from './Users.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { AdminRole, BaseRole, ModeratorRole } from '@/utils/constants/userRoles';
import { useDropdown } from '@/utils/hooks/useDropdown';
import { useGetAdminUsersQuery, usePatchAdminRoleMutation } from '@/utils/redux/apiSlices/adminApiSlice/adminApi';
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

  const [patchAdminRole] = usePatchAdminRoleMutation();

  const allUsers = React.useMemo(() => getAdminUserResponse.data ?? [], [getAdminUserResponse.data]);

  const [initialUsers, setInitialUsers] = React.useState<UserOrigin[]>(allUsers);
  const [users, setUsers] = React.useState<UserOrigin[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState<UserOrigin>();
  const usersList = useDropdown();
  const userRoles = useDropdown();

  const pushUserFIO = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInputValue(userInput);
    const filtered = initialUsers.filter((item) =>
      `${item.surname} ${item.name}`.toLowerCase().slice(0, userInput.length).includes(userInput.toLowerCase())
    );

    setUsers(filtered);

    if (filtered.length === 1 && userInput === `${filtered[0].surname} ${filtered[0].name}`) {
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

  const toggleUserRoles = () => {
    userRoles.action.toggle();
  };

  const onRoleClick = async (role: number) => {
    console.log(role);
    const response = await patchAdminRole({
      params: {
        user_id: currentUser?.user_id || 0,
        role: role
      }
    });

    if (!response.error) {
      setInitialUsers((prev) =>
        prev.map((user) => {
          if (user.user_id === currentUser?.user_id) return { ...user, role };
          return user;
        })
      );
      setCurrentUser((prev) => ({ ...prev, role: role }) as UserOrigin);
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
      {currentUser && (
        <div className={styles['role']} ref={userRoles.menuRef}>
          <Button type="button" variant="accept" onClick={toggleUserRoles} children="Выбрать роль" />
          {userRoles.isOpen && (
            <ul className={styles['role-content']}>
              {roles.map((item) => (
                <p
                  key={item.role}
                  className={clsx(styles['role-name'], item.role === currentUser.role && styles['active'])}
                  onClick={() => onRoleClick(item.role)}
                >
                  {item.name}
                </p>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
