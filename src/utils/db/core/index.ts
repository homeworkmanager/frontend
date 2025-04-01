class IndexedDBService {
  private static instances = new Map<string, IDBDatabase>();

  static async getDb(config: DBConfig): Promise<IDBDatabase> {
    if (this.instances.has(config.name)) {
      return this.instances.get(config.name)!;
    }

    return new Promise((res, rej) => {
      const request = indexedDB.open(config.name, config.version);

      request.onerror = () => rej(request.error);
      request.onsuccess = () => {
        const db = request.result;
        this.instances.set(config.name, db);
        res(db);
      };

      request.onupgradeneeded = () => {
        const db = request.result;

        config.stores.forEach((storeConfig) => {
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            const store = db.createObjectStore(storeConfig.name, { keyPath: storeConfig.keyPath, autoIncrement: true });

            storeConfig.indexes?.forEach((index) => {
              store.createIndex(index.name, index.keyPath, { unique: index.unique });
            });
          }
        });
      };
    });
  }

  static async createRepository<T extends CacheItem<unknown>>(config: DBConfig, storeName: string) {
    const get = async (key: string): Promise<T | undefined> => {
      const db = await this.getDb(config);

      return new Promise((res) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.get(key);

        request.onerror = () => res(undefined);
        request.onsuccess = () => res(request.result);
      });
    };

    const set = async (key: string, data: T['data']): Promise<void> => {
      const db = await this.getDb(config);
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);

        store.put({ key, data: data, timestamp: Date.now() });

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    };

    const clear = async (key: string): Promise<void> => {
      const db = await this.getDb(config);
      await new Promise((res, rej) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);

        store.delete(key);

        tx.onerror = () => rej(tx.error);
        tx.oncomplete = () => res(undefined);
      });
    };

    return {
      get,
      set,
      clear
    };
  }
}

export default IndexedDBService;
