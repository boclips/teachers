import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import State from '../../../../types/State';
import { clearSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAction';
import {
  UpdateAllFilters,
  updateSearchParamsAction,
  UpdateSearchParamsRequest,
} from '../actions/updateSearchParametersActions';
import { bulkUpdateSearchParamsAction } from '../actions/updateSearchParametersActions';
import { bulkOverrideSearchParamsAction } from './../actions/updateSearchParametersActions';

export function onUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  request: UpdateSearchParamsRequest,
) {
  const query = store.getState().router.location.search;
  const parsedQuery = queryString.parse(query);
  const newQuery = {
    ...parsedQuery,
    ...request,
  };

  store.dispatch(push('/videos?' + queryString.stringify(newQuery)));
}

export function onBulkUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  request: UpdateSearchParamsRequest[],
) {
  const query = store.getState().router.location.search;
  const parsedQuery = queryString.parse(query);

  const newQuery = request.reduce((acc, value: any) => {
    return { ...acc, ...value };
  }, parsedQuery);

  AnalyticsFactory.getInstance().trackSearchFiltersApplied(request);

  store.dispatch(push('/videos?' + queryString.stringify(newQuery)));
}

export function onBulkUpdateOverrideParams(
  store: MiddlewareAPI<any, State>,
  request: UpdateSearchParamsRequest[],
) {
  const newQuery = request.reduce((acc, value: any) => {
    return { ...acc, ...value };
  }, {});

  store.dispatch(push('/videos?' + queryString.stringify(newQuery)));
}

export function onClearSearchFilterParameters(
  store: MiddlewareAPI<any, State>,
) {
  const query = store.getState().router.location.search;
  const parsedQuery = queryString.parse(query);

  const clearAllFiltersQuery: UpdateAllFilters = {
    duration_min: undefined,
    duration_max: undefined,
    age_range_min: undefined,
    age_range_max: undefined,
    subject: undefined,
  };

  const newQuery = {
    ...parsedQuery,
    ...clearAllFiltersQuery,
  };

  store.dispatch(push('/videos?' + queryString.stringify(newQuery)));
}

export default [
  sideEffect(updateSearchParamsAction, onUpdateSearchParameter),
  sideEffect(bulkUpdateSearchParamsAction, onBulkUpdateSearchParameter),
  sideEffect(bulkOverrideSearchParamsAction, onBulkUpdateOverrideParams),
  sideEffect(clearSearchFilterParametersAction, onClearSearchFilterParameters),
];
