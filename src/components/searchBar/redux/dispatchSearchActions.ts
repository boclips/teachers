import every from 'lodash/every';
import isUndefined from 'lodash/isUndefined';
import queryString from 'query-string';
import { Store } from 'redux';
import { Constants } from '../../../app/AppConstants';
import { RouterState } from '../../../types/State';
import { RequestFilters } from '../../../types/VideoSearchRequest';
import { searchCollectionsAction } from './actions/searchCollectionsActions';
import { searchVideosAction } from './actions/searchVideosActions';

const defaultFilters: Pick<RequestFilters, 'excludeTags' | 'includeTags'> = {
  excludeTags: [Constants.NEWS],
  includeTags: [Constants.CLASSROOM],
};

const getFilters = (
  queryParams: any,
): Omit<RequestFilters, 'excludeTags' | 'includeTags'> => ({
  subject: queryParams.subject || undefined,
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

    const userFilters = getFilters(queryParams);

    const sortBy = null;

    store.dispatch(
      searchVideosAction({
        query,
        page,
        filters: { ...defaultFilters, ...userFilters },
        sortBy,
      }),
    );

    if (every(userFilters, isUndefined)) {
      store.dispatch(searchCollectionsAction({ query }));
    }
  }
};
