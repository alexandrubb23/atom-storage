import AtomBasicStorageInterface from './atom-basic-storage.interface';
import { AtomStorageRecord } from './atom-generic.types';

interface AtomStorageModule extends AtomBasicStorageInterface {
  /**
   * Gets all the keys in the localStorage.
   *
   * @returns An array of all the keys in the localStorage.
   */
  get storedItems(): AtomStorageRecord;

  /**
   * Saves the provided items in the localStorage.
   *
   * @param items - The items to save in the localStorage.
   *
   * @returns void
   */
  storeItems(items: AtomStorageRecord): void;
}

export default AtomStorageModule;
