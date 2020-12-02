import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionKey } from '../../../../types/CollectionKey';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';

export interface FetchPageableCollectionRequest {
  key: CollectionKey;
  request?: CollectionSearchRequest;
}
export const fetchPageableCollectionsAction = actionCreatorFactory<
  FetchPageableCollectionRequest
>('FETCH_COLLECTIONS');
