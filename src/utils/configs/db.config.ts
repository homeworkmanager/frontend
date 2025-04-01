const UNIHELPER_DB_CONFIG: DBConfig = {
  name: 'UniHelperDB',
  version: 1,
  stores: [
    {
      name: 'user',
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
      name: 'schedule',
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
      name: 'notes',
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

export { UNIHELPER_DB_CONFIG };
