import { Reducer } from 'redux';
import { AuthenticationStateValue } from '../../../../types/State';
import createReducer, { actionHandler } from '../../createReducer';
import { authenticationResolved } from '../actions/authenticationResolved';

export const authenticationReducer: Reducer<
  AuthenticationStateValue
> = createReducer(
  null,
  actionHandler(authenticationResolved, (_, { success }) => ({
    status: success ? 'authenticated' : 'anonymous',
  })),
);
