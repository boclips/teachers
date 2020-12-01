import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionSearchResult } from '../../../../types/SearchResults';

export const storeCollectionSearchResultsAction = actionCreatorFactory<CollectionSearchResult>(
  'STORE_SEARCH_COLLECTIONS',
);
