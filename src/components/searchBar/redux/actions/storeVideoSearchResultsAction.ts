import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoSearchResult } from 'src/types/SearchResults';

export const storeVideoSearchResultsAction = actionCreatorFactory<
  VideoSearchResult
>('STORE_VIDEO_SEARCH_RESULTS');
