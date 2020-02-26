import { CollectionKey } from 'src/types/CollectionKey';
import { actionCreatorFactory } from '../../../../app/redux/actions';

export const fetchCollectionsAction = actionCreatorFactory<CollectionKey>(
  'FETCH_MY_COLLECTIONS',
);
