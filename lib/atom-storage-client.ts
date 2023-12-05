import {
  AtomRecordStorageValue,
  AtomStorageRecord,
  AtomStorageValue,
} from '../models';
import AtomStorageClientInterface from '../models/atom-storage-client-interface';
import AtomStorageModule from '../models/atom-storage-module.interface';

class AtomStorageClient implements AtomStorageClientInterface {
  constructor(private readonly storage: AtomStorageModule) {}

  public put(key: string, value: AtomStorageValue): AtomStorageValue {
    const { data, ...rest } = this.entries;
    const items = { ...rest, data: { ...data, [key]: value } };

    this.storage.storeItems(items);

    return this.get(key);
  }

  public get(key: string, defaultValue?: AtomStorageValue): AtomStorageValue {
    return this.getByKey(key) ?? defaultValue;
  }

  public has(key: string): boolean {
    return key in this.data;
  }

  public delete(key: string): void {
    if (!key) return;

    const existingItem = this.getByKey(key);
    if (!existingItem) return;

    const updatedItems = this.entriesKeys.reduce((acc, currentKey) => {
      if (currentKey !== key) acc[currentKey] = this.getByKey(currentKey);
      return acc;
    }, {} as AtomStorageRecord);

    const items = { ...this.entries, data: updatedItems };

    this.storage.storeItems(items);
  }

  public search(pattern: RegExp): AtomRecordStorageValue[] {
    const shouldIncludeKey = (key: string): boolean => pattern.test(key);

    const toKeyValuePairs = (key: string) => ({
      key,
      value: this.get(key) as AtomStorageValue,
    });

    return this.entriesKeys.filter(shouldIncludeKey).map(toKeyValuePairs);
  }

  public clear(): void {
    this.storage.clear();
  }

  private getByKey(key: string): AtomStorageValue {
    return this.data[key];
  }

  private get entriesKeys(): string[] {
    return Object.keys(this.data);
  }

  private get entries(): AtomStorageRecord {
    return this.storage.storedItems;
  }

  private get data(): AtomRecordStorageValue {
    return this.entries.data || {};
  }
}

export default AtomStorageClient;
