import { AtomRecordStorageValue, AtomStorageValue } from './atom-generic.types';
import AtomBasicStorageInterface from './atom-basic-storage.interface';

interface AtomStorageClientInterface extends AtomBasicStorageInterface {
  /**
   * Puts the provided value in the storage associated with the provided key.
   *
   * @param key - The key to put the value for.
   * @param value - The value to put in the BrowserStorage or MapStorage.
   * @returns The value that was put in the BrowserStorage or MapStorage. If the value was not put in the storage, this method returns undefined.
   */
  put(key: string, value: AtomStorageValue): AtomStorageValue;

  /**
   * Gets the value associated with the provided key.
   *
   * @param key - The key to get the value for.
   * @returns The value associated with the provided key, or undefined if the key does not exist.
   */
  get(key: string, defaultValue?: AtomStorageValue): AtomStorageValue;

  /**
   * Has the provided key in the localStorage.
   *
   * @param key - The key to check if it exists in the localStorage.
   * @returns True if the key exists in the storage, undefined otherwise.
   */
  has(key: string): boolean;

  /**
   * Deletes the value associated with the provided key.
   * If the key does not exist, this method does nothing.
   *
   * @param key - The key to delete the value for.
   * @returns void
   */
  delete(key: string): void;

  /**
   * Searches the storage for all keys that match the provided pattern.
   *
   * @param pattern - The pattern to search for.
   * @returns An array of key-value pairs that match the provided pattern.
   */
  search(pattern: RegExp): AtomRecordStorageValue[];
}

export default AtomStorageClientInterface;
