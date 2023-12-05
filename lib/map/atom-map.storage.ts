import {
  AtomDomainStorageConfig,
  AtomStorageRecord,
} from '../../models/atom-generic.types';
import AtomStorageModule from '../../models/atom-storage-module.interface';
import { AtomWebStorageAccessor } from '../web/models/atom-web.types';
import { ATOM_DEFAULT_MAP_NAMESPACE } from './constants/atom-map.constants';

class AtomMapStorage<TAtomStorageAccessor = AtomWebStorageAccessor>
  implements AtomStorageModule
{
  private readonly storage: Map<string, AtomStorageRecord> = new Map();

  constructor(
    protected readonly config: AtomDomainStorageConfig<TAtomStorageAccessor>
  ) {}

  public storeItems(items: AtomStorageRecord): void {
    this.storage.set(this.key, items);
  }

  public get storedItems(): AtomStorageRecord {
    const items = this.storage.get(this.key);
    return items || { data: {} };
  }

  public clear(): void {
    this.storage.delete(this.key);
  }

  private get key(): string {
    return this.config.namespace ?? ATOM_DEFAULT_MAP_NAMESPACE;
  }
}

export default AtomMapStorage;
