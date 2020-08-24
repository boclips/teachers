import BoclipsSecurity from 'boclips-js-security';
import { Store } from 'redux';
import { Constants } from '../../../AppConstants';
import { sideEffect } from '../../actions';
import { authenticationResolved } from '../actions/authenticationResolved';
import { requestAuthentication } from '../actions/requestAuthentication';
import { requestSsoAuthentication } from '../actions/requestSsoAuthentication';

export interface AuthenticationOptions {
  requireLoginPage: boolean;
  username?: string;
  password?: string;
}
const onAuthenticationRequested = (
  store: Store,
  options: AuthenticationOptions,
) => {
  const enableCheckLoginIframe = options.username === undefined;
  BoclipsSecurity.createInstance({
    ...getSecurityOptions(store),
    requireLoginPage: options.requireLoginPage,
    checkLoginIframe: enableCheckLoginIframe,
    username: options.username,
    password: options.password,
  });
};

const onSsoAuthenticationRequested = (
  store: Store,
  identityProvider: string,
) => {
  const boclipsSecurity = BoclipsSecurity.createInstance(
    getSecurityOptions(store, false),
  );

  boclipsSecurity.ssoLogin({
    idpHint: identityProvider,
    redirectUri: Constants.HOST,
  });
};

const getSecurityOptions = (
  store: Store,
  requireLoginPage: boolean = true,
) => ({
  onLogin: () => {
    store.dispatch(
      authenticationResolved({
        success: true,
      }),
    );
  },
  onFailure: () => {
    store.dispatch(
      authenticationResolved({
        success: false,
      }),
    );
  },
  realm: 'boclips',
  clientId: 'teachers',
  authEndpoint: Constants.AUTH_ENDPOINT,
  requireLoginPage,
});

export default [
  sideEffect(requestAuthentication, onAuthenticationRequested),
  sideEffect(requestSsoAuthentication, onSsoAuthenticationRequested),
];
