import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import State from '../../../../types/State';
import {
  updateSearchParamsAction,
  UpdateSearchParamsRequest,
} from '../actions/updateSearchParametersActions';
import { bulkUpdateSearchParamsAction } from '../actions/updateSearchParametersActions';

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

  store.dispatch(push('/videos?' + queryString.stringify(newQuery)));
}

export default [
  sideEffect(updateSearchParamsAction, onUpdateSearchParameter),
  sideEffect(bulkUpdateSearchParamsAction, onBulkUpdateSearchParameter),
];
