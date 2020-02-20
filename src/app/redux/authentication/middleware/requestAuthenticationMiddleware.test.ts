import BoclipsSecurity from 'boclips-js-security';
import { BoclipsKeycloakSecurity } from 'boclips-js-security/dist/BoclipsKeycloakSecurity';
import configureStore from 'redux-mock-store';
import { mocked } from 'ts-jest/utils';
import eventually from '../../../../../test-support/eventually';
import { Constants } from '../../../AppConstants';
import { requestAuthentication } from '../actions/requestAuthentication';
import { requestSsoAuthentication } from '../actions/requestSsoAuthentication';
import requestAuthenticationMiddleware from './requestAuthenticationMiddleware';

jest.mock('boclips-js-security');

it('requests authentication with check-sso when authentication not required', async () => {
  const mockStore = configureStore<{}>([...requestAuthenticationMiddleware]);
  const store = mockStore({});
  const createInstance = mocked(BoclipsSecurity.createInstance);

  const action = requestAuthentication({ authenticationRequired: false });

  store.dispatch(action);

  await eventually(() => {
    expect(createInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'check-sso',
      }),
    );
  });
});

it('requests authentication with login-required when authentication is required', async () => {
  const mockStore = configureStore<{}>([...requestAuthenticationMiddleware]);
  const store = mockStore({});
  const createInstance = mocked(BoclipsSecurity.createInstance);

  const action = requestAuthentication({ authenticationRequired: true });

  store.dispatch(action);

  await eventually(() => {
    expect(createInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'login-required',
      }),
    );
  });
});

it('can log in with an identity provider', async () => {
  const mockStore = configureStore<{}>([...requestAuthenticationMiddleware]);
  const store = mockStore({});
  const keycloakSecurityMock = ({
    ssoLogin: jest.fn(),
  } as unknown) as BoclipsKeycloakSecurity;

  mocked(BoclipsSecurity.createInstance).mockReturnValue(keycloakSecurityMock);
  const action = requestSsoAuthentication('google');

  store.dispatch(action);

  await eventually(() => {
    expect(keycloakSecurityMock.ssoLogin).toHaveBeenCalledWith({
      idpHint: 'google',
      redirectUri: Constants.HOST,
    });
  });
});
