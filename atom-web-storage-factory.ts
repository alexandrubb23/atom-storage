import atomDomainStorageFactory from './lib/atom-domain-storage-factory';
import { IAtomStorageClientSingleton } from './lib/atom-storage-client-singleton';
import {
  AtomRequiredWebStorageConfig,
  AtomWebStorageConfig,
} from './lib/web/models/atom-web.types';
import AtomWebStorage from './lib/web/atom-web.storage';
import AtomStorageModule from './models/atom-storage-module.interface';
import { AtomStorageClient } from './lib';
import atomDomainStorageConfig from './lib/config/atom-domain-storage-config';
import {
  ATOM_DEFAULT_WEB_ACCESSOR,
  ATOM_DEFAULT_WEB_EXPIRATION,
} from './lib/web/constants/atom-web.constants';

const atomWebStorageModule =
  (config: AtomRequiredWebStorageConfig) => (): AtomStorageModule => {
    const { accessor, fallbackStorage } = config;
    return AtomWebStorage.isAvailable(accessor)
      ? new AtomWebStorage(config)
      : fallbackStorage(config);
  };

/**
 * Creates an instance of AtomStorageClient based on the provided configuration.
 *
 * @param config - The configuration object for creating the storage instance.
 * @param config.accessor - The type of storage to use (e.g., 'localStorage', 'sessionStorage'). Defaults to localStorage if not provided.
 * @param config.namespace - The namespace to prepend to keys in the localStorage. Defaults to DEFAULT_NAMESPACE if not provided.
 * @param config.expiration - The expiration time for the localStorage. Defaults to DEFAULT_EXPIRATION if not provided.
 * @param config.fallback - The fallback storage to use if the provided accessor is not available. Defaults to MapStorage if not provided.
 * @returns An instance of StorageClient configured based on the provided parameters.
 *
 * @throws {Error} Throws an error if an invalid accessor is provided.
 *
 * @example
 * // Creating a storage instance with the default accessor and namespace
 * const storage = atomWebStorageFactory({});
 *
 * // Creating a storage instance with a custom accessor and namespace
 * const customStorage = atomWebStorageFactory({ accessor: 'localStorage', namespace: 'custom_namespace' });
 */
const atomWebStorageFactory = (
  config?: AtomWebStorageConfig
): AtomStorageClient => {
  const defaultWebConfig: AtomWebStorageConfig = {
    accessor: ATOM_DEFAULT_WEB_ACCESSOR,
    expiration: ATOM_DEFAULT_WEB_EXPIRATION,
  };

  const webStorageConfig: AtomRequiredWebStorageConfig =
    atomDomainStorageConfig(config, defaultWebConfig);

  const { accessor, namespace } = webStorageConfig;

  const webStorageClientConfig: IAtomStorageClientSingleton = {
    key: `${namespace}${accessor}`,
    factory: atomWebStorageModule(webStorageConfig),
  };

  return atomDomainStorageFactory(webStorageClientConfig);
};

export default atomWebStorageFactory;
