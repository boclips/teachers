import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoSearchResults } from '../../../../types/SearchResults';

export const storeVideoSearchResultsAction = actionCreatorFactory<
  VideoSearchResults
>('STORE_VIDEO_SEARCH_RESULTS');
