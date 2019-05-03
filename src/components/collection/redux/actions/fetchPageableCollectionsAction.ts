import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionKey } from '../../../../types/CollectionKey';

export const fetchPageableCollectionsAction = actionCreatorFactory<
  CollectionKey
>('FETCH_COLLECTIONS');
