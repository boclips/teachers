import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionsSearchResult } from '../../../../types/SearchResults';

export const storeCollectionSearchResultsAction = actionCreatorFactory<
  CollectionsSearchResult
>('STORE_SEARCH_COLLECTIONS');
