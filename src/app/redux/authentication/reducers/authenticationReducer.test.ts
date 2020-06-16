import { authenticationResolved } from '../actions/authenticationResolved';
import { authenticationReducer } from './authenticationReducer';
import {storeReferrerShareCodeAction} from "storeReferrerShareCodeAction.ts";

describe('on authenticationResolved', () => {
  it('will change status to authenticated if authentication succeeds', () => {
    const resultingState = authenticationReducer(
      undefined,
      authenticationResolved({
        success: true,
      }),
    );

    expect(resultingState).toEqual({ status: 'authenticated' });
  });

  it('will change status to anonymous if authentication fails', () => {
    const resultingState = authenticationReducer(
      undefined,
      authenticationResolved({
        success: false,
      }),
    );

    expect(resultingState).toEqual({ status: 'anonymous' });
  });

  it('will update referer share code', () => {
    const resultingState = authenticationReducer(
      undefined,
      storeReferrerShareCodeAction("user-123"),
    );

    expect(resultingState).toEqual({ refererShareCode: 'user-123' });
  });
});
