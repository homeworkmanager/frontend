import { UNIHELPER_DB_CONFIG } from '../configs/db.config';

import IndexedDBService from './core';

const dbRepositories = {
  user: IndexedDBService.createRepository<CacheItem<GetUserResponse>>(UNIHELPER_DB_CONFIG, 'user'),
  schedule: IndexedDBService.createRepository<CacheItem<AllScheduleResponse>>(UNIHELPER_DB_CONFIG, 'schedule'),
  notes: IndexedDBService.createRepository<CacheItem<NoteResponse>>(UNIHELPER_DB_CONFIG, 'notes')
};

export default dbRepositories;