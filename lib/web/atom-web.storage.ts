import { calculateTimeInterval } from '../../utils';
import {
  AtomRequiredWebStorageConfig,
  AtomWebStorageAccessor,
} from './models/atom-web.types';
import { AtomStorageRecord } from '../../models';
import AtomStorageModule from '../../models/atom-storage-module.interface';

class AtomWebStorage implements AtomStorageModule {
  protected readonly storage: Storage;

  private readonly createdTime = 'createdTime';

  constructor(protected readonly config: AtomRequiredWebStorageConfig) {
    this.storage = this.getStorage();
    this.clearIfIsExpired();
  }

  public storeItems(items: AtomStorageRecord): void {
    const previousDataStorage = this.transferDataOnNamespaceChange();
    const mergedDataStorage = { ...items, ...previousDataStorage };

    const customFileds = this.addCustomFileds(mergedDataStorage);
    const { data, ...rest } = customFileds;

    this.storage.setItem(
      this.config.namespace,
      JSON.stringify({ data, ...rest })
    );
  }

  public get storedItems(): AtomStorageRecord {
    const items = this.storage.getItem(this.config.namespace);
    return items ? JSON.parse(items) : {};
  }

  public clear(): void {
    this.storage.removeItem(this.config.namespace);
  }

  public static isAvailable(accessor: AtomWebStorageAccessor): boolean {
    try {
      const storage = window[accessor];
      const key = AtomWebStorage.name;

      storage.setItem(key, '1');
      storage.getItem(key);
      storage.removeItem(key);
      return true;
    } catch {
      console.info(
        `Storage ${accessor} is not available. Using fallbackStorage instead.`
      );

      return false;
    }
  }

  protected getStorage(): Storage {
    return window[this.config.accessor];
  }

  protected addCustomFileds(items: AtomStorageRecord): AtomStorageRecord {
    if (!this.storedItems[this.createdTime]) {
      items[this.createdTime] = calculateTimeInterval(this.config.expiration);
    }

    return items;
  }

  private clearIfIsExpired(): void {
    const currentTime = new Date().getTime();
    const createdTime = this.storedItems[this.createdTime] as number;

    if (currentTime < createdTime) return;

    this.clear();
  }

  /**
   * Cleans up old data when the namespace changes.
   *
   * This helps to keep the storage clean and avoid conflicts with other libraries.
   *
   * @returns void
   */
  private transferDataOnNamespaceChange(): AtomStorageRecord | undefined {
    const currentNamespace = this.storage.key(0) as string;
    if (currentNamespace === this.config.namespace) return;

    const previousData = this.storage.getItem(currentNamespace);

    this.storage.removeItem(currentNamespace);

    if (!previousData) return;

    return JSON.parse(previousData);
  }
}

export default AtomWebStorage;
