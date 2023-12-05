import { AtomDomainStorageConfig, KeyOf } from '../../../models';
import { ATOM_STORAGES } from '../constants/atom-web.constants';

export type AtomWebStorageAccessor = KeyOf<typeof ATOM_STORAGES>;

export type AtomWebStorageConfig =
  AtomDomainStorageConfig<AtomWebStorageAccessor>;

export type AtomRequiredWebStorageConfig = Required<AtomWebStorageConfig>;
