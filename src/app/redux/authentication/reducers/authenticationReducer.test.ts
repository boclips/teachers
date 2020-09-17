import { storeReferrerShareCodeAction } from 'src/app/redux/authentication/actions/storeReferrerShareCodeAction';
import { failedAuthentication } from 'src/app/redux/authentication/actions/failedAuthentication';
import { successfulAuthentication } from '../actions/successfulAuthentication';
import { authenticationReducer } from './authenticationReducer';

describe('on authenticationResolved', () => {
  it('will change status to authenticated if authentication succeeds', () => {
    const resultingState = authenticationReducer(
      undefined,
      successfulAuthentication(),
    );

    expect(resultingState).toEqual({ status: 'authenticated' });
  });

  it('will change status to anonymous if authentication fails', () => {
    const resultingState = authenticationReducer(
      undefined,
      failedAuthentication(),
    );

    expect(resultingState).toEqual({ status: 'anonymous' });
  });

  it('will update referer and share code', () => {
    const resultingState = authenticationReducer(
      undefined,
      storeReferrerShareCodeAction({
        shareCode: 'ABCD',
        refererId: 'user-123',
      }),
    );

    expect(resultingState).toEqual({
      shareCode: 'ABCD',
      refererId: 'user-123',
    });
  });
});
