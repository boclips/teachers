import { AuthenticationStateValue } from '../../../../types/State';
import { authenticationChanged } from '../actions/authenticationChanged';
import { authenticationReducer } from './authenticationReducer';

it('will change status to authenticated if authentication succeeds', () => {
  const authenticationState = { status: 'pending' } as AuthenticationStateValue;
  const resultingState = authenticationReducer(
    authenticationState,
    authenticationChanged({
      success: true,
    }),
  );

  expect(resultingState).toEqual({ status: 'authenticated' });
});

it('will change status to anonymous if authentication fails', () => {
  const authenticationState = { status: 'pending' } as AuthenticationStateValue;
  const resultingState = authenticationReducer(
    authenticationState,
    authenticationChanged({
      success: false,
    }),
  );

  expect(resultingState).toEqual({ status: 'anonymous' });
});
