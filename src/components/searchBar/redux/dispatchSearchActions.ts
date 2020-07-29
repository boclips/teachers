import queryString, { ParsedQuery } from 'query-string';
import { Store } from 'redux';
import { DurationRange } from 'src/types/DurationRange';
import { RouterState } from 'src/types/State';
import { VideoRequestFilters } from 'src/types/VideoSearchRequest';
import { VideoType } from 'src/types/Video';
import {
  CollectionRequestFilters,
  CollectionSearchRequest,
} from 'src/types/CollectionSearchRequest';
import { convertAgeRangesFromString } from 'src/components/ageRanges/convertAgeRangesFromString';
import { searchCollectionsAction } from './actions/searchCollectionsActions';
import { searchVideosAction } from './actions/searchVideosActions';

const getVideoFilters = (queryParams: any): VideoRequestFilters => ({
  subject: queryParams.subject || undefined,
  type: [VideoType.INSTRUCTIONAL],
  duration: DurationRange.newFromStrings(queryParams.duration),
  age_range_min: +queryParams.age_range_min || undefined,
  age_range_max: +queryParams.age_range_max || undefined,
  age_range: convertAgeRangesFromString(queryParams.age_range) || undefined,
  resource_types: queryParams.resource_types,
});

const getCollectionFilters = (queryParams: any): CollectionRequestFilters => ({
  subject: queryParams.subject || undefined,
  age_range_min: +queryParams.age_range_min || undefined,
  age_range_max: +queryParams.age_range_max || undefined,
  age_range: convertAgeRangesFromString(queryParams.age_range) || undefined,
  resource_types: queryParams.resource_types,
});

export const dispatchSearchActions = (store: Store<RouterState>) => {
  const { location } = store.getState().router;

  if (location.pathname === '/videos' && location.search.indexOf('q')) {
    handleSearchActions(queryString.parse(location.search), store);
  } else if (location.pathname.startsWith('/subjects')) {
    handleSearchActions(overrideSubjectParam(location), store);
  }
};

const overrideSubjectParam = (location: any): ParsedQuery => {
  const queryParams = queryString.parse(location.search);

  const subjectId = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1,
  );
  queryParams.subject = subjectId;
  return queryParams;
};

const handleSearchActions = (
  queryParams: ParsedQuery,
  store: Store<RouterState>,
) => {
  const query = queryParams.q as string;

  const videoSearchRequest = {
    query,
    page: parseInt((queryParams.page || 1) as string, 10),
    filters: getVideoFilters(queryParams),
    sortBy: null,
  };
  const collectionSearchRequest: CollectionSearchRequest = {
    query,
    filters: getCollectionFilters(queryParams),
  };

  store.dispatch(searchVideosAction(videoSearchRequest));
  store.dispatch(searchCollectionsAction(collectionSearchRequest));
};
