import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionKey } from './../../../../types/CollectionKey';

export const fetchNextPageableCollectionsAction = actionCreatorFactory<
  CollectionKey
>('FETCH_NEXT_COLLECTIONS');
