import { actionCreatorFactory } from '../../../../redux/actions';
import { SearchResults } from '../../../../redux/State';

export const storeSearchResultsAction = actionCreatorFactory<SearchResults>(
  'STORE_VIDEOS',
);
