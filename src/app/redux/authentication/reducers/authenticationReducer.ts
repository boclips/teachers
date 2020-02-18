import { Reducer } from 'redux';
import { AuthenticationStateValue } from 'src/types/State';
import createReducerWithInitialState, {
  actionHandler,
} from '../../createReducer';
import { authenticationResolved } from '../actions/authenticationResolved';

export const authenticationReducer: Reducer<AuthenticationStateValue> = createReducerWithInitialState(
  null,
  actionHandler(authenticationResolved, (_, { success }) => ({
    status: success ? 'authenticated' : 'anonymous',
  })),
);
