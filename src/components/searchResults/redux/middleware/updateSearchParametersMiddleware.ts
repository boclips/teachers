import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { requestToQueryParameters } from 'src/services/searchParameters/searchParametersConverter';
import { generateUri } from 'src/utils';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import State from 'src/types/State';
import { clearSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAction';
import {
  bulkUpdateSearchParamsAction,
  UpdateAllFilters,
  updateSearchParamsAction,
  UpdateSearchParamsRequest,
} from '../actions/updateSearchParametersActions';

export function onBulkUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  request: UpdateSearchParamsRequest[],
) {
  const { pathname, search } = store.getState().router.location;

  const parsedQuery =
    pathname === '/discover-collections' ? {} : queryString.parse(search);

  const newQuery = {
    ...parsedQuery,
    ...request
      .map(requestToQueryParameters)
      .reduce((acc, param) => ({ ...acc, ...param })),
    page: 1,
  };

  AnalyticsFactory.externalAnalytics().trackSearchFiltersApplied(request);

  store.dispatch(push(generateUri(getSearchPathname(pathname), newQuery)));
}

export function onUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  request: UpdateSearchParamsRequest,
) {
  onBulkUpdateSearchParameter(store, [request]);
}

export function onAllFilterReset(store: MiddlewareAPI<any, State>) {
  const clearRequest: UpdateAllFilters = {
    duration: undefined,
    age_range_min: undefined,
    age_range_max: undefined,
    subject: undefined,
  };

  onBulkUpdateSearchParameter(store, [clearRequest]);
}

const getSearchPathname = pathname =>
  pathname === '/new-filters' ? '/new-filters' : '/videos';

export const updateSearchParametersMiddleware = [
  sideEffect(updateSearchParamsAction, onUpdateSearchParameter),
  sideEffect(bulkUpdateSearchParamsAction, onBulkUpdateSearchParameter),
  sideEffect(clearSearchFilterParametersAction, onAllFilterReset),
];
