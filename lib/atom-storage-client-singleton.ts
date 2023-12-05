import AtomStorageModule from '../models/atom-storage-module.interface';
import AtomStorageClient from './atom-storage-client';

export interface IAtomStorageClientSingleton {
  key: string;
  factory: () => AtomStorageModule;
}

abstract class AtomStorageClientSingleton {
  private static instancesMap: Map<string, AtomStorageClient> = new Map();

  public static cache({
    key,
    factory,
  }: IAtomStorageClientSingleton): AtomStorageClient {
    const { instancesMap } = AtomStorageClientSingleton;

    if (!instancesMap.has(key)) {
      const storageModule = factory();
      const storageClient = new AtomStorageClient(storageModule);
      instancesMap.set(key, storageClient);
    }

    const storage = instancesMap.get(key);
    if (!storage) throw new Error(`Unable to find instance for key ${key}`);

    return storage;
  }
}

export default AtomStorageClientSingleton;
