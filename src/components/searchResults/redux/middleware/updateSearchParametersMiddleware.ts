import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { generateUri } from 'src/utils';
import { sideEffect } from 'src/app/redux/actions';
import State from 'src/types/State';
import { generateVideoSearchQuery } from 'src/services/searchParameters/generateVideoSearchQuery';
import { VideoSearchQuery } from 'src/services/searchParameters/VideoSearchQuery';
import { clearSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAction';
import {
  bulkUpdateSearchParamsAction,
  SearchRequest,
  UpdateAllFilters,
  updateSearchParamsAction,
} from '../actions/updateSearchParametersActions';

export function onBulkUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  updateRequests: SearchRequest[],
) {
  const { pathname, search } = store.getState().router.location;
  const existingQueryParams: VideoSearchQuery = queryString.parse(search);

  const updatedQueryParams = generateVideoSearchQuery(
    existingQueryParams,
    updateRequests,
  );

  if (pathname.startsWith('/subjects')) {
    const newUri = generateUri(pathname, updatedQueryParams);
    store.dispatch(push(newUri));
  } else {
    const newUri = generateUri('/videos', updatedQueryParams);
    store.dispatch(push(newUri));
  }
}

export function onUpdateSearchParameter(
  store: MiddlewareAPI<any, State>,
  request: SearchRequest,
) {
  onBulkUpdateSearchParameter(store, [request]);
}

export function onAllFilterReset(store: MiddlewareAPI<any, State>) {
  const clearRequest: UpdateAllFilters = {
    duration: undefined,
    age_range: undefined,
    subject: undefined,
    resource_types: undefined,
  };

  onBulkUpdateSearchParameter(store, [clearRequest]);
}

export const updateSearchParametersMiddleware = [
  sideEffect(updateSearchParamsAction, onUpdateSearchParameter),
  sideEffect(bulkUpdateSearchParamsAction, onBulkUpdateSearchParameter),
  sideEffect(clearSearchFilterParametersAction, onAllFilterReset),
];
