import configureStore from 'redux-mock-store';
import { mocked } from 'ts-jest/utils';
import BoclipsSecurity from 'boclips-js-security';
import { requestLogIn } from 'src/app/redux/authentication/actions/requestLogIn';
import eventually from 'test-support/eventually';
import { requestOnboarding } from 'src/app/redux/authentication/actions/requestOnboarding';
import { BoclipsKeycloakSecurity } from 'boclips-js-security/dist/BoclipsKeycloakSecurity';
import { requestSsoAuthentication } from 'src/app/redux/authentication/actions/requestSsoAuthentication';
import { Constants } from 'src/app/AppConstants';
import { requestAuthenticationCheck } from 'src/app/redux/authentication/actions/requestAuthenticationCheck';
import requestAuthenticationMiddleware from 'src/app/redux/authentication/middleware/requestAuthenticationMiddleware';

jest.mock('boclips-js-security');

it("doesn't send users to login page when authentication not required", async () => {
  const mockStore = configureStore<{}>([...requestAuthenticationMiddleware]);
  const store = mockStore({});
  const createInstance = mocked(BoclipsSecurity.createInstance);

  const action = requestAuthenticationCheck();

  store.dispatch(action);

  await eventually(() => {
    expect(createInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        requireLoginPage: false,
      }),
    );
  });
});

it('requires login page when authentication is required', async () => {
  const mockStore = configureStore<{}>([...requestAuthenticationMiddleware]);
  const store = mockStore({});
  const createInstance = mocked(BoclipsSecurity.createInstance);

  const action = requestLogIn();

  store.dispatch(action);

  await eventually(() => {
    expect(createInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        requireLoginPage: true,
      }),
    );
  });
});

it('disables checkLoginIframe when onboarding', async () => {
  const mockStore = configureStore<{}>([...requestAuthenticationMiddleware]);
  const store = mockStore({});
  const createInstance = mocked(BoclipsSecurity.createInstance);

  const action = requestOnboarding({
    username: 'test',
    password: 'pass',
  });

  store.dispatch(action);

  await eventually(() => {
    expect(createInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        checkLoginIframe: false,
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
