import queryString from 'query-string';
import { Store } from 'redux';
import { Constants } from '../../../app/Constants';
import { RequestFilters } from '../../../types/SearchRequest';
import State from '../../../types/State';
import { searchVideosAction } from './actions/searchVideosActions';

const getFilters = (mode: string): RequestFilters => {
  let includeTags = [];
  let excludeTags = [];

  if (mode === Constants.NEWS) {
    includeTags = [Constants.NEWS];
  } else {
    includeTags = [Constants.CLASSROOM];
    excludeTags = [Constants.NEWS];
  }

  const filters = {
    includeTags,
    excludeTags,
  };

  return filters;
};

export const dispatchSearchVideoAction = (store: Store<State>) => {
  const { router } = store.getState();
  const location = router.location;

  if (location.pathname === '/videos' && location.search.indexOf('q')) {
    const queryParams = queryString.parse(location.search);
    const query = queryParams.q as string;
    const page = +queryParams.page;
    const mode = queryParams.mode as string;

    const filters = getFilters(mode);

    store.dispatch(searchVideosAction({ query, page, filters }));
  }
};
