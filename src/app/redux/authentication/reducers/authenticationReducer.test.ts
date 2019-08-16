import { authenticationResolved } from '../actions/authenticationResolved';
import { authenticationReducer } from './authenticationReducer';

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
});
