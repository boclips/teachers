import { Reducer } from 'redux';
import createReducer, { actionHandler } from '../redux/createReducer';
import { loginUser } from './LoginView';
import { UserCredentials } from './UserCredentials';

export const userReducer: Reducer<UserCredentials> = createReducer(
  null,
  actionHandler(loginUser, (_, userCredentials) => userCredentials),
);
