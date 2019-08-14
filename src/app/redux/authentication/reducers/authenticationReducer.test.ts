import { AuthenticationStateValue } from '../../../../types/State';
import { authenticationChanged } from '../actions/authenticationChanged';
import { requestAuthentication } from '../actions/requestAuthentication';
import { authenticationReducer } from './authenticationReducer';

describe('on authenticationChanged', () => {
  it('will change status to authenticated if authentication succeeds', () => {
    const authenticationState = {
      status: 'pending',
    } as AuthenticationStateValue;
    const resultingState = authenticationReducer(
      authenticationState,
      authenticationChanged({
        success: true,
      }),
    );

    expect(resultingState).toEqual({ status: 'authenticated' });
  });

  it('will change status to anonymous if authentication fails', () => {
    const authenticationState = {
      status: 'pending',
    } as AuthenticationStateValue;
    const resultingState = authenticationReducer(
      authenticationState,
      authenticationChanged({
        success: false,
      }),
    );

    expect(resultingState).toEqual({ status: 'anonymous' });
  });
});

describe('on requestAuthentication', () => {
  it('will change status to pending when authentication requested', () => {
    const authenticationState = {
      status: 'anonymous',
    } as AuthenticationStateValue;
    const resultingState = authenticationReducer(
      authenticationState,
      requestAuthentication({
        authenticationRequired: true,
      }),
    );

    expect(resultingState).toEqual({ status: 'pending' });
  });
});
