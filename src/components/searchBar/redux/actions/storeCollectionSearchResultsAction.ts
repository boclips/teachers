import { actionCreatorFactory } from 'src/app/redux/actions';
import { CollectionSearchResult } from 'src/types/SearchResults';

export const storeCollectionSearchResultsAction = actionCreatorFactory<
  CollectionSearchResult
>('STORE_SEARCH_COLLECTIONS');
