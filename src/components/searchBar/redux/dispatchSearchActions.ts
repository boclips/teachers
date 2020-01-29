import queryString from 'query-string';
import { Store } from 'redux';
import { RouterState } from '../../../types/State';
import { VideoRequestFilters } from '../../../types/VideoSearchRequest';
import { VideoType } from '../../../types/Video';
import {
  CollectionRequestFilters,
  CollectionSearchRequest,
} from '../../../types/CollectionSearchRequest';
import { searchCollectionsAction } from './actions/searchCollectionsActions';
import { searchVideosAction } from './actions/searchVideosActions';

const getVideoFilters = (queryParams: any): VideoRequestFilters => ({
  subject: queryParams.subject || undefined,
  isClassroom: true,
  type: [VideoType.STOCK, VideoType.INSTRUCTIONAL],
  duration_min: +queryParams.duration_min || undefined,
  duration_max: +queryParams.duration_max || undefined,
  age_range_min: +queryParams.age_range_min || undefined,
  age_range_max: +queryParams.age_range_max || undefined,
});

const getCollectionFilters = (queryParams: any): CollectionRequestFilters => ({
  subject: queryParams.subject || undefined,
});

export const dispatchSearchActions = (store: Store<RouterState>) => {
  const { router } = store.getState();
  const location = router.location;
  if (location.pathname === '/videos' && location.search.indexOf('q')) {
    const queryParams = queryString.parse(location.search, {
      arrayFormat: 'comma',
    });
    const query = queryParams.q as string;

    const videoSearchRequest = {
      query,
      page: parseInt(queryParams.page as string, 10),
      filters: getVideoFilters(queryParams),
      sortBy: null,
    };
    const collectionSearchRequest: CollectionSearchRequest = {
      query,
      filters: getCollectionFilters(queryParams),
    };

    store.dispatch(searchVideosAction(videoSearchRequest));
    store.dispatch(searchCollectionsAction(collectionSearchRequest));
  }
};
