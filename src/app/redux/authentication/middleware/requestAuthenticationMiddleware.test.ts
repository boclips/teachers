import BoclipsSecurity from 'boclips-js-security';
import configureStore from 'redux-mock-store';
import { mocked } from 'ts-jest/utils';
import { requestAuthentication } from '../actions/requestAuthentication';
import requestAuthenticationMiddleware from './requestAuthenticationMiddleware';

jest.mock('boclips-js-security');

it('requests authentication with check-sso when authentication not required', () => {
  const mockStore = configureStore<{}>();
  const store = mockStore({});

  const action = requestAuthentication({ authenticationRequired: false });

  requestAuthenticationMiddleware(store)(jest.fn())(action);

  const createInstance = mocked(BoclipsSecurity.createInstance);

  expect(createInstance).toHaveBeenCalledWith(
    expect.objectContaining({
      mode: 'check-sso',
    }),
  );
});

it('requests authentication with login-required when authentication is required', () => {
  const mockStore = configureStore<{}>();
  const store = mockStore({});

  const action = requestAuthentication({ authenticationRequired: true });

  requestAuthenticationMiddleware(store)(jest.fn())(action);

  const createInstance = mocked(BoclipsSecurity.createInstance);

  expect(createInstance).toHaveBeenCalledWith(
    expect.objectContaining({
      mode: 'login-required',
    }),
  );
});
