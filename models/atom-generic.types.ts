import AtomStorageModule from './atom-storage-module.interface';

export type KeyOf<T> = keyof T;

// export type ObjectValues<T> = T[KeyOf<T>];

export type AtomStorageValue = string | number | boolean | object | unknown[];

export type AtomRecordStorageValue = Record<string, AtomStorageValue>;

export type AtomStorageRecord = {
  data: AtomRecordStorageValue;
} & AtomRecordStorageValue;

export type AtomTimeInterval =
  | '1min'
  | '5min'
  | '10min'
  | '15min'
  | '30min'
  | '45min'
  | '60min'
  | '1day'
  | '1week'
  | '1month'
  | '1year';

export type AtomDomainStorageConfig<TAtomStorageAccessor = string> = {
  accessor?: TAtomStorageAccessor;
  expiration?: AtomTimeInterval;
  fallbackStorage?: (
    config: AtomDomainStorageConfig<TAtomStorageAccessor>
  ) => AtomStorageModule;
  namespace?: string;
};
