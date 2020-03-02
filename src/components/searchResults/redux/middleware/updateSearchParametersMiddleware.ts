import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { requestToQueryParameters } from 'src/services/searchFilters/searchFiltersConverter';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import State from '../../../../types/State';
import { clearSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAction';
import {
  bulkUpdateSearchParamsAction,
  UpdateAllFilters,
  updateSearchParamsAction,
  UpdateSearchParamsRequest,
} from '../actions/updateSearchParametersActions';

export function getSearchPathname(pathname) {
  return pathname === '/new-filters' ? '/new-filters?' : '/videos?';
}

// TODO() rethink this whole file and refactor/rename
export function onUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  request: UpdateSearchParamsRequest,
) {
  const { search: query, pathname } = store.getState().router.location;
  const parsedQuery = queryString.parse(query);
  const newQuery = {
    ...parsedQuery,
    ...requestToQueryParameters(request),
    page: 1,
  };

  store.dispatch(
    push(
      getSearchPathname(pathname) +
        queryString.stringify(newQuery, { arrayFormat: 'comma' }),
    ),
  );
}

export function onBulkUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  request: UpdateSearchParamsRequest[],
) {
  const pathname = store.getState().router.location.pathname;
  let query = store.getState().router.location.search;

  if (pathname === '/discover-collections') {
    query = '';
  }

  const parsedQuery = queryString.parse(query);

  const newQuery = {
    ...parsedQuery,
    ...request
      .map(requestToQueryParameters)
      .reduce((acc, param) => ({ ...acc, ...param })),
    page: 1,
  };

  AnalyticsFactory.externalAnalytics().trackSearchFiltersApplied(request);

  store.dispatch(
    push(
      getSearchPathname(pathname) +
        queryString.stringify(newQuery, {
          arrayFormat: 'comma',
        }),
    ),
  );
}

export function onAllFilterReset(store: MiddlewareAPI<any, State>) {
  const { search: query, pathname } = store.getState().router.location;
  const parsedQuery = queryString.parse(query);

  const clearAllFiltersQuery: UpdateAllFilters = {
    duration: undefined,
    age_range_min: undefined,
    age_range_max: undefined,
    subject: undefined,
  };

  const newQuery = {
    ...parsedQuery,
    ...clearAllFiltersQuery,
    page: 1,
  };

  store.dispatch(
    push(
      getSearchPathname(pathname) +
        queryString.stringify(newQuery, { arrayFormat: 'comma' }),
    ),
  );
}

export default [
  sideEffect(updateSearchParamsAction, onUpdateSearchParameter),
  sideEffect(bulkUpdateSearchParamsAction, onBulkUpdateSearchParameter),
  sideEffect(clearSearchFilterParametersAction, onAllFilterReset),
];
