import queryString from 'query-string';
import { Store } from 'redux';
import { Constants } from '../../../app/AppConstants';
import { RouterState } from '../../../types/State';
import { RequestFilters, SortBy } from '../../../types/VideoSearchRequest';
import { searchCollectionsAction } from './actions/searchCollectionsActions';
import { searchVideosAction } from './actions/searchVideosActions';

const getFilters = (queryParams: any): RequestFilters => {
  let includeTags = [];
  let excludeTags = [];

  if (queryParams.mode === Constants.NEWS) {
    includeTags = [Constants.NEWS, Constants.CLASSROOM];
  } else {
    includeTags = [Constants.CLASSROOM];
    excludeTags = [Constants.NEWS];
  }

  return {
    includeTags,
    excludeTags,
    min_duration: +queryParams.min_duration || undefined,
    max_duration: +queryParams.max_duration || undefined,
  };
};

const getSortBy = (mode: string): SortBy => {
  if (mode === Constants.NEWS) {
    return 'RELEASE_DATE';
  }

  return null;
};

export const dispatchSearchActions = (store: Store<RouterState>) => {
  const { router } = store.getState();
  const location = router.location;

  if (location.pathname === '/videos' && location.search.indexOf('q')) {
    const queryParams = queryString.parse(location.search);
    const query = queryParams.q as string;
    const page = parseInt(queryParams.page as string, 10);
    const mode = queryParams.mode as string;

    const filters = getFilters(queryParams);
    const sortBy = getSortBy(mode);

    store.dispatch(searchVideosAction({ query, page, filters, sortBy }));
    store.dispatch(searchCollectionsAction({ query }));
  }
};
