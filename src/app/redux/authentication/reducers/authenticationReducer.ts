import { Reducer } from 'redux';
import { storeReferrerShareCodeAction } from 'src/app/redux/authentication/actions/storeReferrerShareCodeAction';
import { AuthenticationStateValue } from 'src/types/State';
import createReducerWithInitialState, {
  actionHandler,
} from '../../createReducer';
import { successfulAuthentication } from '../actions/successfulAuthentication';
import { failedAuthentication } from 'src/app/redux/authentication/actions/failedAuthentication';

export const authenticationReducer: Reducer<AuthenticationStateValue> = createReducerWithInitialState(
  null,
  actionHandler(successfulAuthentication, (_) => ({ status: 'authenticated' })),
  actionHandler(failedAuthentication, (_) => ({ status: 'anonymous' })),
  actionHandler(
    storeReferrerShareCodeAction,
    (_, { shareCode, refererId }) => ({
      shareCode,
      refererId,
    }),
  ),
);
