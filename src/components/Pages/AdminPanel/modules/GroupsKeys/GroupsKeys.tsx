import { useGetAdminGroupsQuery } from '@/utils/redux/apiSlices/groupApiSlice/groupApi';
import styles from './GroupsKeys.module.css';
import { KeyRefresh } from '@/components/shared/modules/KeyRefresh/KeyRefresh.module';
import { Typhography } from '@/components/ui/Typhography';

// const test = [
//   {
//     "group_id": 1,
//     "group_name": "БСБО-01-23",
//     "course": 1,
//     "ical_link": "http://english.mirea.ru/schedule/api/ical/1/698",
//     "register_key": "sadadasdas"
//   },
//   {
//     "group_id": 2,
//     "group_name": "БСБО-01-23",
//     "course": 1,
//     "ical_link": "http://english.mirea.ru/schedule/api/ical/1/698",
//     "register_key": "sadadasdas"
//   },
//   {
//     "group_id": 3,
//     "group_name": "БСБО-01-23",
//     "course": 1,
//     "ical_link": "http://english.mirea.ru/schedule/api/ical/1/698",
//     "register_key": "sadadasdas"
//   },
//   {
//     "group_id": 4,
//     "group_name": "БСБО-01-23",
//     "course": 1,
//     "ical_link": "http://english.mirea.ru/schedule/api/ical/1/698",
//     "register_key": "sadadasdas"
//   },
//   {
//     "group_id": 5,
//     "group_name": "БСБО-01-23",
//     "course": 1,
//     "ical_link": "http://english.mirea.ru/schedule/api/ical/1/698",
//     "register_key": "sadadasdas"
//   },
//   {
//     "group_id": 6,
//     "group_name": "БСБО-01-23",
//     "course": 1,
//     "ical_link": "http://english.mirea.ru/schedule/api/ical/1/698",
//     "register_key": "sadadasdas"
//   },
//   {
//     "group_id": 7,
//     "group_name": "БСБО-01-23",
//     "course": 1,
//     "ical_link": "http://english.mirea.ru/schedule/api/ical/1/698",
//     "register_key": "sadadasdas"
//   },
// ];

export const GroupsKeys = () => {
  const getAdminGroupsResponse = useGetAdminGroupsQuery(undefined);

  return <ul className={styles['keys']}>
    {getAdminGroupsResponse.data?.map((group) =>
      <li key={group.group_id} className={styles['group']}>
        <Typhography tag="p" variant="thirdy" className={styles['group-name']} children={group.group_name} />
        <KeyRefresh currentKey={group.register_key} groupId={group.group_id} hideLabel={true} />
      </li>
    )}
  </ul>
}