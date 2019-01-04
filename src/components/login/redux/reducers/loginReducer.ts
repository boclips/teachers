import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { storeLogin } from '../actions/storeLoginAction';

export const loginReducer: Reducer<boolean> = createReducer(
  null,
  actionHandler(storeLogin, (_, login) => login.authenticated),
);
