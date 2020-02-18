import { actionCreatorFactory } from 'src/app/redux/actions';
import { CollectionKey } from 'src/types/CollectionKey';
import { CollectionSearchRequest } from 'src/types/CollectionSearchRequest';

export interface FetchPageableCollectionRequest {
  key: CollectionKey;
  request?: CollectionSearchRequest;
}
export const fetchPageableCollectionsAction = actionCreatorFactory<
  FetchPageableCollectionRequest
>('FETCH_COLLECTIONS');
