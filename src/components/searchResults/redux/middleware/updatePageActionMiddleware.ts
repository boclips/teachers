import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import State from '../../../../types/State';
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
    ...request,
    page: request.page ? request.page : 1,
  };

  store.dispatch(
    push(
      '/videos?' + queryString.stringify(newQuery, { arrayFormat: 'comma' }),
    ),
  );
}

export default sideEffect(updatePageAction, onUpdatePage);
