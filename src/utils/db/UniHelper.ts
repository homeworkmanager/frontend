import { UNIHELPER_DB_CONFIG } from '../configs/db.config';

import IndexedDBService from './core';

const dbRepositories = {
  user: IndexedDBService.createRepository<CacheItem<UserResponse>>(UNIHELPER_DB_CONFIG, 'user'),
  schedule: IndexedDBService.createRepository<CacheItem<AllScheduleResponse>>(UNIHELPER_DB_CONFIG, 'schedule'),
  homework: IndexedDBService.createRepository<CacheItem<ScheduleHomeworkResponse>>(UNIHELPER_DB_CONFIG, 'homework'),
  notes: IndexedDBService.createRepository<CacheItem<NoteResponse>>(UNIHELPER_DB_CONFIG, 'notes')
};

export default dbRepositories;
