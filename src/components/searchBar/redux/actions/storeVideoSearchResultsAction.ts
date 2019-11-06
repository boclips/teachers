import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoResults } from '../../../../types/SearchResults';

export const storeVideoSearchResultsAction = actionCreatorFactory<VideoResults>(
  'STORE_VIDEO_SEARCH_RESULTS',
);
