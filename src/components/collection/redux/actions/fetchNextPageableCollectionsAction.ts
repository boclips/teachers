import { actionCreatorFactory } from '../../../../app/redux/actions';
import { ReadOnlyCollectionKey } from '../../../../types/CollectionKey';

export const fetchNextPageableCollectionsAction = actionCreatorFactory<
  ReadOnlyCollectionKey
>('FETCH_NEXT_COLLECTIONS');
