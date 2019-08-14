import { Reducer } from 'redux';
import { AuthenticationStateValue } from '../../../../types/State';
import createReducer, { actionHandler } from '../../createReducer';
import { authenticationChanged } from '../actions/authenticationChanged';
import { requestAuthentication } from '../actions/requestAuthentication';

export const authenticationReducer: Reducer<
  AuthenticationStateValue
> = createReducer(
  null,
  actionHandler(authenticationChanged, (_, { success }) => ({
    status: success ? 'authenticated' : 'anonymous',
  })),
  actionHandler(requestAuthentication, _ => ({
    status: 'pending',
  })),
);
