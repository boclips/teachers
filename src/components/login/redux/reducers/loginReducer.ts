import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { UserProfile } from '../../../../services/users/UserProfile';
import { storeLogin } from '../actions/storeLoginAction';

export const loginReducer: Reducer<UserProfile> = createReducer(
  null,
  actionHandler(storeLogin, (_, login) => ({
    authenticated: login.authenticated,
    /* tslint:disable:no-string-literal */
    email: login.tokenParsed && login.tokenParsed['email'],
    firstName: login.tokenParsed && login.tokenParsed['given_name'],
    lastName: login.tokenParsed && login.tokenParsed['family_name'],
  })),
);
