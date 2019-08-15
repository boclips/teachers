import { authenticationChanged } from '../actions/authenticationChanged';
import { authenticationReducer } from './authenticationReducer';

describe('on authenticationChanged', () => {
  it('will change status to authenticated if authentication succeeds', () => {
    const resultingState = authenticationReducer(
      undefined,
      authenticationChanged({
        success: true,
      }),
    );

    expect(resultingState).toEqual({ status: 'authenticated' });
  });

  it('will change status to anonymous if authentication fails', () => {
    const resultingState = authenticationReducer(
      undefined,
      authenticationChanged({
        success: false,
      }),
    );

    expect(resultingState).toEqual({ status: 'anonymous' });
  });
});
