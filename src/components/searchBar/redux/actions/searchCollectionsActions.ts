import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';

export const searchCollectionsAction = actionCreatorFactory<CollectionSearchRequest>(
  'SEARCH_COLLECTIONS',
);
