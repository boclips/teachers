import { Reducer } from 'redux';
import { AuthenticationStateValue } from '../../../../types/State';
import createReducer, { actionHandler } from '../../createReducer';
import { authenticationChanged } from '../actions/authenticationChanged';

export const authenticationReducer: Reducer<
  AuthenticationStateValue
> = createReducer(
  null,
  actionHandler(authenticationChanged, (_, { success }) => ({
    status: success ? 'authenticated' : 'anonymous',
  })),
);
