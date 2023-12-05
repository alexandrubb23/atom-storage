import AtomStorageClient from './atom-storage-client';
import AtomStorageClientSingleton, {
  IAtomStorageClientSingleton,
} from './atom-storage-client-singleton';

const atomDomainStorageFactory = ({
  key,
  factory,
}: IAtomStorageClientSingleton): AtomStorageClient =>
  AtomStorageClientSingleton.cache({
    key,
    factory,
  });

export default atomDomainStorageFactory;
