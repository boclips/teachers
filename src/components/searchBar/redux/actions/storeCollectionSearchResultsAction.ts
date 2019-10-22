import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionsSearchResult } from '../../../../types/State';

export const storeCollectionSearchResultsAction = actionCreatorFactory<
  CollectionsSearchResult
>('STORE_SEARCH_COLLECTIONS');
