import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';
import { Store } from 'redux';
import { searchVideosAction } from './layout/TopSearchBarLayout';
import { actionCreatorFactory, sideEffect } from './redux/actions';
import { SearchState } from './State';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

export default sideEffect(
  onLocationChanged,
  (store: Store<SearchState>, routeChanges: any) => {
    if (
      routeChanges.location.pathname === '/videos' &&
      routeChanges.location.search.indexOf('q')
    ) {
      const queryParams = queryString.parse(routeChanges.location.search);
      const query = queryParams.q as string;
      const pageNumber = +queryParams.pageNumber;
      store.dispatch(searchVideosAction({ query, pageNumber }));
    }
  },
);
