import { actionCreatorFactory } from 'src/app/redux/actions';
import { CollectionSearchRequest } from 'src/types/CollectionSearchRequest';

export const searchCollectionsAction = actionCreatorFactory<
  CollectionSearchRequest
>('SEARCH_COLLECTIONS');
