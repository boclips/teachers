import { LOCATION_CHANGE } from 'connected-react-router';
import * as queryString from 'querystring';
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
      const query = queryString.parse(routeChanges.location.search).q as string;
      store.dispatch(searchVideosAction(query));
    }
  },
);
