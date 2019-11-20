import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoSearchResult } from '../../../../types/SearchResults';

export const storeVideoSearchResultsAction = actionCreatorFactory<
  VideoSearchResult
>('STORE_VIDEO_SEARCH_RESULTS');
