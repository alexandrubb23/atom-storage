import {
  ATOM_DEFAULT_DOMAIN_ACCESSOR,
  ATOM_DEFAULT_DOMAIN_EXPIRATION,
  ATOM_DEFAULT_DOMAIN_NAMESPACE,
} from '../../constants/atom-default.constants';
import { AtomDomainStorageConfig } from '../../models';
import AtomMapStorage from '../map/atom-map.storage';
import {
  AtomRequiredWebStorageConfig,
  AtomWebStorageAccessor,
} from '../web/models/atom-web.types';

const atomDomainStorageConfig = <
  TAtomStorageConfig = AtomRequiredWebStorageConfig,
  TAtomStorageAccessor = AtomWebStorageAccessor
>(
  config?: AtomDomainStorageConfig<TAtomStorageAccessor>,
  domainConfig?: AtomDomainStorageConfig<TAtomStorageAccessor>
): TAtomStorageConfig => {
  const {
    accessor = domainConfig?.accessor ?? ATOM_DEFAULT_DOMAIN_ACCESSOR,
    namespace = domainConfig?.namespace ?? ATOM_DEFAULT_DOMAIN_NAMESPACE,
    expiration = domainConfig?.expiration ?? ATOM_DEFAULT_DOMAIN_EXPIRATION,
  } = config || {};

  const defaultConfig = {
    accessor,
    namespace,
    expiration,
  };

  return {
    fallbackStorage: () => new AtomMapStorage(defaultConfig),
    ...config,
    ...defaultConfig,
  } as TAtomStorageConfig;
};

export default atomDomainStorageConfig;
