interface DBConfig {
  name: string;
  version: number;
  stores: {
    name: string;
    keyPath: string;
    indexes?: { name: string; keyPath: string; unique?: boolean }[];
  }[];
}

type CacheItem<T = unknown> = {
  key: string;
  data: T;
  timestamp: number;
};
