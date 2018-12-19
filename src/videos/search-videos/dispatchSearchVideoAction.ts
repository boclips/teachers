import queryString from 'query-string';
import { Store } from 'redux';
import { searchVideosAction } from '../../layout/TopSearchBarLayout';
import State from '../../State';

export const dispatchSearchVideoAction = (store: Store<State>) => {
  const { login, router } = store.getState();
  const location = router.location;

  if (
    location.pathname === '/videos' &&
    location.search.indexOf('q') &&
    login
  ) {
    const queryParams = queryString.parse(location.search);
    const query = queryParams.q as string;
    const pageNumber = +queryParams.pageNumber;
    store.dispatch(searchVideosAction({ query, pageNumber }));
  }
};
