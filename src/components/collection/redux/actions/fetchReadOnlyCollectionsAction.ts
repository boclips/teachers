import { actionCreatorFactory } from '../../../../app/redux/actions';
import { ReadOnlyCollectionKey } from '../../../../types/CollectionKey';

export const fetchReadOnlyCollectionsAction = actionCreatorFactory<
  ReadOnlyCollectionKey
>('FETCH_COLLECTIONS');
