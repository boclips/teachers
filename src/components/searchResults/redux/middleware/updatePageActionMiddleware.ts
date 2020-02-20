import { push } from 'connected-react-router';
import queryString from 'query-string';
import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import State from '../../../../types/State';
import {
  PageChangeRequest,
  updatePageAction,
} from '../actions/updatePageAction';
import { getSearchPathname } from './updateSearchParametersMiddleware';

export function onUpdatePage(
  store: MiddlewareAPI<any, State>,
  request: PageChangeRequest,
) {
  const { search: query, pathname } = store.getState().router.location;

  const parsedQuery = queryString.parse(query);
  const newQuery = {
    ...parsedQuery,
    ...request,
    page: request.page ? request.page : 1,
  };

  store.dispatch(
    push(
      getSearchPathname(pathname) +
        queryString.stringify(newQuery, { arrayFormat: 'comma' }),
    ),
  );
}

export default sideEffect(updatePageAction, onUpdatePage);
