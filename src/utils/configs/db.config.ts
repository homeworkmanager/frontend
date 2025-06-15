import { STORE_HOMEWORK, STORE_NOTES, STORE_SCHEDULE, STORE_USER } from '../constants/dbStores';

const UNIHELPER_DB_CONFIG: DBConfig = {
  name: 'UniHelperDB',
  version: 1,
  stores: [
    {
      name: STORE_USER,
      keyPath: 'key',
      indexes: [
        {
          name: 'timestamp',
          keyPath: 'timestamp',
          unique: false
        }
      ]
    },
    {
      name: STORE_SCHEDULE,
      keyPath: 'key',
      indexes: [
        {
          name: 'timestamp',
          keyPath: 'timestamp',
          unique: false
        }
      ]
    },
    {
      name: STORE_HOMEWORK,
      keyPath: 'key',
      indexes: [
        {
          name: 'timestamp',
          keyPath: 'timestamp',
          unique: false
        }
      ]
    },
    {
      name: STORE_NOTES,
      keyPath: 'key',
      indexes: [
        {
          name: 'timestamp',
          keyPath: 'timestamp',
          unique: false
        }
      ]
    }
  ]
};

export { UNIHELPER_DB_CONFIG, STORE_USER, STORE_SCHEDULE, STORE_HOMEWORK, STORE_NOTES };
