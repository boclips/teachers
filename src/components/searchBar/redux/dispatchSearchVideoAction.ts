import queryString from 'query-string';
import { Store } from 'redux';
import State from '../../../types/State';
import { searchVideosAction } from './actions/searchVideosActions';

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
    const page = +queryParams.page;
    store.dispatch(searchVideosAction({ query, page }));
  }
};
