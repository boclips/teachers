import queryString from 'query-string';
import { Store } from 'redux';
import { RouterState } from 'src/types/State';
import { VideoRequestFilters } from 'src/types/VideoSearchRequest';
import { VideoType } from 'src/types/Video';
import {
  CollectionRequestFilters,
  CollectionSearchRequest,
} from 'src/types/CollectionSearchRequest';
import { searchVideosAction } from './actions/searchVideosActions';
import { searchCollectionsAction } from './actions/searchCollectionsActions';

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
  age_range_min: +queryParams.age_range_min || undefined,
  age_range_max: +queryParams.age_range_max || undefined,
});

export const dispatchSearchActions = (store: Store<RouterState>) => {
  const { router } = store.getState();
  const location = router.location;

  // TODO(AG/EV) REMOVE /new-filters AFTER NEW FILTERS ARE RELEASED!
  if (
    (location.pathname === '/videos' || location.pathname === '/new-filters') &&
    location.search.indexOf('q')
  ) {
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
