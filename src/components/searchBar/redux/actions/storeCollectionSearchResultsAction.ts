import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionSearchResults } from '../../../../types/State';

export const storeCollectionSearchResultsAction = actionCreatorFactory<
  CollectionSearchResults
>('STORE_SEARCH_COLLECTIONS');
