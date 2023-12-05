import { AtomTimeInterval } from '../../../models';
import AtomWebStorage from '../atom-web.storage';
import { AtomWebStorageAccessor } from '../models/atom-web.types';

export const ATOM_DEFAULT_WEB_ACCESSOR: AtomWebStorageAccessor = 'localStorage';

export const ATOM_DEFAULT_WEB_EXPIRATION: AtomTimeInterval = '1year';

export const ATOM_STORAGES = {
  localStorage: AtomWebStorage,
  sessionStorage: AtomWebStorage,
} as const;
