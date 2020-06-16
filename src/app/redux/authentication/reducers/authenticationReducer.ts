import { Reducer } from 'redux';
import { AuthenticationStateValue } from '../../../../types/State';
import createReducerWithInitialState, {
  actionHandler,
} from '../../createReducer';
import { authenticationResolved } from '../actions/authenticationResolved';
import {storeReferrerShareCodeAction} from "src/app/redux/authentication/actions/storeReferrerShareCodeAction";

export const authenticationReducer: Reducer<AuthenticationStateValue> = createReducerWithInitialState(
  null,
  actionHandler(authenticationResolved, (_, { success }) => ({
    status: success ? 'authenticated' : 'anonymous',
  })),
  actionHandler(storeReferrerShareCodeAction, (_, shareCode) => ({
    refererShareCode: shareCode,
  })),
);
