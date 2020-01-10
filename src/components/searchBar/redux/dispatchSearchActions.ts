import queryString from 'query-string';
import { Store } from 'redux';
import { RouterState } from '../../../types/State';
import { VideoRequestFilters } from '../../../types/VideoSearchRequest';
import { VideoType } from '../../../types/Video';
import { searchCollectionsAction } from './actions/searchCollectionsActions';
import { searchVideosAction } from './actions/searchVideosActions';

const getFilters = (queryParams: any): VideoRequestFilters => ({
  subject: queryParams.subject || undefined,
  isClassroom: true,
  type: [VideoType.STOCK, VideoType.INSTRUCTIONAL],
  duration_min: +queryParams.duration_min || undefined,
  duration_max: +queryParams.duration_max || undefined,
  age_range_min: +queryParams.age_range_min || undefined,
  age_range_max: +queryParams.age_range_max || undefined,
});

export const dispatchSearchActions = (store: Store<RouterState>) => {
  const { router } = store.getState();
  const location = router.location;
  if (location.pathname === '/videos' && location.search.indexOf('q')) {
    const queryParams = queryString.parse(location.search, {
      arrayFormat: 'comma',
    });
    const query = queryParams.q as string;
    const page = parseInt(queryParams.page as string, 10);

    const filters = getFilters(queryParams);
    const sortBy = null;

    store.dispatch(searchVideosAction({ query, page, filters, sortBy }));
    store.dispatch(searchCollectionsAction({ query }));
  }
};
