import { actionCreatorFactory } from '../../../../app/redux/actions';
import { SearchResults } from '../../../../types/State';

export const storeSearchResultsAction = actionCreatorFactory<SearchResults>(
  'STORE_VIDEOS',
);
