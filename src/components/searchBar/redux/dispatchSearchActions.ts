import queryString from 'query-string';
import { Store } from 'redux';
import { DurationRange } from 'src/types/DurationRange';
import { RouterState } from 'src/types/State';
import { VideoRequestFilters } from 'src/types/VideoSearchRequest';
import { VideoType } from 'src/types/Video';
import {
  CollectionRequestFilters,
  CollectionSearchRequest,
} from 'src/types/CollectionSearchRequest';
import { searchCollectionsAction } from './actions/searchCollectionsActions';
import { searchVideosAction } from './actions/searchVideosActions';
import { convertAgeRangesFromString } from 'src/components/ageRanges/convertAgeRangesFromString';

const getVideoFilters = (queryParams: any): VideoRequestFilters => ({
  subject: queryParams.subject || undefined,
  isClassroom: true,
  type: [VideoType.STOCK, VideoType.INSTRUCTIONAL],
  duration: DurationRange.fromStrings(queryParams.duration),
  age_range_min: +queryParams.age_range_min || undefined,
  age_range_max: +queryParams.age_range_max || undefined,
  age_range: convertAgeRangesFromString(queryParams.age_range) || undefined,
});

const getCollectionFilters = (queryParams: any): CollectionRequestFilters => ({
  subject: queryParams.subject || undefined,
  age_range_min: +queryParams.age_range_min || undefined,
  age_range_max: +queryParams.age_range_max || undefined,
  age_range: convertAgeRangesFromString(queryParams.age_range) || undefined,
});

export const dispatchSearchActions = (store: Store<RouterState>) => {
  const location = store.getState().router.location;

  if (location.pathname === '/videos' && location.search.indexOf('q')) {
    const queryParams = queryString.parse(location.search);
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
