import { actionCreatorFactory } from 'src/app/redux/actions';
import { CollectionKey } from 'src/types/CollectionKey';

export const fetchNextPageableCollectionsAction = actionCreatorFactory<
  CollectionKey
>('FETCH_NEXT_COLLECTIONS');
