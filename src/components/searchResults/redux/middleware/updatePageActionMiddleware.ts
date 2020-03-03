import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import State from 'src/types/State';
import {
  PageChangeRequest,
  updatePageAction,
} from '../actions/updatePageAction';

export function onUpdatePage(
  store: MiddlewareAPI<any, State>,
  request: PageChangeRequest,
) {
  const query = store.getState().router.location.search;

  const parsedQuery = queryString.parse(query);

  const newQuery = {
    ...parsedQuery,
    page: request.page ? request.page : 1,
  };

  store.dispatch(push({ search: queryString.stringify(newQuery) }));
}

export const updatePageActionMiddleware = sideEffect(
  updatePageAction,
  onUpdatePage,
);
